var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// customer schema

var CustomerSchema = mongoose.Schema({
    Name: { type : String , required : true},
    Phone: { type : String, unique: true, required : true},
    Email: { type : String },
    GSTNo: { type : String },
    Address: { type: String },
    Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
    Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
 );
 var VarCustomer = mongoose.model('Customer' ,CustomerSchema, 'Customer_List');

 module.exports = {
    CustomerSchema : VarCustomer
 };