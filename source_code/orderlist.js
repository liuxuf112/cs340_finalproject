module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrderList(res, mysql, context, complete){
        mysql.pool.query("SELECT Order_ID, Order_date, Order_cost, Payment, User_name as Buyer FROM `OrderList` INNER JOIN UserList ON OrderList.Buyer_ID = UserList.User_ID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order  = results;
            complete();
        });
    }

    function getUserList(res, mysql, context, complete){
        mysql.pool.query("SELECT User_ID, User_name FROM `UserList`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user  = results;
            complete();
        });
    }

    function getOrder(res, mysql, context, id, complete){
        var sql = "SELECT * FROM OrderList WHERE Order_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results[0];
            complete();
        });
    }
    /*Display all orders. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        console.log('displaying all orders');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteorder.js"];
        var mysql = req.app.get('mysql');
        getOrderList(res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('orderlist', context);
            }

        }
    });
    
    
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO OrderList (Order_cost, Order_date, Buyer_ID, Payment) VALUES (?,?,?,?)";
        var inserts = [req.body.Order_cost, req.body.Order_date, req.body.Buyer_ID, req.body.Payment];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orderlist');
            }
        });
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateorder.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-order', context);
            }
        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "UPDATE OrderList SET Order_cost=?, Order_date=?, Buyer_ID=?, Payment=? WHERE Order_ID=?";
        var inserts = [req.body.Order_cost, req.body.Order_date, req.body.Buyer_ID, req.body.Payment, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    
    
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM User_Order_Book WHERE Order_ID = ?;";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })

        sql = "DELETE FROM OrderList WHERE Order_ID = ?;";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
