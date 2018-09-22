var CryptoJS = require("crypto-js");
var HubPurchaseBillModel = require('./../../Models/PurchaseBill/HubPurchaseBill.model');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var HubStockModel = require('./../../Models/Stock/HubStock.model');
var mongoose = require('mongoose');

// Supplier Purchase bill Number Unique Validate
exports.HubPurchaseBill_RefNo_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HubPurchaseBillModel.HubPurchaseBillSchema.findOne({ PurchaseBill_RefNo: { $regex : new RegExp("^" + ReceivingData.PurchaseBill_RefNo + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Bill Info Find Query Error', 'HubPurchaseBill.controller.js', err);
            res.status(417).send({Status: false, Message: "Some error occurred while Find Supplier Info!."});
         } else {
            if ( result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               res.status(200).send({Status: true, Available: true });
            }
         }
      });
   }
};

// Purchase Bill create
exports.HubPurchaseBill_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Supplier_Id || ReceivingData.Supplier_Id === '' ) {
      res.status(400).send({Status: false, Message: "Customer Name can not be empty" });
   } else if(!ReceivingData.PurchaseBill_Date || ReceivingData.PurchaseBill_Date === '' ) {
      res.status(400).send({Status: false, Message: "Bill date can not be empty" });
   } else{
   
      HubPurchaseBillModel.HubPurchaseBillSchema.find( {}, { PurchaseBill_Number_Length: 1 }, { sort:{ PurchaseBill_Number_Length: -1 }, limit: 1 })
      .exec( function(PurchaseBillErr, PurchaseBillResult) {
         if(PurchaseBillErr) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Bill Creation Query Error', 'HubPurchaseBill.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Hub PurchaseBill!."});
         } else {
            var number= 1;
            if(PurchaseBillResult.length > 0){
               number = PurchaseBillResult[0].PurchaseBill_Number_Length + 1;
            }
            const PurchaseBill_Last_Number = number.toString().padStart(3, 0);
            const PurchaseBillNumber = "Ref-" + PurchaseBill_Last_Number;

            var HubPurchaseBill = new HubPurchaseBillModel.HubPurchaseBillSchema({
               Supplier_Id: mongoose.Types.ObjectId(ReceivingData.Supplier_Id),
               PurchaseBill_RefNo: ReceivingData.PurchaseBill_RefNo,
               PurchaseBill_Date: ReceivingData.PurchaseBill_Date,
               PurchaseBill_Number: PurchaseBillNumber,
               PurchaseBill_Number_Length: PurchaseBill_Last_Number,
               Net_Amount: ReceivingData.Net_Amount,
               Payment_Status: 'Unpaid',
               If_Received: false,
               If_YieldUpdated: false, 
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               Date: ReceivingData.Date,
               If_Deleted: false,
               Active_Status : true,
            });
            HubPurchaseBill.save(function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'hub Purchase Bill Creation Query Error', 'HubPurchaseBill.controller.js', err);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the hub Purchase Bill!."});
               } else {
               
                  const FindStock = (selectedProducts) => Promise.all(
                        selectedProducts.map(obj => CurrentStock(obj))
                  ).then(response => {
                     const itemArray = response.map(obj => {                           
                        const newObj = {
                           HubPurchaseBill_Id: result._id,
                           Product_Id: mongoose.Types.ObjectId(obj.Product._id),
                           Stock_Id: mongoose.Types.ObjectId(obj.Product.Stock_Id),
                           UnitOfMeasure: mongoose.Types.ObjectId(obj.Product.UnitOfMeasure._id),
                           Price: parseInt(obj.Price),
                           Quantity: parseInt(obj.Quantity),
                           If_YieldUpdated: false,
                           YieldQty: 0,
                           WastageQty: 0,
                           Product_Total: obj.Product_Total,
                           Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                           Active_Status: true,
                           If_Deleted: false
                        };          
                        return newObj;
                     });
      
                     HubPurchaseBillModel.HubPurchaseBill_ProductsSchema.collection.insert(itemArray, function(err_2, result_2) {
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Product Creation Query Error', 'HubPurchaseBill.controller.js', err_1);
                           res.status(400).send({Status: false, Message: "Some error occurred while creating the Hub Purchase Bill Product!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Message: 'New Purchase Bill Successfully Created' });
                        }
                     });    
                  });
                  
                  const CurrentStock = (info) => Promise.all([ 
                     HubStockModel.HubStockSchema.findOne({Product_Id: info.Product._id})
                  ]).then(response=> {
                     info = JSON.parse(JSON.stringify(info));
                     if(response[0] !== null) {
                        info.Product.Stock_Id = response[0]._id;
                        return info;
                     } else {
                        async function GetStockId(info_one) {
                           return await StoreStockId(info_one).then(response => { 
                                 info.Product.Stock_Id = response;
                                 return info;
                           });  
                        }
                        function StoreStockId(Info) {
                           return new Promise( (resolve, reject) => {
                                 var Stock = new HubStockModel.HubStockSchema({
                                       HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                       Product_Id: mongoose.Types.ObjectId(Info.Product._id),
                                       Current_Quantity: 0,
                                       UnitOfMeasure: Info.Product.UnitOfMeasure._id,
                                       Active_Status: true,
                                       If_Deleted: false,
                                    });
                                    Stock.save(function(err_1, result_1) {
                                       if(err_1) {
                                          reject(err_1);
                                       }else {
                                          resolve(result_1._id);
                                       }
                                    });
                           });
                        }
                        return GetStockId(info);
                     }
                  });
                  FindStock(ReceivingData.items);
               }
            });
         }
      });
   }
};


