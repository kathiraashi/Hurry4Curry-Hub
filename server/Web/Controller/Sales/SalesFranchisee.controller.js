var CryptoJS = require("crypto-js");
var SalesFranchiseeModel = require('./../../Models/Sales/SalesFranchisee.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// -------------------------------------------------- Sales Franchisee Create -----------------------------------------------
exports.SalesFranchisee_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: "Name can not be empty" });
   } else if(!ReceivingData.EmailAddress || ReceivingData.EmailAddress === '' ) {
      res.status(400).send({Status: false, Message: "Email Address can not be empty" });
   } else if(!ReceivingData.GSTNo || ReceivingData.GSTNo === '' ) {
      res.status(400).send({Status: false, Message: "GSTNocan not be empty" });
   } else if(!ReceivingData.PhoneNumber || ReceivingData.PhoneNumber === '' ) {
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
      
      var Sales_Franchisee = new SalesFranchiseeModel.SalesFranchiseeSchema({
         Name: ReceivingData.Name,
         PhoneNumber: ReceivingData.PhoneNumber,
         EmailAddress: ReceivingData.EmailAddress,
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
         Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      
      Sales_Franchisee.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sales Franchisee Creation Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Sales Franchisee!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New Franchisee Successfully Created' });
         }
      });
   }
};

// Sales Franchisee List
exports.SalesFranchisee_List = function(req, res) {
   console.log(req.body);
   
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      SalesFranchiseeModel.SalesFranchiseeSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {Name: 1, EmailAddress: 1, PhoneNumber: 1, BillingAddress: 1, GSTNo: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sales Franchisee List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Sales Franchisee List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// Sales Franchisee Simple List
   exports.SalesFranchisee_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SalesFranchiseeModel.SalesFranchiseeSchema
            .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {CompanyName: 1 }, {sort: { updatedAt: -1 }})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sales Franchisee Simple List Find Query Error', 'Crm_Customers.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Sales Franchisee Simple List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   // Sales Franchisee View
   exports.SalesFranchisee_View = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Franchisee_Id || ReceivingData.Franchisee_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Sales Franchisee Details can not be empty" });
      }else {
         SalesFranchiseeModel.SalesFranchiseeSchema
            .findOne({'_id': ReceivingData.Franchisee_Id }, {}, {})
            .populate({ path: 'Created_By', select: ['Name'] })
            .populate({ path: 'Last_Modified_By', select: ['Name'] })
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Sales Franchisee Data Find Query Error', 'Crm_Customers.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Sales Franchisee Data!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };