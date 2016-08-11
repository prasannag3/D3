var fs = require('fs');

var f1 = fs.readFileSync('India2011.csv','utf8',function(err,data){
  if(err) throw err;
});
console.log(f1);

var f2 = fs.readFileSync('IndiaSC2011.csv','utf8',function(err,data){
  if(err) throw err;
});
console.log(f2);

var f3 = fs.readFileSync('IndiaST2011.csv','utf8',function(err,data){
  if(err) throw err;
});
console.log(f3);
