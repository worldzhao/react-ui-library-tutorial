---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## 安装

**使用 npm 或 yarn 安装**

```shell
npm install @zzzzw/happy-ui
```

```shell
yarn add @zzzzw/happy-ui
```

## 示例

```js
import Alert from '@zzzzw/happy-ui/es/alert'; // 手动按需加载 js
import '@zzzzw/happy-ui/es/alert/style'; // 手动按需加载 less

ReactDOM.render(<Alert kind="warning">这是一条警告提示</Alert>, mountNode);
```

### 自动按需加载

使用 [babel-plugin-import ](https://www.npmjs.com/package/babel-plugin-import) 优化引入方式，如下：

```js
import { Alert } from '@zzzzw/happy-ui'; // 与上述示例等价

ReactDOM.render(<Alert kind="warning">这是一条警告提示</Alert>, mountNode);
```

安装 `babel-plugin-import`

```
yarn add babel-plugin-import --dev
```

配置`.babelrc` 或 `babel-loader`

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@zzzzw/happy-ui",
        "libraryDirectory": "esm", // default: lib
        "style": true // or 'css'
      }
    ]
  ]
}
```
