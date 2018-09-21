var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = mongoose.Schema({
    Customer_Name: { type : String, required: true },
    Phone_Number: { type: String },
    Bill_Number: { type : String },
    Bill_Number_Length: { type: Number},
    Bill_Date: { type : String },
    Net_Amount: {type: String},
    Payment_Method: {type: String},
    Reference_Number: { type: String },
    Date: {type: Date },
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Customer_Id: { type:Schema.Types.ObjectId },
    Created_By : { type: Schema.Types.ObjectId, ref: 'Hub'},
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub'},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
 );
 var VarBillSchema = mongoose.model('Bill' ,BillSchema, 'Bill_List');

 var Product_BillSchema = mongoose.Schema({
    CustomerBill_Id: {type: Schema.Types.ObjectId, ref: 'Bill'},
    Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' },
    Price: { type: String},
    Quantity: { type: String},
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
var VarProduct_BillSchema = mongoose.model('Product_Bill', Product_BillSchema, 'Product_Bill_List');
 module.exports = {
    BillSchema : VarBillSchema,
    Product_BillSchema : VarProduct_BillSchema
 };