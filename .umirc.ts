import { defineConfig } from 'dumi';

// 此处更换为自己的仓库名
let base = '/react-ui-library-tutorial';
let publicPath = '/react-ui-library-tutorial/';

if (process.env.DOC_BUILD_ENV === 'local') {
  base = undefined;
  publicPath = undefined;
}

export default defineConfig({
  title: 'Happy UI',
  mode: 'site',
  outputPath: 'doc-site',
  exportStatic: {},
  dynamicImport: {},
  base,
  publicPath,
});
