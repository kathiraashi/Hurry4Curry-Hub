var CryptoJS = require("crypto-js");
var HubFranchiseeBillModel = require('./../../Models/Bill/FranchiseeBill.model.js');
var HubStockModel = require('./../../Models/Stock/HubStock.model');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');

// create bill
exports.FranchiseeBill_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));


   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Franchisee || ReceivingData.Franchisee === '' ) {
      res.status(400).send({Status: false, Message: "Franchisee Details can not be empty" });
   }else if(!ReceivingData.BillDate || ReceivingData.BillDate === '' ) {
      res.status(400).send({Status: false, Message: "Bill date can not be empty" });
   } else{
      HubFranchiseeBillModel.HubFranchisee_BillSchema.find({},{Bill_Number_Length: 1},{sort:{Bill_Number_Length: -1}, limit: 1})
      .exec(function(BillErr, BillResult){
         if(BillErr){
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill Creation Query Error', 'FranchiseeBill.controller.js', BillErr);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Bill!."});
         } else {
            var number = 1;
            if(BillResult.length > 0){
               number = BillResult[0].Bill_Number_Length + 1;
            }
            const Bill_Last_Number = number.toString().padStart(4, 0);
            const BillNumber = "FrBILL" + Bill_Last_Number;

            var FranchiseeBill = new HubFranchiseeBillModel.HubFranchisee_BillSchema({
               Franchisee_Id: mongoose.Types.ObjectId(ReceivingData.Franchisee),
               Bill_Number: BillNumber,
               Bill_Number_Length: Bill_Last_Number,
               Bill_Date: ReceivingData.BillDate,
               Net_Amount: ReceivingData.Net_Amount,
               Payment_Method: ReceivingData.PaymentType.paymentType,
               Reference_Number: ReceivingData.ReferenceNumber,
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               Date: ReceivingData.Date,
               If_Deleted: false,
               Active_Status : ReceivingData.Active_Status || true,
            });
            FranchiseeBill.save(function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill Creation Query Error', 'FranchiseeBill.controller.js', err);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Bill!."});
               } else {
                  const itemArray = ReceivingData.items.map(obj => {
                                       const newObj = {
                                          FranchiseeBill_Id: result._id,
                                          Product_Id: mongoose.Types.ObjectId(obj.Product.Product_Id._id),
                                          Price: obj.Price,
                                          Quantity: obj.Quantity,
                                          Product_Total: obj.Product_Total,
                                          UnitOfMeasure: mongoose.Types.ObjectId(obj.UnitOfMeasure),
                                          Active_Status: true,
                                          If_Deleted: false
                                       };             
                                       return newObj;
                                    });
      
                  HubFranchiseeBillModel.HubFranchiseeBill_ProductSchema.collection.insert(itemArray, function(err_1, result_1){
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'bill Product Creation Query Error', 'FranchiseeBill.controller.js', err_1);
                        res.status(400).send({Status: false, Message: "Some error occurred while creating the bill Product Insert!."});
                     } else {
                        const List = ReceivingData.items;

                        const UpdateStock = (List) => Promise.all(
                           List.map( obj => UpdateAll(obj) )
                        ).then(response => {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Message: 'New Bill Successfully Created' });
                        });

                        const UpdateAll = (info) => Promise.all([
                           HubStockModel.HubStockSchema.update(
                                 { _id: info.Product._id }, 
                                 { $set: {Current_Quantity: parseInt(info.Product.Current_Quantity) - parseInt(info.Quantity) }}
                           ),
                           HubStockModel.HubStockHistorySchema.create([{
                              HubProduct_Stock_Id: info.Product._id,
                              HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                              Product_Id: mongoose.Types.ObjectId(info.Product.Product_Id._id),
                              Previous_Quantity: parseInt(info.Product.Current_Quantity),
                              Current_Quantity: parseInt(info.Product.Current_Quantity) - parseInt(info.Quantity),
                              Removed_Quantity: parseInt(info.Quantity),
                              Added_Quantity: 0,
                              UnitOfMeasure: mongoose.Types.ObjectId(info.Product.UnitOfMeasure._id),
                              Reference_Id: mongoose.Types.ObjectId(result._id), // Franchisee Bill Id
                              History_From: 'Franchisee_Bill',
                              Active_Status: true,
                              If_Deleted: false
                           }])
                        ]).then(response => {
                           return response;
                        });
                        UpdateStock(List);
                     }
                  });
                  }
               });
            }
      });
   }
};

//Bill List
exports.FranchiseeBill_List = function(req, res){
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else{
      HubFranchiseeBillModel.HubFranchisee_BillSchema
      .find({ If_Deleted: false, Created_By:mongoose.Types.ObjectId(ReceivingData.User_Id)}, {}, {})
      .populate({path: 'Franchisee_Id', select:['Name', 'Phone']})
      .populate({path: 'Created_By', select:['Name']})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill List Find Query Error', 'FranchiseeBill.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Bill List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};