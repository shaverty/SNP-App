//  api.js
//
//  Defines the SNP api.

'use strict';

module.exports = function(app, dbFunct){
  app.get("/search",function(req,res){

    //Grab the SNP number from user. Error check.
    var snp_id = req.query.snp_id;
    if (!snp_id) {
      console.log('in module');
      throw new Error("You must specify a SNP. Usage:'/search?snp=545454'")
    }


    //Get the Ancestral Allele from database
    dbFunct(snp_id).then(function(allele){
      if(!allele){
          res.status(404).send('SNP not found.');
      } else {

        res.status(200).send(allele);
      }

    });

  });
};
