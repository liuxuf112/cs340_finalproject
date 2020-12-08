module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBook_Author(res, mysql, context, complete){
        mysql.pool.query("SELECT Book_Author.Book_ID, Book_Author.Author_ID, Name AS Author, Book_name AS Book FROM Book_Author INNER JOIN BookList ON Book_Author.Book_ID = BookList.Book_ID INNER JOIN AuthorList on Book_Author.Author_ID = AuthorList.Author_ID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.book_author  = results;
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

    function getAuthorList(res, mysql, context, complete){
        mysql.pool.query("SELECT Author_ID, Name FROM AuthorList", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.author  = results;
            complete();
        });
    }
    /*Display all book_author. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        console.log('displaying all book_author');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletebook_author.js"];
        var mysql = req.app.get('mysql');
        getBook_Author(res, mysql, context, complete);
        getAuthorList(res, mysql, context, complete);
        getBookList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('book_author', context);
            }
        }
    });
    
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Book_Author (Book_ID, Author_ID) VALUES (?,?)";
        var inserts = [req.body.Book_ID, req.body.Author_ID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/book_author');
            }
        });
    });
    router.delete('/:book_ID/:author_ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Book_Author WHERE Book_ID = ? AND Author_ID = ?";
        var inserts = [req.params.book_ID, req.params.author_ID];
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