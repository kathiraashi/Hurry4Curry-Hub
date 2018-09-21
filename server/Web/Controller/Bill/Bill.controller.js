var CryptoJS = require("crypto-js");
var BillModel = require('./../../Models/Bill/Bill.model.js');
var StockModel = require('./../../Models/Stock/Stock.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');

// create bill
exports.Bill_Create = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
     } 
     else if(!ReceivingData.CustomerName['Name'] || ReceivingData.CustomerName['Name'] === '' ) {
        res.status(400).send({Status: false, Message: "Customer Name can not be empty" });
     }
     else if(!ReceivingData.BillDate || ReceivingData.BillDate === '' ) {
        res.status(400).send({Status: false, Message: "Bill date can not be empty" });
     } 
     else{
         BillModel.BillSchema.find({},{Bill_Number_Length: 1},{sort:{Bill_Number_Length: -1}, limit: 1})
         .exec(function(Billerr, Billresult){
             if(Billerr){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill Creation Query Error', 'Bill.controller.js', err);
                res.status(400).send({Status: false, Message: "Some error occurred while creating the Bill!."});
             }
             else {
                 var number = 1;
                 if(Billresult.length > 0){
                     number = Billresult[0].Bill_Number_Length + 1;
                 }
                 const Bill_Last_Number = number.toString().padStart(4, 0);
                 const BillNumber = "BILL" + Bill_Last_Number;

                 var Bill = new BillModel.BillSchema({
                    Customer_Id: ReceivingData.CustomerName._id,
                    Customer_Name: ReceivingData.CustomerName.Name,
                    Phone_Number: ReceivingData.CustomerName.Phone,
                    Bill_Number: BillNumber,
                    Bill_Number_Length: Bill_Last_Number,
                    Bill_Date: ReceivingData.BillDate,
                    Net_Amount: ReceivingData.Net_Amount,
                    Payment_Method: ReceivingData.PaymentType.paymentType,
                    Reference_Number: ReceivingData.ReferenceNumber,
                    Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Date: ReceivingData.Date,
                    If_Deleted: false,
                    Active_Status : ReceivingData.Active_Status || true,
                });
                Bill.save(function(err, result) {
                   if(err) {
                      ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill Creation Query Error', 'Bill.controller.js', err);
                      res.status(400).send({Status: false, Message: "Some error occurred while creating the Bill!."});
                   } else {
                       const itemArray = ReceivingData.items.map(obj => {
                                           const newObj = {
                                               CustomerBill_Id: result._id,
                                               Product_Id: mongoose.Types.ObjectId(obj.Product.Product_Id._id),
                                               Price: obj.Price,
                                               Quantity: obj.Quantity,
                                               Product_Total: obj.Product_Total
                                           }             
                                           return newObj;
                                       });
       
                       BillModel.Product_BillSchema.collection.insert(itemArray, function(err_1, result_1){
                           if(err_1) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Creation Query Error', 'Product.controller.js', err_1);
                              res.status(400).send({Status: false, Message: "Some error occurred while creating the Product!."});
                           } else {
                               
                               const List = ReceivingData.items;

                               const UpdateStock = (List) => Promise.all(
                                    List.map( obj => UpdateAll(obj) )
                               ).then(response => {
                                    var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                                   ReturnData = ReturnData.toString();
                                   res.status(200).send({Status: true, Message: 'New Bill Successfully Created' });
                               });

                               const UpdateAll = (info) => Promise.all([
                                    StockModel.StockSchema.update(
                                        { Product_Id: info.Product.Product_Id._id}, 
                                        { $set: {Current_Quantity: parseInt(info.Product.Current_Quantity) - parseInt(info.Quantity) }}
                                    ),
                                    StockModel.StockHistorySchema.create([{
                                        HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                        Product_Id: mongoose.Types.ObjectId(info.Product.Product_Id._id),
                                        Previous_Quantity:  parseInt(info.Product.Current_Quantity),
                                        Current_Quantity:  parseInt(info.Product.Current_Quantity) - parseInt(info.Quantity),
                                        Removed_Quantity: parseInt(info.Quantity),
                                        UnitOfMeasure: mongoose.Types.ObjectId(info.Product.UnitOfMeasure._id),
                                        Date: info.Date,
                                        Active_Status: true,
                                        If_Deleted: false
                                    }])
                               ]).then(response => {
                                    return response;
                               });

                               UpdateStock(List);

                           }
                        });
                       
                      
                   }
                });
             }
         });
         
     }
};

//Bill List
exports.Bill_List = function(req, res){
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

    if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
        res.status(400).send({Status: false, Message: "User Details can not be empty" });
     }else{
         BillModel.BillSchema.find({ If_Deleted: false}, {}, {})
         .populate({path: 'Created_By', select:['Name']})
         .populate({ path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
         .exec(function(err, result){
            if(err) {
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill List Find Query Error', 'Bill.controller.js', err);
                res.status(417).send({status: false, Message: "Some error occurred while Find The Bill List!."});
             } else {
                var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                ReturnData = ReturnData.toString();
                res.status(200).send({Status: true, Response: ReturnData });
             }
         });
     }
};