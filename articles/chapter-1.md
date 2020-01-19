
凡事预则立不预则废。

<!--more -->

- [React 组件库搭建指南-准备工作](https://juejin.im/post/5df9a39f6fb9a0165b4cdb26)
- [React 组件库搭建指南-开发调试](https://juejin.im/post/5dfb09b1e51d4558096d5f94)
- [React 组件库搭建指南-打包输出](https://juejin.im/post/5e030b926fb9a0162c487c7b)
- [React 组件库搭建指南-单元测试](https://juejin.im/post/5e23e4035188252c6c478665)

## 概览

本系列文章主要是开发组件库[dora-ui](https://github.com/worldzhao/dora-ui)过程中的一些经验总结，大致包含以下内容：

- prepare: 组件库前期开发准备工作。`eslint`/`commit lint`/`typescript`等等；
- dev: 使用[docz](https://github.com/doczjs/docz)进行开发调试以及文档编写；
- build: ~~`umd`~~/`cjs`/`esm`、types、polyfill 以及按需加载；
- deploy: 使用[now](https://zeit.co/home)部署文档站点；
- publish: 发布组件库至`npm`；
- others: 组件测试

注意：`.gitignore`、`.eslintignore`以及`.editorconfig`等更多文件可在[chapter-1](https://github.com/worldzhao/react-ui-library-tutorial/tree/chapter-1/before-start)章节代码中获取。

## 初始化项目

新建一个`happy-ui`文件夹，并初始化。

```bash
mkdir happy-ui

cd happy-ui

npm init --y

mkdir components && cd components && touch index.ts # 新建源码文件夹以及入口文件

```

## 代码规范

此处直接使用[@umijs/fabric](https://github.com/umijs/fabric)的配置。

```bash
yarn add @umijs/fabric --dev

yarn add prettier --dev # 因为@umijs/fabric没有将prettier作为依赖 所以我们需要手动安装
```

**.eslintrc.js**

```js
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
};
```

**.prettierrc.js**

```js
const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
};
```

**.stylelintrc.js**

```js
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
};
```

想自行配置的同学可以参考以下文章：

- [Linting Your React+Typescript Project with ESLint and Prettier!](https://medium.com/@dors718/linting-your-react-typescript-project-with-eslint-and-prettier-2423170c3d42)
- [使用 ESLint+Prettier 规范 React+Typescript 项目 ](https://zhuanlan.zhihu.com/p/62401626)

## Commit Lint

进行`pre-commit`代码规范检测。

```bash
yarn add husky lint-staged --dev
```

**package.json**

```json
"lint-staged": {
  "components/**/*.ts?(x)": [
    "prettier --write",
    "eslint --fix",
    "git add"
  ],
  "components/**/*.less": [
    "stylelint --syntax less --fix",
    "git add"
  ]
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

进行 Commit Message 检测。

```bash
yarn add @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog --dev
```

新增`.commitlintrc.js`写入以下内容

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

package.json 写入以下内容：

```json
// ...
"scripts": {
  "commit": "git-cz",
}
// ...
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": "lint-staged"
  }
},
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
```

后续使用 `yarn commit` 替代 `git commit`生成规范的 Commit Message，当然为了效率你可以选择手写，但是要符合规范。

## TypeScript

```bash
yarn add typescript --dev
```

新建`tsconfig.json`并写入以下内容

```json
{
  "compilerOptions": {
    "allowJs": false,
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "declaration": true,
    "outDir": "types",
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  },
  "include": ["components"]
}
```

## 测试

在`components`文件夹下新建`alert`文件夹，目录结构如下：

```
alert
    ├── alert.tsx           # 源文件
    ├── index.ts            # 入口文件
    ├── interface.ts        # 类型声明文件
    └── style
        ├── index.less      # 样式文件
        └── index.ts        # 样式文件里为什么存在一个index.ts - 按需加载样式 管理样式依赖 后面章节会提到
```

安装`React`相关依赖：

```bash
yarn add react react-dom @types/react @types/react-dom --dev # 开发时依赖，宿主环境一定存在

yarn add prop-types            # 运行时依赖，宿主环境可能不存在 安装本组件库时一起安装
```

> 此处依旧安装了`prop-types`这个库，因为无法保证宿主环境也使用`typescript`，从而能够进行静态检查，故使用`prop-types`保证`javascript`用户也能得到友好的运行时报错信息。

**components/alert/interface.ts**

```js
export type Kind = 'info' | 'positive' | 'negative' | 'warning';
export type KindMap = Record<Kind, string>;

export interface AlertProps {
  /**
   * Set this to change alert kind
   * @default info
   */
  kind?: 'info' | 'positive' | 'negative' | 'warning';
}
```

**components/alert/alter.tsx**

```jsx
import React from 'react';
import t from 'prop-types';

import { AlertProps, KindMap } from './interface';

const prefixCls = 'happy-alert';

const kinds: KindMap = {
  info: '#5352ED',
  positive: '#2ED573',
  negative: '#FF4757',
  warning: '#FFA502',
};

const Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (
  <div
    className={prefixCls}
    style={{
      background: kinds[kind],
    }}
    {...rest}
  >
    {children}
  </div>
);

Alert.propTypes = {
  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),
};

export default Alert;
```

**components/alert/index.ts**

```js
import Alert from './alert';

export default Alert;

export * from './interface';
```

**components/alert/style/index.less**

```less
@popupPrefix: happy-alert;

.@{popupPrefix} {
  padding: 20px;
  background: white;
  border-radius: 3px;
  color: white;
}
```

**components/alert/style/index.ts**

```js
import './index.less';
```

**components/index.ts**

```js
export { default as Alert } from './alert';
```

> 此处组件参考的`docz`项目`typescript`以及`less`示例。

git 一把梭，可以看到控制台已经进行钩子检测了。

```bash
git add .

yarn commit  # 或 git commit -m'feat: chapter-1 准备工作'

git push
```

准备工作结束，欢迎指点交流。

To be Continued...
