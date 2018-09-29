var CryptoJS = require("crypto-js");
var FranchiseePurchaseOrderModel = require('./../../Models/PurchaseOrder/FranchiseePurchaseOrder.model.js');
var HubStockModel = require('./../../Models/Stock/HubStock.model');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');

// Purchase Order list
exports.FranchiseePurchaseOrder_List = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else {
        FranchiseePurchaseOrderModel.PurchaseOrderSchema.find({If_Deleted: false}, {Franchisee_Id: 1, 
            PurchaseRequest_RefNo: 1, 
            Current_Status: 1,
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
exports.FranchiseePurchaseOrder_View = function(req, res) {
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
exports.FranchiseePurchaseOrder_CreateDeliver = function(req, res) {
    var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    console.log(ReceivingData);
    
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
        res.status(400).send({Status: false , Message: "User detail cannot be empty"});
    } else if (!ReceivingData.FranchiseeOrder_Id || ReceivingData.FranchiseeOrder_Id === '') {
        res.status(400).send({Status: false , Message: "Franchisee purchase bill detail cannot be empty"});
    } else {
        FranchiseePurchaseOrderModel.PurchaseOrder_ProductsSchema.find({'PurchaseRequest_Id': mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id)})
        .populate({path: 'Product_Id', select: ['Name_withAttribute']})
        .exec(function(err, result) {
            if(err) {
                console.log(err);
            }
            else {
                let state = true;
                const FindStock = (list) => Promise.all(
                    list.map(obj => currentStock(obj))
                ).then( response => {

                    console.log(state);
                    if(state === true) {
                        FranchiseePurchaseOrderModel.PurchaseOrderSchema.update(
                            { '_id': mongoose.Types.ObjectId(ReceivingData.FranchiseeOrder_Id) }, 
                            { $set: {Current_Status: "Deliver Created", DeliverCurrent_Status: "Requested"} })
                            .exec(function(err, result) {
                            if(err) {
                                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Deliver Products View Find Query Error', 'FranchiseePurchaseOrder.controller.js', err);
                                res.status(417).send({Status: false, Message: "Some error occurred while Find The Franchisee Deliver Products View!."});
                            }
                            else {
                                res.status(200).send({Status: true, Response: "Update successfully"});
                            }
                            });
                    } else {
                        res.status(200).send({Status: true, Response: "Some Products are Out of Stock!"});
                    }
                    
                });
        
                const currentStock = (info) => Promise.all([
                    HubStockModel.HubStockSchema.findOne({Product_Id: info.Product_Id})
                ]).then(response => {
                    info = JSON.parse(JSON.stringify(info));
                
                    if(response[0] === null || (parseInt(response[0].Current_Quantity) < parseInt(info.Requested_Quantity))) {
                       state = false;
                    } 
                    return state;
                });

                FindStock(result);
            }
        });
       
    }
}


