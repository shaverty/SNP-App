//  index.js
//
//  Open connection to MySQL server and start it

var mysql      = require('mysql');
var express    = require('express');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'alleles'
});
var app = express();


connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


function getAncestralAllele(snp_id){
  return new Promise(function(resolve, reject) {
    connection.query('SELECT Allele.allele FROM Allele JOIN SNPAncestralAllele on SNPAncestralAllele.ancestral_allele_id = Allele.allele_id \
     WHERE SNPAncestralAllele.snp_id = ? LIMIT 1', snp_id, function(err, data){
      if (data.length == 0){

        resolve(undefined);
      } else {
        console.log('hhhh');
        resolve(data);
      }

    });

  });
}

app.get("/search",function(req,res){
  var snp_id = req.query.snp_id;

  getAncestralAllele(snp_id).then(function(allele){
    if(!allele){
        res.status(404).send('SNP not found.');
    } else {
      res.status(200).send({
        snp_id: allele
      });
    }
  });
});

app.listen(3000)
