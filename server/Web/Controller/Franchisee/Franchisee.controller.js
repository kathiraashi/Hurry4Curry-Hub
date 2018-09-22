var CryptoJS = require("crypto-js");
var FranchiseeModel = require('./../../Models/Franchisee/Franchisee.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// -------------------------------------------------- Franchisee Create -----------------------------------------------

// Franchisee User Name Unique Validate
exports.Franchisee_UserName_AsyncValidate = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
       res.status(400).send({Status: false, Message: "User Name can not be empty" });
    } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else {
        FranchiseeModel.FranchiseeSchema.findOne({ User_Name: { $regex : new RegExp("^" + ReceivingData.User_Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Info Find Query Error', 'Franchisee.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find Franchisee Info!."});
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
 

 // Franchisee Phone Number Unique Validate
 exports.Franchisee_PhoneNumber_AsyncValidate = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
       res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
    } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else {
        FranchiseeModel.FranchiseeSchema.findOne({ Phone: { $regex : new RegExp("^" + ReceivingData.Phone + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Info Find Query Error', 'Franchisee.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find Franchisee Info!."});
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

 exports.Franchisee_Create = function(req, res) {

    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
       res.status(400).send({Status: false, Message: "User Name can not be empty" });
    } else if(!ReceivingData.User_Password || ReceivingData.User_Password === '' ) {
       res.status(400).send({Status: false, Message: "Password can not be empty" });
    } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
       res.status(400).send({Status: false, Message: "Name can not be empty" });
    } else if(!ReceivingData.Email || ReceivingData.Email === '' ) {
       res.status(400).send({Status: false, Message: "Email Address can not be empty" });
    } else if(!ReceivingData.GSTNo || ReceivingData.GSTNo === '' ) {
       res.status(400).send({Status: false, Message: "GSTNo can not be empty" });
    } else if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
       res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
    } else {

       if (ReceivingData.BillingCountry && typeof ReceivingData.BillingCountry === 'object' && Object.keys(ReceivingData.BillingCountry).length > 0 ) {
          ReceivingData.BillingCountry._id = mongoose.Types.ObjectId(ReceivingData.BillingCountry._id);
       }
       if (ReceivingData.BillingState && typeof ReceivingData.BillingState === 'object' && Object.keys(ReceivingData.BillingState).length > 0 ) {
          ReceivingData.BillingState._id = mongoose.Types.ObjectId(ReceivingData.BillingState._id);
       }
       if (ReceivingData.BillingCity && typeof ReceivingData.BillingCity === 'object' && Object.keys(ReceivingData.BillingCity).length > 0 ) {
          ReceivingData.BillingCity._id = mongoose.Types.ObjectId(ReceivingData.BillingCity._id);
       }
       if (ReceivingData.ShopFloorCountry && typeof ReceivingData.ShopFloorCountry === 'object' && Object.keys(ReceivingData.ShopFloorCountry).length > 0 ) {
          ReceivingData.ShopFloorCountry._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCountry._id);
       }
       if (ReceivingData.ShopFloorState && typeof ReceivingData.ShopFloorState === 'object' && Object.keys(ReceivingData.ShopFloorState).length > 0 ) {
          ReceivingData.ShopFloorState._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorState._id);
       }
       if (ReceivingData.ShopFloorCity && typeof ReceivingData.ShopFloorCity === 'object' && Object.keys(ReceivingData.ShopFloorCity).length > 0 ) {
          ReceivingData.ShopFloorCity._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCity._id);
       }
       
       var Franchisee = new FranchiseeModel.FranchiseeSchema({
          Name: ReceivingData.Name,
          User_Name: ReceivingData.User_Name,
          User_Password: ReceivingData.User_Password,
          Phone: ReceivingData.Phone,
          Email: ReceivingData.Email,
          Website: ReceivingData.Website,
          GSTNo: ReceivingData.GSTNo,
          Image: null,
          "BillingAddress.Street": ReceivingData.BillingStreet,
          "BillingAddress.Area": ReceivingData.BillingArea,
          "BillingAddress.ZipCode": ReceivingData.BillingZipCode,
          "BillingAddress.Country": ReceivingData.BillingCountry,
          "BillingAddress.State": ReceivingData.BillingState,
          "BillingAddress.City": ReceivingData.BillingCity,
          SameAddresses: ReceivingData.SameAddresses,
          "ShopFloorAddress.Street": ReceivingData.ShopFloorStreet,
          "ShopFloorAddress.Area": ReceivingData.ShopFloorArea,
          "ShopFloorAddress.ZipCode": ReceivingData.ShopFloorZipCode,
          "ShopFloorAddress.Country": ReceivingData.ShopFloorCountry,
          "ShopFloorAddress.State": ReceivingData.ShopFloorState,
          "ShopFloorAddress.City": ReceivingData.ShopFloorCity,
          Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
          Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
          If_Deleted: false,
          Active_Status : ReceivingData.Active_Status || true,
       });
       
       Franchisee.save(function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Creation Query Error', 'Franchisee.controller.js', err);
             res.status(400).send({Status: false, Message: "Some error occurred while creating the Franchisee!."});
          } else {
             var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Message: 'New Franchisee Successfully Created' });
          }
       });
    }
 };

 // Franchisee List
 exports.Franchisee_List = function(req, res) {

    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else {
        FranchiseeModel.FranchiseeSchema
          .find({ If_Deleted: false }, {Name: 1, Email: 1, Phone: 1, BillingAddress: 1, GSTNo: 1 }, {sort: { updatedAt: -1 }})
          .exec(function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee List Find Query Error', 'Franchisee.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Franchisee List!."});
          } else {
             var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
             ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Response: ReturnData });
          }
       });
    }
 };

