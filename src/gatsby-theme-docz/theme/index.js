import baseTheme from 'gatsby-theme-docz/src/theme/index';
import { merge } from 'lodash/fp';
import * as modes from './modes';

export default merge(baseTheme, {
  useScopingInPlayground: true,
  colors: {
    ...modes.light,
    modes: {
      dark: modes.dark,
    },
  },
  fonts: {
    display: '"Source Sans Pro", sans-serif',
    monospace: '"Inconsolata", monospace',
    ui: '"Source Sans Pro", sans-serif',
  },
  fontSizes: [12, 16, 16, 16, 20, 28, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
});
