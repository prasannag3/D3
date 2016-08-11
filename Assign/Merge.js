var fs = require('fs');
var fn=["India2011.csv","IndiaSC2011.csv","IndiaST2011.csv"];
var final_obj={};
var final_obj1={};

for(var i=0;i<fn.length;i++)
{
  var data = fs.readFileSync(fn[i]);

  var cnt_area,cnt_age,cnt_lit,cnt_total,cnt_wo,cnt_below,cnt_pri,cnt_mid,cnt_sec,cnt_high,cnt_non,cnt_tech,cnt_unclas,cnt_grad ;

  //var data = fs.readFileSync("India2011.csv");
  var stringData = data.toString();
  var arrayOne= stringData.split("\n");
  var header=arrayOne[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  //console.log(header);
  var cnt_age = header.indexOf("Age-group");
  var cnt_lit = header.indexOf("Literate - Persons");
  var cnt_total = header.indexOf("Total/ Rural/ Urban");
  var cnt_wo = header.indexOf('Educational level - Literate without educational level - Persons');
  var cnt_below = header.indexOf('Educational level - Below Primary - Persons');
  var cnt_pri = header.indexOf('Educational level - Primary - Persons');
  var cnt_mid = header.indexOf('Educational level - Middle - Persons');
  var cnt_sec = header.indexOf('Educational level - Matric/Secondary - Persons');
  var cnt_high = header.indexOf('Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons');
  var cnt_non = header.indexOf('Educational level - Non-technical diploma or certificate not equal to degree - Persons');
  var cnt_tech = header.indexOf('Educational level - Technical diploma or certificate not equal to degree - Persons');
  var cnt_grad = header.indexOf('Educational level - Graduate & above - Persons');
  var cnt_unclas = header.indexOf('Educational level - Unclassified - Persons');

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

     if(final_obj1[header[cnt_wo]]==undefined && final_obj1[header[cnt_below]]==undefined && final_obj1[header[cnt_pri]]==undefined && final_obj1[header[cnt_mid]]==undefined &&final_obj1[header[cnt_sec]]==undefined && final_obj1[header[cnt_high]]==undefined
            && final_obj1[header[cnt_non]]==undefined && final_obj1[header[cnt_tech]]==undefined && final_obj1[header[cnt_grad]]==undefined && final_obj1[header[cnt_unclas]]==undefined)
          {
            final_obj1[header[cnt_wo]]=0;
            final_obj1[header[cnt_below]]=0;
            final_obj1[header[cnt_pri]]=0;
            final_obj1[header[cnt_mid]]=0;
            final_obj1[header[cnt_sec]]=0;
            final_obj1[header[cnt_high]]=0;
            final_obj1[header[cnt_non]]=0;
            final_obj1[header[cnt_tech]]=0;
            final_obj1[header[cnt_grad]]=0;
            final_obj1[header[cnt_unclas]]=0;
          }

          if(line[cnt_age] =='All ages' && line[cnt_total]=='Total')
          {

              final_obj1[header[cnt_wo]]+=parseInt(line[cnt_wo]);
              final_obj1[header[cnt_below]]+=parseInt(line[cnt_below]);
              final_obj1[header[cnt_pri]]+=parseInt(line[cnt_pri]);
              final_obj1[header[cnt_mid]]+=parseInt(line[cnt_mid]);
              final_obj1[header[cnt_sec]]+=parseInt(line[cnt_sec]);
              final_obj1[header[cnt_high]]+=parseInt(line[cnt_high]);
              final_obj1[header[cnt_non]]+=parseInt(line[cnt_non]);
              final_obj1[header[cnt_tech]]+=parseInt(line[cnt_tech]);
              final_obj1[header[cnt_grad]]+=parseInt(line[cnt_grad]);
              final_obj1[header[cnt_unclas]]+=parseInt(line[cnt_unclas]);

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
 console.log("Accomplished AgeWise Splitting..!");
});

var arr2=[];
for(property in final_obj1)
{
  var obj2={};
  obj2.category=property;
  obj2.value=final_obj1[property];
  arr2.push(obj2);

}

console.log(arr2);

var file1=JSON.stringify(arr2);
fs.writeFile('EducationSplit.json', file1,'utf8', function (err){
 if (err) throw err;
 console.log("Accomplished EducationWise Splitting..!");
});
