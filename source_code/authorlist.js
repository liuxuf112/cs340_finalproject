module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAuthorList(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM `AuthorList` ORDER BY `AuthorList`.`Author_ID` ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.author  = results;
            complete();
        });
    }

    function getAuthor(res, mysql, context, id, complete){
        var sql = "SELECT * FROM AuthorList WHERE Author_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.author = results[0];
            complete();
        });
    }

    /*Display all authors. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        console.log('displaying all authors');
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteauthor.js"];
        var mysql = req.app.get('mysql');
        getAuthorList(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('authorlist', context);
            }

        }
    });
    
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO AuthorList (Name) VALUES (?)";
        var inserts = [req.body.Name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/authorlist');
            }
        });
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateauthor.js"];
        var mysql = req.app.get('mysql');
        getAuthor(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-author', context);
            }
        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "UPDATE AuthorList SET Name=? WHERE Author_ID=?";
        var inserts = [req.body.Name, req.params.id];
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
        var sql = "DELETE FROM Book_Author WHERE Author_ID = ?;";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
            }
        })

        sql = "DELETE FROM AuthorList WHERE Author_ID = ?;";
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
