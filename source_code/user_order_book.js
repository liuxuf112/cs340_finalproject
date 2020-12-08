module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUser_Order_Book(res, mysql, context, complete){
        mysql.pool.query("SELECT User_Order_Book.User_ID, User_Order_Book.Order_ID, User_Order_Book.Book_ID, User_name as User, Order_ID, Book_name as Book FROM User_Order_Book INNER JOIN UserList on User_Order_Book.User_ID = UserList.User_ID INNER JOIN BookList ON User_Order_Book.Book_ID = BookList.Book_ID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user_order_book  = results;
            complete();
        });
    }

    function getUserList(res, mysql, context, complete){
        mysql.pool.query("SELECT User_ID, User_name FROM UserList", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user  = results;
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

    /*Display all user_order_book. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        console.log('displaying all user_order_book');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteu_o_b.js"];
        var mysql = req.app.get('mysql');
        getUser_Order_Book(res, mysql, context, complete);
        getBookList(res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('user_order_book', context);
            }

        }
    });
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO User_Order_Book (User_ID, Order_ID, Book_ID) VALUES (?,?,?)";
        var inserts = [req.body.User_ID, req.body.Order_ID, req.body.Book_ID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/user_order_book');
            }
        });
    });
    
    router.delete('/:user_ID/:order_ID/:book_ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM User_Order_Book WHERE User_ID = ? AND Order_ID = ? AND Book_ID";
        var inserts = [req.params.user_ID, req.params.order_ID, req.params.book_ID];
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
