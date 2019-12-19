export default {
  files: './components/**/*.{md,markdown,mdx}', // 识别的文件后缀
  dest: 'doc-site', // 打包出来的文件目录名
  title: 'happy-ui', // 站点标题
  typescript: true, // 组件源文件是通过typescript开发，需要打开此选项
};
