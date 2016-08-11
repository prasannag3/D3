var add = 0;
var fs = require('fs');
var arr = ["India2011.csv","IndiaSC2011.csv","IndiaST2011.csv"];
for(var i=0;i<arr.length;i++){
fs.readFile(arr[i],"utf-8",function(err, contents) {
if (err){
  throw err;
}
  // console.log(contents.toString());
var row= contents.split("\n");

// var result1=result
 //console.log(row[0]);
for(var i=0;i<row.length;i++){
    var cell = row[i].split(',');
    for (var j = 0; j< cell.length; j++) {
      if (cell[j] == "7"){
          add += parseInt(cell[12]);
          //console.log(cell[12]);
console.log("Add = " +add);
      }
    }
}
});

}
