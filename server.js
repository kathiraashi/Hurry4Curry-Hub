var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var ErrorManagement = require('./server/Handling/ErrorHandling.js');

var port = process.env.PORT || 4000;
var app = express();

// Process On Every Error
process.setMaxListeners(0);
process.on('unhandledRejection', (reason, promise) => {
   ErrorManagement.ErrorHandling.ErrorLogCreation('', '', '', reason);
   console.error("'Un Handled Rejection' Error Log File - " + new Date().toLocaleDateString());
});
process.on('uncaughtException', function (err) {
    console.log(err);
    
   ErrorManagement.ErrorHandling.ErrorLogCreation('', '', '', err.toString());
   console.error(" 'Un Caught Exception' Error Log File - " + new Date().toLocaleDateString());
});


// DB Connection
mongoose.connect('mongodb://kathiraashi:kathir143@ds129153.mlab.com:29153/hurry4curry');
mongoose.connection.on('error', function(err) {
   ErrorManagement.ErrorHandling.ErrorLogCreation('', 'Mongodb Connection Error', 'Server.js', err);
});
mongoose.connection.once('open', function() {
   console.log('DB Connectivity, Success!');
});



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Admin
   require('./server/Web/Routes/Admin/AdminManagement.routes.js')(app);
//Franchisee
    require('./server/Web/Routes/Franchisee/Franchisee.route.js')(app);
//Customer
   require('./server/Web/Routes/Customer/Customer.route.js')(app);
// Product
   require('./server/Web/Routes/Product/product.routes.js')(app);
// Settings
   require('./server/Web/Routes/Settings/ProductSettings.routes.js')(app);
   require('./server/Web/Routes/Settings/AccountSettings.routes.js')(app);
// Stock
    require('./server/Web/Routes/Stock/HubStock.routes.js')(app);
// Purchase
    require('./server/Web/Routes/PurchaseBill/HubPurchaseBill.routes.js')(app);
// Bill
    require('./server/Web/Routes/Bill/CustomerBill.routes.js')(app);
// Franchisee Bill
    require('./server/Web/Routes/Bill/FranchiseeBill.routes.js')(app);
// Supplier
    require('./server/Web/Routes/Supplier/Supplier.routes.js')(app);
// Accounts
    require('./server/Web/Routes/Accounts/LogExpenses.routes.js')(app);



app.get('*', function(req, res){
   res.send('This is Server Side Page');
});


app.listen(port, function(){
 console.log('Listening on port ' + port);
});
