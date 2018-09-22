var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LogExpenses schema
var HubLogExpensesSchema = mongoose.Schema({
   Expenses_Type: { type: Schema.Types.ObjectId, ref: 'Expense_Type', required : true},
   Expenses: { type : String, required : true},
   Date: { type : Date, required : true },
   Amount: { type : Number, required : true },
   Current_Status: { type: String, required : true },
   Status_Position: { type: String, required : true },
   Status_UpdatedDate: { type : Date },
   Created_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
    },
    { timestamps : true }
 );
 var VarHub_LogExpenses = mongoose.model('Hub_LogExpenses' ,HubLogExpensesSchema, 'Hub_LogExpenses');

 module.exports = {
   HubLogExpensesSchema : VarHub_LogExpenses
 };