"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styles = _interopRequireDefault(require("./styles"));

var _Preview = _interopRequireDefault(require("./Preview"));

var _FullscreenIcon = _interopRequireDefault(require("./FullscreenIcon"));

var _FullscreenButton = _interopRequireDefault(require("./FullscreenButton"));

var _Viewer = _interopRequireDefault(require("./Viewer"));

var _ProgressBar = _interopRequireDefault(require("./ProgressBar"));

var _PagingButton = _interopRequireDefault(require("./PagingButton"));

var _shallowEqualObject = _interopRequireDefault(require("./shallow-equal-object"));

var _toggleFullscreen = _interopRequireDefault(require("toggle-fullscreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fullscreenChange = _toggleFullscreen.default.fullscreenChange;
var isFullscreen = _toggleFullscreen.default.isFullscreen;

var SlideShow = function (_React$Component) {
  _inherits(SlideShow, _React$Component);

  function SlideShow(props) {
    var _this;

    _classCallCheck(this, SlideShow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlideShow).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "props", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timestamp", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickPrevButton", function () {
      if (_this.isEmptyArray(_this.props.images)) {
        return;
      }

      if (_this.state.index === 0) {
        return;
      }

      var nextIndex = _this.state.index - 1;

      _this.updatePageState(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickNextButton", function () {
      if (!_this.props.images) {
        return;
      }

      if (_this.state.index === _this.props.images.length - 1) {
        return;
      }

      var nextIndex = _this.state.index + 1;

      _this.updatePageState(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickProgressBar", function (e) {
      var nextIndex = _this.calcProgressIndex(e);

      if (nextIndex === undefined || nextIndex === null) {
        return;
      }

      _this.updatePageState(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseMoveProgressBar", function (e) {
      var nextIndex = _this.calcProgressIndex(e);

      _this.setState({
        preview: 1,
        previewIndex: nextIndex
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseLeaveProgressBar", function (e) {
      _this.setState({
        preview: 0
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeFullScreen", function () {
      var element = document.getElementsByClassName("".concat(_this.props.className, "-wrapper"))[0];

      var fn = function fn() {
        var isFullScreen = isFullscreen();

        _this.setState({
          isFullScreen: isFullScreen
        });

        if (isFullScreen) {
          document.addEventListener('keydown', _this.keydownEvent);
          element.style.width = '70%';
        } else {
          document.removeEventListener('keydown', _this.keydownEvent);
          element.style.width = '100%';
        }
      };

      Promise.all([(0, _toggleFullscreen.default)(element), fullscreenChange(fn)]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keydownEvent", function (e) {
      e.preventDefault();

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.keyCode === 37 || e.keyCode === 38) {
        _this.onClickPrevButton();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
        _this.onClickNextButton();
      } else if (e.key === 'Escape' || e.keyCode === 27) {
        _this.onChangeFullScreen();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calcProgressIndex", function (e) {
      var parent = e.currentTarget.parentElement;

      if (!parent) {
        return;
      }

      var barWidth = parent.children[0].offsetWidth;
      var progressWidth = e.clientX - e.currentTarget.getBoundingClientRect().left;
      var clickPosition = Math.floor(progressWidth / barWidth * 100);
      var nextIndex = 0;

      for (var i = 0; i < _this.props.images.length; i++) {
        var checkWidth = _this.calcProgress(i);

        if (clickPosition >= checkWidth) {
          nextIndex = i;
        }
      }

      return nextIndex;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calcProgress", function (page) {
      var base = 100 / _this.props.images.length;
      var progress = Math.ceil(base * page);

      if (progress > 100) {
        return 100;
      }

      return progress;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isEmptyArray", function (arr) {
      return arr === undefined || arr === null || arr.length === 0;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePageState", function (index) {
      var progress = _this.calcProgress(index + 1);

      var image = _this.props.images[index];

      _this.setState({
        src: image,
        index: index,
        progress: progress
      });

      _this.props.pageWillUpdate(index, image);
    });

    _this.timestamp = 0;

    if (props.withTimestamp === true) {
      _this.timestamp = Math.floor(new Date().getTime() / 1000);
    }

    if (props.style) {
      for (var key in props.style) {
        if (props.style.hasOwnProperty(key)) {
          _styles.default.ROOT[key] = props.style[key];
        }
      }
    }

    if (_styles.default.ROOT.height) {
      _styles.default.IMAGE.height = _styles.default.ROOT.height - _styles.default.BAR.height - _styles.default.PROGRESS_BAR.height + 5;
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

  _createClass(SlideShow, [{
    key: "componentWillMount",
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
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if ((0, _shallowEqualObject.default)(this.props, nextProps)) {
        return true;
      }

      if ((0, _shallowEqualObject.default)(this.state, nextState)) {
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
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: _styles.default.ROOT,
        className: this.props.className
      }, React.createElement("div", {
        className: "".concat(this.props.className, "-wrapper"),
        style: {
          margin: 'auto'
        }
      }, React.createElement(_Viewer.default, {
        imgClassName: "".concat(this.props.className, "-image"),
        styles: _styles.default,
        src: this.state.src,
        onClickPrevButton: this.onClickPrevButton,
        onClickNextButton: this.onClickNextButton,
        timestamp: this.timestamp
      }), React.createElement(_Preview.default, {
        opacity: this.state.preview,
        previewIndex: this.state.previewIndex,
        images: this.props.images,
        isFullScreen: this.state.isFullScreen,
        imgClassName: "".concat(this.props.className, "-image")
      }), React.createElement(_ProgressBar.default, {
        style: _styles.default.PROGRESS_BAR,
        onClick: this.onClickProgressBar,
        onMouseMove: this.onMouseMoveProgressBar,
        onMouseLeave: this.onMouseLeaveProgressBar,
        progress: this.state.progress
      }), React.createElement("div", {
        style: _styles.default.BAR
      }, React.createElement(_PagingButton.default, {
        onClick: this.onClickPrevButton
      }, this.props.prevIcon), React.createElement("span", {
        style: _styles.default.PAGE_VIEW
      }, "".concat(this.state.index + 1, " / ").concat(this.props.images ? this.props.images.length : 0)), React.createElement(_PagingButton.default, {
        onClick: this.onClickNextButton
      }, this.props.nextIcon), this.props.showFullscreenIcon ? React.createElement(_FullscreenButton.default, {
        onClick: this.onChangeFullScreen
      }, React.createElement(_FullscreenIcon.default, {
        isFullScreen: this.state.isFullScreen
      })) : null)));
    }
  }]);

  return SlideShow;
}(React.Component);

exports.default = SlideShow;

_defineProperty(SlideShow, "defaultProps", void 0);

SlideShow.defaultProps = {
  arrowButtonStyle: _styles.default.ARROW_BUTTON,
  style: {},
  images: [],
  prevIcon: React.createElement("svg", {
    style: _styles.default.ARROW_BUTTON,
    viewBox: "0 0 8 8"
  }, React.createElement("path", {
    fill: "#fff",
    d: "M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z",
    transform: "translate(0 1)"
  })),
  nextIcon: React.createElement("svg", {
    style: _styles.default.ARROW_BUTTON,
    viewBox: "0 0 8 8"
  }, React.createElement("path", {
    fill: "#fff",
    d: "M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z",
    transform: "translate(0 1)"
  })),
  withTimestamp: false,
  pageWillUpdate: function pageWillUpdate(index, image) {
    return;
  },
  className: 'slideshow',
  showFullscreenIcon: true
};