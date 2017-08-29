'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styles = require('./Styles');

var _toggleFullscreen = require('toggle-fullscreen');

var _toggleFullscreen2 = _interopRequireDefault(_toggleFullscreen);

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
 * @property {Array<string>} images,
 * @property {Node} prevIcon,
 * @property {Node} nextIcon
 * @property {boolean} withTimestamp
 * @property {function} pageWillUpdate
 */


/**
 * @typedef {Object} State
 * @property {string} src
 * @property {number} index
 * @property {number} progress
 * @property {number} timestamp
 * @property {number} preview
 * @property {number} previewIndex
 * @property {boolean} isFullScreen
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
      var barWidth = document.getElementsByClassName('progressBar')[0].offsetWidth;
      var progressWidth = e.clientX;
      if (_this.state.isFullScreen) {
        var content = document.getElementsByClassName('slideshow-wrapper')[0];
        progressWidth -= content.offsetLeft;
      }
      var nextIndex = _this.calcProgressIndex(barWidth, progressWidth);
      _this.updatePageState(nextIndex);
    };

    _this.onMouseMoveProgressBar = function (e) {
      var barWidth = document.getElementsByClassName('progressBar')[0].offsetWidth;
      var progressWidth = e.clientX;
      if (_this.state.isFullScreen) {
        var content = document.getElementsByClassName('slideshow-wrapper')[0];
        progressWidth -= content.offsetLeft;
      }
      var nextIndex = _this.calcProgressIndex(barWidth, progressWidth);
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
      (0, _toggleFullscreen2.default)(element).then(function () {
        return (0, _toggleFullscreen.fullscreenChange)(function () {
          var isFullScreen = (0, _toggleFullscreen.isFullscreen)();
          _this.setState({ isFullScreen: isFullScreen });
          if (isFullScreen) {
            document.addEventListener('keydown', _this.keydownEvent);
            element.style.width = '70%';
          } else {
            document.removeEventListener('keydown', _this.keydownEvent);
            element.style.width = '100%';
          }
        });
      });
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

    _this.calcProgressIndex = function (barWidth, progressWidth) {
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

    _this._renderPreview = function () {
      if (!_this.props.images || _this.props.images.length === 0) {
        return null;
      }

      var preview = _this.props.images.map(function (img, index) {
        var display = index === _this.state.previewIndex ? 'inline' : 'none';
        var key = 'preview-' + index;
        return _react2.default.createElement('img', {
          className: key,
          style: { display: display, width: 200 },
          src: img,
          key: key
        });
      });
      var fullscreenBottom = 120;
      var wrapper = document.querySelector('.slideshow-wrapper');
      var content = document.querySelector('.content');
      var progressBar = document.querySelector('.progressBar');
      var bar = document.querySelector('.bar');
      if (wrapper && content && progressBar && bar) {
        fullscreenBottom = window.screen.availHeight - content.offsetHeight + progressBar.offsetHeight + bar.offsetHeight + 10;
      }
      var bottom = _this.state.isFullScreen ? fullscreenBottom : _Styles.Styles.PREVIEW.bottom;
      var STYLE = _extends({}, _Styles.Styles.PREVIEW, {
        opacity: _this.state.preview,
        bottom: bottom
      });
      return _react2.default.createElement(
        'div',
        { style: STYLE },
        preview,
        _react2.default.createElement(
          'p',
          { style: { margin: 0, textAlign: 'center', fontSize: 4 } },
          _this.state.previewIndex + 1 + ' / ' + _this.props.images.length
        )
      );
    };

    _this._renderFullscreenIcon = function () {
      if (_this.state.isFullScreen) {
        return _react2.default.createElement(
          'svg',
          { id: 'two-arrows', width: '15', height: '15', viewBox: '0 0 612 612' },
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
              'g',
              { id: '_x36_' },
              _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement('path', {
                  d: 'M260.655,351.173c-3.615-4.016-8.721-6.636-14.554-6.655l-164.915-0.229c-10.92-0.019-19.756,8.816-19.737,19.737     c0.019,10.92,12.756,23.198,18.226,28.668l41.711,41.712L0,554.625L57.375,612l119.608-121.979l41.711,41.712     c9.027,9.027,18.188,18.628,29.108,18.646c10.92,0.02,19.756-8.816,19.737-19.736l-0.229-164.915     C267.291,359.895,264.671,354.788,260.655,351.173z M493.119,175.472L612,57.375L554.625,0L436.566,118.556l-42.419-42.687     c-9.181-9.238-18.494-19.068-29.587-19.087c-11.111-0.019-20.081,9.027-20.081,20.196l0.229,168.797     c0,5.967,2.678,11.188,6.771,14.898c3.69,4.112,8.874,6.789,14.803,6.809l167.726,0.229c11.093,0.019,20.082-9.027,20.082-20.196     c-0.02-11.169-12.967-23.753-18.532-29.338L493.119,175.472z',
                  fill: '#FFFFFF'
                })
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'svg',
          {
            id: 'fullscreen',
            width: '15',
            height: '15',
            viewBox: '0 0 438.529 438.529'
          },
          _react2.default.createElement(
            'g',
            { fill: '#fff' },
            _react2.default.createElement('path', { d: 'M180.156,225.828c-1.903-1.902-4.093-2.854-6.567-2.854c-2.475,0-4.665,0.951-6.567,2.854l-94.787,94.787l-41.112-41.117 c-3.617-3.61-7.895-5.421-12.847-5.421c-4.952,0-9.235,1.811-12.851,5.421c-3.617,3.621-5.424,7.905-5.424,12.854v127.907 c0,4.948,1.807,9.229,5.424,12.847c3.619,3.613,7.902,5.424,12.851,5.424h127.906c4.949,0,9.23-1.811,12.847-5.424 c3.615-3.617,5.424-7.898,5.424-12.847s-1.809-9.233-5.424-12.854l-41.112-41.104l94.787-94.793 c1.902-1.903,2.853-4.086,2.853-6.564c0-2.478-0.953-4.66-2.853-6.57L180.156,225.828z' }),
            _react2.default.createElement('path', { d: 'M433.11,5.424C429.496,1.807,425.212,0,420.263,0H292.356c-4.948,0-9.227,1.807-12.847,5.424 c-3.614,3.615-5.421,7.898-5.421,12.847s1.807,9.233,5.421,12.847l41.106,41.112l-94.786,94.787 c-1.901,1.906-2.854,4.093-2.854,6.567s0.953,4.665,2.854,6.567l32.552,32.548c1.902,1.903,4.086,2.853,6.563,2.853 s4.661-0.95,6.563-2.853l94.794-94.787l41.104,41.109c3.62,3.616,7.905,5.428,12.854,5.428s9.229-1.812,12.847-5.428 c3.614-3.614,5.421-7.898,5.421-12.847V18.268C438.53,13.315,436.734,9.04,433.11,5.424z' })
          )
        );
      }
    };

    var timestamp = 0;
    if (props.withTimestamp === true) {
      timestamp = Math.floor(new Date().getTime() / 1000);
    }

    _this.style = _extends({}, _Styles.Styles.ROOT, _this.props.style);

    _this.state = {
      src: '',
      index: 0,
      progress: 0,
      timestamp: timestamp,
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
        previewIndex: 0
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

      var paging = void 0;
      if (this.props.images) {
        paging = this.state.index + 1 + ' / ' + this.props.images.length;
      }

      return _react2.default.createElement(
        'div',
        { style: this.style, className: 'slideshow' },
        _react2.default.createElement(
          'div',
          { className: 'slideshow-wrapper', style: { margin: 'auto' } },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { style: _Styles.Styles.IMAGE },
              _react2.default.createElement('img', { className: 'content', src: src, style: { width: '100%' } }),
              _react2.default.createElement('div', {
                className: 'prevOnContent',
                onClick: this.onClickPrevButton,
                style: _Styles.Styles.PREV_ON_CONTENT
              }),
              _react2.default.createElement('div', {
                className: 'nextOnContent',
                onClick: this.onClickNextButton,
                style: _Styles.Styles.NEXT_ON_CONTENT
              })
            )
          ),
          this._renderPreview(),
          _react2.default.createElement(
            'div',
            {
              className: 'progressBar',
              style: _Styles.Styles.PROGRESS_BAR,
              onClick: this.onClickProgressBar,
              onMouseMove: this.onMouseMoveProgressBar,
              onMouseLeave: this.onMouseLeaveProgressBar
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
            { className: 'bar', style: _Styles.Styles.BAR },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'button',
                {
                  className: 'prevButton',
                  onClick: this.onClickPrevButton,
                  style: _Styles.Styles.BUTTON
                },
                this.props.prevIcon
              ),
              _react2.default.createElement(
                'span',
                { style: _Styles.Styles.PAGE_VIEW },
                paging
              ),
              _react2.default.createElement(
                'button',
                {
                  className: 'nextButton',
                  onClick: this.onClickNextButton,
                  style: _Styles.Styles.BUTTON
                },
                this.props.nextIcon
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'button',
                {
                  className: 'fullscreen',
                  style: {
                    backgroundColor: 'transparent',
                    borderStyle: 'none',
                    position: 'absolute',
                    right: 10,
                    top: 5
                  },
                  onClick: this.onChangeFullScreen
                },
                this._renderFullscreenIcon()
              )
            )
          )
        )
      );
    }

    /**
     * preview renderer
     * @returns {?XML}
     * @private
     */

  }]);

  return SlideShow;
}(_react2.default.Component);

