var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeliverProductsSchema = mongoose.Schema({
    Hub_Id: { type: Schema.Types.ObjectId, ref: 'Hub' },
    Franchisee_Id: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    PurchaseRequest_Id: {type: Schema.Types.ObjectId, ref: 'PurchaseRequest'},
    PurchaseRequest_RefNo: { type: String, unique: true},
    PurchaseRequest_Date: { type: Date },
    Expected_Date: { type: Date },
    Delivered_Date: { type: Date},
    HubCurrent_Status: {type: String},
    FranchiseeCurrent_Status: {type: String},
    Created_By : { type: Schema.Types.ObjectId, ref: 'Hub'},
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub'},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },    
    { timestamps : true }
);

var DeliverProducts_ProductsSchema = mongoose.Schema({
    DeliverProducts_Id: { type: Schema.Types.ObjectId, ref: 'FranchiseeReceiveProducts'},
    Hub_Id: { type: Schema.Types.ObjectId, ref: 'Hub' },
    Franchisee_Id: { type: Schema.Types.ObjectId, ref: 'Franchisee'},
    PurchaseRequest_Id: { type: Schema.Types.ObjectId, ref: 'PurchaseRequest' },
    Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' }, 
    Deliver_Quantity: { type: String, required: true},
    Requested_Quantity: { type: String, required: true},
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Created_By : { type: Schema.Types.ObjectId, ref: 'Franchisee', required : true },
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Franchisee', required : true },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
);

var VarDeliverProductsSchema = mongoose.model('FranchiseeReceiveProducts', DeliverProductsSchema, 'FranchiseeReceiveProducts_List');
var VarDeliverProducts_ProductsSchema = mongoose.model('FranchiseeReceiverProducts_Products', DeliverProducts_ProductsSchema, 'FranchiseeReceiverProducts_Products_List');

module.exports = {
    DeliverProductsSchema: VarDeliverProductsSchema,
    DeliverProducts_ProductsSchema: VarDeliverProducts_ProductsSchema
}