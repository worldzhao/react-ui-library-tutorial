import React from 'react';
import Editor from 'react-simple-code-editor';
import CopyToClipboard from 'react-copy-to-clipboard';
import useToggle from 'react-use/esm/useToggle';
import { Divider, Typography, Icon, Tooltip, message } from 'antd';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './index.less';

require('prismjs/components/prism-jsx');

const { Text } = Typography;
interface Props {
  code: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
}

export const HappyBox: React.FC<Props> = ({ code, title, desc, children }) => {
  const [isEditVisible, toggleEditVisible] = useToggle(false);

  return (
    <div className="code-box">
      <section className="code-box-demo"> {children}</section>
      <section className="code-box-meta">
        <Divider orientation="left">{title || '示例'}</Divider>
        <div className="code-box-description">
          <Text>{desc || '暂无描述'}</Text>
        </div>
        <Divider dashed></Divider>
        <div className="code-box-action">
          <Tooltip placement="top" title="复制代码">
            <CopyToClipboard text={code} onCopy={() => message.success('复制成功')}>
              <Icon type="copy" />
            </CopyToClipboard>
          </Tooltip>
          <Tooltip placement="top" title={isEditVisible ? '收起代码' : '显示代码'}>
            <Icon type="code" onClick={toggleEditVisible} />
          </Tooltip>
        </div>
      </section>
      {renderEditor()}
    </div>
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
