module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBookList(res, mysql, context, complete){
        mysql.pool.query("SELECT Book_ID, Category, Book_name, User_name AS Owner, Prize, On_Sell FROM BookList INNER JOIN UserList ON BookList.Owner_ID = UserList.User_ID", function(error, results, fields){
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

    function getBook(res, mysql, context, id, complete){
        var sql = "SELECT * FROM BookList WHERE Book_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results[0];
            complete();
        });
    }
    function getBookbyAuthor(req, res, mysql, context, complete){
        var sql = "SELECT BookList.Book_ID, Category, Book_name, User_name AS Owner, Prize, On_Sell FROM BookList INNER JOIN UserList ON BookList.Owner_ID = UserList.User_ID INNER JOIN Book_Author ON BookList.Book_ID = Book_Author.Book_ID INNER JOIN AuthorList ON Book_Author.Author_ID = AuthorList.Author_ID WHERE AuthorList.Name Like ?";
        var inserts = ['%'+req.params.authorname+'%'];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }

    function getBookbyName(req, res, mysql, context, complete){
        var sql = "SELECT Book_ID, Category, Book_name, User_name AS Owner, Prize, On_Sell FROM BookList INNER JOIN UserList ON BookList.Owner_ID = UserList.User_ID WHERE Book_name LIKE ?";
        var inserts = ['%'+req.params.bookname+'%'];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }

    function getBookbyCategory(req, res, mysql, context, complete){
        var sql = "SELECT Book_ID, Category, Book_name, User_name AS Owner, Prize, On_Sell FROM BookList INNER JOIN UserList ON BookList.Owner_ID = UserList.User_ID WHERE Category = ?";
        var inserts = [req.params.category];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book = results;
            complete();
        });
    }
    
    /*Display all books. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        console.log('displaying all books');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js", "filter.js"];
        var mysql = req.app.get('mysql');
        getBookList(res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('booklist', context);
            }

        }
    });

    router.get('/filter/author/:authorname', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js","filter.js"];
        var mysql = req.app.get('mysql');
        getBookbyAuthor(req,res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('booklist', context);
            }

        }
    });

    router.get('/filter/name/:bookname', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js","filter.js"];
        var mysql = req.app.get('mysql');
        getBookbyName(req,res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('booklist', context);
            }

        }
    });

    router.get('/filter/category/:category', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook.js","filter.js"];
        var mysql = req.app.get('mysql');
        getBookbyCategory(req,res, mysql, context, complete);
        getUserList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('booklist', context);
            }

        }
    });
    
    //insert a book (create)
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO BookList (Category, Book_name, Owner_ID, Prize, On_Sell) VALUES (?,?,?,?,?)";
        var inserts = [req.body.Category, req.body.Book_name, req.body.Owner_ID, req.body.Prize, req.body.On_Sell];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/booklist');
            }
        });
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatebook.js"];
        var mysql = req.app.get('mysql');
        getBook(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-book', context);
            }
        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "UPDATE BookList SET Category=?, Book_name=?, Owner_ID=?, Prize=?, On_Sell=? WHERE Book_ID=?";
        var inserts = [req.body.Category, req.body.Book_name, req.body.Owner_ID, req.body.Prize, req.body.On_Sell, req.params.id];
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
        var sql = "DELETE FROM Cart WHERE Book_ID = ?;";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })
        sql = "DELETE FROM User_Order_Book WHERE Book_ID = ?;";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })
        sql = "DELETE FROM Book_Author WHERE Book_ID = ?;";
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })
        sql = "DELETE FROM BookList WHERE Book_ID = ?;";
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
