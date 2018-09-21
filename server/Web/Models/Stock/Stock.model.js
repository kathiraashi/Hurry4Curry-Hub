var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = mongoose.Schema({
    Product_Id: { type: Schema.Types.ObjectId, ref: 'Products'},
    Current_Quantity: { type: String, require: true},
    Date: {type: Date, require: true },
    HubUser_Id: { type : Schema.Types.ObjectId, ref: 'Hub' },
    Active_Status: { type : Boolean , required : true},
    If_Deleted: { type : Boolean , required : true }
 },
 { timestamps: true }
);

var StockHistorySchema = mongoose.Schema({
    Product_Id: {type: Schema.Types.ObjectId, ref: 'Products'},
    Previous_Quantity: { type: String, require: true},
    Current_Quantity: { type: String, require: true },
    Total_Quantity: { type: String, require: true },
    Date: {type: Date, require: true },
    HubUser_Id: { type: Schema.Types.ObjectId, ref: 'Hub'},
    Active_Status: { type: Boolean, require: true},
    If_Deleted: { type: Boolean, require: true}
    },
    { timestamps: true}
);

var VarStockSchema = mongoose.model('Hub_Product_Stock', StockSchema, 'Hub_Product_Stock');
var VarStockHistorySchema = mongoose.model('Hub_Product_Stock_History', StockHistorySchema, 'Hub_Product_Stock_History');

module.exports = {
    StockSchema : VarStockSchema,
    StockHistorySchema : VarStockHistorySchema
};