var fs = require('fs');
var educationalMapper = require('./mapper.json')
var files = ["India2011.csv","IndiaSC2011.csv","IndiaST2011.csv"];
var educationalLevelAggregation = {};

for(var i=0;i<files.length;i++) {
  var data = fs.readFileSync(files[i],'utf8');
  var lines = data.split('\n');
  var header = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  var indexOfTotal = header.indexOf('Total/ Rural/ Urban');
  var indexOfAgeGroup = header.indexOf('Age-group');
  var indexes = [];
  for(var educationalLevel in educationalMapper) {
    indexes.push(header.indexOf(educationalLevel));
  }
  for(var j=1;j<lines.length;j++) {
    var line = lines[j].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if(line[indexOfTotal]=='Total' && line[indexOfAgeGroup]=='All ages') {
      for(var k=0;k<indexes.length;k++) {
        if(educationalLevelAggregation[header[indexes[k]]]==undefined) {
          educationalLevelAggregation[header[indexes[k]]] = isNaN(parseFloat(line[indexes[k]]))?0:parseFloat(line[indexes[k]]);
        }
        else {
          educationalLevelAggregation[header[indexes[k]]] += isNaN(parseFloat(line[indexes[k]]))?0:parseFloat(line[indexes[k]]);
        }
      }
    }
  }
}
var c=[];var f;
c1=Object.keys(educationalLevelAggregation);
console.log(c1.length);
for(i=0;i<c1.length;i++)
{
  b={};
  b["Educational Category"]=c1[i];
  f=c1[i];
  b["Literates"]=educationalLevelAggregation[f];
  c.push(b);
}
console.log(c);
console.log(c);
 var b1=JSON.stringify(c);
 fs.writeFile('educat.json', b1,'utf8', function (err){
  if (err) throw err;
 });