//Purchase Bill List
exports.HubPurchaseBill_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else{
      HubPurchaseBillModel.HubPurchaseBillSchema.find({ If_Deleted: false, Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id)}, {}, {})
      .populate({path: 'Supplier_Id', select: ['Name', 'Phone']})
      .populate({path: 'Created_By', select:['Name']})
      .exec(function(err, result){
         if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill List Find Query Error', 'HubPurchaseBill.controller.js', err);
               res.status(417).send({Status: false, Message: "Some error occurred while Find The Hub Purchase Bill List!."});
            } else {

               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
               
            }
      });
   }
};

// Purchase bill view
exports.HubPurchaseBill_View = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false , Message: "User detail cannot be empty"});
   } else if(!ReceivingData.HubPurchaseBill_Id || ReceivingData.HubPurchaseBill_Id === '') {
      res.status(400).send({Status: false, Message: "HubPurchase Bill details cannot be empty"});
   }
   else {
      HubPurchaseBillModel.HubPurchaseBillSchema
      .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id)}, {}, {})
      .populate({path: 'Supplier_Id ', select: ['Name']})
      .exec(function(err, result){
         if(err){
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Data Find Query Error', 'HubPurchaseBill.controller.js', err);
            res.status(417).send({Status: false, Message: "Some error occurred while Find The Supplier Bill Data!."});
         } else {
            HubPurchaseBillModel.HubPurchaseBill_ProductsSchema.find({'HubPurchaseBill_Id': result._id}, {}, {})
            .populate({path: 'Product_Id', select: ['Name_withAttribute']})
            .populate({path: 'Stock_Id', select: ['Current_Quantity']})
            .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
            .exec(function(err_1, result_1){
               if(err_1){
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Data Find Query Error', 'HubPurchaseBill.controller.js', err);
                  res.status(417).send({Status: false, Message: "Some error occurred while Find The Hub Purchase Bill Data!."});
               } else {
                  const _ReturnData = { 'Supplier_Detail': result, 'Supplier_Product_Detail': result_1};
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(_ReturnData), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();                
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};

//Purchase Bill Yield List
exports.HubPurchaseBill_YieldUpdate_List = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false , Message: "User detail cannot be empty"});
   } else if(!ReceivingData.HubPurchaseBill_Id || ReceivingData.HubPurchaseBill_Id === '') {
      res.status(400).send({Status: false, Message: "HubPurchaseBill details cannot be empty"});
   } else {
      HubPurchaseBillModel.HubPurchaseBill_ProductsSchema.find({'HubPurchaseBill_Id': mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id), 'If_YieldUpdated': false}, {}, {})
      .populate({path: 'Product_Id', select: ['Name_withAttribute']})
      .populate({path: 'Stock_Id', select: ['Current_Quantity']})
      .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
      .exec(function(err, result){
         if(err){
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Data Find Query Error', 'HubPurchaseBill.controller.js', err);
            res.status(417).send({Status: false, Message: "Some error occurred while Find The Hub Purchase Bill Data!."});
         }else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();                
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};


// Purchase Bill Yield stock update 
exports.HubPurchaseBill_Yield_Update = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8)); 
   ReceivingData = JSON.parse(JSON.stringify(ReceivingData));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false , Message: "User detail cannot be empty"});
   } else  if(!ReceivingData.Product_Id || ReceivingData.Product_Id === '') {
      res.status(400).send({Status: false , Message: "Product detail cannot be empty"});
   } else  if(!ReceivingData.WastageQty || ReceivingData.WastageQty === '') {
      res.status(400).send({Status: false , Message: "wastage detail cannot be empty"});
   } else if(!ReceivingData.YieldQty || ReceivingData.YieldQty === '') {
      res.status(400).send({Status: false , Message: "yield detail cannot be empty"});
   } else if(!ReceivingData.HubPurchaseBill_Id || ReceivingData.HubPurchaseBill_Id === '') {
      res.status(400).send({Status: false , Message: "HubPurchaseBill detail cannot be empty"});
   } else if(!ReceivingData.HubPurchaseBill_ProductId || ReceivingData.HubPurchaseBill_ProductId === '') {
      res.status(400).send({Status: false , Message: "HubPurchase Bill Product detail cannot be empty"});
   } else {
      HubPurchaseBillModel.HubPurchaseBill_ProductsSchema.update(
            { '_id': mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_ProductId) },
            { $set: {YieldQty: parseInt(ReceivingData.YieldQty), WastageQty: parseInt(ReceivingData.WastageQty), YieldUpdate_Date: new Date(), If_YieldUpdated: true} }
         ).exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Yield update Find Query Error', 'HubPurchaseBill.controller.js', err);
            res.status(417).send({Status: false, Message: "Some error occurred while Find The Yield Update Data!."});
         } else {
            HubStockModel.HubStockSchema.findOne({Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id)}, {}, {})
            .exec(function(err_1, result_1){
               if(err_1){
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HubStock update Find Query Error', 'HubPurchaseBill.controller.js', err_1);
                  res.status(417).send({Status: false, Message: "Some error occurred while Find Hub Stock Update Data!."});
               } else {
                  HubStockModel.HubStockSchema.update(
                     { _id: result_1._id },
                     { $set: { Current_Quantity: parseInt(result_1.Current_Quantity) - parseInt(ReceivingData.WastageQty) } }
                  ).exec(function(err_2, result_2){
                     if(err_2){
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HubStock update Find Query Error', 'HubPurchaseBill.controller.js', err_2);
                        res.status(417).send({Status: false, Message: "Some error occurred while Find HubStock Update Data!."});
                     } else {
                        var StockHistory = new HubStockModel.HubStockHistorySchema({
                           HubProduct_Stock_Id: result_1._id,
                           HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                           Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
                           Previous_Quantity: result_1.Current_Quantity,
                           Removed_Quantity: parseInt(ReceivingData.WastageQty),
                           Current_Quantity: parseInt(result_1.Current_Quantity) - parseInt(ReceivingData.WastageQty),
                           Reference_Id: mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_ProductId), // PurchaseBill Product Id
                           History_From: 'Wastage',
                           UnitOfMeasure: result_1.UnitOfMeasure,
                           Active_Status: true,
                           If_Deleted: false
                        });
                        StockHistory.save(function(err_3, result_3){
                           if(err_3){
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'stock update Find Query Error', 'HubPurchaseBill.controller.js', err);
                                 res.status(417).send({Status: false, Message: "Some error occurred while Find stock Update Data!."});
                           } else {
                              HubPurchaseBillModel.HubPurchaseBill_ProductsSchema.find(
                                 { 'HubPurchaseBill_Id': mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id), If_YieldUpdated: false }
                              ).exec(function(err_4, result_4){
                                 if (err_4) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Find Query Error', 'HubPurchaseBill.controller.js', err_4);
                                    res.status(417).send({Status: false, Message: "Some error occurred while Find Hub Purchase Bill!."});
                                 }else{
                                    
                                    if (result_4.length > 0) {
                                       res.status(200).send({Status: true, Message: "Successfully update yield"});
                                    } else {
                                       HubPurchaseBillModel.HubPurchaseBillSchema.update(
                                          { '_id': mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id) },
                                          { $set: { If_YieldUpdated: true} }
                                       ).exec(function(err_5, result_5){
                                          if (err_5) {
                                             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Update Query Error', 'HubPurchaseBill.controller.js', err_4);
                                             res.status(417).send({Status: false, Message: "Some error occurred while Update the Hub Purchase Bill!."});
                                          }else {
                                             res.status(200).send({Status: true, Message: "Successfully update yield"});
                                          }
                                       });
                                    }
                                 }

                              });
                           }
                        });                          
                     }
                  });
               }
            });
         }
      });
   }
};


