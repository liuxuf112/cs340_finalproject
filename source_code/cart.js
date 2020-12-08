module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCart(res, mysql, context, complete){
        mysql.pool.query("SELECT Cart.User_ID, Cart.Book_ID, User_name as User, Book_name as Book FROM Cart INNER JOIN BookList on Cart.Book_ID = BookList.Book_ID INNER JOIN UserList ON Cart.User_ID = UserList.User_ID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.cart  = results;
            complete();
        });
    }

    function getBookList(res, mysql, context, complete){
        mysql.pool.query("SELECT Book_ID, Book_name FROM BookList", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book  = results;
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
    /*Display all cart. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        console.log('displaying all carts');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecart.js"];
        var mysql = req.app.get('mysql');
        getCart(res, mysql, context, complete);
        getBookList(res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('cart', context);
            }

        }
    });

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Cart (User_ID, Book_ID) VALUES (?,?)";
        var inserts = [req.body.User_ID, req.body.Book_ID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/cart');
            }
        });
    });
    
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatecart.js"];
        var mysql = req.app.get('mysql');
        getBook(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-cart', context);
            }
        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "UPDATE Cart SET User_ID=?, Book_ID=? WHERE User_ID=?";
        var inserts = [req.body.User_ID, req.body.Book_ID, req.params.id];
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
    
    router.delete('/:user_ID/:book_ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Cart WHERE User_ID = ? AND Book_ID = ?";
        var inserts = [req.params.user_ID, req.params.book_ID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
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