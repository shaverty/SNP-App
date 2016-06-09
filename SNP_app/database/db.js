// db.js
//
// Module used to connect to database

'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'alleles'
});

module.exports = function getAncestralAllele(snp_id){
  return new Promise(function(resolve, reject) {
    //Fetch allele
    connection.query('SELECT Allele.allele FROM Allele JOIN SNPAncestralAllele on SNPAncestralAllele.ancestral_allele_id = Allele.allele_id \
     WHERE SNPAncestralAllele.snp_id = ? LIMIT 1', snp_id, function(err, data){
      if (data.length == 0){
        resolve(undefined);
      } else {
        resolve({
          Ancestral_allele : data[0].allele
        });
      }

    });

  });
};
