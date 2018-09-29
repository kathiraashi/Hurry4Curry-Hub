var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// CashRegister schema
var Hub_CashRegisterSchema = mongoose.Schema({
    Amount: { type : String, required : true },
    Date: { type : Date, required : true },
    Type: { type : String, required : true }, // Debit, Credit
    Reference_Id: { type : String, required : true },
    Reference_Type: { type : String, required : true }, // CustomerBill_Credit, FranchiseeBill_Credit, LogExpense_Debit, PurchaseBill_Debit
    Available_Amount: { type : String, required : true },
    Created_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true},
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
 );

 var VarHub_CashRegister = mongoose.model('Hub_CashRegister' ,Hub_CashRegisterSchema, 'Hub_CashRegister');

 module.exports = {
   Hub_CashRegisterSchema : VarHub_CashRegister
 };