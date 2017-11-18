'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _FullscreenIcon = require('./FullscreenIcon');

var _FullscreenIcon2 = _interopRequireDefault(_FullscreenIcon);

var _FullscreenButton = require('./FullscreenButton');

var _FullscreenButton2 = _interopRequireDefault(_FullscreenButton);

var _Viewer = require('./Viewer');

var _Viewer2 = _interopRequireDefault(_Viewer);

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _ProgressBar = require('./ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _shallowEqualObject = require('./shallow-equal-object');

var _shallowEqualObject2 = _interopRequireDefault(_shallowEqualObject);

var _toggleFullscreen = require('toggle-fullscreen');

var _toggleFullscreen2 = _interopRequireDefault(_toggleFullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fullscreenChange = _toggleFullscreen2.default.fullscreenChange;
var isFullscreen = _toggleFullscreen2.default.isFullscreen;

var SlideShow = function (_React$Component) {
  _inherits(SlideShow, _React$Component);

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
      var element = document.getElementsByClassName(_this.props.className + '-wrapper')[0];
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
      Promise.all([(0, _toggleFullscreen2.default)(element), fullscreenChange(fn)]);
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

    if (_this.props.style) {
      for (var key in _this.props.style) {
        if (_this.props.style.hasOwnProperty(key)) {
          _styles2.default.ROOT[key] = _this.props.style[key];
        }
      }
    }
    if (_styles2.default.ROOT.height) {
      _styles2.default.IMAGE.height = _styles2.default.ROOT.height - _styles2.default.BAR.height - _styles2.default.PROGRESS_BAR.height + 5;
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
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if ((0, _shallowEqualObject2.default)(this.props, nextProps)) {
        return true;
      }

      if ((0, _shallowEqualObject2.default)(this.state, nextState)) {
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
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: _styles2.default.ROOT, className: this.props.className },
        React.createElement(
          'div',
          {
            className: this.props.className + '-wrapper',
            style: { margin: 'auto' }
          },
          React.createElement(_Viewer2.default, {
            imgClassName: this.props.className + '-image',
            styles: _styles2.default,
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
            imgClassName: this.props.className + '-image'
          }),
          React.createElement(_ProgressBar2.default, {
            style: _styles2.default.PROGRESS_BAR,
            onClick: this.onClickProgressBar,
            onMouseMove: this.onMouseMoveProgressBar,
            onMouseLeave: this.onMouseLeaveProgressBar,
            progress: this.state.progress
          }),
          React.createElement(
            _Bar2.default,
            {
              styles: _styles2.default,
              onClickPrevButton: this.onClickPrevButton,
              onClickNextButton: this.onClickNextButton,
              currentPage: this.state.index + 1,
              allPages: this.props.images ? this.props.images.length : 0,
              prevIcon: this.props.prevIcon,
              nextIcon: this.props.nextIcon
            },
            this.props.showFullscreenIcon ? React.createElement(
              _FullscreenButton2.default,
              { onClick: this.onChangeFullScreen },
              React.createElement(_FullscreenIcon2.default, { isFullScreen: this.state.isFullScreen })
            ) : null
          )
        )
      );
    }
  }]);

  return SlideShow;
}(React.Component);

exports.default = SlideShow;


SlideShow.defaultProps = {
  arrowButtonStyle: _styles2.default.ARROW_BUTTON,
  style: {},
  images: [],
  prevIcon: React.createElement(
    'svg',
    { style: _styles2.default.ARROW_BUTTON, viewBox: '0 0 8 8' },
    React.createElement('path', {
      fill: '#fff',
      d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)'
    })
  ),
  nextIcon: React.createElement(
    'svg',
    { style: _styles2.default.ARROW_BUTTON, viewBox: '0 0 8 8' },
    React.createElement('path', {
      fill: '#fff',
      d: 'M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z',
      transform: 'translate(0 1)'
    })
  ),
  withTimestamp: false,
  pageWillUpdate: function pageWillUpdate(index, image) {
    return;
  },
  className: 'slideshow',
  showFullscreenIcon: true
};