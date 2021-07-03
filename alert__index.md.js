(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"9kvl":function(n,e,t){"use strict";var r=t("FfOG");t.d(e,"a",(function(){return r["b"]}));t("bCY9")},Rsk4:function(n,e,t){"use strict";t.r(e);var r=t("9og8"),a=t("WmNS"),i=t.n(a),o=t("LtsZ"),s="import React from 'react';\nimport Alert from '../alert';\nimport '../style';\n\nexport default () => <Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>;",l="import React from 'react';\nimport t from 'prop-types';\n\nimport { AlertProps, KindMap } from './interface';\n\nconst prefixCls = 'happy-alert';\n\nconst kinds: KindMap = {\n  info: '#5352ED',\n  positive: '#2ED573',\n  negative: '#FF4757',\n  warning: '#FFA502',\n};\n\nconst Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (\n  <div\n    className={prefixCls}\n    style={{\n      background: kinds[kind],\n    }}\n    {...rest}\n  >\n    {children}\n  </div>\n);\n\nAlert.propTypes = {\n  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),\n};\n\nexport default Alert;",c="import './index.less';",p="@popupPrefix: happy-alert;\n\n.@{popupPrefix} {\n  padding: 20px;\n  color: white;\n  background: white;\n  border-radius: 3px;\n}";e["default"]={"alert-basic":{component:Object(o["dynamic"])({loader:function(){var n=Object(r["a"])(i.a.mark((function n(){return i.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.e(3).then(t.bind(null,"025M"));case 2:return n.abrupt("return",n.sent.default);case 3:case"end":return n.stop()}}),n)})));function e(){return n.apply(this,arguments)}return e}()}),previewerProps:{sources:{_:{tsx:s},"alert.tsx":{import:"../alert",content:l},"style/index.ts":{import:"../style",content:c},"index.less":{import:"./index.less",content:p}},dependencies:{react:{version:"16.14.0"},"prop-types":{version:"15.7.2"}},identifier:"alert-basic"}}}},x2v5:function(n){n.exports=JSON.parse("{}")},yf2O:function(n,e,t){"use strict";t.r(e);var r=t("q1tI"),a=t.n(r),i=t("dEAq"),o=t("Zxc8"),s=t("Rsk4"),l=a.a.memo(s["default"]["alert-basic"].component);e["default"]=n=>(a.a.useEffect((()=>{var e;null!==n&&void 0!==n&&null!==(e=n.location)&&void 0!==e&&e.hash&&i["AnchorLink"].scrollToAnchor(decodeURIComponent(n.location.hash.slice(1)))}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"}),a.a.createElement(o["default"],s["default"]["alert-basic"].previewerProps,a.a.createElement(l,null)))))}}]);