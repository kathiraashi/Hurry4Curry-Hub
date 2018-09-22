var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HubCustomer_BillSchema = mongoose.Schema({
   Customer_Id: { type: Schema.Types.ObjectId, ref: 'Customer' },
   Bill_Number: { type : String },
   Bill_Number_Length: { type: Number},
   Bill_Date: { type : Date },
   Net_Amount: {type: String},
   Payment_Method: {type: String},
   Reference_Number: { type: String },
   Date: {type: Date },
   Created_By : { type: Schema.Types.ObjectId, ref: 'Hub'},
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub'},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);
 var VarHubCustomer_Bills = mongoose.model('HubCustomer_Bills' ,HubCustomer_BillSchema, 'HubCustomer_Bills');

 var HubCustomerBill_ProductSchema = mongoose.Schema({
    CustomerBill_Id: {type: Schema.Types.ObjectId, ref: 'HubCustomer_Bills'},
    Product_Id: { type: Schema.Types.ObjectId, ref: 'Products' },
    Price: { type: String},
    Quantity: { type: String},
    Product_Total: {type: String},
    UnitOfMeasure: { type : Schema.Types.ObjectId, ref: 'ProductUnitOfMeasures' },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
);
var VarHubCustomerBill_Products = mongoose.model('HubCustomerBill_Products', HubCustomerBill_ProductSchema, 'HubCustomerBill_Products_List');

 module.exports = {
   HubCustomer_BillSchema : VarHubCustomer_Bills,
   HubCustomerBill_ProductSchema : VarHubCustomerBill_Products
 };