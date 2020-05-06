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
