var CryptoJS = require("crypto-js");
var StockModel = require('./../../Models/Stock/Stock.model.js');
var FranchiseeModel = require('./../../Models/Franchisee/Franchisee.model.js');
var ProductModel = require('./../../Models/Product/Product.model.js');

var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// Product Name Unique Validate
exports.ProductGroupName_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: "User Name can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      ProductModel.ProductGroupsSchema.findOne({ Name: { $regex : new RegExp("^" + ReceivingData.Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Info Find Query Error', 'Product.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Product Info!."});
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

// Product Create
exports.Product_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: "Name can not be empty" });
   } else if(!ReceivingData.Hsn_Code || ReceivingData.Hsn_Code === '' ) {
      res.status(400).send({Status: false, Message: "Hsn Code can not be empty" });
   } else if(!ReceivingData.UnitOfMeasure && typeof ReceivingData.UnitOfMeasure !== 'object' && Object.keys(ReceivingData.UnitOfMeasure).length <= 0 ) {
      res.status(400).send({Status: false, Message: "Unit Of Measure not be empty" });
   } else {

      if (ReceivingData.UnitOfMeasure && typeof ReceivingData.UnitOfMeasure === 'object' && Object.keys(ReceivingData.UnitOfMeasure).length > 0 ) {
         ReceivingData.UnitOfMeasure = mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure._id);
      }
      if (ReceivingData.Variants_List.length > 0) {
         ReceivingData.Variants_List.map(Obj => {
            Obj.Attribute = mongoose.Types.ObjectId(Obj.Attribute._id);
            return Obj;
         });
      }
      
      var ProductGroup = new ProductModel.ProductGroupsSchema({
         Name: ReceivingData.Name,
         Item: ReceivingData.Item,
         Hsn_Code: ReceivingData.Hsn_Code,
         UnitOfMeasure: ReceivingData.UnitOfMeasure,
         Description: ReceivingData.Description,
         Creator_Type: 'Hub',
         User_Id : null,
         Variants: ReceivingData.Variants_List,
         HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Franchisee_Id: null,
         If_Deleted: false,
         Active_Status : true,
      });
      
      ProductGroup.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Group Creation Query Error', 'Product.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Product!."});
         } else {
            const output = [];
            if (result.Variants.length <= 0) {
               const Obj = {  ProductGroup_Id: mongoose.Types.ObjectId(result._id),
                              Name: result.Name,
                              Name_withAttribute: result.Name,
                              Item: result.Item,
                              Hsn_Code: result.Hsn_Code,
                              UnitOfMeasure: mongoose.Types.ObjectId(result.UnitOfMeasure),
                              Description: result.Description,
                              Creator_Type: 'Hub',
                              User_Id : null,
                              HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id),
                              Franchisee_Id: null,
                              Variants: [],
                              Active_Status: true,
                              If_Deleted: false
                           };
               output.push(Obj);
            } else {
               function* cartesian(head, ...tail) {
                  const remainder = tail.length > 0 ? cartesian(...tail) : [[]];
                  for (let r of remainder) for (let h of head) yield [h, ...r];
               }
               for (let product of cartesian(...result.Variants.map(i => i.Attribute_Values))) {
                  const part = { ProductGroup_Id: mongoose.Types.ObjectId(result._id),
                                 Name: result.Name,
                                 Name_withAttribute: result.Name,
                                 Item: result.Item,
                                 Hsn_Code: result.Hsn_Code,
                                 UnitOfMeasure: mongoose.Types.ObjectId(result.UnitOfMeasure),
                                 Description: result.Description,
                                 Creator_Type: 'Hub',
                                 User_Id : null,
                                 HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id),
                                 Franchisee_Id: null,
                                 Variants: [],
                                 Active_Status: true,
                                 If_Deleted: false };
                  let i = 0;
                  for (i = 0; i < product.length; i++) {
                     part.Name_withAttribute = part.Name_withAttribute + ' ' + product[i];
                     const Obj = { Attribute: mongoose.Types.ObjectId(result.Variants[i].Attribute),
                                    Attribute_Value: product[i],
                                 };
                        part.Variants.push(Obj);
                  }
                  output.push(part);
               }
            }
            ProductModel.ProductsSchema.collection.insert(output, function(err_1, result_1){
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Creation Query Error', 'Product.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Product!."});
               } else {
                  res.status(200).send({Status: true, Message: 'New Product Successfully Created', return: result_1 });
               }
            });

         }
      });
   }
};

// Product List
exports.Product_List = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {

         ProductModel.ProductsSchema
            .find({ If_Deleted: false, $or: [ { Creator_Type: 'Admin' }, 
                                                { HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id) }
                                             ] }, {}, {sort: { ProductGroup_Id: -1 }}) 
            .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
            .populate({ path: 'Variants.Attribute', select: ['Product_Variant'] })
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product List Find Query Error', 'Product.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Product List!."});
            } else {
               const FindStock = (result) => Promise.all(
                     result.map( obj => CurrentStock(obj) )
               ).then(response => {
                     var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(response), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                     res.status(200).send({Status: true, Response: ReturnData });
               });
   
               const CurrentStock = (info) => Promise.all([
                     StockModel.StockSchema.findOne({ Product_Id: info._id})
               ]).then(response => {
                     info = JSON.parse(JSON.stringify(info));
                     if (response[0] !== null ) {
                           info.Current_Quantity = response[0].Current_Quantity;
                           info.Stock_Id = response[0]._id;
                     } else{
                           info.Current_Quantity = 0;
                           info.Stock_Id = '';
                     }
                     return info;
               });
               FindStock(result);
            }
         });
   }
};
