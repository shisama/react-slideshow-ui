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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

var _reactDom = __webpack_require__(6);

var _SlideShow = __webpack_require__(3);

var _SlideShow2 = _interopRequireDefault(_SlideShow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_SlideShow2.default, {
          style: { width: "50%" },
          src: ["./img/example1.png", "./img/example2.png", "./img/example3.png"]
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById("slideshow"));

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

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideShow = function (_React$Component) {
  _inherits(SlideShow, _React$Component);

  function SlideShow(props) {
    _classCallCheck(this, SlideShow);

    var _this = _possibleConstructorReturn(this, (SlideShow.__proto__ || Object.getPrototypeOf(SlideShow)).call(this, props));

    _this.onClickPrevButton = function () {
      if (_this.state.index === 0) {
        return;
      }
      var nextIndex = _this.state.index - 1;
      var nextState = {
        src: _this.props.src[nextIndex],
        index: nextIndex
      };
      _this.setState(nextState);
    };

    _this.onClickNextButton = function () {
      if (_this.state.index === _this.props.src.length - 1) {
        return;
      }
      var nextIndex = _this.state.index + 1;
      var nextState = {
        src: _this.props.src[nextIndex],
        index: nextIndex
      };
      _this.setState(nextState);
    };

    _this.state = {
      src: "",
      index: 0
    };
    _this.style = Object.assign({}, defaultProps.style, _this.props.style);
    return _this;
  }

  _createClass(SlideShow, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var images = this.props.src;
      if (images === undefined || images === null || images.length === 0) {
        return;
      }

      this.setState({
        src: images[0],
        index: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { style: this.style },
        _react2.default.createElement("div", { style: styles.bar }),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { style: styles.image },
            _react2.default.createElement("img", { className: "content", src: this.state.src, style: { width: "100%" } }),
            _react2.default.createElement("div", { className: "prevOnContent", onClick: this.onClickPrevButton, style: { display: "block", width: "50%", height: "100%", top: 0, left: 0, position: "absolute" } }),
            _react2.default.createElement("div", { className: "nextOnContent", onClick: this.onClickNextButton, style: { display: "block", width: "50%", height: "100%", top: 0, right: 0, position: "absolute" } })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "bar", style: styles.bar },
          _react2.default.createElement(
            "button",
            { className: "prevButton", onClick: this.onClickPrevButton, style: styles.button },
            this.props.prevIcon
          ),
          _react2.default.createElement(
            "span",
            { style: styles.pageView },
            this.state.index + 1 + " / " + this.props.src.length
          ),
          _react2.default.createElement(
            "button",
            { className: "nextButton", onClick: this.onClickNextButton, style: styles.button },
            this.props.nextIcon
          )
        )
      );
    }
  }]);

  return SlideShow;
}(_react2.default.Component);

exports.default = SlideShow;


var styles = {
  image: {
    marginTop: "10px",
    position: "relative",
    width: "100%"
  },
  button: {
    backgroundColor: "#000",
    border: "none",
    margin: "0 20px",
    padding: 0
  },
  bar: {
    height: "30px",
    textAlign: "center",
    margin: "auto",
    width: "90%"
  },
  pageView: {
    color: "#fff"
  }
};

var defaultProps = {
  style: {
    backgroundColor: "#000",
    border: "1px solid #000",
    borderRadius: "10px"
  }
};

SlideShow.defaultProps = {
  style: defaultProps.style,
  prevIcon: _react2.default.createElement("img", { src: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0MC4yNSA0NDAuMjUxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDAuMjUgNDQwLjI1MTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik00MzYuNTM4LDAuODYxYy0yLjQ3MS0xLjE0My01LjUxMywwLjA5NC05LjEzNCwzLjcwOUwyMjQuNjkyLDIwNy4yNzNjLTEuNTIxLDEuNTI0LTIuNzYyLDMuMzMzLTMuNzExLDUuNDI0VjkuOTg5ICAgYzAtNC45NDgtMS4yMzctNy45OTQtMy43MTEtOS4xMzdjLTIuNDc0LTEuMTQxLTUuNTIsMC4wOTYtOS4xMzYsMy43MTFMNS40MjQsMjA3LjI3M0MxLjgwOSwyMTAuODkxLDAsMjE1LjE3MiwwLDIyMC4xMiAgIHMxLjgwOSw5LjIzMyw1LjQyNCwxMi44NDdsMjAyLjcxLDIwMi43MDljMy42MTYsMy42Miw2LjY2Miw0Ljg2Miw5LjEzNiwzLjcyYzIuNDc0LTEuMTQ0LDMuNzExLTQuMTg5LDMuNzExLTkuMTM4VjIyNy41NDYgICBjMC45NTMsMS45MDMsMi4xOSwzLjcxNywzLjcxMSw1LjQyNWwyMDIuNzEyLDIwMi43MTFjMy42MjEsMy42MTcsNi42NjMsNC44Niw5LjEzNCwzLjcxN2MyLjQ3OC0xLjE0MywzLjcxMy00LjE4OCwzLjcxMy05LjEzNyAgIFY5Ljk5NkM0NDAuMjQ4LDUuMDQ4LDQzOS4wMTUsMi4wMDIsNDM2LjUzOCwwLjg2MXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K", style: { backgroundColor: "#000" } }),
  nextIcon: _react2.default.createElement("img", { src: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0MC4yNSA0NDAuMjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0MC4yNSA0NDAuMjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDM0LjgyMywyMDcuMjc5TDIzMi4xMTEsNC41NzFjLTMuNjA5LTMuNjE3LTYuNjU1LTQuODU2LTkuMTMzLTMuNzEzYy0yLjQ3NSwxLjE0My0zLjcxMiw0LjE4OS0zLjcxMiw5LjEzN3YyMDIuNzA4ICAgYy0wLjk0OS0yLjA5MS0yLjE4Ny0zLjkwMS0zLjcxMS01LjQyNEwxMi44NDcsNC41NzFDOS4yMjksMC45NTQsNi4xODYtMC4yODUsMy43MTEsMC44NThDMS4yMzcsMi4wMDEsMCw1LjA0NywwLDkuOTk1djQyMC4yNjIgICBjMCw0Ljk0OCwxLjIzNyw3Ljk5NCwzLjcxMSw5LjEzOGMyLjQ3NCwxLjE0LDUuNTE4LTAuMSw5LjEzNS0zLjcyMWwyMDIuNzA4LTIwMi43MDFjMS41MjEtMS43MTEsMi43NjItMy41MjQsMy43MTEtNS40Mjh2MjAyLjcxMiAgIGMwLDQuOTQ4LDEuMjM3LDcuOTkxLDMuNzEyLDkuMTMxYzIuNDc4LDEuMTQzLDUuNTIzLTAuMDkzLDkuMTMzLTMuNzE0bDIwMi43MTItMjAyLjcwOGMzLjYxLTMuNjE3LDUuNDI4LTcuOTAxLDUuNDI4LTEyLjg0NyAgIEM0NDAuMjQ4LDIxNS4xNzgsNDM4LjQzMywyMTAuODk2LDQzNC44MjMsMjA3LjI3OXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K", style: { backgroundColor: "#000" } })
};

SlideShow.PropTypes = {
  style: _propTypes2.default.object,
  src: _propTypes2.default.array.isRequired,
  prevIcon: _propTypes2.default.node,
  nextIcon: _propTypes2.default.node
};

/***/ }),
/* 4 */
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
  module.exports = __webpack_require__(5)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(96);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(97);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);