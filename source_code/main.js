/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
/*awesome book market*/
app.use('/main_page', require('./main_page.js'));
app.use('/booklist', require('./booklist.js'));
app.use('/authorlist', require('./authorlist.js'));
app.use('/userlist', require('./userlist.js'));
app.use('/orderlist', require('./orderlist.js'));
app.use('/cart', require('./cart.js'));
app.use('/book_author', require('./book_author.js'));
app.use('/user_order_book', require('./user_order_book.js'));
app.use('/support', require('./support.js'));
/*awesome book market*/
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
