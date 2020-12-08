module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUserList(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM `UserList`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user  = results;
            complete();
        });
    }

    function getUser(res, mysql, context, id, complete){
        var sql = "SELECT * FROM UserList WHERE User_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user = results[0];
            complete();
        });
    }

    /*Display all users. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        console.log('displaying all users');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteuser.js"];
        var mysql = req.app.get('mysql');
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('userlist', context);
            }

        }
    });
    
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO UserList (User_name, User_email, Address, Password) VALUES (?,?,?,?)";
        var inserts = [req.body.User_name, req.body.User_email, req.body.Address, req.body.Password];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/userlist');
            }
        });
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateuser.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-user', context);
            }
        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "UPDATE UserList SET User_name=?, User_email=?, Address=?, Password=? WHERE User_ID=?";
        var inserts = [req.body.User_name, req.body.User_email, req.body.Address, req.body.Password, req.params.id];
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
        var sql = "DELETE FROM Cart WHERE User_ID = ?;";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })
        sql = "DELETE FROM User_Order_Book WHERE User_ID = ?;";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })
        
        sql = "DELETE FROM OrderList WHERE Buyer_ID = ?;";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })

        sql = "DELETE FROM BookList WHERE Owner_ID = ?;";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })

        sql = "DELETE FROM UserList WHERE User_ID = ?;";
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
