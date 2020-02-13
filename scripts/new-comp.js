const inquirer = require('inquirer');
const changeCase = require('change-case');
const Handlebars = require('handlebars');
const Metalsmith = require('metalsmith');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const questions = [
  {
    name: 'dirName',
    message: '组件目录名，中横线命名法（param-case）',
    type: 'input',
    default: 'new-comp',
  },
  {
    name: 'compNameZH',
    message: '组件中文名',
    type: 'input',
    default: '测试组件',
  },
];

/**
 * 确认组件目录是否已经存在
 * @param {string} path 文件夹路径
 */
function isDirExisted(path) {
  try {
    fs.accessSync(path);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * 渲染组件初始化模板
 * @param {string} dest 目标文件夹名称
 * @param {Object} state 模板数据
 */
function renderTemplate(dest, state) {
  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, '../template');
    const metalsmith = Metalsmith(process.cwd())
      .metadata(state)
      .clean(false)
      .source(source)
      .destination(dest);

    metalsmith
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach(fileName => {
          try {
            const t = files[fileName].contents.toString();
            files[fileName].contents = new Buffer(Handlebars.compile(t)(meta));
          } catch (error) {
            console.error(chalk.red(`render file error: ${fileName}`));
          }
        });
        done(undefined, files, metalsmith);
      })
      .build(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
          console.log(chalk.yellowBright(`- 目录创建成功`));
        }
      });
  });
}

/**
 * 向入口文件 re-export 组件
 * @param {string} dirName 目标文件夹名称
 * @param {string} compNameEN 组件英文名称
 */
function insert2EntryFile(dirName, compNameEN) {
  const entryFilePath = path.join(__dirname, '../components/index.ts');
  fs.appendFileSync(
    entryFilePath,
    `\nexport { default as ${compNameEN} } from './${dirName}';\n`,
    'utf8',
  );
  console.log(chalk.yellowBright(`- 入口文件写入成功`));
}

async function main() {
  const { dirName, compNameZH } = await inquirer.prompt(questions);
  const dest = path.join(__dirname, `../components/${dirName}`);
  if (isDirExisted(dest)) {
    console.log(chalk.red(`💣 该组件目录已存在`));
    return;
  }
  const compNameEN = changeCase.pascalCase(dirName);
  const state = { compNameZH, compNameEN, line_for_keep_metadata: '---' };
  await renderTemplate(dest, state);
  insert2EntryFile(dirName, compNameEN);
  console.log(chalk.green(`✨ ${compNameEN}-${compNameZH} 组件创建成功`));
}

main();
