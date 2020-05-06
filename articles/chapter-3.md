重头戏来了。

<!--more -->

- [React 组件库搭建指南-准备工作](https://juejin.im/post/5df9a39f6fb9a0165b4cdb26)
- [React 组件库搭建指南-开发调试](https://juejin.im/post/5dfb09b1e51d4558096d5f94)
- [React 组件库搭建指南-打包输出](https://juejin.im/post/5e030b926fb9a0162c487c7b)
- [React 组件库搭建指南-单元测试](https://juejin.im/post/5e23e4035188252c6c478665)

## 概览

**宿主环境各不相同，需要将源码进行相关处理后发布至 npm。**

明确以下目标：

1. 导出类型声明文件
2. 导出 `umd`/`Commonjs module`/`ES module` 等 3 种形式供使用者引入
3. 支持样式文件 `css` 引入，而非只有`less`
4. 支持按需加载

本节所有代码可在仓库[chapter-3](https://github.com/worldzhao/react-ui-library-tutorial/tree/chapter-3/build)分支中获取。

## 导出类型声明文件

既然是使用`typescript`编写的组件库，那么使用者应当享受到类型系统的好处。

我们可以生成类型声明文件，并在`package.json`中定义入口，如下：

**package.json**

```json
{
  "typings": "types/index.d.ts", // 定义类型入口文件
  "scripts": {
    "build:types": "tsc -p tsconfig.build.json" // 执行tsc命令生成类型声明文件
  }
}
```

**tsconfig.build.json**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "emitDeclarationOnly": true }, // 只生成声明文件
  "exclude": ["**/__tests__/**", "**/demo/**", "types", "node_modules", "lib", "esm"] // 排除示例测试以及打包好的文件夹
}
```

执行`yarn build:types`，可以发现根目录下已经生成了`types`文件夹（`tsconfig.json`中定义的`outDir`字段），目录结构与`components`文件夹保持一致，如下：

**types**

```
├── alert
│   ├── alert.d.ts
│   ├── index.d.ts
│   ├── interface.d.ts
│   └── style
│       └── index.d.ts
└── index.d.ts
```

这样使用者引入`npm` 包时，便能得到自动提示，也能够复用相关组件的类型定义。

接下来将`ts(x)`等文件处理成`js`文件。

> 需要注意的是，我们需要输出`Commonjs module`以及`ES module`两种模块类型的文件（暂不考虑`umd`），以下使用`cjs`指代`Commonjs module`，`esm`指代`ES module`。<br/> 对此有疑问的同学推荐阅读：[import、require、export、module.exports 混合详解](https://github.com/ShowJoy-com/showjoy-blog/issues/39)

## 导出 Commonjs 模块

其实完全可以使用`babel`或`tsc`命令行工具进行代码编译处理（实际上很多工具库就是这样做的），但考虑到还要**处理样式及其按需加载**，我们借助 `gulp` 来串起这个流程。

### babel 配置

首先安装`babel`及其相关依赖

```bash
yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-proposal-class-properties  @babel/plugin-transform-runtime --dev
```

```bash
yarn add @babel/runtime-corejs3
```

新建`.babelrc.js`文件，写入以下内容：

**.babelrc.js**

```js
module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        helpers: true,
      },
    ],
  ],
};
```

关于`@babel/plugin-transform-runtime`与`@babel/runtime-corejs3`：

- 若`helpers`选项设置为`true`，可抽离代码编译过程重复生成的 `helper` 函数（`classCallCheck`,`extends`等），减小生成的代码体积；
- 若`corejs`设置为`3`，可引入不污染全局的按需`polyfill`，常用于类库编写（我更推荐：不引入`polyfill`，转而告知使用者需要引入何种`polyfill`，避免重复引入或产生冲突，后面会详细提到）。

更多参见[官方文档-@babel/plugin-transform-runtime ](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime)

**配置目标环境**

为了避免转译浏览器原生支持的语法，新建`.browserslistrc`文件，根据适配需求，写入支持浏览器范围，作用于`@babel/preset-env`。

**.browserslistrc**

```
>0.2%
not dead
not op_mini all
```

很遗憾的是，`@babel/runtime-corejs3`无法在按需引入的基础上根据目标浏览器支持程度再次减少`polyfill`的引入，参见[@babel/runtime for target environment ](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelruntime-for-target-environment)。

这意味着`@babel/runtime-corejs3` 甚至会在针对现代引擎的情况下注入所有可能的 `polyfill`：不必要地增加了最终捆绑包的大小。

对于组件库（代码量可能很大），个人建议将`polyfill`的选择权交还给使用者，在宿主环境进行`polyfill`。若使用者具有兼容性要求，自然会使用`@babel/preset-env + core-js + .browserslistrc`进行全局`polyfill`，这套组合拳引入了最低目标浏览器不支持`API`的全部 `polyfill`。

> 将`@babel/preset-env`的`useBuiltIns`选项值设置为 `usage`，同时把`node_modules`从`babel-loader`中`exclude`掉的同学可能想要这个特性：["useBuiltIns: usage" for node_modules without transpiling #9419](https://github.com/babel/babel/issues/9419)，在未支持该`issue`提到的内容之前，还是乖乖地将`useBuiltIns`设置为`entry`，或者不要把`node_modules`从`babel-loader`中`exclude`。

所以组件库不用画蛇添足，引入多余的`polyfill`，写好文档说明，比什么都重要（就像[zent](https://github.com/youzan/zent#required-polyfills)和[antd](https://ant.design/docs/react/getting-started-cn#%E5%85%BC%E5%AE%B9%E6%80%A7)这样）。

现在`@babel/runtime-corejs3`更换为`@babel/runtime`，只进行`helper`函数抽离。

```bash
yarn remove @babel/runtime-corejs3

