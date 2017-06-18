/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = vendor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(181);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(7);

var _SlideShow = __webpack_require__(3);

var _SlideShow2 = _interopRequireDefault(_SlideShow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * entry point class for demo
 */
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',

    /**
     * rendering view
     * @returns {XML}
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SlideShow2.default, {
          style: { width: 400 },
          src: ['./img/example1.png', './img/example2.png', './img/example3.png'],
          withTimestamp: true
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('slideshow'));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = __webpack_require__(4);

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class named SlideShow is the React component that allows you
 * to develop slideshow like 'SlideShare' or 'SpeakerDeck' very easy!
 * @class
 */


/**
 * @typedef {Object} Props
 * @property {Object} style
 * @property {Array<string>} src,
 * @property {Node} prevIcon,
 * @property {Node} nextIcon
 * @property {boolean} withTimestamp
 */


/**
 * @typedef {Object} State
 * @property {string} src
 * @property {number} index
 * @property {number} progress
 * @property {number} timestamp
 */
var SlideShow = function (_React$Component) {
  _inherits(SlideShow, _React$Component);

  /**
   * constructor
   * call super constructor and initialize states.
   * @param {Props} props
   */
  function SlideShow(props) {
    _classCallCheck(this, SlideShow);

    var _this = _possibleConstructorReturn(this, (SlideShow.__proto__ || Object.getPrototypeOf(SlideShow)).call(this, props));

    _this.onClickPrevButton = function () {
      if (_this.isEmptyArray(_this.props.src)) {
        return;
      }

      if (_this.state.index === 0) {
        return;
      }

      var nextIndex = _this.state.index - 1;
      var nextProgress = _this.calcProgress(nextIndex + 1);

      var nextState = {
        src: _this.props.src[nextIndex],
        index: nextIndex,
        progress: nextProgress
      };
      _this.setState(nextState);
    };

    _this.onClickNextButton = function () {
      if (!_this.props.src) {
        return;
      }

      if (_this.state.index === _this.props.src.length - 1) {
        return;
      }
      var nextIndex = _this.state.index + 1;
      var nextProgress = _this.calcProgress(nextIndex + 1);
      if (nextProgress > 100) {
        nextProgress = 100;
      }

      var nextState = {
        src: _this.props.src[nextIndex],
        index: nextIndex,
        progress: nextProgress
      };
      _this.setState(nextState);
    };

    _this.onClickProgressBar = function (e) {
      var barWidth = document.getElementsByClassName('progressBar')[0].offsetWidth;
      var progressWidth = e.clientX;
      var clickPosition = Math.floor(progressWidth / barWidth * 100);
      var nextIndex = 0;
      for (var i = 0; i < _this.props.src.length; i++) {
        var checkWidth = _this.calcProgress(i);
        if (clickPosition >= checkWidth) {
          nextIndex = i;
        }
      }
      var nextProgress = _this.calcProgress(nextIndex + 1);
      var nextSrc = _this.props.src[nextIndex];
      _this.setState({
        src: nextSrc,
        index: nextIndex,
        progress: nextProgress
      });
    };

    _this.calcProgress = function (page) {
      var base = 100 / _this.props.src.length;
      var progress = Math.ceil(base * page);
      if (progress > 100) {
        return 100;
      }
      return progress;
    };

    _this.isEmptyArray = function (arr) {
      return arr === undefined || arr === null || arr.length === 0;
    };

    var timestamp = 0;
    if (props.withTimestamp === true) {
      timestamp = Math.floor(new Date().getTime() / 1000);
    }

    _this.state = {
      src: '',
      index: 0,
      progress: 0,
      timestamp: timestamp
    };
    return _this;
  }

  /**
   * componentWillMount
   * updates states with props to render first view.
   * updates image src, page, and progress.
   */


  _createClass(SlideShow, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var images = this.props.src;
      if (this.isEmptyArray(this.props.src)) {
        return;
      }
      var progress = Math.ceil(100 / images.length);
      if (progress > 100) {
        progress = 100;
      }

      this.setState({
        src: images[0],
        index: 0,
        progress: progress
      });
    }

    /**
     * event executed when previous button is clicked.
     * updates image src and page to move previous page.
     */


    /**
     * event executed when next button is clicked.
     * updates image src and page to move next page.
     */


    /**
     * event executed when progressBar is clicked.
     * updates states to move page.
     * @param {MouseEvent} e
     */


    /**
     *
     * @param {number} page
     * @returns {number}
     */

  }, {
    key: 'render',


    /**
     * render
     * @returns {XML}
     */
    value: function render() {
      var src = this.state.src;
      if (this.props.withTimestamp === true) {
        src += '?' + this.state.timestamp;
      }

      return _react2.default.createElement(
        'div',
        { style: this.props.style },
        _react2.default.createElement('div', { style: styles.BAR }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: styles.IMAGE },
            _react2.default.createElement('img', { className: 'content', src: src, style: { width: '100%' } }),
            _react2.default.createElement('div', {
              className: 'prevOnContent',
              onClick: this.onClickPrevButton,
              style: styles.PREV_ON_CONTENT
            }),
            _react2.default.createElement('div', {
              className: 'nextOnContent',
              onClick: this.onClickNextButton,
              style: styles.NEXT_ON_CONTENT
            })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'progressBar',
            style: {
              backgroundColor: '#000',
              height: 10,
              marginTop: -6,
              position: 'relative',
              width: '100%'
            },
            onClick: this.onClickProgressBar
          },
          _react2.default.createElement('div', {
            className: 'progress',
            style: {
              backgroundColor: '#007bb6',
              height: '100%',
              width: this.state.progress + '%'
            }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'bar', style: styles.BAR },
          _react2.default.createElement(
            'button',
            {
              className: 'prevButton',
              onClick: this.onClickPrevButton,
              style: styles.BUTTON
            },
            this.props.prevIcon
          ),
          _react2.default.createElement(
            'span',
            { style: styles.PAGE_VIEW },
            this.props.src ? this.state.index + 1 + ' / ' + this.props.src.length : null
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'nextButton',
              onClick: this.onClickNextButton,
              style: styles.BUTTON
            },
            this.props.nextIcon
          )
        )
      );
    }
  }]);

  return SlideShow;
}(_react2.default.Component);

