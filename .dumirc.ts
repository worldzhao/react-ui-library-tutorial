import { defineConfig } from 'dumi';
import path from 'path';

let base: string | undefined;
let publicPath: string | undefined;

// Github Pages 部署时需要更换为自己的仓库名
if (process.env.NODE_ENV === 'production' && process.env.PREVIEW !== '1') {
  base = '/react-ui-library-tutorial/';
  publicPath = '/react-ui-library-tutorial/';
}

export default defineConfig({
  base,
  publicPath,
  title: 'Happy UI',
  outputPath: 'doc-site',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src' }],
  },
  exportStatic: {},
  forkTSChecker: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@zzzzw/happy-ui',
        libraryDirectory: '',
        customStyleName: (name) => path.resolve(__dirname, `src/${name}/style/index.ts`),
      },
    ],
  ],
});
