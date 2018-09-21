var CryptoJS = require("crypto-js");
var CustomerModel = require('./../../Models/Customer/Customer.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');

 

//Customer Phone Number Unique Validate
exports.Customer_PhoneNumber_AsyncValidate = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
       res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
    } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else {
        CustomerModel.CustomerSchema.findOne({ Phone: { $regex : new RegExp("^" + ReceivingData.Phone + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer Info Find Query Error', 'Customer.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find Customer Info!."});
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

//create customer
exports.Customer_Create = function(req, res) {

    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
    console.log(ReceivingData);
    

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } 
    else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
       res.status(400).send({Status: false, Message: "Name can not be empty" });
    } 
    else if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
       res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
    }else{
          var Customer = new CustomerModel.CustomerSchema({
          Name: ReceivingData.Name,
          Phone: ReceivingData.Phone,
          Email: ReceivingData.Email,
          GSTNo: ReceivingData.GSTNo,
          Address: ReceivingData.Address,
          Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
          Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
          If_Deleted: false,
          Active_Status : ReceivingData.Active_Status || true,
       });
       
       Customer.save(function(err, result) {
          if(err) {
             console.log(err);
             
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer Creation Query Error', 'Customer.controller.js', err);
             res.status(400).send({Status: false, Message: "Some error occurred while creating the Customer!."});
          } else {
             var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Message: 'New Customer Successfully Created' });
          }
       });
    }
};


 // Customer List
 exports.Customer_List = function(req, res) {

    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else {
        CustomerModel.CustomerSchema
          .find({ If_Deleted: false }, {Name: 1, Email: 1, Phone: 1, BillingAddress: 1, GSTNo: 1 }, {sort: { updatedAt: -1 }})
          .exec(function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer List Find Query Error', 'Customer.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Customer List!."});
          } else {
             var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
             ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Response: ReturnData });
          }
       });
    }
 };
// Customer View
exports.Customer_View = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) { 
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
       res.status(400).send({Status: false, Message: "Customer Id Details can not be empty" });
    }else {
        CustomerModel.CustomerSchema
          .findOne({'_id': ReceivingData.Customer_Id }, {User_Password: 0}, {})
          .exec(function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer Data Find Query Error', 'Customer.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Customer Data!."});
          } else {
             var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
             ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Response: ReturnData });
          }
       });
    }
 };

 // Customer Update
 exports.Customer_Update = function(req, res) {

    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.Customer_Id || ReceivingData.Customer_Id === '' ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
       res.status(400).send({Status: false, Message: "Name can not be empty" });
    } else if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
       res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
    } else {

       
       CustomerModel.CustomerSchema.findOne({'_id': ReceivingData.Customer_Id }, {User_Password: 0}, {}).exec(function(err, result) {
          if (err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer Data Find Query Error', 'Customer.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Customer Data!."});
          }else{
             result.Name = ReceivingData.Name;
             result.User_Name = ReceivingData.User_Name;
             result.Phone = ReceivingData.Phone;
             result.Email = ReceivingData.Email;
             result.Website = ReceivingData.Website;
             result.GSTNo = ReceivingData.GSTNo;
             result.Address = ReceivingData.Address;
             result.Last_Modified_By  = mongoose.Types.ObjectId(ReceivingData.User_Id);
             result.save(function(err_1, result_1) {
                if(err) {
                   ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer Creation Query Error', 'Customer.controller.js', err_1);
                   res.status(400).send({Status: false, Message: "Some error occurred while Updated the Customer Details!."});
                } else {
                   res.status(200).send({Status: true, Message: 'Customer Details Successfully Updated' });
                }
             });
          }
       });
    }
 };

