var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HubPurchaseBillSchema = mongoose.Schema({
    Supplier_Id: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    PurchaseBill_RefNo: { type: String, unique: true},
    PurchaseBill_Date: { type: Date },
    PurchaseBill_Number: {type: String},
    PurchaseBill_Number_Length: {type: Number},
    Payment_Status: {type: String},
    Net_Amount: {type: String},
    If_Received: {type: Boolean, require: true},
    If_YieldUpdated: {type: Boolean, require: true},
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Created_By : { type: Schema.Types.ObjectId, ref: 'Hub'},
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub'},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },    
    { timestamps : true }
);

var HubPurchaseBill_ProductsSchema = mongoose.Schema({
   HubPurchaseBill_Id: { type: Schema.Types.ObjectId, ref: 'HubPurchaseBills' },
   Stock_Id: { type: Schema.Types.ObjectId, ref: 'Hub_Product_Stock' }, 
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' }, 
   Price: { type: Number},
   Quantity: { type: Number},
   If_YieldUpdated: {type: Boolean, require: true},
   YieldQty: { type: Number },
   WastageQty: { type: Number },
   Product_Total: {type: Number},
   YieldUpdate_Date: { type: Date },
   UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
   Created_By : { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);

var VarHubPurchaseBillsSchema = mongoose.model('HubPurchaseBills' ,HubPurchaseBillSchema, 'HubPurchaseBills_List');
var VarHubPurchaseBill_ProductsSchema = mongoose.model('HubPurchaseBill_Products', HubPurchaseBill_ProductsSchema, 'HubPurchaseBill_Products_List');

module.exports = {
   HubPurchaseBillSchema : VarHubPurchaseBillsSchema,
   HubPurchaseBill_ProductsSchema : VarHubPurchaseBill_ProductsSchema
}