//Purchase Bill Receive stock update
exports.HubPurchaseBill_Received = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8)); 

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false , Message: "User detail cannot be empty"});
   } else if(!ReceivingData.HubPurchaseBill_Id || ReceivingData.HubPurchaseBill_Id === '') {
      res.status(400).send({Status: false, Message: "Hub Purchase Bill details cannot be empty"});
   } else {
      HubPurchaseBillModel.HubPurchaseBill_ProductsSchema.find({'HubPurchaseBill_Id': mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id)}, {}, {})
      .populate({path: 'Stock_Id', select: ['Current_Quantity']})
      .exec(function(err_1, result_1){
      if(err_1){
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Product Data Find Query Error', 'HubPurchaseBill.controller.js', err);
         res.status(417).send({Status: false, Message: "Some error occurred while Find The Hub Purchase Bill Products!."});
      } else {
         const List = result_1;
         const UpdateStock = (List) => Promise.all(
               List.map(obj => UpdateAll(obj) )
         ).then( response => {
            HubPurchaseBillModel.HubPurchaseBillSchema.update( 
               { _id: mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id)},
               { $set: { If_Received: true } }
            ).exec(function(err_3, result_3){
               if(err_3){
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Update Query Error', 'HubPurchaseBill.controller.js', err);
                  res.status(417).send({Status: false, Message: "Some error occurred while update The Hub Purchase Bill!."});            
               } else {
                  res.status(200).send({Status: true, Message: 'Successfully Received' });
               }
            });
         });

         const UpdateAll = (info) => Promise.all([
            HubStockModel.HubStockSchema.update(
               { _id: info.Stock_Id._id}, 
               { $set: { Current_Quantity: parseInt(info.Stock_Id.Current_Quantity) + parseInt(info.Quantity) }}
            ),
            HubStockModel.HubStockHistorySchema.create([{
               HubProduct_Stock_Id: mongoose.Types.ObjectId(info.Stock_Id._id), 
               HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
               Product_Id: mongoose.Types.ObjectId(info.Product_Id._id),
               Previous_Quantity:  parseInt(info.Stock_Id.Current_Quantity),
               Current_Quantity:  parseInt(info.Stock_Id.Current_Quantity) + parseInt(info.Quantity),
               Added_Quantity: parseInt(info.Quantity),
               UnitOfMeasure: mongoose.Types.ObjectId(info.UnitOfMeasure),
               Reference_Id: mongoose.Types.ObjectId(info._id), // PurchaseBill Product Id
               History_From: 'Purchase_Receive',
               Active_Status: true,
               If_Deleted: false
            }])
         ]).then( response => { return response; } );
      
         UpdateStock(List); 
        }
    });

    }
};





//Purchase Bill Payment stock update
exports.HubPurchaseBill_PaymentUpdate = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8)); 

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false , Message: "User detail cannot be empty"});
   } else if(!ReceivingData.HubPurchaseBill_Id || ReceivingData.HubPurchaseBill_Id === '') {
      res.status(400).send({Status: false, Message: "Hub Purchase Bill details cannot be empty"});
   } else {
         HubPurchaseBillModel.HubPurchaseBillSchema.update(
            { _id: mongoose.Types.ObjectId(ReceivingData.HubPurchaseBill_Id)},
            { $set: { Payment_Status: 'Paid' } }
         ).exec(function(err_3, result_3){
            if(err_3){
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Purchase Bill Update Query Error', 'HubPurchaseBill.controller.js', err);
               res.status(417).send({Status: false, Message: "Some error occurred while update The Hub Purchase Bill!."});            
            } else {
               res.status(200).send({Status: true, Message: 'Successfully Updated' });
            }
         });
    }
};

