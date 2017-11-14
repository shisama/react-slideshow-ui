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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(6);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = vendor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SlideShow = __webpack_require__(5);

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
          style: { width: 400, left: '40%', top: 50 },
          images: ['./img/example1.png', './img/example2.png', './img/example3.png'],
          withTimestamp: true,
          pageWillUpdate: function pageWillUpdate(index, image) {
            console.log('Page Update! index: ' + index + ', image: ' + image);
          }
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('slideshow'));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(19);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _Styles = __webpack_require__(6);

var _Styles2 = _interopRequireDefault(_Styles);

var _toggleFullscreen = __webpack_require__(7);

var toggleFullscreenFuncs = _interopRequireWildcard(_toggleFullscreen);

var _shallowEqualObject = __webpack_require__(8);

var _shallowEqualObject2 = _interopRequireDefault(_shallowEqualObject);

var _typedef = __webpack_require__(9);

var _Preview = __webpack_require__(10);

var _Preview2 = _interopRequireDefault(_Preview);

var _FullscreenIcon = __webpack_require__(11);

var _FullscreenIcon2 = _interopRequireDefault(_FullscreenIcon);

var _FullscreenButton = __webpack_require__(12);

var _FullscreenButton2 = _interopRequireDefault(_FullscreenButton);

var _Viewer = __webpack_require__(13);

var _Viewer2 = _interopRequireDefault(_Viewer);

var _Bar = __webpack_require__(14);

var _Bar2 = _interopRequireDefault(_Bar);

var _ProgressBar = __webpack_require__(15);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toggleFullscreen = toggleFullscreenFuncs.default;
var fullscreenChange = toggleFullscreen.fullscreenChange;
var isFullscreen = toggleFullscreen.isFullscreen;

