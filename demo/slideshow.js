!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=3)}([function(e,t,r){e.exports=r(1)(0)},function(e,t){e.exports=vendor},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={ROOT:{backgroundColor:"transparent",border:0,fontSize:"100%",lineHeight:"1px",margin:0,outline:0,padding:0,position:"relative",textDecoration:"none"},IMAGE:{height:"100%",overflow:"auto",position:"relative",width:"100%"},BUTTON:{backgroundColor:"transparent",border:"none",margin:"0 20px",padding:0},BAR:{backgroundColor:"#323232",height:30,lineHeight:"30px",margin:"auto",overflow:"auto",position:"relative",textAlign:"center",width:"100%"},PAGE_VIEW:{color:"#fff"},ARROW_BUTTON:{backgroundColor:"transparent",height:15,width:15},PREV_ON_CONTENT:{display:"block",width:"40%",height:"95%",top:0,left:0,position:"absolute",cursor:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYREQ4Xdp3G0wAAAZ9JREFUWMPt1z1rFFEUBuBnhEAaC1FBC1OlVKzFjyqNKY0oqGCddAHzAwS7/AELOwvBwlRpNCAhENMEC7UTFFc0xKRJMEQxXpsTWMad3ZnZ3WyzLxwuc+/ce957PmcYYojqOIYZrGIbn3D3KAk8RcrJAa4dhfLLoXAPd1JKCQ9j7i2yfhOYC2WPUxPwJeZv1/FnHfzNPT+KcR6n+mmBybjp+5QDlmPtZRcXM44F7LQItLzczBE4i++xNl9X+Y8Sig/lQwsrXMV+E4nRKgQWYuMrnEs1gSn8bkP8K663IrAbL4ylLhGWeNOGSONQaXPe7uB43L7Rq6jNssLSkOXTcCnGJ1mWjQ2ixo9jq53varqjSP4rRB9xKYJxtwXBtUF1v4mitOuFBcpgFJux6VY/XVCE/Wg28K0fHxdl8DnGi4OKg6kw2xbO1HTBlZDKLoAXYf6TONFNXerGCqvB/F6HG9/H86j5fzqV4ip4EJs3cKNJ4QVMYxG/SnTRRlEzKpOOrzscfoAVzOI8RnodjCNx+Dp+RgN7h2dh+tPDv5YhquIfvGpAec8aptcAAAAASUVORK5CYII="), auto'},NEXT_ON_CONTENT:{display:"block",width:"40%",height:"95%",top:0,right:0,position:"absolute",cursor:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYREQ4zSp4iAgAAAapJREFUWMPt179rFEEUB/DPhUistFCLNGksFSxFURurpBNEMRZpFWwE/wHr+A+IjdgognZpLo0/QKy0UEklERMNQQXxMCDcMRa+lWPZ29xubq+6Lwyz+2bffL9v5s08lgkmqI+rWMcPvMJ1TI2L/Bx6SLn2YBzkLbwNwjsppYRF7ITtVNMCLgfRVuoD7ob9VpXJqu7ZYSzH8+3cWK/pyKfQjiifpxzwPsbmmxKwnC09ZnPkFwsSMt9+4SmOViXe30e+gzMF0X8YQkDWvg0SsYDNEsc/WEg1gTmsxlxPigRslhC/wOm0R4SIbDv+n+kMqUjVP78RXSCt1hw+h4CDxnl1Bvm9eG0XBlvUai51WS5970/CplbgdYEtO4Yn8bHpFVgL//NVVI9EAC6F7zZmRl0LhsHX6DfiCI9dwInoPw3z8XSB7Wz0L2sctdkoSvBoL+W4VTP6AziEL4Ou2zJsDEjEbow9xlK3210vScAr4fOsjvr5EhH52rCCaziWUkqdTuc+LkQCJtwYZVLtw3HcjLzo7SKwHT6N4QiW8BDv8BO/8SZETk/+WCaogr+r/hCMZ83IlAAAAABJRU5ErkJggg=="), auto'},PROGRESS_BAR:{backgroundColor:"#000",height:10,marginTop:-6,position:"relative",width:"100%"}}},function(e,t,r){e.exports=r(4)},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(0)),i=n(r(5)),l=n(r(6));i.default.render(s.default.createElement(class extends s.default.Component{render(){return s.default.createElement("div",null,s.default.createElement(l.default,{style:{width:400,left:"40%",top:50},images:["./img/example1.png","./img/example2.png","./img/example3.png"],withTimestamp:!0,pageWillUpdate:(e,t)=>{console.log(`Page Update! index: ${e}, image: ${t}`)},showFullscreenIcon:!0,className:"react-slideshow-ui-demo"}))}},null),document.getElementById("slideshow"))},function(e,t,r){e.exports=r(1)(9)},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(0)),l=n(r(7)),o=r(8),a=r(9),c=s(r(10)),u=s(r(11)),d=s(r(12)),p=s(r(13)),f=s(r(14)),h=s(r(2)),m=s(r(15));class g extends i.Component{constructor(e){if(super(e),this.onClickPrevButton=(()=>{if(o.isEmptyArray(this.props.images))return;if(0===this.state.index)return;const e=this.state.index-1;this.updatePageState(e)}),this.onClickNextButton=(()=>{if(!this.props.images)return;if(this.state.index===this.props.images.length-1)return;const e=this.state.index+1;this.updatePageState(e)}),this.onClickProgressBar=(e=>{const t=a.calcProgressIndex(e,this.props.images.length);null!=t&&this.updatePageState(t)}),this.onMouseMoveProgressBar=(e=>{const t=a.calcProgressIndex(e,this.props.images.length);null!=t&&this.setState({preview:1,previewIndex:t})}),this.onMouseLeaveProgressBar=(e=>{this.setState({preview:0})}),this.onChangeFullScreen=(()=>{const e=document.getElementsByClassName(`${this.props.className}-wrapper`)[0];Promise.all([l.default(e),l.fullscreenChange(()=>{const t=l.isFullscreen();this.setState({isFullScreen:t}),t?(document.addEventListener("keydown",this.keydownEvent),e.style.width="70%"):(document.removeEventListener("keydown",this.keydownEvent),e.style.width="100%")})])}),this.keydownEvent=(e=>{e.preventDefault(),"ArrowUp"===e.key||"ArrowLeft"===e.key||37===e.keyCode||38===e.keyCode?this.onClickPrevButton():"ArrowDown"===e.key||"ArrowRight"===e.key||39===e.keyCode||40===e.keyCode||32===e.keyCode?this.onClickNextButton():"Escape"!==e.key&&27!==e.keyCode||this.onChangeFullScreen()}),this.updatePageState=(e=>{const t=a.calcProgress(e+1,this.props.images.length),r=this.props.images[e];this.setState({src:r,index:e,progress:t}),this.props.pageWillUpdate&&this.props.pageWillUpdate(e,r)}),this.timestamp=0,!0===e.withTimestamp&&(this.timestamp=Math.floor((new Date).getTime()/1e3)),e.style)for(const t in e.style)e.style.hasOwnProperty(t)&&(h.default.ROOT[t]=e.style[t]);h.default.ROOT.height&&(h.default.IMAGE.height=h.default.ROOT.height-h.default.BAR.height-h.default.PROGRESS_BAR.height+5),this.state={src:"",index:0,progress:0,preview:0,previewIndex:0,isFullScreen:!1}}componentDidMount(){const e=this.props.images;if(o.isEmptyArray(this.props.images))return;let t=Math.ceil(100/e.length);t>100&&(t=100),this.setState({src:e[0],index:0,progress:t,preview:0,previewIndex:0,isFullScreen:!1})}render(){return i.createElement("div",{style:h.default.ROOT,className:this.props.className},i.createElement("div",{className:`${this.props.className}-wrapper`,style:{margin:"auto"}},i.createElement(m.default,{imgClassName:`${this.props.className}-image`,styles:h.default,src:this.state.src,onClickPrevButton:this.onClickPrevButton,onClickNextButton:this.onClickNextButton,timestamp:this.timestamp}),i.createElement(p.default,{opacity:this.state.preview,previewIndex:this.state.previewIndex,images:this.props.images,isFullScreen:this.state.isFullScreen,imgClassName:`${this.props.className}-image`}),i.createElement(f.default,{style:h.default.PROGRESS_BAR,onClick:this.onClickProgressBar,onMouseMove:this.onMouseMoveProgressBar,onMouseLeave:this.onMouseLeaveProgressBar,progress:this.state.progress}),i.createElement("div",{style:h.default.BAR},i.createElement(d.default,{onClick:this.onClickPrevButton},this.props.prevIcon),i.createElement("span",{style:h.default.PAGE_VIEW},`${this.state.index+1} / ${this.props.images?this.props.images.length:0}`),i.createElement(d.default,{onClick:this.onClickNextButton},this.props.nextIcon),this.props.showFullscreenIcon?i.createElement(c.default,{onClick:this.onChangeFullScreen},i.createElement(u.default,{isFullScreen:this.state.isFullScreen})):null)))}}t.default=g,g.defaultProps={arrowButtonStyle:h.default.ARROW_BUTTON,style:{},images:[],prevIcon:i.createElement("svg",{style:h.default.ARROW_BUTTON,viewBox:"0 0 8 8"},i.createElement("path",{fill:"#fff",d:"M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z",transform:"translate(0 1)"})),nextIcon:i.createElement("svg",{style:h.default.ARROW_BUTTON,viewBox:"0 0 8 8"},i.createElement("path",{fill:"#fff",d:"M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z",transform:"translate(0 1)"})),withTimestamp:!1,pageWillUpdate:(e,t)=>{},className:"slideshow",showFullscreenIcon:!0}},function(e,t,r){e.exports=r(1)(5)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isEmptyArray=(e=>null==e||0===e.length)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=(e,t)=>{const r=100/t,n=Math.ceil(r*e);return n>100?100:n};t.calcProgress=n;t.calcProgressIndex=((e,t)=>{const r=e.currentTarget.parentElement;if(!r)return;const s=r.children[0].offsetWidth,i=e.clientX-e.currentTarget.getBoundingClientRect().left,l=Math.floor(i/s*100);let o=0;for(let e=0;e<t;e++)l>=n(e,t)&&(o=e);return o})},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(0));t.default=(({onClick:e,children:t})=>s.createElement("div",null,s.createElement("button",{style:{backgroundColor:"transparent",borderStyle:"none",position:"absolute",right:10,top:5},onClick:e},t)))},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(0));t.default=s.memo(({isFullScreen:e})=>e?s.createElement("svg",{id:"no-fullscreen",width:"15",height:"15",viewBox:"0 0 612 612"},s.createElement("g",null,s.createElement("g",{id:"_x36_"},s.createElement("g",null,s.createElement("path",{d:"M260.655,351.173c-3.615-4.016-8.721-6.636-14.554-6.655l-164.915-0.229c-10.92-0.019-19.756,8.816-19.737,19.737     c0.019,10.92,12.756,23.198,18.226,28.668l41.711,41.712L0,554.625L57.375,612l119.608-121.979l41.711,41.712     c9.027,9.027,18.188,18.628,29.108,18.646c10.92,0.02,19.756-8.816,19.737-19.736l-0.229-164.915     C267.291,359.895,264.671,354.788,260.655,351.173z M493.119,175.472L612,57.375L554.625,0L436.566,118.556l-42.419-42.687     c-9.181-9.238-18.494-19.068-29.587-19.087c-11.111-0.019-20.081,9.027-20.081,20.196l0.229,168.797     c0,5.967,2.678,11.188,6.771,14.898c3.69,4.112,8.874,6.789,14.803,6.809l167.726,0.229c11.093,0.019,20.082-9.027,20.082-20.196     c-0.02-11.169-12.967-23.753-18.532-29.338L493.119,175.472z",fill:"#FFFFFF"}))))):s.createElement("svg",{id:"fullscreen",width:"15",height:"15",viewBox:"0 0 438.529 438.529"},s.createElement("g",{fill:"#fff"},s.createElement("path",{d:"M180.156,225.828c-1.903-1.902-4.093-2.854-6.567-2.854c-2.475,0-4.665,0.951-6.567,2.854l-94.787,94.787l-41.112-41.117 c-3.617-3.61-7.895-5.421-12.847-5.421c-4.952,0-9.235,1.811-12.851,5.421c-3.617,3.621-5.424,7.905-5.424,12.854v127.907 c0,4.948,1.807,9.229,5.424,12.847c3.619,3.613,7.902,5.424,12.851,5.424h127.906c4.949,0,9.23-1.811,12.847-5.424 c3.615-3.617,5.424-7.898,5.424-12.847s-1.809-9.233-5.424-12.854l-41.112-41.104l94.787-94.793 c1.902-1.903,2.853-4.086,2.853-6.564c0-2.478-0.953-4.66-2.853-6.57L180.156,225.828z"}),s.createElement("path",{d:"M433.11,5.424C429.496,1.807,425.212,0,420.263,0H292.356c-4.948,0-9.227,1.807-12.847,5.424 c-3.614,3.615-5.421,7.898-5.421,12.847s1.807,9.233,5.421,12.847l41.106,41.112l-94.786,94.787 c-1.901,1.906-2.854,4.093-2.854,6.567s0.953,4.665,2.854,6.567l32.552,32.548c1.902,1.903,4.086,2.853,6.563,2.853 s4.661-0.95,6.563-2.853l94.794-94.787l41.104,41.109c3.62,3.616,7.905,5.428,12.854,5.428s9.229-1.812,12.847-5.428 c3.614-3.614,5.421-7.898,5.421-12.847V18.268C438.53,13.315,436.734,9.04,433.11,5.424z"}))))},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(0)),l=s(r(2));t.default=(({onClick:e,children:t})=>i.createElement(i.Fragment,null,i.createElement("button",{onClick:e,style:l.default.BUTTON},t)))},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(0)),i={position:"absolute",zIndex:1,bottom:50,opacity:0,left:"50%",marginLeft:-100,backgroundColor:"#323232",color:"#fff",border:"3px solid #323232",borderRadius:"3px"};t.default=s.memo(({images:e,imgClassName:t,isFullScreen:r,opacity:n,previewIndex:l})=>{if(!e||0===e.length)return null;const o=e.map((e,t)=>{const r=t===l?"inline":"none",n=`preview-${t}`;return s.createElement("img",{className:n,style:{display:r,width:200},src:e,key:n})});let a=120;const c=document.querySelector(t);c&&(a=window.screen.availHeight-c.offsetHeight+30);const u=r?a:i.bottom,d=Object.assign({},i,{opacity:n,bottom:u});return s.createElement("div",{style:d},o,s.createElement("p",{style:{margin:0,textAlign:"center",fontSize:4}},`${l+1} / ${e.length}`))},(e,t)=>{if(e.images.length!==t.images.length)return!1;for(let r=0;r<e.images.length;r++)if(e.images[r]!==t.images[r])return!1;return e.imgClassName===t.imgClassName&&e.isFullScreen===t.isFullScreen&&e.opacity===t.opacity&&e.previewIndex===t.opacity})},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(0));t.default=s.memo(({style:e,onClick:t,onMouseMove:r,onMouseLeave:n,progress:i})=>s.createElement("div",{style:e,onClick:t,onMouseMove:r,onMouseLeave:n},s.createElement("div",{style:{backgroundColor:"#007bb6",height:"100%",width:`${i}%`}})),(e,t)=>e.progress===t.progress)},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(0));t.default=s.memo(({styles:e,src:t,onClickPrevButton:r,onClickNextButton:n,timestamp:i,imgClassName:l})=>{let o=t;return i&&(o+=`?${i}`),s.createElement("div",{style:e.IMAGE},s.createElement("img",{className:l,src:o,style:{width:"100%"}}),s.createElement("div",{onClick:r,style:e.PREV_ON_CONTENT}),s.createElement("div",{onClick:n,style:e.NEXT_ON_CONTENT}))},(e,t)=>e.imgClassName===t.imgClassName&&e.src===t.src&&e.timestamp===t.timestamp)}]);