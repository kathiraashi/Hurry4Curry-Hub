var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HubStockSchema = mongoose.Schema({
      Product_Id: { type: Schema.Types.ObjectId, ref: 'Products'},
      Current_Quantity: { type: Number, require: true},
      UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
      HubUser_Id: { type : Schema.Types.ObjectId, ref: 'Hub' },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);

var HubStockHistorySchema = mongoose.Schema({
      HubProduct_Stock_Id: {type: Schema.Types.ObjectId, ref: 'Hub_Product_Stock'},
      Product_Id: {type: Schema.Types.ObjectId, ref: 'Products'},
      Previous_Quantity: { type: String, require: true},
      Current_Quantity: { type: String, require: true },
      Added_Quantity: { type: Number },
      Removed_Quantity: { type: Number },
      Reference_Id: { type: String },
      History_From: { type: String, required: true}, // Customer_Bill, Wastage, Direct_Update, Purchase_Receive
      UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
      HubUser_Id: { type: Schema.Types.ObjectId, ref: 'Hub'},
      Active_Status: { type: Boolean, require: true},
      If_Deleted: { type: Boolean, require: true}
   },
   { timestamps: true }
);

var VarHubStockSchema = mongoose.model('Hub_Product_Stock', HubStockSchema, 'Hub_Product_Stock');
var VarHubStockHistorySchema = mongoose.model('Hub_Product_Stock_History', HubStockHistorySchema, 'Hub_Product_Stock_History');

module.exports = {
   HubStockSchema : VarHubStockSchema,
   HubStockHistorySchema : VarHubStockHistorySchema
};