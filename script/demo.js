const inquirer = require('inquirer');
const demoList = [
  {
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: "test_user" // 默认值
  },
];
inquirer.prompt(demoList).then(answers => {
  console.log(answers); // 返回的结果
});
