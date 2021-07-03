(self["webpackChunk_zzzzw_happy_ui"]=self["webpackChunk_zzzzw_happy_ui"]||[]).push([[935],{8296:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return d}});var r=t(8699),i=t(4043),o=t.n(i),p=t(4348),s="import React from 'react';\nimport Alert from '../';\nimport '../style';\n\nexport default () => <Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>;",a="import React from 'react';\nimport t from 'prop-types';\n\nexport interface AlertProps {\n  /**\n   * @description       Alert \u7684\u7c7b\u578b\n   * @default           'info'\n   */\n  kind?: 'info' | 'positive' | 'negative' | 'warning';\n}\n\nexport type KindMap = Record<Required<AlertProps>['kind'], string>;\n\nconst prefixCls = 'happy-alert';\n\nconst kinds: KindMap = {\n  info: '#5352ED',\n  positive: '#2ED573',\n  negative: '#FF4757',\n  warning: '#FFA502',\n};\n\nconst Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (\n  <div\n    className={prefixCls}\n    style={{\n      background: kinds[kind],\n    }}\n    {...rest}\n  >\n    {children}\n  </div>\n);\n\nAlert.propTypes = {\n  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),\n};\n\nexport default Alert;",c="import './index.less';",l="@popupPrefix: happy-alert;\n\n.@{popupPrefix} {\n  padding: 20px;\n  color: white;\n  background: white;\n  border-radius: 3px;\n}",d={"alert-basic":{component:(0,p.dynamic)({loader:function(){var n=(0,r.Z)(o().mark((function n(){return o().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.e(899).then(t.bind(t,8555));case 2:return n.abrupt("return",n.sent.default);case 3:case"end":return n.stop()}}),n)})));function e(){return n.apply(this,arguments)}return e}()}),previewerProps:{sources:{_:{tsx:s},"index.tsx":{import:"../",content:a},"style/index.ts":{import:"../style",content:c},"index.less":{import:"./index.less",content:l}},dependencies:{react:{version:"16.14.0"},"prop-types":{version:"15.7.2"}},componentName:"alert",identifier:"alert-basic"}}}},4446:function(n,e,t){"use strict";t.r(e);var r=t(7294),i=t(6089);t(8296);e["default"]=n=>(r.useEffect((()=>{var e;null!==n&&void 0!==n&&null!==(e=n.location)&&void 0!==e&&e.hash&&i.AnchorLink.scrollToAnchor(decodeURIComponent(n.location.hash.slice(1)))}),[]),r.createElement(r.Fragment,null))},2022:function(n){"use strict";n.exports=JSON.parse('{"alert":{"default":[{"identifier":"kind","description":"Alert \u7684\u7c7b\u578b","type":"\\"info\\" | \\"positive\\" | \\"negative\\" | \\"warning\\"","default":"info"}]}}')}}]);