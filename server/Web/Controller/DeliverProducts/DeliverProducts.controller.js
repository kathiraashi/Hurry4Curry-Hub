var CryptoJS = require("crypto-js");
var FranchiseePurchaseOrderModel = require('./../../Models/PurchaseOrder/FranchiseePurchaseOrder.model.js');
var HubStockModel = require('./../../Models/Stock/HubStock.model');
var DeliverProductModel = require('../../Models/DeliverProducts/DeliverProducts.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// Purchase Order list
exports.DeliverProducts_List = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else {
        FranchiseePurchaseOrderModel.PurchaseOrderSchema.find({If_Deleted: false, Current_Status: "Deliver Created"}, {Franchisee_Id: 1, 
            PurchaseRequest_RefNo: 1, 
            Current_Status: 1,
            DeliverCurrent_Status: 1,
            Expected_Date: 1,
            PurchaseRequest_Date: 1 }, {})
        .populate({path: 'Franchisee_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Order List Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Purchase Order List!."});
            } else {
                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();
                res.status(200).send({Status: true, Response: ReturnData }); 
            }
        });
    }
}

// Purchase Order view
exports.DeliverProducts_View = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else if (!ReceivingData.FranchiseeOrder_Id || ReceivingData.FranchiseeOrder_Id === '') {
        res.status(400).send({Status: false , Message: "Franchisee purchase bill detail cannot be empty"});
    } else {
        FranchiseePurchaseOrderModel.PurchaseOrderSchema.findOne({'Hub_Id': mongoose.Types.ObjectId(ReceivingData.User_Id), '_id': mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id)},{},{})
        .populate({path: 'Franchisee_Id', select: ['Name']})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Order View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Purchase Order View!."});
            }
            else {
                
                FranchiseePurchaseOrderModel.PurchaseOrder_ProductsSchema.find({'PurchaseRequest_Id': mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id)}, {})
                .populate({path: 'Product_Id', select: ['Name_withAttribute']})
                .exec(function(err_1, result_1) {
                    if(err_1){
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Purchase Order View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                        res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Purchase Order View!."});                    
                    } else {
                        const _ReturnData = {'FranchiseeOrder_Details': result, 'FranchiseeOrder_Product_Details': result_1}
                       var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(_ReturnData), 'SecretKeyOut@123');
                       ReturnData = ReturnData.toString();                
                       res.status(200).send({Status: true, Response: ReturnData });
                    }
                });
            }
        });
    }
}

// franchisee order update current status
exports.DeliverProducts_Deliver = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    console.log(ReceivingData);
    
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User Details can't be empty"});
    } else if(!ReceivingData.FranchiseeOrder_Id || ReceivingData.FranchiseeOrder_Id === '') {
        res.status(400).send({Status: false, Message: "Franchisee Details can't be empty"});
    } else {
        FranchiseePurchaseOrderModel.PurchaseOrderSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id)}, {})
        .exec(function(err, result) {
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Deliver Products View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Deliver Products View!."});
            } else {
                console.log(result);
                          
                var Deliver = new DeliverProductModel.DeliverProductsSchema({
                    Hub_Id: mongoose.Types.ObjectId(result.Hub_Id),
                    Franchisee_Id: mongoose.Types.ObjectId(result.Franchisee_Id),
                    PurchaseRequest_Id: mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id),
                    PurchaseRequest_RefNo: result.PurchaseRequest_RefNo,
                    PurchaseRequest_Date: result. PurchaseRequest_Date,
                    Expected_Date: result.Expected_Date,
                    Delivered_Date: new Date,
                    HubCurrent_Status: 'Delivered',
                    FranchiseeCurrent_Status: 'Requested',
                    Created_By : mongoose.Types.ObjectId(result.Hub_Id),
                    Last_Modified_By: mongoose.Types.ObjectId(result.Hub_Id),
                    Active_Status: true,
                    If_Deleted: false  
                });
                Deliver.save(function(err_1, result_1){
                    if(err_1){
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Deliver Products View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                        res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Deliver Products View!."});
                    } else {                         
                        FranchiseePurchaseOrderModel.PurchaseOrder_ProductsSchema.find({'PurchaseRequest_Id': result_1.PurchaseRequest_Id}, {})
                        .exec(function(err_2, result_2){
                            if(err_2){                                
                                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Deliver Products View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                                res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Deliver Products View!."});
                            } else {
                                const itemArray = result_2.map(obj => {                                    
                                    const newObj = {
                                        DeliverProducts_Id: result_1._id,
                                        Hub_Id: mongoose.Types.ObjectId(result.Hub_Id),
                                        Franchisee_Id: mongoose.Types.ObjectId(result.Franchisee_Id),
                                        PurchaseRequest_Id: mongoose.Types.ObjectId(obj.PurchaseRequest_Id),
                                        Product_Id: mongoose.Types.ObjectId(obj.Product_Id),
                                        Deliver_Quantity: obj.Requested_Quantity,
                                        Requested_Quantity: obj.Requested_Quantity,
                                        UnitOfMeasure: mongoose.Types.ObjectId(obj.UnitOfMeasure),
                                        Created_By : mongoose.Types.ObjectId(obj.Hub_Id),
                                        Last_Modified_By: mongoose.Types.ObjectId(obj.Hub_Id),
                                        Active_Status: true,
                                        If_Deleted: false
                                    };
                                    return newObj;
                               });
                               DeliverProductModel.DeliverProducts_ProductsSchema.collection.insert(itemArray,
                               function(err_3, result_3) {
                                   if(err_3) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Deliver Products View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                                    res.status(417).send({Status: false, Message: "Some error occurred while updating The Franchisee Deliver Products !."});
                                   } else {
                                        
                                        const UpdateStock = (List) => Promise.all(
                                            List.map(obj => UpdateAll(obj))
                                        ).then(response => {
                                            FranchiseePurchaseOrderModel.PurchaseOrderSchema.update(
                                                { '_id': mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id) }, 
                                                { $set: {Current_Status: "Delivered"} })
                                                .exec(function(err, result) {
                                                if(err) {
                                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Deliver Products View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                                                    res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Deliver Products View!."});
                                                }
                                                else {
                                                    res.status(200).send({Status: true, Response: "Delivered successfully"});
                                                }
                                                });
                                        });

                                        const UpdateAll = (info) => Promise.all([
                                            HubStockModel.HubStockSchema.findOne(
                                                { 'Product_Id': info.Product_Id }, 
                                          ),
                                            HubStockModel.HubStockSchema.update(
                                                { 'Product_Id': info.Product_Id }, 
                                                { $inc: {Current_Quantity: -parseInt(info.Deliver_Quantity) }}
                                          )
                                        ]).then( response => {
                                                HubStockModel.HubStockHistorySchema.create([{
                                                    HubProduct_Stock_Id: response[0]._id,
                                                    HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                                    Product_Id: mongoose.Types.ObjectId(response[0].Product_Id),
                                                    Previous_Quantity: parseInt(response[0].Current_Quantity),
                                                    Current_Quantity: parseInt(response[0].Current_Quantity) - parseInt(info.Deliver_Quantity),
                                                    Removed_Quantity: parseInt(response[0].Quantity),
                                                    Added_Quantity: 0,
                                                    UnitOfMeasure: mongoose.Types.ObjectId(response[0].UnitOfMeasure),
                                                    Reference_Id: mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id), // Franchisee Bill Id
                                                    History_From: 'Franchisee_Delivery',
                                                    Active_Status: true,
                                                    If_Deleted: false
                                                }])
                                                return response[0];
                                        });
                                        UpdateStock(itemArray);
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