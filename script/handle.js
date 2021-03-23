/**
 * node c componentName
 * @componentName {String} 组件名
 */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const menu = require('./menu');
const promptList = [
  {
    type: 'input',
    message: '请输入路由地址（多级目录请用/分隔开）:',
    name: 'name',
    default: "components", // 默认值
    validate: function(val) {
      let done = this.async();
      if(val.match(/^[a-z0-9\/-]*$/g)) { // 校验位数
        done(null, true);
      }else{
        done("只能为[a-z,0-9,/,_],多级目录请用/分隔开");
        return;
      }
    }
  },{
    type: 'input',
    message: '请输入路径名:',
    name: 'title',
    default: "航班管家", // 默认值
  }
];
inquirer.prompt(promptList).then(answers => {
  // 获取到组件名
  let componentName = answers.name;
  ////判断是都有/如果存在说明需要新建多级文件夹
  const componentTitle = answers.title;
  let allPathUrl= answers.name;
  console.log(answers);
  let answersPath=componentName;
  console.log('prepare to creat a ' + componentName + ' component');
  let root = '../src/views/';
  // 读取模板文件，并修改内容
  let replaceContent = componentName;
  if(answers.name.indexOf('/')>-1){
    replaceContent = (answers.name.split('/')).pop();
  }
  let template = fs.readFileSync(path.join(__dirname, '../src/components/template.vue'), 'utf8');
  let content = template.replace(/componentName/g, replaceContent); // target file content
  let targetDirPath;
  let targetFilePath;
  let pathUrl="";
  if(answers.name.indexOf('/')>-1){
    let urls = answers.name.split('/');
    allPathUrl = urls.join('_');
    let m = urls.slice(0);
    answersPath = answers.name.split('/').pop();
    m.splice(m.length-1,1);
    console.log(m);
    pathUrl = m.join("/");
    let myPath = path.resolve(`src/views/${pathUrl}`);
    fs.existsSync(myPath) == false && mkdirs(myPath);
  }
  // 目标文件夹和目标文件的路径
  targetDirPath = path.join(__dirname, `${root}${pathUrl===""?"":(pathUrl+'/')}`, answersPath);
  targetFilePath = path.join(__dirname, `${root}${pathUrl===""?"":(pathUrl+"/")}`, answersPath, answersPath + '.vue');

  // mkdirSync
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
    console.log('The ' + targetDirPath + ' folder has been created!');
  }

  // writeFile async
  if (!fs.existsSync(targetFilePath)) {
    fs.writeFile(targetFilePath, content, (err) => {
      if (err) throw err;
      console.log('The ' + targetFilePath + ' has been created!');
      let dirPath= answersPath;
      if(answers.name.indexOf('/')>-1){
        let urlArr = answers.name.split('/');
        urlArr = urlArr.slice(0);
        urlArr.splice(urlArr.length-1,1);
        dirPath = urlArr.join('/');
      }
      menu.menu({
        "name": `${allPathUrl}`,
        "path": `${allPathUrl}`,
        "component": `../src/views/${dirPath}/${answersPath}.vue`,
        "meta": {
          "title": componentTitle
        }
      });
    });
  } else {
    console.error('error!\n' + targetFilePath + '文件已存在！');
  }
});

function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}

