const inquirer = require('inquirer');
const cmd = require('node-cmd');
const server = require('./server');
const promptList = [
  {
    type: 'list',
    message: '请选择一个要启动的文件:',
    name: 'fruit',
    choices: [
      "menu"
    ],
    filter: function (val) { // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  },
];
server.server().then(res=>{
    inquirer.prompt(promptList).then(answers => {
      cmd.run(`node ./script/${answers.fruit}.js`,function(err, data, stderr){

      });
    });
});
