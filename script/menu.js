const fs = require("fs");
var iconv = require('iconv-lite');
let pathName = './src/router/routes.json';
// fs.readFile(pathName,'utf-8',function (err,files) {
//   console.log(files)
// });
exports.menu = function menu(params) {
  function loadjson(filepath){
    var data;
    try{
      var jsondata = iconv.decode(fs.readFileSync(filepath, "binary"), "utf8");
      data = JSON.parse(jsondata);
      console.log(data);
    }catch(err) {
      console.log(err);
    }
    return data;
  }

  function savejson(filepath, data){
    var datastr = JSON.stringify(data, null, 4);
    if (datastr) {
      try{
        fs.writeFileSync(filepath, datastr);
      } catch(err){

      }
    }
  }

//读
  var data = loadjson(pathName);
  data.menu=[...data.menu,params];
  console.log(data);
///写
  savejson(pathName, data);
};