exports.default = SlideShow;


SlideShow.defaultProps = {
  arrowButtonStyle: _Styles.Styles.ARROW_BUTTON,
  style: {},
  images: [],
  prevIcon: _react2.default.createElement(
    'svg',
    { style: _Styles.Styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', {
      fill: '#fff',
      d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)'
    })
  ),
  nextIcon: _react2.default.createElement(
    'svg',
    { style: _Styles.Styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', {
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

SlideShow.PropTypes = {
  arrowButtonStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  images: _propTypes2.default.array,
  prevIcon: _propTypes2.default.node,
  nextIcon: _propTypes2.default.node,
  withTimestamp: _propTypes2.default.bool,
  pageWillUpdate: _propTypes2.default.func
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiaXNGdWxsU2NyZWVuIiwiY29udGVudCIsIm9mZnNldExlZnQiLCJjYWxjUHJvZ3Jlc3NJbmRleCIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJzZXRTdGF0ZSIsInByZXZpZXciLCJwcmV2aWV3SW5kZXgiLCJvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciIsIm9uQ2hhbmdlRnVsbFNjcmVlbiIsImVsZW1lbnQiLCJ0aGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImtleWRvd25FdmVudCIsInN0eWxlIiwid2lkdGgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJrZXkiLCJrZXlDb2RlIiwiY2xpY2tQb3NpdGlvbiIsIk1hdGgiLCJmbG9vciIsImkiLCJjaGVja1dpZHRoIiwiY2FsY1Byb2dyZXNzIiwicGFnZSIsImJhc2UiLCJwcm9ncmVzcyIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJpbWFnZSIsInNyYyIsInBhZ2VXaWxsVXBkYXRlIiwiX3JlbmRlclByZXZpZXciLCJtYXAiLCJpbWciLCJkaXNwbGF5IiwiZnVsbHNjcmVlbkJvdHRvbSIsIndyYXBwZXIiLCJxdWVyeVNlbGVjdG9yIiwicHJvZ3Jlc3NCYXIiLCJiYXIiLCJ3aW5kb3ciLCJzY3JlZW4iLCJhdmFpbEhlaWdodCIsIm9mZnNldEhlaWdodCIsImJvdHRvbSIsIlBSRVZJRVciLCJTVFlMRSIsIm9wYWNpdHkiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsIl9yZW5kZXJGdWxsc2NyZWVuSWNvbiIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsIlJPT1QiLCJwYWdpbmciLCJJTUFHRSIsIlBSRVZfT05fQ09OVEVOVCIsIk5FWFRfT05fQ09OVEVOVCIsIlBST0dSRVNTX0JBUiIsImJhY2tncm91bmRDb2xvciIsImhlaWdodCIsIkJBUiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwicmlnaHQiLCJ0b3AiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQTJDQTs7Ozs7OztBQXRDQTs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7Ozs7SUF5QnFCQSxTOzs7QUFPbkI7Ozs7O0FBS0EscUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSxzSEFDbEJBLEtBRGtCOztBQUFBLFVBaUQxQkMsaUJBakQwQixHQWlETixZQUFNO0FBQ3hCLFVBQUksTUFBS0MsWUFBTCxDQUFrQixNQUFLRixLQUFMLENBQVdHLE1BQTdCLENBQUosRUFBMEM7QUFDeEM7QUFDRDs7QUFFRCxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsS0FBWCxLQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNEOztBQUVELFVBQU1DLFlBQVksTUFBS0YsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBQXJDO0FBQ0EsWUFBS0UsZUFBTCxDQUFxQkQsU0FBckI7QUFDRCxLQTVEeUI7O0FBQUEsVUFrRTFCRSxpQkFsRTBCLEdBa0VOLFlBQU07QUFD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IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7U3R5bGVzIGFzIHN0eWxlc30gZnJvbSAnLi9TdHlsZXMnO1xuaW1wb3J0IHRvZ2dsZUZ1bGxzY3JlZW4sIHtcbiAgZnVsbHNjcmVlbkNoYW5nZSxcbiAgaXNGdWxsc2NyZWVuLFxufSBmcm9tICd0b2dnbGUtZnVsbHNjcmVlbic7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUHJvcHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzdHlsZVxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBpbWFnZXMsXG4gKiBAcHJvcGVydHkge05vZGV9IHByZXZJY29uLFxuICogQHByb3BlcnR5IHtOb2RlfSBuZXh0SWNvblxuICogQHByb3BlcnR5IHtib29sZWFufSB3aXRoVGltZXN0YW1wXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBwYWdlV2lsbFVwZGF0ZVxuICovXG50eXBlIFByb3BzID0ge1xuICBzdHlsZTogT2JqZWN0LFxuICBpbWFnZXM6IEFycmF5PHN0cmluZz4sXG4gIHByZXZJY29uOiBOb2RlLFxuICBuZXh0SWNvbjogTm9kZSxcbiAgd2l0aFRpbWVzdGFtcDogYm9vbGVhbixcbiAgcGFnZVdpbGxVcGRhdGU6IChpbmRleDogbnVtYmVyLCBpbWFnZTogc3RyaW5nKSA9PiB2b2lkLFxufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNyY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJldmlld0luZGV4XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzRnVsbFNjcmVlblxuICovXG50eXBlIFN0YXRlID0ge1xuICBzcmM6IHN0cmluZyxcbiAgaW5kZXg6IG51bWJlcixcbiAgcHJvZ3Jlc3M6IG51bWJlcixcbiAgdGltZXN0YW1wOiBudW1iZXIsXG4gIHByZXZpZXc6IG51bWJlcixcbiAgcHJldmlld0luZGV4OiBudW1iZXIsXG4gIGlzRnVsbFNjcmVlbjogYm9vbGVhbixcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBuYW1lZCBTbGlkZVNob3cgaXMgdGhlIFJlYWN0IGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3VcbiAqIHRvIGRldmVsb3Agc2xpZGVzaG93IGxpa2UgJ1NsaWRlU2hhcmUnIG9yICdTcGVha2VyRGVjaycgdmVyeSBlYXN5IVxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgcHJvcHM6IFByb3BzO1xuICBzdHlsZTogT2JqZWN0O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBPYmplY3Q7XG4gIHN0YXRpYyBQcm9wVHlwZXM6IE9iamVjdDtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogY2FsbCBzdXBlciBjb25zdHJ1Y3RvciBhbmQgaW5pdGlhbGl6ZSBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7UHJvcHN9IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gMDtcbiAgICBpZiAocHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIHRoaXMuc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUk9PVCwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3JjOiAnJyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBwcmV2aWV3SW5kZXg6IDAsXG4gICAgICBpc0Z1bGxTY3JlZW46IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogY29tcG9uZW50V2lsbE1vdW50XG4gICAqIHVwZGF0ZXMgc3RhdGVzIHdpdGggcHJvcHMgdG8gcmVuZGVyIGZpcnN0IHZpZXcuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjLCBwYWdlLCBhbmQgcHJvZ3Jlc3MuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgaW1hZ2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5wcm9wcy5pbWFnZXM7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuaW1hZ2VzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoMTAwIC8gaW1hZ2VzLmxlbmd0aCk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICBwcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2VzWzBdLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICBwcmV2aWV3OiAwLFxuICAgICAgcHJldmlld0luZGV4OiAwLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJldmlvdXMgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgcHJldmlvdXMgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tQcmV2QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLmltYWdlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggLSAxO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gbmV4dCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBuZXh0IHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW1hZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCArIDE7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcm9ncmVzc0JhciBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIHN0YXRlcyB0byBtb3ZlIHBhZ2UuXG4gICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICAgKi9cbiAgb25DbGlja1Byb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgcHJvZ3Jlc3NXaWR0aCA9IGUuY2xpZW50WDtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4pIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXNob3ctd3JhcHBlcicpWzBdO1xuICAgICAgcHJvZ3Jlc3NXaWR0aCAtPSBjb250ZW50Lm9mZnNldExlZnQ7XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY2FsY1Byb2dyZXNzSW5kZXgoYmFyV2lkdGgsIHByb2dyZXNzV2lkdGgpO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgb25Nb3VzZU1vdmVQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgYmFyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9ncmVzc0JhcicpWzBdXG4gICAgICAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVzaG93LXdyYXBwZXInKVswXTtcbiAgICAgIHByb2dyZXNzV2lkdGggLT0gY29udGVudC5vZmZzZXRMZWZ0O1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmNhbGNQcm9ncmVzc0luZGV4KGJhcldpZHRoLCBwcm9ncmVzc1dpZHRoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZXZpZXc6IDEsXG4gICAgICBwcmV2aWV3SW5kZXg6IG5leHRJbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aWV3OiAwLFxuICAgIH0pO1xuICB9O1xuXG4gIG9uQ2hhbmdlRnVsbFNjcmVlbiA9ICgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50OiBPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgJ3NsaWRlc2hvdy13cmFwcGVyJyxcbiAgICApWzBdO1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4oZWxlbWVudCkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gZnVsbHNjcmVlbkNoYW5nZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRnVsbFNjcmVlbiA9IGlzRnVsbHNjcmVlbigpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0Z1bGxTY3JlZW46IGlzRnVsbFNjcmVlbn0pO1xuICAgICAgICBpZiAoaXNGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkV2ZW50KTtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzcwJSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkV2ZW50KTtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBrZXlkb3duRXZlbnQgPSAoZTogRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKFxuICAgICAgZS5rZXkgPT09ICdBcnJvd1VwJyB8fFxuICAgICAgZS5rZXkgPT09ICdBcnJvd0xlZnQnIHx8XG4gICAgICBlLmtleUNvZGUgPT09IDM3IHx8XG4gICAgICBlLmtleUNvZGUgPT09IDM4XG4gICAgKSB7XG4gICAgICB0aGlzLm9uQ2xpY2tQcmV2QnV0dG9uKCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGUua2V5ID09PSAnQXJyb3dEb3duJyB8fFxuICAgICAgZS5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fFxuICAgICAgZS5rZXlDb2RlID09PSAzOSB8fFxuICAgICAgZS5rZXlDb2RlID09PSA0MCB8fFxuICAgICAgZS5rZXlDb2RlID09PSAzMlxuICAgICkge1xuICAgICAgdGhpcy5vbkNsaWNrTmV4dEJ1dHRvbigpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VGdWxsU2NyZWVuKCk7XG4gICAgfVxuICB9O1xuXG4gIGNhbGNQcm9ncmVzc0luZGV4ID0gKGJhcldpZHRoOiBudW1iZXIsIHByb2dyZXNzV2lkdGg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgY2xpY2tQb3NpdGlvbiA9IE1hdGguZmxvb3IocHJvZ3Jlc3NXaWR0aCAvIGJhcldpZHRoICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXh0SW5kZXg7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBhcnIgPT09IHVuZGVmaW5lZCB8fCBhcnIgPT09IG51bGwgfHwgYXJyLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICB1cGRhdGVQYWdlU3RhdGUgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaW5kZXggKyAxKTtcbiAgICBjb25zdCBpbWFnZSA9IHRoaXMucHJvcHMuaW1hZ2VzW2luZGV4XTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2UsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5wYWdlV2lsbFVwZGF0ZShpbmRleCwgaW1hZ2UpO1xuICB9O1xuXG4gIC8qKlxuICAgKiByZW5kZXJcbiAgICogQHJldHVybnMge1hNTH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgc3JjID0gdGhpcy5zdGF0ZS5zcmM7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgc3JjICs9IGA/JHt0aGlzLnN0YXRlLnRpbWVzdGFtcH1gO1xuICAgIH1cblxuICAgIGxldCBwYWdpbmc7XG4gICAgaWYgKHRoaXMucHJvcHMuaW1hZ2VzKSB7XG4gICAgICBwYWdpbmcgPSBgJHt0aGlzLnN0YXRlLmluZGV4ICsgMX0gLyAke3RoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aH1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt0aGlzLnN0eWxlfSBjbGFzc05hbWU9XCJzbGlkZXNob3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXNob3ctd3JhcHBlclwiIHN0eWxlPXt7bWFyZ2luOiAnYXV0byd9fT5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLklNQUdFfT5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjb250ZW50XCIgc3JjPXtzcmN9IHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319IC8+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmV2T25Db250ZW50XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuUFJFVl9PTl9DT05URU5UfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV4dE9uQ29udGVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLk5FWFRfT05fQ09OVEVOVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJQcmV2aWV3KCl9XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXJcIlxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5QUk9HUkVTU19CQVJ9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcm9ncmVzc0Jhcn1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMub25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzc1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmFyJ30gc3R5bGU9e3N0eWxlcy5CQVJ9PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3ByZXZCdXR0b24nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuUEFHRV9WSUVXfT57cGFnaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J25leHRCdXR0b24nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0SWNvbn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmdWxsc2NyZWVuJ31cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgcmlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgdG9wOiA1LFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNoYW5nZUZ1bGxTY3JlZW59XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyRnVsbHNjcmVlbkljb24oKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHByZXZpZXcgcmVuZGVyZXJcbiAgICogQHJldHVybnMgez9YTUx9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVuZGVyUHJldmlldyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW1hZ2VzIHx8IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHByZXZpZXcgPSB0aGlzLnByb3BzLmltYWdlcy5tYXAoKGltZywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXkgPSBpbmRleCA9PT0gdGhpcy5zdGF0ZS5wcmV2aWV3SW5kZXggPyAnaW5saW5lJyA6ICdub25lJztcbiAgICAgIGNvbnN0IGtleSA9IGBwcmV2aWV3LSR7aW5kZXh9YDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9e2tleX1cbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6IGRpc3BsYXksIHdpZHRoOiAyMDB9fVxuICAgICAgICAgIHNyYz17aW1nfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgICBsZXQgZnVsbHNjcmVlbkJvdHRvbSA9IDEyMDtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlc2hvdy13cmFwcGVyJyk7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NCYXInKTtcbiAgICBjb25zdCBiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFyJyk7XG4gICAgaWYgKHdyYXBwZXIgJiYgY29udGVudCAmJiBwcm9ncmVzc0JhciAmJiBiYXIpIHtcbiAgICAgIGZ1bGxzY3JlZW5Cb3R0b20gPVxuICAgICAgICB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC1cbiAgICAgICAgY29udGVudC5vZmZzZXRIZWlnaHQgK1xuICAgICAgICBwcm9ncmVzc0Jhci5vZmZzZXRIZWlnaHQgK1xuICAgICAgICBiYXIub2Zmc2V0SGVpZ2h0ICtcbiAgICAgICAgMTA7XG4gICAgfVxuICAgIGNvbnN0IGJvdHRvbSA9IHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuXG4gICAgICA/IGZ1bGxzY3JlZW5Cb3R0b21cbiAgICAgIDogc3R5bGVzLlBSRVZJRVcuYm90dG9tO1xuICAgIGNvbnN0IFNUWUxFID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLlBSRVZJRVcsIHtcbiAgICAgIG9wYWNpdHk6IHRoaXMuc3RhdGUucHJldmlldyxcbiAgICAgIGJvdHRvbTogYm90dG9tLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtTVFlMRX0+XG4gICAgICAgIHtwcmV2aWV3fVxuICAgICAgICA8cCBzdHlsZT17e21hcmdpbjogMCwgdGV4dEFsaWduOiAnY2VudGVyJywgZm9udFNpemU6IDR9fT5cbiAgICAgICAgICB7YCR7dGhpcy5zdGF0ZS5wcmV2aWV3SW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWB9XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgX3JlbmRlckZ1bGxzY3JlZW5JY29uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHN2ZyBpZD1cInR3by1hcnJvd3NcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDYxMiA2MTJcIj5cbiAgICAgICAgICA8Zz5cbiAgICAgICAgICAgIDxnIGlkPVwiX3gzNl9cIj5cbiAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMjYwLjY1NSwzNTEuMTczYy0zLjYxNS00LjAxNi04LjcyMS02LjYzNi0xNC41NTQtNi42NTVsLTE2NC45MTUtMC4yMjljLTEwLjkyLTAuMDE5LTE5Ljc1Niw4LjgxNi0xOS43MzcsMTkuNzM3ICAgICBjMC4wMTksMTAuOTIsMTIuNzU2LDIzLjE5OCwxOC4yMjYsMjguNjY4bDQxLjcxMSw0MS43MTJMMCw1NTQuNjI1TDU3LjM3NSw2MTJsMTE5LjYwOC0xMjEuOTc5bDQxLjcxMSw0MS43MTIgICAgIGM5LjAyNyw5LjAyNywxOC4xODgsMTguNjI4LDI5LjEwOCwxOC42NDZjMTAuOTIsMC4wMiwxOS43NTYtOC44MTYsMTkuNzM3LTE5LjczNmwtMC4yMjktMTY0LjkxNSAgICAgQzI2Ny4yOTEsMzU5Ljg5NSwyNjQuNjcxLDM1NC43ODgsMjYwLjY1NSwzNTEuMTczeiBNNDkzLjExOSwxNzUuNDcyTDYxMiw1Ny4zNzVMNTU0LjYyNSwwTDQzNi41NjYsMTE4LjU1NmwtNDIuNDE5LTQyLjY4NyAgICAgYy05LjE4MS05LjIzOC0xOC40OTQtMTkuMDY4LTI5LjU4Ny0xOS4wODdjLTExLjExMS0wLjAxOS0yMC4wODEsOS4wMjctMjAuMDgxLDIwLjE5NmwwLjIyOSwxNjguNzk3ICAgICBjMCw1Ljk2NywyLjY3OCwxMS4xODgsNi43NzEsMTQuODk4YzMuNjksNC4xMTIsOC44NzQsNi43ODksMTQuODAzLDYuODA5bDE2Ny43MjYsMC4yMjljMTEuMDkzLDAuMDE5LDIwLjA4Mi05LjAyNywyMC4wODItMjAuMTk2ICAgICBjLTAuMDItMTEuMTY5LTEyLjk2Ny0yMy43NTMtMTguNTMyLTI5LjMzOEw0OTMuMTE5LDE3NS40NzJ6XCJcbiAgICAgICAgICAgICAgICAgIGZpbGw9XCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzdmdcbiAgICAgICAgICBpZD1cImZ1bGxzY3JlZW5cIlxuICAgICAgICAgIHdpZHRoPVwiMTVcIlxuICAgICAgICAgIGhlaWdodD1cIjE1XCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQzOC41MjkgNDM4LjUyOVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xODAuMTU2LDIyNS44MjhjLTEuOTAzLTEuOTAyLTQuMDkzLTIuODU0LTYuNTY3LTIuODU0Yy0yLjQ3NSwwLTQuNjY1LDAuOTUxLTYuNTY3LDIuODU0bC05NC43ODcsOTQuNzg3bC00MS4xMTItNDEuMTE3IGMtMy42MTctMy42MS03Ljg5NS01LjQyMS0xMi44NDctNS40MjFjLTQuOTUyLDAtOS4yMzUsMS44MTEtMTIuODUxLDUuNDIxYy0zLjYxNywzLjYyMS01LjQyNCw3LjkwNS01LjQyNCwxMi44NTR2MTI3LjkwNyBjMCw0Ljk0OCwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDdjMy42MTksMy42MTMsNy45MDIsNS40MjQsMTIuODUxLDUuNDI0aDEyNy45MDZjNC45NDksMCw5LjIzLTEuODExLDEyLjg0Ny01LjQyNCBjMy42MTUtMy42MTcsNS40MjQtNy44OTgsNS40MjQtMTIuODQ3cy0xLjgwOS05LjIzMy01LjQyNC0xMi44NTRsLTQxLjExMi00MS4xMDRsOTQuNzg3LTk0Ljc5MyBjMS45MDItMS45MDMsMi44NTMtNC4wODYsMi44NTMtNi41NjRjMC0yLjQ3OC0wLjk1My00LjY2LTIuODUzLTYuNTdMMTgwLjE1NiwyMjUuODI4elwiIC8+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTQzMy4xMSw1LjQyNEM0MjkuNDk2LDEuODA3LDQyNS4yMTIsMCw0MjAuMjYzLDBIMjkyLjM1NmMtNC45NDgsMC05LjIyNywxLjgwNy0xMi44NDcsNS40MjQgYy0zLjYxNCwzLjYxNS01LjQyMSw3Ljg5OC01LjQyMSwxMi44NDdzMS44MDcsOS4yMzMsNS40MjEsMTIuODQ3bDQxLjEwNiw0MS4xMTJsLTk0Ljc4Niw5NC43ODcgYy0xLjkwMSwxLjkwNi0yLjg1NCw0LjA5My0yLjg1NCw2LjU2N3MwLjk1Myw0LjY2NSwyLjg1NCw2LjU2N2wzMi41NTIsMzIuNTQ4YzEuOTAyLDEuOTAzLDQuMDg2LDIuODUzLDYuNTYzLDIuODUzIHM0LjY2MS0wLjk1LDYuNTYzLTIuODUzbDk0Ljc5NC05NC43ODdsNDEuMTA0LDQxLjEwOWMzLjYyLDMuNjE2LDcuOTA1LDUuNDI4LDEyLjg1NCw1LjQyOHM5LjIyOS0xLjgxMiwxMi44NDctNS40MjggYzMuNjE0LTMuNjE0LDUuNDIxLTcuODk4LDUuNDIxLTEyLjg0N1YxOC4yNjhDNDM4LjUzLDEzLjMxNSw0MzYuNzM0LDkuMDQsNDMzLjExLDUuNDI0elwiIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5TbGlkZVNob3cuZGVmYXVsdFByb3BzID0ge1xuICBhcnJvd0J1dHRvblN0eWxlOiBzdHlsZXMuQVJST1dfQlVUVE9OLFxuICBzdHlsZToge30sXG4gIGltYWdlczogW10sXG4gIHByZXZJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk00IDBsLTQgMyA0IDN2LTZ6bTAgM2w0IDN2LTZsLTQgM3pcIlxuICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApLFxuICBuZXh0SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiI2ZmZlwiXG4gICAgICAgIGQ9XCJNMCAwdjZsNC0zLTQtM3ptNCAzdjNsNC0zLTQtM3YzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIHdpdGhUaW1lc3RhbXA6IGZhbHNlLFxuICBwYWdlV2lsbFVwZGF0ZTogKGluZGV4OiBudW1iZXIsIGltYWdlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm47XG4gIH0sXG59O1xuXG5TbGlkZVNob3cuUHJvcFR5cGVzID0ge1xuICBhcnJvd0J1dHRvblN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgaW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG4gIHByZXZJY29uOiBQcm9wVHlwZXMubm9kZSxcbiAgbmV4dEljb246IFByb3BUeXBlcy5ub2RlLFxuICB3aXRoVGltZXN0YW1wOiBQcm9wVHlwZXMuYm9vbCxcbiAgcGFnZVdpbGxVcGRhdGU6IFByb3BUeXBlcy5mdW5jLFxufTtcbiJdfQ==