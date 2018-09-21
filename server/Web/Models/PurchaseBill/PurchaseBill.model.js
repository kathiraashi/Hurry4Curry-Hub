var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchaseBillSchema = mongoose.Schema({
    Supplier_Id: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    PurchaseBill_RefNo: { type: String, unique: true},
    PurchaseBill_Date: { type: String },
    PurchaseBill_Number: {type: String},
    PurchaseBill_Number_Length: {type: Number},
    Net_Amount: {type: String},
    Received: {type: Boolean, require: true},
    UpdateYield: {type: Boolean, require: true},
    Date: {type: Date },
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Created_By : { type: Schema.Types.ObjectId, ref: 'Hub'},
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub'},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },    
    { timestamps : true }
);
var Product_PurchaseBillSchema = mongoose.Schema({
    SupplierBill_Id: {type: Schema.Types.ObjectId, ref: 'Bill'},
    Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' },
    Stock_Id: { type: Schema.Types.ObjectId, ref: 'Hub_Product_Stock'},
    Price: { type: String},
    Quantity: { type: String},
    YieldQty: { type: String },
    WastageQty: { type: String },
    Product_ToTal: {type: String},
    Date: {type: Date },
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Created_By : { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
);

var VarPurchaseBillSchema = mongoose.model('PurchaseBill' ,PurchaseBillSchema, 'PurchaseBillSchema_List');
var VarProduct_PurchaseBillSchema = mongoose.model('Product_PurchaseBill', Product_PurchaseBillSchema, 'Product_PurchaseBillSchema_List');

module.exports = {
    PurchaseBillSchema : VarPurchaseBillSchema,
    Product_PurchaseBillSchema : VarProduct_PurchaseBillSchema
}