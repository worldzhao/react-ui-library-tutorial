/** @jsx jsx */
import { useRef, useState } from 'react';
import { useCurrentDoc } from 'docz';
import { jsx, Layout as BaseLayout, Main } from 'theme-ui';
import { Global } from '@emotion/core';

import global from 'gatsby-theme-docz/src/theme/global';
import { Header } from 'gatsby-theme-docz/src/components/Header';
import { MainContainer } from 'gatsby-theme-docz/src/components/MainContainer';
import { Sidebar } from '../Sidebar';
import * as styles from './styles';

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const nav = useRef();
  const current = useCurrentDoc();

  if (current.fullpage) return children;

  return (
    <BaseLayout sx={{ '& > div': { flex: '1 1 auto' } }} data-testid="layout">
      <Global styles={global} />
      <Main sx={styles.main}>
        <Header onOpen={() => setOpen(s => !s)} />
        <div sx={styles.wrapper}>
          <Sidebar
            ref={nav}
            open={open}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(false)}
          />
          <MainContainer data-testid="main-container">{children}</MainContainer>
        </div>
      </Main>
    </BaseLayout>
  );
};
