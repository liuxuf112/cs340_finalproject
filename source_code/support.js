module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
        console.log('displaying all carts');
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        res.render('support');
    });
    return router;
}();
