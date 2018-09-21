var CryptoJS = require("crypto-js");
var PurchaseBillModel = require('./../../Models/PurchaseBill/PurchaseBill.model');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var ProductModel = require('./../../Models/Product/Product.model.js');
var StockModel = require('./../../Models/Stock/Stock.model.js');
var mongoose = require('mongoose');

// Supplier Purchase bill Number Unique Validate
exports.PurchaseBill_RefNo_AsyncValidate = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    
    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else {
       PurchaseBillModel.PurchaseBillSchema.findOne({ PurchaseBill_RefNo: { $regex : new RegExp("^" + ReceivingData.PurchaseBill_RefNo + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Bill Info Find Query Error', 'PurchaseBill.controller.js', err);
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
exports.PurchaseBill_Create = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
     } 
     else if(!ReceivingData.Supplier_Id || ReceivingData.Supplier_Id === '' ) {
        res.status(400).send({Status: false, Message: "Customer Name can not be empty" });
     }
     else if(!ReceivingData.PurchaseBill_Date || ReceivingData.PurchaseBill_Date === '' ) {
        res.status(400).send({Status: false, Message: "Bill date can not be empty" });
     } 
     else{
         PurchaseBillModel.PurchaseBillSchema.find({},{PurchaseBill_Number_Length: 1}, {sort:{PurchaseBill_Number_Length: -1}, limit: 1})
         .exec(function(PurchaseBillErr, PurchaseBillResult){
             if(PurchaseBillErr){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Bill Creation Query Error', 'PurchaseBill.controller.js', err);
                res.status(400).send({Status: false, Message: "Some error occurred while creating the PurchaseBill!."});
             }
             else {
                 var number= 1;
                 if(PurchaseBillResult.length > 0){
                     number = PurchaseBillResult[0].PurchaseBill_Number_Length + 1;
                 }
                 const PurchaseBill_Last_Number = number.toString().padStart(3, 0);
                 const PurchaseBillNumber = "Ref-" + PurchaseBill_Last_Number;

                 var PurchaseBill = new PurchaseBillModel.PurchaseBillSchema({
                    Supplier_Id: mongoose.Types.ObjectId(ReceivingData.Supplier_Id),
                    PurchaseBill_RefNo: ReceivingData.PurchaseBill_RefNo,
                    PurchaseBill_Date: ReceivingData.PurchaseBill_Date,
                    PurchaseBill_Number: PurchaseBillNumber,
                    PurchaseBill_Number_Length: PurchaseBill_Last_Number,
                    Net_Amount: ReceivingData.Net_Amount,
                    Received: false,
                    UpdateYield: false, 
                    Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Date: ReceivingData.Date,
                    If_Deleted: false,
                    Active_Status : ReceivingData.Active_Status || true,
                });
                PurchaseBill.save(function(err, result) {
                   if(err) {
                      ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Bill Creation Query Error', 'PurchaseBill.controller.js', err);
                      res.status(400).send({Status: false, Message: "Some error occurred while creating the Purchase Bill!."});
                      console.log(err);
                   } else {

                        const FindStock = (selectedProducts) => Promise.all(
                            selectedProducts.map(obj => CurrentStock(obj)),
                        ).then(response => {

                       const itemArray = response.map(obj => {                           
                            const newObj = {
                            SupplierBill_Id: result._id,
                            Product_Id: mongoose.Types.ObjectId(obj.Product._id),
                            Stock_Id: mongoose.Types.ObjectId(obj.Product.Stock_Id),
                            UnitOfMeasure: mongoose.Types.ObjectId(obj.Product.UnitOfMeasure._id),
                            Price: obj.Price,
                            Quantity: obj.Quantity,
                            YieldQty: 0,
                            WastageQty: 0,
                            Product_Total: obj.Product_Total
                           }             
                           return newObj;
                       });
       
                       PurchaseBillModel.Product_PurchaseBillSchema.collection.insert(itemArray, function(err_2, result_2){
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Creation Query Error', 'Product.controller.js', err_1);
                              res.status(400).send({Status: false, Message: "Some error occurred while creating the Product!."});

                           } else {
                            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                            ReturnData = ReturnData.toString();
                            res.status(200).send({Status: true, Message: 'New Customer Successfully Created' });
                           }
                        });    
                    });
                        
                        const CurrentStock = (info) => Promise.all(
                            [ StockModel.StockSchema.findOne({Product_Id: info.Product._id}) ]
                        ).then(response=> {
                            info = JSON.parse(JSON.stringify(info));
                            if(response[0] !== null) {
                                info.Product.Stock_Id = response[0]._id;
                                return info;
                            }
                            else {
                               return GetStockId(info);

                                async function GetStockId(info_one) {
                                   return await StoreStockId(info_one).then(response => { 
                                        info.Product.Stock_Id = response;
                                        return info;
                                    })  
                                }

                                function StoreStockId(Info){
                                    return new Promise( (resolve, reject) => {
                                        var Stock = new StockModel.StockSchema({
                                                HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                                Product_Id: mongoose.Types.ObjectId(Info.Product._id),
                                                Current_Quantity: 0,
                                                UnitOfMeasure: Info.Product.UnitOfMeasure._id,
                                                Date: ReceivingData.Date,
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
                                    })
                                }
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
exports.PurchaseBill_List = function(req, res){
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
     }else{
         PurchaseBillModel.PurchaseBillSchema.find({ If_Deleted: false}, {}, {})
         .populate({path: 'Supplier_Id', select: ['Name', 'Phone']})
         .populate({path: 'Created_By', select:['Name']})
         .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
         .exec(function(err, result){
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Purchase Bill List Find Query Error', 'PurchaseBill.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Purchase Bill List!."});
             } else {
                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();
                res.status(200).send({Status: true, Response: ReturnData });
                
             }
         });
     }
};

// Purchase bill view
exports.PurchaseBill_View = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else if(!ReceivingData.SupplierBill_Id || ReceivingData.SupplierBill_Id === '') {
        res.status(400).send({Status: false, Message: "Supplier Bill details cannot be empty"})
    }
    else {
        PurchaseBillModel.PurchaseBillSchema
        .findOne({'_id': ReceivingData.SupplierBill_Id}, {}, {})
        .populate({path: 'Supplier_Id', select: ['Name']})
        .exec(function(err, result){
            if(err){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Supplier Data Find Query Error', 'PurchaseBill.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Supplier Bill Data!."});
            } else {
                PurchaseBillModel.Product_PurchaseBillSchema.find({'SupplierBill_Id': ReceivingData.SupplierBill_Id}, {}, {})
                .populate({path: 'Product_Id', select: ['Name_withAttribute']})
                .populate({path: 'Stock_Id', select: ['Current_Quantity']})
                .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
                .exec(function(err_1, result_1){
                    if(err_1){
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Supplier Data Find Query Error', 'PurchaseBill.controller.js', err);
                        res.status(417).send({Status: false, Message: "Some error occurred while Find The Supplier Bill Data!."});
                    }
                    else {
                        const _ReturnData = { 'Supplier_Detail': result, 'Supplier_Product_Detail': result_1}
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(_ReturnData), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();                
                        res.status(200).send({Status: true, Response: ReturnData });
                    }
                });
               
            }
        });
    }
}
//Purchase Bill Yield List
exports.PurchaseBill_YieldUpdate_List = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else if(!ReceivingData.SupplierBill_Id || ReceivingData.SupplierBill_Id === '') {
        res.status(400).send({Status: false, Message: "Supplier Bill details cannot be empty"})
    } else {
        PurchaseBillModel.Product_PurchaseBillSchema.find({'SupplierBill_Id': ReceivingData.SupplierBill_Id, 'UpdateYield': false}, {}, {})
        .populate({path: 'Product_Id', select: ['Name_withAttribute']})
        .populate({path: 'Stock_Id', select: ['Current_Quantity']})
        .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
        .exec(function(err, result){
            if(err){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Supplier Data Find Query Error', 'PurchaseBill.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Supplier Bill Data!."});
            }
            else {

                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();                
                res.status(200).send({Status: true, Response: ReturnData });
            }
        });
    }
}
// Purchase Bill Yield stock update 
exports.PurchaseBill_Yield_Update = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8)); 
    ReceivingData = JSON.parse(JSON.stringify(ReceivingData));
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else  if(!ReceivingData.Product_Id || ReceivingData.Product_Id === '') {
        res.status(400).send({Status: false , Message: "Product detail cannot be empty"});
    } else  if(!ReceivingData.Reference_Id || ReceivingData.Reference_Id === '') {
        res.status(400).send({Status: false , Message: "Reference detail cannot be empty"});
    } else  if(!ReceivingData.WastageQty || ReceivingData.WastageQty === '') {
        res.status(400).send({Status: false , Message: "wastage detail cannot be empty"});
    } else if(!ReceivingData.YieldQty || ReceivingData.YieldQty === '') {
        res.status(400).send({Status: false , Message: "yield detail cannot be empty"});
    } else if(!ReceivingData.SupplierBill_Id || ReceivingData.SupplierBill_Id === '') {
        res.status(400).send({Status: false , Message: "Supplier Bill detail cannot be empty"});
    } else {
        PurchaseBillModel.Product_PurchaseBillSchema.update({'SupplierBill_Id' : ReceivingData.SupplierBill_Id},{$set: {YieldQty: ReceivingData.YieldQty, WastageQty: ReceivingData.WastageQty}}, function(err, result){
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Yield update Find Query Error', 'PurchaseBill.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Yield Update Data!."});
            }
            else {
                StockModel.StockSchema.findOne({Product_Id: ReceivingData.Product_Id}, {}, {})
                .exec(function(err_1, result_1){
                    if(err_1){
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'stock update Find Query Error', 'PurchaseBill.controller.js', err);
                        res.status(417).send({Status: false, Message: "Some error occurred while Find stock Update Data!."});
                    }
                    else {
                        console.log(result_1);
                        console.log(ReceivingData.WastageQty);
                        console.log(result_1.Current_Quantity);

                        console.log(parseInt(result_1.Current_Quantity) - ReceivingData.WastageQty);
                        
                        StockModel.StockSchema.update({Product_Id: ReceivingData.Product_Id},
                        {$set: {Current_Quantity: parseInt(result_1.Current_Quantity) - parseInt(ReceivingData.WastageQty) }})
                        .exec(function(err_2, result_2){
                            if(err_2){
                                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'stock update Find Query Error', 'PurchaseBill.controller.js', err);
                                res.status(417).send({Status: false, Message: "Some error occurred while Find stock Update Data!."});
                            }
                            else {
                                var StockHistory = new StockModel.StockHistorySchema({
                                    HubProduct_Stock_Id: result_1._id,
                                    HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                    Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
                                    Previous_Quantity: result_1.Current_Quantity,
                                    Removed_Quantity: parseInt(ReceivingData.WastageQty),
                                    Current_Quantity: parseInt(result_1.Current_Quantity) - parseInt(ReceivingData.WastageQty),
                                    UnitOfMeasure: ReceivingData.UnitOfMeasure,
                                    Date: ReceivingData.Date,
                                    Active_Status: true,
                                    If_Deleted: false
                                });
                                StockHistory.save(function(err_3, result_3){
                                    if(err_3){
                                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'stock update Find Query Error', 'PurchaseBill.controller.js', err);
                                        res.status(417).send({Status: false, Message: "Some error occurred while Find stock Update Data!."});
                                    }
                                    else {
                                        PurchaseBillModel.PurchaseBillSchema.updateOne({_id: ReceivingData.SupplierBill_Id}, {$set: {UpdateYield: true}}, function(err_4, result_4){
                                           if(err_4){
                                            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'stock update Find Query Error', 'PurchaseBill.controller.js', err);
                                            res.status(417).send({Status: false, Message: "Some error occurred while Find stock Update Data!."});  
                                           }
                                           else {
                                            res.status(200).send({Status: true, Message: "Successfully update yield"});
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
}
//Purchase Bill Receive stock update
exports.PurchaseBill_UpdateStock = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8)); 
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else if(!ReceivingData.SupplierBill_Id || ReceivingData.SupplierBill_Id === '') {
        res.status(400).send({Status: false, Message: "Supplier Bill details cannot be empty"})
    } else {
        PurchaseBillModel.Product_PurchaseBillSchema.find({'SupplierBill_Id': ReceivingData.SupplierBill_Id}, {}, {})
        .populate({path: 'Product_Id', select: ['Name_withAttribute']})
        .populate({path: 'Stock_Id', select: ['Current_Quantity']})
        .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
        .exec(function(err_1, result_1){
        if(err_1){
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Supplier Data Find Query Error', 'PurchaseBill.controller.js', err);
            res.status(417).send({Status: false, Message: "Some error occurred while Find The Supplier Bill Data!."});
        }
        else {
            // const _ReturnData = { 'Supplier_Detail': result, 'Supplier_Product_Detail': result_1}
            const List = result_1;
            const UpdateStock = (List) => Promise.all(
                List.map(obj => UpdateAll(obj) )
            ).then( response => {
               
                PurchaseBillModel.PurchaseBillSchema.updateOne({_id: ReceivingData.SupplierBill_Id},{$set: { Received: true}}, function(err_3, result_3){
                    if(err_3){
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Supplier Data Find Query Error', 'PurchaseBill.controller.js', err);
                        res.status(417).send({Status: false, Message: "Some error occurred while update The Supplier Bill Data!."});            
                    } else {
                        res.status(200).send({Status: true, Message: 'Stock update Successfully Created' });
                    }
                });
            });
        
            const UpdateAll = (info) => Promise.all([
        
                StockModel.StockSchema.update(
                    { Product_Id: info.Product_Id._id}, 
                    { $set: {Current_Quantity: parseInt(info.Stock_Id.Current_Quantity) + parseInt(info.Quantity) }}
                ),
                StockModel.StockHistorySchema.create([{
                    HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                    Product_Id: mongoose.Types.ObjectId(info.Product_Id._id),
                    Previous_Quantity:  parseInt(info.Stock_Id.Current_Quantity),
                    Current_Quantity:  parseInt(info.Stock_Id.Current_Quantity) + parseInt(info.Quantity),
                    Added_Quantity: parseInt(info.Quantity),
                    UnitOfMeasure: mongoose.Types.ObjectId(info.UnitOfMeasure._id),
                    Date: new Date(),
                    Active_Status: true,
                    If_Deleted: false
                }])
                
            ]).then( response => {
                return response
                }
            );
        
            UpdateStock(List); 
        }
    });

    }

}