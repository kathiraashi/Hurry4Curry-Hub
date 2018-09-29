var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HubFranchisee_BillSchema = mongoose.Schema({
   Franchisee_Id: { type: Schema.Types.ObjectId, ref: 'Franchisee' },
   Bill_Number: { type : String },
   Bill_Number_Length: { type: Number},
   Bill_Date: { type : Date },
   Net_Amount: {type: String},
   Payment_Method: {type: String},
   Reference_Number: { type: String },
   Payment_Status: { type: String },
   Payment_Date: { type: Date },
   Date: {type: Date },
   Created_By : { type: Schema.Types.ObjectId, ref: 'Hub'},
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub'},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);
 var VarHubFranchisee_Bills = mongoose.model('HubFranchisee_Bills' ,HubFranchisee_BillSchema, 'HubFranchisee_Bills');

 var HubFranchiseeBill_ProductSchema = mongoose.Schema({
   FranchiseeBill_Id: {type: Schema.Types.ObjectId, ref: 'HubFranchisee_Bills'},
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
var VarHubFranchiseeBill_Products = mongoose.model('HubFranchiseeBill_Products', HubFranchiseeBill_ProductSchema, 'HubFranchiseeBill_Products_List');

module.exports = {
   HubFranchisee_BillSchema : VarHubFranchisee_Bills,
   HubFranchiseeBill_ProductSchema : VarHubFranchiseeBill_Products
};