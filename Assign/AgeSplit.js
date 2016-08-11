var fs = require('fs');
var fn=["India2011.csv","IndiaSC2011.csv","IndiaST2011.csv"];
var final_obj={};

for(var i=0;i<fn.length;i++)
{
  var data = fs.readFileSync(fn[i]);

  //var data = fs.readFileSync("India2011.csv");
  var stringData = data.toString();
  var arrayOne= stringData.split("\n");
  var header=arrayOne[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  //console.log(header);
  var cnt_age = header.indexOf("Age-group");
  var cnt_lit = header.indexOf("Literate - Persons");
  var cnt_total = header.indexOf("Total/ Rural/ Urban");


  for (var j = 1; j < arrayOne.length; j++)
  {
     var line=arrayOne[j].split(',');

     if(line[cnt_age] != "0-6" && line[cnt_age] != "All ages" && line[cnt_total] == "Total")
     {
       if(final_obj[line[cnt_age]]==undefined)
       {
         final_obj[line[cnt_age]]=parseInt(line[cnt_lit]);
       }
       else
       {
         final_obj[line[cnt_age]]+=parseInt(line[cnt_lit]);
       }
     }
  }
}
var arr = [];
arr1 = Object.keys(final_obj);
//console.log(arr1.length);

for(i=0;i<arr1.length;i++)
{
  obj={};
  obj["Age-group"]=arr1[i];
  data = arr1[i];
  //console.log(data);
  obj["Literates"] = final_obj[data];
  arr.push(obj);
}
console.log(arr);

var file=JSON.stringify(arr);
fs.writeFile('AgeSplit.json', file,'utf8', function (err){
 if (err) throw err;
 console.log("Accomplished");
});