yarn add @babel/runtime
```

**.babelrc.js**

```js
module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/proposal-class-properties'],
};
```

> `@babel/transform-runtime`的`helper`选项默认为`true`。

### gulp 配置

再来安装`gulp`相关依赖

```bash
yarn add gulp gulp-babel --dev
```

新建`gulpfile.js`，写入以下内容：

**gulpfile.js**

```js
const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
  dest: {
    lib: 'lib', // commonjs 文件存放的目录名 - 本块关注
    esm: 'esm', // ES module 文件存放的目录名 - 暂时不关心
    dist: 'dist', // umd文件存放的目录名 - 暂时不关心
  },
  styles: 'components/**/*.less', // 样式文件路径 - 暂时不关心
  scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'], // 脚本文件路径
};

function compileCJS() {
  const { dest, scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(gulp.dest(dest.lib));
}

// 并行任务 后续加入样式处理 可以并行处理
const build = gulp.parallel(compileCJS);

exports.build = build;

exports.default = build;
```

修改`package.json`

**package.json**

```diff
{
- "main": "index.js",
+ "main": "lib/index.js",
  "scripts": {
    ...
+   "clean": "rimraf types lib esm dist",
+   "build": "npm run clean && npm run build:types && gulp",
    ...
  },
}
```

执行`yarn build`，得到如下内容：

**lib**

```
├── alert
│   ├── alert.js
│   ├── index.js
│   ├── interface.js
│   └── style
│       └── index.js
└── index.js
```

观察编译后的源码，可以发现：诸多`helper`方法已被抽离至`@babel/runtime`中，模块导入导出形式也是`commonjs`规范。

**lib/alert/alert.js**

![lib/alert/alert.js](https://tva1.sinaimg.cn/large/006tNbRwgy1gabgju58mlj30ve0u0k4o.jpg)

## 导出 ES module

生成`ES module`可以更好地进行[tree shaking](https://webpack.docschina.org/guides/tree-shaking/)，基于上一步的`babel`配置，更新以下内容：

1. 配置`@babel/preset-env`的`modules`选项为`false`，关闭模块转换；
2. 配置`@babel/plugin-transform-runtime`的`useESModules`选项为`true`，使用`ES module`形式引入`helper`函数。

**.babelrc.js**

```js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false, // 关闭模块转换
      },
    ],
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true, // 使用esm形式的helper
      },
    ],
  ],
};
```

目标达成，我们再使用环境变量区分`esm`和`cjs`（执行任务时设置对应的环境变量即可），最终`babel`配置如下：

**.babelrc.js**

```js
module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/proposal-class-properties'],
  env: {
    esm: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    },
  },
};
```

接下来修改`gulp`相关配置，抽离`compileScripts`任务，增加`compileESM`任务。

**gulpfile.js**

```js
// ...

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  // 设置环境变量
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compileCJS, compileESM);

// 整体并行执行任务
const build = gulp.parallel(buildScripts);

// ...
```

执行`yarn build`，可以发现生成了`types`/`lib`/`esm`三个文件夹，观察`esm`目录，结构同`lib`/`types`一致，js 文件都是以`ES module`模块形式导入导出。

**esm/alert/alert.js**

![esm/alert/alert.js](https://tva1.sinaimg.cn/large/006tNbRwgy1gabgrzmgjqj311i0u0air.jpg)

别忘了给`package.json`增加相关入口。

**package.json**

```diff
{
+ "module": "esm/index.js"
}
```

## 处理样式文件

### 拷贝 less 文件

我们会将`less`文件包含在`npm`包中，用户可以通过`happy-ui/lib/alert/style/index.js`的形式按需引入`less`文件，此处可以直接将 less 文件拷贝至目标文件夹。

在`gulpfile.js`中新建`copyLess`任务。

**gulpfile.js**

```js
// ...

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

