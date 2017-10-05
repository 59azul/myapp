var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
   req.getConnection(function(err, connection) {
       var query = connection.query('SELECT * FROM customer', function(err, rows) {
           if(err)
               console.log('Erro list');
           res.json({data: rows});
       })
   }) ;
});

module.exports = router;
