var mongoose = require('mongoose');
var Schema = mongoose.Schema;

   // Bank Schema
   var BanksSchema = mongoose.Schema({
      Account_Name: { type : String , required : true},
      Account_No: { type : String , required : true},
      Account_Type: { type : String , required : true},
      Bank_Name: { type : String , required : true},
      IFSC_Code: { type : String , required : true},
      Address: { type : String , required : true},
      If_Default: { type : Boolean , required : true},
      Creator_Type : { type : String , required : true }, //Admin, Hub, Franchisee
      Created_By : { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarBanks = mongoose.model('Banks', BanksSchema, 'Banks');

   // Expense Type Unit of Measure Schema
   var ExpenseTypesSchema = mongoose.Schema({
      Expense_Type: { type : String , required : true},
      Creator_Type : { type : String , required : true }, //Admin, Hub, Franchisee
      Created_By : { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'Hub', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarExpense_Type = mongoose.model('Expense_Type', ExpenseTypesSchema, 'ExpenseType_AccountSettings');


module.exports = {
   BanksSchema : VarBanks,
   ExpenseTypesSchema : VarExpense_Type
};