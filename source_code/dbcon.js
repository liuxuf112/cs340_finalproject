var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_linxinw',
  password        : '2253',
  database        : 'cs340_linxinw'
});
module.exports.pool = pool;
