const express = require("express");
const os = require('os');
const bodyParser = require("body-parser");
const process = require('process');
require('console-color-mr');
exports.server = function server() {
  return new Promise((resolve, reject)=>{
    const app = express();
    app.use(bodyParser.json({limit:'50mb'}));
    app.use(bodyParser.urlencoded({
      limit:'50mb',
      extended:true
    }));
    app.get('/',(req,res)=>{
      res.send({message:'welcome'})
    });
    process.stdin.on('end', () => {
      process.stdout.write('end');
    });

    const serverapp = app.listen(3000,()=>{
      let port = serverapp.address().port;
      let ipv4 = getIPv4();//局域网IP
      console.log(ipv4);
      console.log('当前访问用户的ipv4地址:'+('http://'+ipv4+':').green+ port + '\n'.green);
      console.log('Listening at ' + 'http://127.0.0.1:'.green + port + '\n'.green);
      resolve(true);
    });

    /**
     * 获取当前网络的ip地址
     * **/
    function getIPv4() {
      //同一接口可能有不止一个IP4v地址，所以用数组存
      let ipv4s = [];
      //获取网络接口列表对象
      let interfaces = os.networkInterfaces();
      Object.keys(interfaces).forEach(function(key) {
        interfaces[key].forEach(function(item) {
          if ('IPv4' !== item.family || item.internal !== false) return;
          ipv4s.push(item.address); //可用的ipv4s加入数组
        })
      });
      return ipv4s[0]; //返回一个可用的即可
    }
  })
};
