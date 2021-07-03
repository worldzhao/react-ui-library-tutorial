(self["webpackChunk_zzzzw_happy_ui"]=self["webpackChunk_zzzzw_happy_ui"]||[]).push([[906],{8296:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return d}});var r=t(8699),i=t(4043),a=t.n(i),l=t(4348),o="import React from 'react';\nimport Alert from '../';\nimport '../style';\n\nexport default () => <Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>;",c="import React from 'react';\nimport t from 'prop-types';\n\nexport interface AlertProps {\n  /**\n   * @description       Alert \u7684\u7c7b\u578b\n   * @default           'info'\n   */\n  kind?: 'info' | 'positive' | 'negative' | 'warning';\n}\n\nexport type KindMap = Record<Required<AlertProps>['kind'], string>;\n\nconst prefixCls = 'happy-alert';\n\nconst kinds: KindMap = {\n  info: '#5352ED',\n  positive: '#2ED573',\n  negative: '#FF4757',\n  warning: '#FFA502',\n};\n\nconst Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (\n  <div\n    className={prefixCls}\n    style={{\n      background: kinds[kind],\n    }}\n    {...rest}\n  >\n    {children}\n  </div>\n);\n\nAlert.propTypes = {\n  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),\n};\n\nexport default Alert;",p="import './index.less';",s="@popupPrefix: happy-alert;\n\n.@{popupPrefix} {\n  padding: 20px;\n  color: white;\n  background: white;\n  border-radius: 3px;\n}",d={"alert-basic":{component:(0,l.dynamic)({loader:function(){var e=(0,r.Z)(a().mark((function e(){return a().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.e(899).then(t.bind(t,8555));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()}),previewerProps:{sources:{_:{tsx:o},"index.tsx":{import:"../",content:c},"style/index.ts":{import:"../style",content:p},"index.less":{import:"./index.less",content:s}},dependencies:{react:{version:"16.14.0"},"prop-types":{version:"15.7.2"}},componentName:"alert",identifier:"alert-basic"}}}},9208:function(e,n,t){"use strict";t.r(n);var r=t(7294),i=t(6089),a=t(5659);t(8296);n["default"]=e=>(r.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&i.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),r.createElement(r.Fragment,null,r.createElement("div",{className:"markdown"},r.createElement("h1",{id:"\u5feb\u901f\u4e0a\u624b"},r.createElement(i.AnchorLink,{to:"#\u5feb\u901f\u4e0a\u624b","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"\u5feb\u901f\u4e0a\u624b"),r.createElement("h2",{id:"\u5b89\u88c5"},r.createElement(i.AnchorLink,{to:"#\u5b89\u88c5","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"\u5b89\u88c5"),r.createElement("p",null,r.createElement("strong",null,"\u4f7f\u7528 npm \u6216 yarn \u5b89\u88c5")),r.createElement(a.Z,{code:"npm install @zzzzw/happy-ui",lang:"shell"}),r.createElement(a.Z,{code:"yarn add @zzzzw/happy-ui",lang:"shell"}),r.createElement("h2",{id:"\u793a\u4f8b"},r.createElement(i.AnchorLink,{to:"#\u793a\u4f8b","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"\u793a\u4f8b"),r.createElement(a.Z,{code:"import Alert from '@zzzzw/happy-ui/es/alert'; // \u624b\u52a8\u6309\u9700\u52a0\u8f7d js\nimport '@zzzzw/happy-ui/es/alert/style'; // \u624b\u52a8\u6309\u9700\u52a0\u8f7d less\n\nReactDOM.render(<Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>, mountNode);",lang:"js"}),r.createElement("h3",{id:"\u81ea\u52a8\u6309\u9700\u52a0\u8f7d"},r.createElement(i.AnchorLink,{to:"#\u81ea\u52a8\u6309\u9700\u52a0\u8f7d","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"\u81ea\u52a8\u6309\u9700\u52a0\u8f7d"),r.createElement("p",null,"\u4f7f\u7528 ",r.createElement(i.Link,{to:"https://www.npmjs.com/package/babel-plugin-import"},"babel-plugin-import ")," \u4f18\u5316\u5f15\u5165\u65b9\u5f0f\uff0c\u5982\u4e0b\uff1a"),r.createElement(a.Z,{code:"import { Alert } from '@zzzzw/happy-ui'; // \u4e0e\u4e0a\u8ff0\u793a\u4f8b\u7b49\u4ef7\n\nReactDOM.render(<Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>, mountNode);",lang:"js"}),r.createElement("p",null,"\u5b89\u88c5 ",r.createElement("code",null,"babel-plugin-import")),r.createElement(a.Z,{code:"yarn add babel-plugin-import --dev",lang:"unknown"}),r.createElement("p",null,"\u914d\u7f6e",r.createElement("code",null,".babelrc")," \u6216 ",r.createElement("code",null,"babel-loader")),r.createElement(a.Z,{code:'{\n  "plugins": [\n    [\n      "import",\n      {\n        "libraryName": "@zzzzw/happy-ui",\n        "libraryDirectory": "esm", // default: lib\n        "style": true // or \'css\'\n      }\n    ]\n  ]\n}',lang:"json"}))))},2022:function(e){"use strict";e.exports=JSON.parse('{"alert":{"default":[{"identifier":"kind","description":"Alert \u7684\u7c7b\u578b","type":"\\"info\\" | \\"positive\\" | \\"negative\\" | \\"warning\\"","default":"info"}]}}')}}]);