const build = gulp.parallel(buildScripts, copyLess);

// ...
```

观察`lib`目录，可以发现 `less` 文件已被拷贝至`alert/style`目录下。

**lib**

```
├── alert
│   ├── alert.js
│   ├── index.js
│   ├── interface.js
│   └── style
│       ├── index.js
│       └── index.less # less文件
└── index.js
```

可能有些同学已经发现问题：若使用者没有使用`less`预处理器，使用的是`sass`方案甚至原生`css`方案，那现有方案就搞不定了。经分析，有以下 3 种预选方案：

1. 告知用户增加`less-loader`；
2. 打包出一份完整的 `css` 文件，进行**全量**引入；
3. 单独提供一份`style/css.js`文件，引入的是组件 `css`文件依赖，而非 `less` 依赖，组件库底层抹平差异。

方案 1 会导致使用成本增加。

方案 2 无法对样式文件进行按需引入（后续在 `umd` 打包时我们也会提供该样式文件）。

以上两种方案实为下策（画外音：如果使用`css in js`就没有这么多屁事了）。

方案 3 比较符合此时的的场景，`antd`使用的也是这种方案。

在搭建组件库的过程中，有一个问题困扰了我很久：为什么需要`alert/style/index.js`引入`less`文件或`alert/style/css.js`引入`css`文件？

答案是**管理样式依赖**。

假设存在以下场景：引入`<Button />`，`<Button />`依赖了`<Icon />`，使用者需要手动去引入调用的组件的样式（`<Button />`）及其依赖的组件样式（`<Icon />`），遇到复杂组件极其麻烦，所以组件库开发者可以提供一份这样的`js`文件，使用者手动引入这个`js`文件，就能引入对应组件及其依赖组件的样式。

继续我们的旅程。

### 生成 css 文件

安装相关依赖。

```bash
yarn add gulp-less gulp-autoprefixer gulp-cssnano --dev
```

将`less`文件生成对应的`css`文件，在`gulpfile.js`中增加`less2css`任务。

```js
// ...

/**
 * 生成css文件
 */
function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

const build = gulp.parallel(buildScripts, copyLess, less2css);

// ...
```

执行`yarn build`，组件`style`目录下已经存在`css`文件了。

接下来我们需要一个`alert/style/css.js`来帮用户引入`css`文件。

### 生成 css.js

此处参考[antd-tools](https://github.com/ant-design/antd-tools/blob/master/lib/gulpfile.js#L248)的实现方式：在处理`scripts`任务中，截住`style/index.js`，生成`style/css.js`，并通过正则将引入的`less`文件后缀改成`css`。

安装相关依赖。

```bash
yarn add through2 --dev
```

**gulpfile.js**

```js
// ...

/**
 * 编译脚本文件
 * @param {*} babelEnv babel环境变量
 * @param {*} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

// ...
```

`cssInjection`的实现：

**gulpfile.js**

```js
/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}
```

再进行打包，可以看见组件`style`目录下生成了`css.js`文件，引入的也是上一步`less`转换而来的`css`文件。

**lib/alert**

```
├── alert.js
├── index.js
├── interface.js
└── style
    ├── css.js # 引入index.css
    ├── index.css
    ├── index.js
    └── index.less
```

## 按需加载

在 package.json 中增加`sideEffects`属性，配合`ES module`达到`tree shaking`效果（将样式依赖文件标注为`side effects`，避免被误删除）。

```json
// ...
"sideEffects": [
  "dist/*",
  "esm/**/style/*",
  "lib/**/style/*",
  "*.less"
],
// ...
```

使用以下方式引入，可以做到`js`部分的按需加载，但需要手动引入样式：

```js
import { Alert } from 'happy-ui';
import 'happy-ui/esm/alert/style';
```

也可以使用以下方式引入：

```js
import Alert from 'happy-ui/esm/alert'; // or import Alert from 'happy-ui/lib/alert';
import 'happy-ui/esm/alert/style'; // or import Alert from 'happy-ui/lib/alert';
```

以上引入样式文件的方式不太优雅，直接引入**全量**样式文件又和按需加载的本意相去甚远。

使用者可以借助[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)来进行辅助，减少代码编写量。

```js
import { Alert } from 'happy-ui';
```

⬇️

```js
import Alert from 'happy-ui/lib/alert';
import 'happy-ui/lib/alert/style';
```

## 生成 umd

真正意义上的“打包”，生成全量 `js`文件 和 `css`文件供使用者外链引入。此处选择`rollup`进行打包。

留坑待填。

To be Continued...
