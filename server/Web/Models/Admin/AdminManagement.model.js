var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserManagementSchema = mongoose.Schema({
   User_Name: { type : String , unique: true, required : true },
   User_Password: { type : String, required : true,  },
   Name: { type : String , required : true },
   Phone : { type : String},
   Email: { type : String , required : true },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);

// Hub schema
var HubSchema = mongoose.Schema({
   Name: { type : String , required : true},
   User_Name: { type : String , unique: true, required : true},
   User_Password: { type : String , required : true},
   Phone: { type : String, unique: true, required : true},
   Email: { type : String },
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
                        City: { _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                 City_Name: { type : String } } },
   Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps : true }
);

var CountrySchema = mongoose.Schema({
   Continent_GeoNameId: { type : Number },
   Country_GeoNameId: { type : Number },
   Country_Code: { type : String },
   Country_Name: { type : String },
   Country_Lat: { type : String },
   Country_Lng: { type : String },
});

var StateSchema = mongoose.Schema({
   State_GeoNameId: { type : Number },
   State_Name: { type : String },
   State_Lat: { type : String },
   State_Lng: { type : String },
   Country_GeoNameId: { type : Number },
   Country_DatabaseId: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
});

var CitySchema = mongoose.Schema({
   City_GeoNameId: { type : Number },
   City_Name: { type : String },
   City_Lat: { type : String },
   City_Lng: { type : String },
   Country_GeoNameId: { type : Number },
   State_GeoNameId: { type : Number },
   Country_DatabaseId: [{ type: Schema.Types.ObjectId, ref: 'Global_Country' }],
   State_DatabaseId: [{ type: Schema.Types.ObjectId, ref: 'Global_State' }],
});


var VarUser_Management = mongoose.model('User_Management', UserManagementSchema, 'User_Management');
var VarHub = mongoose.model('Hub' ,HubSchema, 'Hub_List');
var VarGlobal_Country = mongoose.model('Global_Country', CountrySchema, 'Global_Country');
var VarGlobal_State = mongoose.model('Global_State', StateSchema, 'Global_State');
var VarGlobal_City = mongoose.model('Global_City', CitySchema, 'Global_City');

module.exports = {
   User_Management : VarUser_Management,
   HubSchema : VarHub,
   Global_Country : VarGlobal_Country,
   Global_State : VarGlobal_State,
   Global_City : VarGlobal_City
};