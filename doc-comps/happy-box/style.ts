import styled from 'styled-components';

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const StyledContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
  border: 1px solid #ebedf0;
  border-radius: 2px;
  transition: all 0.2s;

  .text-divider {
    display: table;

    &::before,
    &::after {
      content: '';
      position: relative;
      display: table-cell;
      transform: translateY(50%);
      content: '';
      border-top: 1px solid #e8e8e8;
    }

    &::before {
      top: 50%;
      width: 5%;
    }

    &::after {
      width: 95%;
      top: 50%;
      width: 95%;
    }

    & > span {
      display: inline-block;
      padding: 0 10px;
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
      text-align: center;
      font-variant: tabular-nums;
      line-height: 1.5;
    }
  }

  .divider {
    margin: 0;
    background: none;
    border: dashed #e8e8e8;
    border-width: 1px 0 0;
    display: block;
    clear: both;
    width: 100%;
    min-width: 100%;
    height: 1px;
    position: relative;
    top: -0.06em;
    box-sizing: border-box;
    padding: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
  }

  .code-box-demo {
    transition: all 0.2s;
    padding: 42px 24px 50px;
  }

  .code-box-meta {
    font-size: 14px;
    line-height: 2;
  }

  .code-box .ant-divider {
    margin: 0;
  }

  .code-box-description {
    padding: 18px 24px 12px;
  }

  .code-box-action {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .code-box-action .anticon {
    margin: 0 8px;
    cursor: pointer;
  }

  .container_editor_area {
    border-top: 1px solid rgb(232, 232, 232);
    padding: 16px;
  }

  .container__editor {
    font-variant-ligatures: common-ligatures;
    border-radius: 3px;
  }

  .container__editor textarea {
    outline: 0;
    background-color: none;
  }

  .button {
    display: inline-block;
    padding: 0 6px;
    text-decoration: none;
    background: #000;
    color: #fff;
  }

  .button:hover {
    background: linear-gradient(45deg, #e42b66, #e2433f);
  }

  /* Syntax highlighting */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #90a4ae;
  }
  .token.punctuation {
    color: #9e9e9e;
  }
  .namespace {
    opacity: 0.7;
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #e91e63;
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #4caf50;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #795548;
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #3f51b5;
  }
  .token.function {
    color: #f44336;
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: #ff9800;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
`;
