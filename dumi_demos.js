(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"9kvl":function(e,t,n){"use strict";var r=n("FfOG");n.d(t,"a",(function(){return r["b"]}));n("bCY9")},F4QJ:function(e,t,n){"use strict";function r(){var e=i(n("q1tI"));return r=function(){return e},e}function o(){var e=n("dEAq");return o=function(){return e},e}function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var p=function(e,t){var n=[],i=e.match.params.uuid,c=void 0===e.location.query.wrapper,s=t[i];if(s){var p=a(a({},s.previewerProps),{},{hideActions:(s.previewerProps.hideActions||[]).concat(["EXTERNAL"])});void 0!==e.location.query.capture&&(p.motions=(p.motions||[]).slice(),p.motions.unshift("autoplay"),p.motions.every((function(e){return!e.startsWith("capture")}))&&p.motions.push("capture:[id|=root]")),n=c?[r().default.createElement((function(){return(0,o().useMotions)(p.motions||[],document.documentElement),r().default.createElement("div",{},r().default.createElement(s.component))}))]:[p,r().default.createElement(s.component)]}return n};t.default=p},Rsk4:function(e,t,n){"use strict";n.r(t);var r=n("9og8"),o=n("WmNS"),i=n.n(o),c=n("LtsZ"),a="import React from 'react';\nimport Alert from '../alert';\nimport '../style';\n\nexport default () => <Alert kind=\"warning\">\u8fd9\u662f\u4e00\u6761\u8b66\u544a\u63d0\u793a</Alert>;",s="import React from 'react';\nimport t from 'prop-types';\n\nimport { AlertProps, KindMap } from './interface';\n\nconst prefixCls = 'happy-alert';\n\nconst kinds: KindMap = {\n  info: '#5352ED',\n  positive: '#2ED573',\n  negative: '#FF4757',\n  warning: '#FFA502',\n};\n\nconst Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (\n  <div\n    className={prefixCls}\n    style={{\n      background: kinds[kind],\n    }}\n    {...rest}\n  >\n    {children}\n  </div>\n);\n\nAlert.propTypes = {\n  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),\n};\n\nexport default Alert;",p="import './index.less';",u="@popupPrefix: happy-alert;\n\n.@{popupPrefix} {\n  padding: 20px;\n  color: white;\n  background: white;\n  border-radius: 3px;\n}";t["default"]={"alert-basic":{component:Object(c["dynamic"])({loader:function(){var e=Object(r["a"])(i.a.mark((function e(){return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.e(3).then(n.bind(null,"025M"));case 2:return e.abrupt("return",e.sent.default);case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}),previewerProps:{sources:{_:{tsx:a},"alert.tsx":{import:"../alert",content:s},"style/index.ts":{import:"../style",content:p},"index.less":{import:"./index.less",content:u}},dependencies:{react:{version:"16.14.0"},"prop-types":{version:"15.7.2"}},identifier:"alert-basic"}}}},x2v5:function(e){e.exports=JSON.parse("{}")}}]);