exports.default = SlideShow;


SlideShow.defaultProps = {
  arrowButtonStyle: styles.ARROW_BUTTON,
  style: {},
  src: [],
  prevIcon: _react2.default.createElement(
    'svg',
    { style: styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', {
      fill: '#fff',
      d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)'
    })
  ),
  nextIcon: _react2.default.createElement(
    'svg',
    { style: styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', {
      fill: '#fff',
      d: 'M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z',
      transform: 'translate(0 1)'
    })
  ),
  withTimestamp: false
};

SlideShow.PropTypes = {
  arrowButtonStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  src: _propTypes2.default.array,
  prevIcon: _propTypes2.default.node,
  nextIcon: _propTypes2.default.node,
  withTimestamp: _propTypes2.default.bool
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var IMAGE = exports.IMAGE = {
  position: 'relative',
  width: '100%'
};
var BUTTON = exports.BUTTON = {
  backgroundColor: 'transparent',
  border: 'none',
  margin: '0 20px',
  padding: 0
};
var BAR = exports.BAR = {
  backgroundColor: '#323232',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  margin: 'auto',
  width: '100%'
};
var PAGE_VIEW = exports.PAGE_VIEW = {
  color: '#fff'
};
var ARROW_BUTTON = exports.ARROW_BUTTON = {
  backgroundColor: 'transparent',
  height: '15px'
};
var PREV_ON_CONTENT = exports.PREV_ON_CONTENT = {
  display: 'block',
  width: '40%',
  height: '100%',
  top: 0,
  left: 0,
  position: 'absolute',
  cursor: 'url(' + '"data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/' + 'AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYREQ4Xdp3G0wAAAZ9JREFUWMPt' + '1z1rFFEUBuBnhEAaC1FBC1OlVKzFjyqNKY0oqGCddAHzAwS7/AELOwvBwlRpNCAhENME' + 'C7UTFFc0xKRJMEQxXpsTWMad3ZnZ3WyzLxwuc+/ce957PmcYYojqOIYZrGIbn3D3KAk8' + 'RcrJAa4dhfLLoXAPd1JKCQ9j7i2yfhOYC2WPUxPwJeZv1/FnHfzNPT+KcR6n+mmBybjp' + '+5QDlmPtZRcXM44F7LQItLzczBE4i++xNl9X+Y8Sig/lQwsrXMV+E4nRKgQWYuMrnEs1' + 'gSn8bkP8K663IrAbL4ylLhGWeNOGSONQaXPe7uB43L7Rq6jNssLSkOXTcCnGJ1mWjQ2i' + 'xo9jq53varqjSP4rRB9xKYJxtwXBtUF1v4mitOuFBcpgFJux6VY/XVCE/Wg28K0fHxdl' + '8DnGi4OKg6kw2xbO1HTBlZDKLoAXYf6TONFNXerGCqvB/F6HG9/H86j5fzqV4ip4EJs3' + 'cKNJ4QVMYxG/SnTRRlEzKpOOrzscfoAVzOI8RnodjCNx+Dp+RgN7h2dh+tPDv5YhquIf' + 'vGpAec8aptcAAAAASUVORK5CYII="' + '), auto'
};
var NEXT_ON_CONTENT = exports.NEXT_ON_CONTENT = {
  display: 'block',
  width: '40%',
  height: '100%',
  top: 0,
  right: 0,
  position: 'absolute',
  cursor: 'url(' + '"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0A' + 'AAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYRE' + 'Q4zSp4iAgAAAapJREFUWMPt179rFEEUB/DPhUistFCLNGksFSxFURurpBNEMRZpFWwE/' + 'wHr+A+IjdgognZpLo0/QKy0UEklERMNQQXxMCDcMRa+lWPZ29xubq+6Lwyz+2bffL9v5' + 's08lgkmqI+rWMcPvMJ1TI2L/Bx6SLn2YBzkLbwNwjsppYRF7ITtVNMCLgfRVuoD7ob9V' + 'pXJqu7ZYSzH8+3cWK/pyKfQjiifpxzwPsbmmxKwnC09ZnPkFwsSMt9+4SmOViXe30e+g' + 'zMF0X8YQkDWvg0SsYDNEsc/WEg1gTmsxlxPigRslhC/wOm0R4SIbDv+n+kMqUjVP78RX' + 'SCt1hw+h4CDxnl1Bvm9eG0XBlvUai51WS5970/CplbgdYEtO4Yn8bHpFVgL//NVVI9EA' + 'C6F7zZmRl0LhsHX6DfiCI9dwInoPw3z8XSB7Wz0L2sctdkoSvBoL+W4VTP6AziEL4Ou2' + 'zJsDEjEbow9xlK3210vScAr4fOsjvr5EhH52rCCaziWUkqdTuc+LkQCJtwYZVLtw3Hcj' + 'Lzo7SKwHT6N4QiW8BDv8BO/8SZETk/+WCaogr+r/hCMZ83IlAAAAABJRU5ErkJggg=="' + '), auto'
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(6)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(96);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(97);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);