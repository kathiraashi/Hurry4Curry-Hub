var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Franchisee schema
   var SalesFranchiseeSchema = mongoose.Schema({
      Name: { type : String , required : true},
      PhoneNumber: { type : String },
      EmailAddress: { type : String },
      Website: { type : String },
      GSTNo: { type : String },
      Image: { type : Object },
      BillingAddress: { Street: { type : String },
                        Area: { type : String },
                        ZipCode: { type : String },
                        Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                    Country_Name: { type : String } },
                        State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                 State_Name: { type : String } },
                        City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                 City_Name: { type : String } } },
      SameAddresses: { type : Boolean },
      ShopFloorAddress: {  Street: { type : String },
                           Area: { type : String },
                           ZipCode: { type : String },
                           Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                       Country_Name: { type : String } },
                           State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                    State_Name: { type : String } },
                           City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                    City_Name: { type : String } } },
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarSalesFranchisee = mongoose.model( 'SalesFranchisee' ,SalesFranchiseeSchema, 'Sales_Franchisee');

   module.exports = {
      SalesFranchiseeSchema : VarSalesFranchisee
   };