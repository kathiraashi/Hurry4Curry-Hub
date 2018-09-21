module.exports = function(app) {

    var Controller = require('./../../Controller/Franchisee/Franchisee.controller.js');
 
    app.post('/API/Franchisee/Franchisee_UserName_AsyncValidate', Controller.Franchisee_UserName_AsyncValidate);
    app.post('/API/Franchisee/Franchisee_PhoneNumber_AsyncValidate', Controller.Franchisee_PhoneNumber_AsyncValidate);
 
    app.post('/API/Franchisee/Franchisee_Create', Controller.Franchisee_Create);
    app.post('/API/Franchisee/Franchisee_List', Controller.Franchisee_List);
    app.post('/API/Franchisee/Franchisee_View', Controller.Franchisee_View);
    app.post('/API/Franchisee/Franchisee_Update', Controller.Franchisee_Update);
    app.post('/API/Franchisee/Franchisee_Edit', Controller.Franchisee_List);
 };