/**
 * This class named SlideShow is the React component that allows you
 * to develop slideshow like 'SlideShare' or 'SpeakerDeck' very easy!
 * @class
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
      if (_this.isEmptyArray(_this.props.images)) {
        return;
      }

      if (_this.state.index === 0) {
        return;
      }

      var nextIndex = _this.state.index - 1;
      _this.updatePageState(nextIndex);
    };

    _this.onClickNextButton = function () {
      if (!_this.props.images) {
        return;
      }

      if (_this.state.index === _this.props.images.length - 1) {
        return;
      }
      var nextIndex = _this.state.index + 1;
      _this.updatePageState(nextIndex);
    };

    _this.onClickProgressBar = function (e) {
      var nextIndex = _this.calcProgressIndex(e);
      if (nextIndex === undefined || nextIndex === null) {
        return;
      }
      _this.updatePageState(nextIndex);
    };

    _this.onMouseMoveProgressBar = function (e) {
      var nextIndex = _this.calcProgressIndex(e);
      _this.setState({
        preview: 1,
        previewIndex: nextIndex
      });
    };

    _this.onMouseLeaveProgressBar = function (e) {
      _this.setState({
        preview: 0
      });
    };

    _this.onChangeFullScreen = function () {
      var element = document.getElementsByClassName('slideshow-wrapper')[0];
      var fn = function fn() {
        var isFullScreen = isFullscreen();
        _this.setState({ isFullScreen: isFullScreen });
        if (isFullScreen) {
          document.addEventListener('keydown', _this.keydownEvent);
          element.style.width = '70%';
        } else {
          document.removeEventListener('keydown', _this.keydownEvent);
          element.style.width = '100%';
        }
      };
      Promise.all([toggleFullscreen(element), fullscreenChange(fn)]);
    };

    _this.keydownEvent = function (e) {
      e.preventDefault();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.keyCode === 37 || e.keyCode === 38) {
        _this.onClickPrevButton();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
        _this.onClickNextButton();
      } else if (e.key === 'Escape' || e.keyCode === 27) {
        _this.onChangeFullScreen();
      }
    };

    _this.calcProgressIndex = function (e) {
      var parent = e.currentTarget.parentElement;
      if (!parent) {
        return;
      }
      var barWidth = parent.children[0].offsetWidth;
      var progressWidth = e.clientX - e.currentTarget.getBoundingClientRect().left;
      if (_this.state.isFullScreen) {
        progressWidth -= parent.children[0].offsetLeft;
      }
      var clickPosition = Math.floor(progressWidth / barWidth * 100);
      var nextIndex = 0;
      for (var i = 0; i < _this.props.images.length; i++) {
        var checkWidth = _this.calcProgress(i);
        if (clickPosition >= checkWidth) {
          nextIndex = i;
        }
      }
      return nextIndex;
    };

    _this.calcProgress = function (page) {
      var base = 100 / _this.props.images.length;
      var progress = Math.ceil(base * page);
      if (progress > 100) {
        return 100;
      }
      return progress;
    };

    _this.isEmptyArray = function (arr) {
      return arr === undefined || arr === null || arr.length === 0;
    };

    _this.updatePageState = function (index) {
      var progress = _this.calcProgress(index + 1);
      var image = _this.props.images[index];
      _this.setState({
        src: image,
        index: index,
        progress: progress
      });
      _this.props.pageWillUpdate(index, image);
    };

    _this.timestamp = 0;
    if (props.withTimestamp === true) {
      _this.timestamp = Math.floor(new Date().getTime() / 1000);
    }

    _this.state = {
      src: '',
      index: 0,
      progress: 0,
      preview: 0,
      previewIndex: 0,
      isFullScreen: false
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
      var images = this.props.images;
      if (this.isEmptyArray(this.props.images)) {
        return;
      }
      var progress = Math.ceil(100 / images.length);
      if (progress > 100) {
        progress = 100;
      }

      this.setState({
        src: images[0],
        index: 0,
        progress: progress,
        preview: 0,
        previewIndex: 0,
        isFullScreen: false
      });
    }

    /**
     * shouldComponentUpdate
     * @param {Props} nextProps
     * @param {State} nextState
     * @return {boolean}
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if ((0, _shallowEqualObject2.default)(this.props, nextProps)) {
        return true;
      }

      if ((0, _shallowEqualObject2.default)(this.state, nextState)) {
        return true;
      }

      if ((0, _shallowEqualObject2.default)(this.props.style, nextProps.style)) {
        return true;
      }

      if (this.props.images.length !== nextProps.images.length) {
        return true;
      }

      for (var i = 0; i < this.props.images.length; i++) {
        var prev = this.props.images[i];
        var next = nextProps.images[i];
        if (prev !== next) {
          return true;
        }
      }
      return false;
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
      var style = _extends({}, _Styles2.default.ROOT, this.props.style);

      var IMG_CLASS_NAME = 'content';

      return React.createElement(
        'div',
        { style: style, className: 'slideshow' },
        React.createElement(
          'div',
          { className: 'slideshow-wrapper', style: { margin: 'auto' } },
          React.createElement(_Viewer2.default, {
            imgClassName: IMG_CLASS_NAME,
            styles: _Styles2.default,
            src: this.state.src,
            onClickPrevButton: this.onClickPrevButton,
            onClickNextButton: this.onClickNextButton,
            timestamp: this.timestamp
          }),
          React.createElement(_Preview2.default, {
            opacity: this.state.preview,
            previewIndex: this.state.previewIndex,
            images: this.props.images,
            isFullScreen: this.state.isFullScreen,
            imgClassName: IMG_CLASS_NAME
          }),
          React.createElement(_ProgressBar2.default, {
            style: _Styles2.default.PROGRESS_BAR,
            onClick: this.onClickProgressBar,
            onMouseMove: this.onMouseMoveProgressBar,
            onMouseLeave: this.onMouseLeaveProgressBar,
            progress: this.state.progress
          }),
          React.createElement(
            _Bar2.default,
            {
              styles: _Styles2.default,
              onClickPrevButton: this.onClickPrevButton,
              onClickNextButton: this.onClickNextButton,
              currentPage: this.state.index + 1,
              allPages: this.props.images ? this.props.images.length : 0,
              prevIcon: this.props.prevIcon,
              nextIcon: this.props.nextIcon
            },
            React.createElement(
              _FullscreenButton2.default,
              { onClick: this.onChangeFullScreen },
              React.createElement(_FullscreenIcon2.default, { isFullScreen: this.state.isFullScreen })
            )
          )
        )
      );
    }
  }]);

  return SlideShow;
}(React.Component);

exports.default = SlideShow;


SlideShow.defaultProps = {
  arrowButtonStyle: _Styles2.default.ARROW_BUTTON,
  style: {},
  images: [],
  prevIcon: React.createElement(
    'svg',
    { style: _Styles2.default.ARROW_BUTTON, viewBox: '0 0 8 8' },
    React.createElement('path', {
      fill: '#fff',
      d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)'
    })
  ),
  nextIcon: React.createElement(
    'svg',
    { style: _Styles2.default.ARROW_BUTTON, viewBox: '0 0 8 8' },
    React.createElement('path', {
      fill: '#fff',
      d: 'M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z',
      transform: 'translate(0 1)'
    })
  ),
  withTimestamp: false,
  pageWillUpdate: function pageWillUpdate(index, image) {
    return;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ROOT: {
    backgroundColor: 'transparent',
    border: 0,
    fontSize: '100%',
    lineHeight: 1,
    margin: 0,
    outline: 0,
    padding: 0,
    position: 'relative',
    textDecoration: 'none'
  },
  IMAGE: {
    position: 'relative',
    width: '100%'
  },
  BUTTON: {
    backgroundColor: 'transparent',
    border: 'none',
    margin: '0 20px',
    padding: 0
  },
  BAR: {
    backgroundColor: '#323232',
    height: '30px',
    lineHeight: '30px',
    margin: 'auto',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  PAGE_VIEW: {
    color: '#fff'
  },
  ARROW_BUTTON: {
    backgroundColor: 'transparent',
    height: '15px',
    width: '15px'
  },
  PREV_ON_CONTENT: {
    display: 'block',
    width: '40%',
    height: '95%',
    top: 0,
    left: 0,
    position: 'absolute',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYREQ4Xdp3G0wAAAZ9JREFUWMPt1z1rFFEUBuBnhEAaC1FBC1OlVKzFjyqNKY0oqGCddAHzAwS7/AELOwvBwlRpNCAhENMEC7UTFFc0xKRJMEQxXpsTWMad3ZnZ3WyzLxwuc+/ce957PmcYYojqOIYZrGIbn3D3KAk8RcrJAa4dhfLLoXAPd1JKCQ9j7i2yfhOYC2WPUxPwJeZv1/FnHfzNPT+KcR6n+mmBybjp+5QDlmPtZRcXM44F7LQItLzczBE4i++xNl9X+Y8Sig/lQwsrXMV+E4nRKgQWYuMrnEs1gSn8bkP8K663IrAbL4ylLhGWeNOGSONQaXPe7uB43L7Rq6jNssLSkOXTcCnGJ1mWjQ2ixo9jq53varqjSP4rRB9xKYJxtwXBtUF1v4mitOuFBcpgFJux6VY/XVCE/Wg28K0fHxdl8DnGi4OKg6kw2xbO1HTBlZDKLoAXYf6TONFNXerGCqvB/F6HG9/H86j5fzqV4ip4EJs3cKNJ4QVMYxG/SnTRRlEzKpOOrzscfoAVzOI8RnodjCNx+Dp+RgN7h2dh+tPDv5YhquIfvGpAec8aptcAAAAASUVORK5CYII="), auto'
  },
  NEXT_ON_CONTENT: {
    display: 'block',
    width: '40%',
    height: '95%',
    top: 0,
    right: 0,
    position: 'absolute',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYREQ4zSp4iAgAAAapJREFUWMPt179rFEEUB/DPhUistFCLNGksFSxFURurpBNEMRZpFWwE/wHr+A+IjdgognZpLo0/QKy0UEklERMNQQXxMCDcMRa+lWPZ29xubq+6Lwyz+2bffL9v5s08lgkmqI+rWMcPvMJ1TI2L/Bx6SLn2YBzkLbwNwjsppYRF7ITtVNMCLgfRVuoD7ob9VpXJqu7ZYSzH8+3cWK/pyKfQjiifpxzwPsbmmxKwnC09ZnPkFwsSMt9+4SmOViXe30e+gzMF0X8YQkDWvg0SsYDNEsc/WEg1gTmsxlxPigRslhC/wOm0R4SIbDv+n+kMqUjVP78RXSCt1hw+h4CDxnl1Bvm9eG0XBlvUai51WS5970/CplbgdYEtO4Yn8bHpFVgL//NVVI9EAC6F7zZmRl0LhsHX6DfiCI9dwInoPw3z8XSB7Wz0L2sctdkoSvBoL+W4VTP6AziEL4Ou2zJsDEjEbow9xlK3210vScAr4fOsjvr5EhH52rCCaziWUkqdTuc+LkQCJtwYZVLtw3HcjLzo7SKwHT6N4QiW8BDv8BO/8SZETk/+WCaogr+r/hCMZ83IlAAAAABJRU5ErkJggg=="), auto'
  },
  PROGRESS_BAR: {
    backgroundColor: '#000',
    height: 10,
    marginTop: -6,
    position: 'relative',
    width: '100%'
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(33);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * shallow equal
 * @param {Object} prevObj
 * @param {Object} nextObj
 * @private
 */
