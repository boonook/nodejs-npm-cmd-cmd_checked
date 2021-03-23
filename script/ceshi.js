const inquirer = require('inquirer');
const cmd = require('node-cmd');
const app = require('./app');
const handle = require('./handle');
const menu = require('./menu');
const server = require('./server');
const promptList = [
  {
    type: 'list',
    message: '请选择一个要启动的文件:',
    name: 'fruit',
    choices: [
      "app",
      "handle",
      "menu"
    ],
    filter: function (val) { // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  },
];
server.server().then(res=>{
  cmd.run(`node ./script/ceshi.js`,function(err, data, stderr){
      inquirer.prompt(promptList).then(answers => {
        switch (answers.fruit) {
          case "app":
            app.app();
            break;
          case "handle":
            handle.handle();
            break;
          case "menu":
            menu.menu();
            break;
        }
      });
    }
  );
});
