var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Product Variant Schema
   var ProductVariantsSchema = mongoose.Schema({
      Product_Variant: { type : String , required : true},
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarProductVariants = mongoose.model('ProductVariants', ProductVariantsSchema, 'Product_Variants');

   // Product Unit of Measure Schema
   var ProductUnitOfMeasuresSchema = mongoose.Schema({
      Product_UnitOfMeasure: { type : String , required : true},
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarProductUnitOfMeasures = mongoose.model('ProductUnitOfMeasures', ProductUnitOfMeasuresSchema, 'Product_UnitOfMeasures');

      
module.exports = {
   ProductVariantsSchema : VarProductVariants,
   ProductUnitOfMeasuresSchema : VarProductUnitOfMeasures,
};