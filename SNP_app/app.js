//  index.js
//
//  Open connection to MySQL server and start it

var mysql      = require('mysql');
var express    = require('express');

//Holds connection settings to SQL
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'alleles'
});
var app = express();

//Connects to SQL
connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//Returns Promise with Ancestor allele data
function getAncestralAllele(snp_id){
  return new Promise(function(resolve, reject) {
    //Fetch allele
    connection.query('SELECT Allele.allele FROM Allele JOIN SNPAncestralAllele on SNPAncestralAllele.ancestral_allele_id = Allele.allele_id \
     WHERE SNPAncestralAllele.snp_id = ? LIMIT 1', snp_id, function(err, data){
      if (data.length == 0){
        resolve(undefined);
      } else {
        resolve(data[0].allele);
      }

    });

  });
}


app.get("/search",function(req,res){
  var snp_id = req.query.snp_id;
  
  //Get the Ancestral Allele from database
  getAncestralAllele(snp_id).then(function(allele){
    if(!allele){
        res.status(404).send('SNP not found.');
    } else {
      res.status(200).send({
        allele
      });
    }
  });
});

app.listen(3000)
