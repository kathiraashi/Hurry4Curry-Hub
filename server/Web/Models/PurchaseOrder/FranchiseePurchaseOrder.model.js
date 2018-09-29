var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseOrderSchema = mongoose.Schema({
    Hub_Id: { type: Schema.Types.ObjectId, ref: 'Hub' },
    Franchisee_Id: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    PurchaseRequest_RefNo: { type: String, unique: true},
    PurchaseRequest_Date: { type: Date },
    Expected_Date: { type: Date },
    Current_Status: {type: String},
    DeliverCurrent_Status: {type: String },
    Created_By : { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },    
    { timestamps : true }
);

var PurchaseOrder_ProductsSchema = mongoose.Schema({
   PurchaseRequest_Id: { type: Schema.Types.ObjectId, ref: 'PurchaseRequest' },
   Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' },
   Requested_Quantity: { type: String, required: true},
   UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
   Created_By : { type: Schema.Types.ObjectId, ref: 'Franchisee', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Franchisee', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);

var VarPurchaseOrderSchema = mongoose.model('PurchaseOrder' , PurchaseOrderSchema, 'PurchaseOrderSchema_List');
var VarPurchaseOrder_ProductsSchema = mongoose.model('PurchaseOrder_Products', PurchaseOrder_ProductsSchema, 'PurchaseOrder_ProductsSchema_List');

module.exports = {
    PurchaseOrderSchema : VarPurchaseOrderSchema,
    PurchaseOrder_ProductsSchema : VarPurchaseOrder_ProductsSchema
}