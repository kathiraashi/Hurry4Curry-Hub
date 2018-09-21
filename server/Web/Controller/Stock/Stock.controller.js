var CryptoJS = require("crypto-js");
var StockModel = require('./../../Models/Stock/Stock.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// stock create
exports.Stock_Create = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    console.log(ReceivingData);
    
    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
     }else if (!ReceivingData.Product_Id || ReceivingData.Product_Id === ''){
        res.status(400).send({Status: false, Message:"Product Details can not be empty"})
     }else if (!ReceivingData.Quantity || ReceivingData.Quantity === '') {
         res.status(400).send({Status: false, Message: "Quantity Details can not be empty"})
     }else {
         var Stock = new StockModel.StockSchema({
            HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
            Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
            Current_Quantity: parseInt(ReceivingData.Quantity),
            UnitOfMeasure: ReceivingData.UnitOfMeasure,
            Date: ReceivingData.Date,
            Active_Status: true,
            If_Deleted: false
         });

         Stock.save(function(err, result) {
             if(err) {
                console.log(err);
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock Creation Query Error', 'Stock.controller.js', err);
                res.status(400).send({Status: false, Message: "Some error occurred while creating the Stock!."});
            }else {
                var StockHistory = new StockModel.StockHistorySchema({
                    HubProduct_Stock_Id: result._id,
                    HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                    Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
                    Previous_Quantity: 0,
                    Current_Quantity: parseInt(ReceivingData.Quantity),
                    Total_Quantity: parseInt(ReceivingData.Quantity),
                    UnitOfMeasure: ReceivingData.UnitOfMeasure,
                    Date: ReceivingData.Date,
                    Active_Status: true,
                    If_Deleted: false
                })
                StockHistory.save(function(err_1, result_1){
                    if(err_1) {
                        console.log(err_1);
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock History query Error', 'Stock.controller.js', err_1);
                        res.status(400).send({Status: false, Message: "Some error occurred while creating the stock history."});
                    }else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                        res.status(200).send({Status: true, Response: ReturnData });
                    }
                });
             }
         });
     }
}

// stock list
exports.Stock_List = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
     }else if (!ReceivingData.Product_Id || ReceivingData.Product_Id === ''){
        res.status(400).send({Status: false, Message:"Product Details can not be empty"});
     }else {
        StockModel.StockSchema.find({If_Deleted: false}, { Current_Quantity: 1, Date: 1}, {sort:{Date: -1}})
        .populate({path: 'Product_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Stock List Find Query Error', 'Stock.controller.js', err);
                res.status(417).send({status: false, Message: "Some error occurred while Find The Stock List!."});
            }
            else {
                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();
                res.status(200).send({Status: true, Response: ReturnData });
             }
        });
    }
}

// //stock update
// exports.Stock_Update = function(req, res) {
//     var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
//     var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
// }