function shallowEqualObject(prevObj, nextObj) {
  var prevKeys = Object.keys(prevObj);
  var nextKeys = Object.keys(nextObj);
  if (prevKeys.length !== nextKeys.length) {
    return true;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = prevKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var prev = prevObj[key];
      var next = nextObj[key];
      if (prev !== next) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

module.exports = shallowEqualObject;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-next-line no-unused-vars


exports.default = function (props) {
  if (!props.images || props.images.length === 0) {
    return null;
  }
  var previews = props.images.map(function (img, index) {
    var display = index === props.previewIndex ? 'inline' : 'none';
    var key = 'preview-' + index;
    return React.createElement('img', {
      className: key,
      style: { display: display, width: 200 },
      src: img,
      key: key
    });
  });

  var fullscreenBottom = 120;
  var imgView = document.querySelector(props.imgClassName);
  if (imgView) {
    fullscreenBottom = window.screen.availHeight - imgView.offsetHeight + 30;
  }
  var bottom = props.isFullScreen ? fullscreenBottom : PREVIEW.bottom;
  var style = _extends({}, PREVIEW, {
    opacity: props.opacity,
    bottom: bottom
  });
  return React.createElement(
    'div',
    { style: style },
    previews,
    React.createElement(
      'p',
      { style: { margin: 0, textAlign: 'center', fontSize: 4 } },
      props.previewIndex + 1 + ' / ' + props.images.length
    )
  );
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PREVIEW = {
  position: 'absolute',
  zIndex: 1,
  bottom: 50,
  opacity: 0,
  left: '50%',
  marginLeft: -100,
  backgroundColor: '#323232',
  color: '#fff',
  border: '3px solid #323232',
  borderRadius: '3px'
};

/**
 *
 * @param props
 * @return {XML}
 */

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var isFullScreen = props.isFullScreen;

  if (isFullScreen) {
    return React.createElement(
      "svg",
      { id: "no-fullscreen", width: "15", height: "15", viewBox: "0 0 612 612" },
      React.createElement(
        "g",
        null,
        React.createElement(
          "g",
          { id: "_x36_" },
          React.createElement(
            "g",
            null,
            React.createElement("path", {
              d: "M260.655,351.173c-3.615-4.016-8.721-6.636-14.554-6.655l-164.915-0.229c-10.92-0.019-19.756,8.816-19.737,19.737     c0.019,10.92,12.756,23.198,18.226,28.668l41.711,41.712L0,554.625L57.375,612l119.608-121.979l41.711,41.712     c9.027,9.027,18.188,18.628,29.108,18.646c10.92,0.02,19.756-8.816,19.737-19.736l-0.229-164.915     C267.291,359.895,264.671,354.788,260.655,351.173z M493.119,175.472L612,57.375L554.625,0L436.566,118.556l-42.419-42.687     c-9.181-9.238-18.494-19.068-29.587-19.087c-11.111-0.019-20.081,9.027-20.081,20.196l0.229,168.797     c0,5.967,2.678,11.188,6.771,14.898c3.69,4.112,8.874,6.789,14.803,6.809l167.726,0.229c11.093,0.019,20.082-9.027,20.082-20.196     c-0.02-11.169-12.967-23.753-18.532-29.338L493.119,175.472z",
              fill: "#FFFFFF"
            })
          )
        )
      )
    );
  } else {
    return React.createElement(
      "svg",
      { id: "fullscreen", width: "15", height: "15", viewBox: "0 0 438.529 438.529" },
      React.createElement(
        "g",
        { fill: "#fff" },
        React.createElement("path", { d: "M180.156,225.828c-1.903-1.902-4.093-2.854-6.567-2.854c-2.475,0-4.665,0.951-6.567,2.854l-94.787,94.787l-41.112-41.117 c-3.617-3.61-7.895-5.421-12.847-5.421c-4.952,0-9.235,1.811-12.851,5.421c-3.617,3.621-5.424,7.905-5.424,12.854v127.907 c0,4.948,1.807,9.229,5.424,12.847c3.619,3.613,7.902,5.424,12.851,5.424h127.906c4.949,0,9.23-1.811,12.847-5.424 c3.615-3.617,5.424-7.898,5.424-12.847s-1.809-9.233-5.424-12.854l-41.112-41.104l94.787-94.793 c1.902-1.903,2.853-4.086,2.853-6.564c0-2.478-0.953-4.66-2.853-6.57L180.156,225.828z" }),
        React.createElement("path", { d: "M433.11,5.424C429.496,1.807,425.212,0,420.263,0H292.356c-4.948,0-9.227,1.807-12.847,5.424 c-3.614,3.615-5.421,7.898-5.421,12.847s1.807,9.233,5.421,12.847l41.106,41.112l-94.786,94.787 c-1.901,1.906-2.854,4.093-2.854,6.567s0.953,4.665,2.854,6.567l32.552,32.548c1.902,1.903,4.086,2.853,6.563,2.853 s4.661-0.95,6.563-2.853l94.794-94.787l41.104,41.109c3.62,3.616,7.905,5.428,12.854,5.428s9.229-1.812,12.847-5.428 c3.614-3.614,5.421-7.898,5.421-12.847V18.268C438.53,13.315,436.734,9.04,433.11,5.424z" })
      )
    );
  }
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        style: {
          backgroundColor: 'transparent',
          borderStyle: 'none',
          position: 'absolute',
          right: 10,
          top: 5
        },
        onClick: props.onClick
      },
      props.children
    )
  );
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var styles = props.styles,
      src = props.src,
      onClickPrevButton = props.onClickPrevButton,
      onClickNextButton = props.onClickNextButton,
      timestamp = props.timestamp,
      imgClassName = props.imgClassName;


  var _src = src;
  if (timestamp) {
    _src += '?' + timestamp;
  }

  return React.createElement(
    'div',
    { style: styles.IMAGE },
    React.createElement('img', { className: imgClassName, src: _src, style: { width: '100%' } }),
    React.createElement('div', { onClick: onClickPrevButton, style: styles.PREV_ON_CONTENT }),
    React.createElement('div', { onClick: onClickNextButton, style: styles.NEXT_ON_CONTENT })
  );
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var styles = props.styles,
      onClickPrevButton = props.onClickPrevButton,
      onClickNextButton = props.onClickNextButton,
      currentPage = props.currentPage,
      allPages = props.allPages,
      prevIcon = props.prevIcon,
      nextIcon = props.nextIcon,
      children = props.children;


  return React.createElement(
    'div',
    { style: styles.BAR },
    React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: onClickPrevButton, style: styles.BUTTON },
        prevIcon
      ),
      React.createElement(
        'span',
        { style: styles.PAGE_VIEW },
        currentPage + ' / ' + allPages
      ),
      React.createElement(
        'button',
        { onClick: onClickNextButton, style: styles.BUTTON },
        nextIcon
      )
    ),
    children
  );
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var style = props.style,
      onClick = props.onClick,
      onMouseMove = props.onMouseMove,
      onMouseLeave = props.onMouseLeave,
      progress = props.progress;


  return React.createElement(
    'div',
    {
      style: style,
      onClick: onClick,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave
    },
    React.createElement('div', {
      style: {
        backgroundColor: '#007bb6',
        height: '100%',
        width: progress + '%'
      }
    })
  );
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ })
/******/ ]);