与软件操作行为越接近的测试，越能给予你信心。

<!--more -->

- [React 组件库搭建指南-准备工作](https://juejin.im/post/5df9a39f6fb9a0165b4cdb26)
- [React 组件库搭建指南-开发调试](https://juejin.im/post/5dfb09b1e51d4558096d5f94)
- [React 组件库搭建指南-打包输出](https://juejin.im/post/5e030b926fb9a0162c487c7b)
- [React 组件库搭建指南-单元测试](https://juejin.im/post/5e23e4035188252c6c478665)

## 概览

本节主要讲述如何在组件库中引入[jest](https://jestjs.io/)以及[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)，而不会深入单元测试的学习。

如果你对下列问题感兴趣：

1. What-单元测试是什么？
2. Why-为什么要写单元测试？
3. How-编写单元测试的最佳实践？

那么可以看看以下文章：

- [Test React apps with React Testing Library](https://thomlom.dev/test-react-testing-library/)：通过一个`<Counter />`的例子延伸，阐述了选择`React Testing Library`而非`Enzyme`的理由，并对其进行了一些入门教学；
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)：`@testing-library/react`的官方文档，该库提供的 API 在某个程度上就是在指引开发者进行单元测试的最佳实践；
- [React Testing Library-examples](https://testing-library.com/docs/recipes)：`@testing-library/react`的一些实例，提供了各种常见场景的测试；
- [React 单元测试策略及落地](https://github.com/linesh-simplicity/linesh-simplicity.github.io/issues/200)：如标题所示，值得一看。

本节所有代码可在仓库[chapter-4](https://github.com/worldzhao/react-ui-library-tutorial/tree/chapter-4/test)分支中获取。

## 相关配置

安装依赖：

```bash
yarn add jest ts-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy @types/jest @types/testing-library__react --dev
```

- [jest](https://jestjs.io/): JavaScript 测试框架，专注于简洁明快；
- [ts-jest](https://github.com/kulshekhar/ts-jest)：为`TypeScript`编写`jest`测试用例提供支持；
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)：简单而完整的`React DOM`测试工具，鼓励良好的测试实践；
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)：自定义的`jest`匹配器(`matchers`)，用于测试`DOM`的状态（即为`jest`的`except`方法返回值增加更多专注于`DOM`的`matchers`）；
- [identity-obj-proxy](https://www.npmjs.com/package/identity-obj-proxy)：一个工具库，此处用来`mock`样式文件。

新建`jest.config.js`，并写入相关配置，更多配置可参考[jest 官方文档-配置](https://jestjs.io/docs/en/configuration)，只看几个常用的就可以。

**jest.config.js**

```js
module.exports = {
  verbose: true,
  roots: ['<rootDir>/components'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^components$': '<rootDir>/components/index.tsx',
    '^components(.*)$': '<rootDir>/components/$1',
  },
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/esm/', '/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
```

修改`package.json`，增加测试相关命令，并且代码提交前，跑测试用例，如下：

**package.json**

```diff
"scripts": {
  ...
+  "test": "jest",                         # 执行jest
+  "test:watch": "jest --watch",           # watch模式下执行
+  "test:coverage": "jest --coverage",     # 生成测试覆盖率报告
+  "test:update": "jest --updateSnapshot"  # 更新快照
},
...
"lint-staged": {
  "components/**/*.ts?(x)": [
    "prettier --write",
    "eslint --fix",
+   "jest --bail --findRelatedTests",
    "git add"
  ],
  ...
}
```

修改`gulpfile.js`以及`tsconfig.json`，避免打包时，把测试文件一并处理了。

**gulpfile.js**

```diff
const paths = {
  ...
- scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'],
+ scripts: [
+   'components/**/*.{ts,tsx}',
+   '!components/**/demo/*.{ts,tsx}',
+   '!components/**/__tests__/*.{ts,tsx}',
+ ],
};
```

**tsconfig.json**

```diff
{
- "exclude": ["components/**/demo"]
+ "exclude": ["components/**/demo", "components/**/__tests__"]
}
```

## 编写测试用例

`<Alert />`比较简单，此处只作示例用，简单进行一下快照测试。

在对应组件的文件夹下新建`__tests__`文件夹，用于存放测试文件，其内新建`index.test.tsx`文件，写入以下测试用例：

**components/alert/**tests**/index.test.tsx**

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../alert';

describe('<Alert />', () => {
  test('should render default', () => {
    const { container } = render(<Alert>default</Alert>);
    expect(container).toMatchSnapshot();
  });

  test('should render alert with type', () => {
    const kinds: any[] = ['info', 'warning', 'positive', 'negative'];

    const { getByText } = render(
      <>
        {kinds.map(k => (
          <Alert kind={k} key={k}>
            {k}
          </Alert>
        ))}
      </>,
    );

    kinds.forEach(k => {
      expect(getByText(k)).toMatchSnapshot();
    });
  });
});
```

更新一下快照：

```bash
yarn test:update
```

可以看见同级目录下新增了一个`__snapshots__`文件夹，里面存放对应测试用例的快照文件。

![生成的快照文件](https://user-gold-cdn.xitu.io/2020/1/19/16fbc32a99857807?w=1728&h=974&f=jpeg&s=144346)

再执行测试用例：

```bash
yarn test
```

![通过测试用例](https://user-gold-cdn.xitu.io/2020/1/19/16fbc32a98f22f73?w=1112&h=518&f=jpeg&s=59424)

可以发现我们通过了测试用例。。。额，这里当然能通过，主要是后续我们进行迭代重构时，都会重新执行测试用例，与最近的一次快照进行比对，如果与快照不一致（结构发生了改变），那么相应的测试用例就无法通过。

对于快照测试，褒贬不一，这个例子也着实简单得很，甚至连扩展的 `jest-dom`提供的 `matchers` 都没用上，如何编写优秀的测试用例，我也是一个新手，只能说多看多写多尝试，概述推荐的文章很不错。

本文如有错误，恳请指正，共同交流学习。

To be Continued...
