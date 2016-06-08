//  index.js
//
//  Open connection to MySQL server and start it

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'alleles'
});


connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
var snp_id = ''

connection.query('SELECT Allele.allele FROM Allele JOIN SNPAncestralAllele on SNPAncestralAllele.ancestral_allele_id = Allele.allele_id \
 WHERE SNPAncestralAllele.snp_id = ? LIMIT 1', process.argv[2], function(err, data){
  if(err) throw err;
  console.log('Data received from DB: ')
  console.log(data)
})
