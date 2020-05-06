MDX，文档生花。

<!-- more -->

- [React 组件库搭建指南-准备工作](https://juejin.im/post/5df9a39f6fb9a0165b4cdb26)
- [React 组件库搭建指南-开发调试](https://juejin.im/post/5dfb09b1e51d4558096d5f94)
- [React 组件库搭建指南-打包输出](https://juejin.im/post/5e030b926fb9a0162c487c7b)
- [React 组件库搭建指南-单元测试](https://juejin.im/post/5e23e4035188252c6c478665)

## 概览

本文解决开发组件时的预览以及调试问题，顺路解决文档编写。

**编写时完全无法进行预览调试**

此处选择[docz](https://github.com/doczjs/docz)来辅助预览调试。

> `docz`基于`MDX`（Markdown + JSX），可以在 Markdown 中引入 React 组件，使得一边编写文档，一边预览调试成为了可能。而且得益于 React 组件生态，我们可以像编写应用一般编写文档，不仅仅是枯燥的文字。`docz` 也内置了一些组件，比如`<Playground>`。

本节所有代码可在仓库[chapter-2](https://github.com/worldzhao/react-ui-library-tutorial/tree/chapter-2/dev-and-doc)分支中获取。

## 安装 docz 以及自定义配置

```bash
yarn add docz --dev

yarn add rimraf --dev # 清空目录的一个辅助库
```

增加 `npm scripts` 至 `package.json`。

```json
"scripts": {
  "dev": "docz dev", // 启动本地开发环境
  "start": "npm run dev", // dev命令别名
  "build:doc": "rimraf doc-site && docz build", // 后续会配置打包出来的文件目录名为doc-site，故每次build前删除
  "preview:doc": "docz serve" // 预览文档站点
},
```

> 注意：本节所有操作都是针对站点应用。`打包`指代文档站点打包，而非组件库。

新建`doczrc.js`配置文件，并写入以下内容：

**doczrc.js**

```js
export default {
  files: './components/**/*.{md,markdown,mdx}', // 识别的文件后缀
  dest: 'doc-site', // 打包出来的文件目录名
  title: 'happy-ui', // 站点标题
  typescript: true, // 组件源文件是通过typescript开发，需要打开此选项
};
```

由于使用了`less`作为样式预处理器，故需要安装 less 插件。

```bash
yarn add less gatsby-plugin-less --dev
```

新建`gatsby-config.js`，并写入以下内容：

**gatsby-config.js**

```js
module.exports = {
  plugins: ['gatsby-theme-docz', 'gatsby-plugin-less'],
};
```

## 编写文档

新建`components/alert/index.mdx`，并写入以下内容：

```md
---
name: Alert 警告提示
route: /Alert
menu: 组件
---

import { Playground } from 'docz'; import Alert from './alert'; // 引入组件 import './style'; // 引入组件样式

# Alert 警告提示

警告提示，展现需要关注的信息。

## 代码演示

### 基本用法

<Playground>
  <Alert kind="warning">这是一条警告提示</Alert>
</Playground>

## API

| 属性 | 说明     | 类型                                         | 默认值 |
| ---- | -------- | -------------------------------------------- | ------ |
| kind | 警告类型 | 'info'/'positive'/'negative'/'warning'非必填 | 'info' |
```

执行脚本命令：

```bash
yarn start # or yarn dev
```

可以在`localhost:3000`看到如下页面 ：

![文档站点](https://tva1.sinaimg.cn/large/006tNbRwgy1ga1ujda771j31j50u0h06.jpg)

现在可以在`index.mdx`中愉快地进行文档编写和调试了！

倘若本文到了这里就结束（其实也可以结束了`(_^▽^_)`），那我只是官方文档的翻译复读机罢了，有兴趣的同学可以继续向下看。

## 优化文档编写

如果`代码演示`部分的`demo`较多（比如基本用法、高级用法以及各种用法等等），在组件复杂的情况下（毕竟`<Alert/>`着实太简单了），会导致文档很长难以维护，你到底是在写文档呢还是在写代码呢？

那就抽离吧。

在`components/alert/`文件夹下新建`demo`文件夹，存放我们在编写文档时需要引用的 `demo`。

**components/alert/demo/1-demo-basic.tsx**

```jsx
import React from 'react';
import Alert from '../alert';
import '../style';

export default () => <Alert kind="warning"></Alert>;
```

**components/alert/index.mdx**

```diff
- import Alert from './alert'; // 引入组件
- import './style'; // 引入组件样式
+ import BasicDemo from './demo/1-demo-basic';

...

<Playground>
- <Alert kind="warning">这是一条警告提示</Alert>
+ <BasicDemo />
</Playground>
```

这样我们就将 demo 与文档进行了分隔。预览如下：

![文档重构](https://tva1.sinaimg.cn/large/006tNbRwgy1ga1v3li0poj31l80u0wix.jpg)

等等，你下面显示的那个`<BasicDemo />`有点撩人，这里应该是给用户爸爸们`copy`的`demo`源码，你弄一个标签在这里，用户爸爸肯定不开心 🙅‍♀️。

然而`<Playground />`组件暂时无法支持上述形式的展示：自定义下方展示的代码，而非`<Playground />`内部的代码。相关讨论如下：

- [Allow to hide the LiveError overlay #907 ](https://github.com/doczjs/docz/pull/907)
- [Allow to override the playground's editor's code #906 ](https://github.com/doczjs/docz/pull/906)

其实第一条 `PR` 已经解决了问题，但是被关闭了，无奈。

不过既然都能引入 React 组件了，在`MDX`的环境下自定义一个`Playground`组件又有何难呢，无非就是渲染组件（MDX 自带）和展示源码，简单开放的东西大家都是喜闻乐见的，就叫`HappyBox`吧。

## 优化代码展示

### 编写 `<HappyBox />`组件

安装依赖：

```
yarn add react-use react-tooltip react-feather react-simple-code-editor prismjs react-copy-to-clipboard raw-loader styled-components --dev
```

- [react-use](https://github.com/streamich/react-use) - 2020 年了，当然要用`hooks`
- [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor) - 代码展示区域
- [prismjs](https://github.com/PrismJS/prism) - 代码高亮
- [raw-loader](https://github.com/webpack-contrib/raw-loader) - 将源码转成字符串
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) - 让用户爸爸们能够 copy demo 代码
- react-tooltip/react-feather 辅助组件
- styled-components 方便在文档示例中让用户看到样式，也用作文档组件的样式处理

> 这些依赖都是服务于文档站点应用，和组件库自身毫无关联。

最终效果如下：

![最终效果](https://tva1.sinaimg.cn/large/006tNbRwgy1ga1ynynxxlj31dg0u0tde.jpg)

根目录下新建`doc-comps`文件夹，存放文档中使用的一些工具组件，比如`<HappyBox />`。

**doc-comps**

```
├── happy-box
│   ├── style.ts
│   └── index.tsx
└── index.ts
```

**components/doc-comps/happy-box/index.tsx**

```jsx
import React from 'react';
import Editor from 'react-simple-code-editor';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useToggle } from 'react-use';
import ReactTooltip from 'react-tooltip';
import IconCopy from 'react-feather/dist/icons/clipboard';
import IconCode from 'react-feather/dist/icons/code';
import { highlight, languages } from 'prismjs/components/prism-core';
import { StyledContainer, StyledIconWrapper } from './style';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

require('prismjs/components/prism-jsx');

interface Props {
  code: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
}

export const HappyBox: React.FC<Props> = ({ code, title, desc, children }) => {
  const [isEditVisible, toggleEditVisible] = useToggle(false);

  return (
    <StyledContainer>
      <section className="code-box-demo"> {children}</section>
      <section className="code-box-meta">
        <div className="text-divider">
          <span>{title || '示例'}</span>
        </div>
        <div className="code-box-description">
          <p>{desc || '暂无描述'}</p>
        </div>
        <div className="divider" />
        <div className="code-box-action">
          <CopyToClipboard text={code} onCopy={() => alert('复制成功')}>
            <IconCopy data-place="top" data-tip="复制代码" />
          </CopyToClipboard>

          <StyledIconWrapper onClick={toggleEditVisible}>
            <IconCode data-place="top" data-tip={isEditVisible ? '收起代码' : '显示代码'} />
          </StyledIconWrapper>
        </div>
      </section>
      {renderEditor()}
      <ReactTooltip />
    </StyledContainer>
  );

  function renderEditor() {
    if (!isEditVisible) return null;
    return (
      <div className="container_editor_area">
        <Editor
          readOnly
          value={code}
          onValueChange={() => {}}
          highlight={code => highlight(code, languages.jsx)}
          padding={10}
          className="container__editor"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
        />
      </div>
    );
  }
};

export default HappyBox;
```

### 相关配置变更

- 增加 `alias`别名，源码展示相对路径不够友好，让用户直接拷贝才够省心

新建`gatsby-node.js`，写入以下内容以开启`alias`：

```js
const path = require('path');

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        'happy-ui/lib': path.resolve(__dirname, '../components/'),
        'happy-ui/esm': path.resolve(__dirname, '../components/'),
        'happy-ui': path.resolve(__dirname, '../components/'),
      },
    },
  });
};
```

`tsconfig.json` 打包时需要忽略`demo`，避免组件库打包生成`types`时包含其中：

**tsconfig.json**

```diff
{
  "compilerOptions": {
    "baseUrl": "./",
+   "paths": {
+     "happy-ui": ["components/index.ts"],
+     "happy-ui/esm/*": ["components/*"],
+     "happy-ui/lib/*": ["components/*"]
+    },
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "declaration": true,
    "declarationDir": "lib",
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["components", "global.d.ts"],
- "exclude": ["node_modules"]
+ "exclude": ["node_modules",  "**/demo/**"]
}

```

新的问题出现了，vscode 的 alias 提示还是依赖 tsconfig.json，忽略 demo 文件夹后，demo 内的文件模块类型找不到声明(paths 失效)，所以不能将 demo 在 tsconfig.json 中移除：

```diff
{
- "exclude": ["node_modules",  "**/demo/**"]
+ "exclude": ["node_modules"]
}
```

新建一个 tsconfig.build.json 文件：

**tsconfig.build.json**

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["**/demo/**", "node_modules"]
}
```

后续使用 tsc 生成类型声明文件指定`tsconfig.build.json`即可。

### 改造相关文件

**components/alert/demo/1-demo-basic.tsx**

```diff
- import Alert from '../alert';
+ import Alert from 'happy-ui/lib/alert';

- import '../style';
+ import 'happy-ui/lib/alert/style';
```

**components/alert/index.mdx**

```diff
- import { Playground } from 'docz';
+ import { HappyBox } from '../../doc-comps';

+ import BasicDemoCode from '!raw-loader!./demo/1-demo-basic.tsx';

...

- <Playground>
-   <BasicDemo />
- </Playground>

+ <HappyBox code={BasicDemoCode} title="基本用法" desc="使用kind控制Alert类型">
+  <BasicDemo />
+ </HappyBox>
```

### 其他

**.eslintignore**

```diff
+ doc-comps
+ demo
```

`yarn start`卡住时尝试删除根目录`.docz`文件夹，而后重新执行命令。

更多详见[仓库](https://github.com/worldzhao/react-ui-library-tutorial/tree/chapter-2/dev-and-doc)。

开发调试与文档编写结束，欢迎指点交流。

To be Continued...
