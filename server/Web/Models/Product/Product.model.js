var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Product Schema
   var ProductGroupsSchema = mongoose.Schema({
         Name: { type : String , required : true, unique: true},
         Item: { type : String },
         Hsn_Code: { type : String },
         UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
         Description: { type : String },
         CreatedBy: { type : String },
         Variants: [{
            Attribute: { type : Schema.Types.ObjectId, ref: 'ProductVariants' },
            Attribute_Values: { type : Array },
         }],
         User_Id: { type : Schema.Types.ObjectId, ref: 'User_Management' },
         HubUser_Id: { type : Schema.Types.ObjectId, ref: 'Hub' },
         Franchisee_Id: { type : Schema.Types.ObjectId },
         Active_Status: { type : Boolean , required : true},
         If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarProductGroups = mongoose.model('ProductGroups', ProductGroupsSchema, 'Product_Groups');


// Product With Variants Schema
   var ProductsSchema = mongoose.Schema({
      Product_Id: { type : Schema.Types.ObjectId, ref: 'ProductGroups' },
      Name: { type : String , required : true},
      Name_withAttribute: { type : String , required : true},
      Item: { type : String },
      Hsn_Code: { type : String },
      UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
      Description: { type : String },
      Variants: [{
         Attribute: { type : Schema.Types.ObjectId, ref: 'ProductVariants'},
         Attribute_Value: { type : String}
      }],
      CreatedBy: { type : String },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarProductsSchema = mongoose.model('Products', ProductsSchema, 'Products');

module.exports = {
   ProductGroupsSchema : VarProductGroups,
   ProductsSchema : VarProductsSchema
};
