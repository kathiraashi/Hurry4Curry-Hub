var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BankRegister schema
var Hub_BankRegisterSchema = mongoose.Schema({
   Bank: { type: Schema.Types.ObjectId, ref: 'Banks', required : true},
   Amount: { type : String, required : true },
   Date: { type : Date, required : true },
   Type: { type : String, required : true }, // Debit, Credit
   ReferenceNumber: { type : String },
   Reference_Id: { type : String, required : true },
   Reference_Type: { type : String, required : true }, // CustomerBill_Credit, FranchiseeBill_Credit, LogExpense_Debit, PurchaseBill_Debit
   Available_Amount: { type : String, required : true },
   Created_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
 );

 var VarHub_BankRegister = mongoose.model('Hub_BankRegister' ,Hub_BankRegisterSchema, 'Hub_BankRegister');

 module.exports = {
   Hub_BankRegisterSchema : VarHub_BankRegister
 };