// Franchisee View
 exports.Franchisee_View = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else if (!ReceivingData.Franchisee_Id || ReceivingData.Franchisee_Id === ''  ) {
       res.status(400).send({Status: false, Message: "Franchisee Id Details can not be empty" });
    }else {
        FranchiseeModel.FranchiseeSchema
          .findOne({'_id': ReceivingData.Franchisee_Id }, {User_Password: 0}, {})
          .exec(function(err, result) {
          if(err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Data Find Query Error', 'Franchisee.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Franchisee Data!."});
          } else {
             var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
             ReturnData = ReturnData.toString();
             res.status(200).send({Status: true, Response: ReturnData });
          }
       });
    }
 };

// Franchisee Update
 exports.Franchisee_Update = function(req, res) {

    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.Franchisee_Id || ReceivingData.Franchisee_Id === '' ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    }else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
       res.status(400).send({Status: false, Message: "User Details can not be empty" });
    } else if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
       res.status(400).send({Status: false, Message: "User Name can not be empty" });
    } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
       res.status(400).send({Status: false, Message: "Name can not be empty" });
    } else if(!ReceivingData.Email || ReceivingData.Email === '' ) {
       res.status(400).send({Status: false, Message: "Email Address can not be empty" });
    } else if(!ReceivingData.GSTNo || ReceivingData.GSTNo === '' ) {
       res.status(400).send({Status: false, Message: "GSTNo can not be empty" });
    } else if(!ReceivingData.Phone || ReceivingData.Phone === '' ) {
       res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
    } else {

       if (ReceivingData.BillingCountry && typeof ReceivingData.BillingCountry === 'object' && Object.keys(ReceivingData.BillingCountry).length > 0 ) {
          ReceivingData.BillingCountry._id = mongoose.Types.ObjectId(ReceivingData.BillingCountry._id);
       }
       if (ReceivingData.BillingState && typeof ReceivingData.BillingState === 'object' && Object.keys(ReceivingData.BillingState).length > 0 ) {
          ReceivingData.BillingState._id = mongoose.Types.ObjectId(ReceivingData.BillingState._id);
       }
       if (ReceivingData.BillingCity && typeof ReceivingData.BillingCity === 'object' && Object.keys(ReceivingData.BillingCity).length > 0 ) {
          ReceivingData.BillingCity._id = mongoose.Types.ObjectId(ReceivingData.BillingCity._id);
       }
       if (ReceivingData.ShopFloorCountry && typeof ReceivingData.ShopFloorCountry === 'object' && Object.keys(ReceivingData.ShopFloorCountry).length > 0 ) {
          ReceivingData.ShopFloorCountry._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCountry._id);
       }
       if (ReceivingData.ShopFloorState && typeof ReceivingData.ShopFloorState === 'object' && Object.keys(ReceivingData.ShopFloorState).length > 0 ) {
          ReceivingData.ShopFloorState._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorState._id);
       }
       if (ReceivingData.ShopFloorCity && typeof ReceivingData.ShopFloorCity === 'object' && Object.keys(ReceivingData.ShopFloorCity).length > 0 ) {
          ReceivingData.ShopFloorCity._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCity._id);
       }
       
       FranchiseeModel.FranchiseeSchema.findOne({'_id': ReceivingData.Franchisee_Id }, {User_Password: 0}, {}).exec(function(err, result) {
          if (err) {
             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Data Find Query Error', 'Franchisee.controller.js', err);
             res.status(417).send({status: false, Message: "Some error occurred while Find The Franchisee Data!."});
          }else{
             result.Name = ReceivingData.Name;
             result.User_Name = ReceivingData.User_Name;
             result.Phone = ReceivingData.Phone;
             result.Email = ReceivingData.Email;
             result.Website = ReceivingData.Website;
             result.GSTNo = ReceivingData.GSTNo;
             result.BillingAddress.Street = ReceivingData.BillingStreet;
             result.BillingAddress.Area = ReceivingData.BillingArea;
             result.BillingAddress.ZipCode = ReceivingData.BillingZipCode;
             result.BillingAddress.Country = ReceivingData.BillingCountry;
             result.BillingAddress.State = ReceivingData.BillingState;
             result.BillingAddress.City = ReceivingData.BillingCity;
             result.SameAddresses = ReceivingData.SameAddresses;
             result.ShopFloorAddress.Street = ReceivingData.ShopFloorStreet;
             result.ShopFloorAddress.Area = ReceivingData.ShopFloorArea;
             result.ShopFloorAddress.ZipCode = ReceivingData.ShopFloorZipCode;
             result.ShopFloorAddress.Country = ReceivingData.ShopFloorCountry;
             result.ShopFloorAddress.State = ReceivingData.ShopFloorState;
             result.ShopFloorAddress.City = ReceivingData.ShopFloorCity;
             result.Last_Modified_By  = mongoose.Types.ObjectId(ReceivingData.User_Id);
             result.save(function(err_1, result_1) {
                if(err) {
                   ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Franchisee Creation Query Error', 'Franchisee.controller.js', err_1);
                   res.status(400).send({Status: false, Message: "Some error occurred while Updated the Franchisee Details!."});
                } else {
                   res.status(200).send({Status: true, Message: 'Franchisee Details Successfully Updated' });
                }
             });
          }
       });
    }
 };