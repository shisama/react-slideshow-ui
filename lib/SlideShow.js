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

require('es6-promise').polyfill();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJwb2x5ZmlsbCIsIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiaXNGdWxsU2NyZWVuIiwiY29udGVudCIsIm9mZnNldExlZnQiLCJjYWxjUHJvZ3Jlc3NJbmRleCIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJzZXRTdGF0ZSIsInByZXZpZXciLCJwcmV2aWV3SW5kZXgiLCJvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciIsIm9uQ2hhbmdlRnVsbFNjcmVlbiIsImVsZW1lbnQiLCJ0aGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImtleWRvd25FdmVudCIsInN0eWxlIiwid2lkdGgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJrZXkiLCJrZXlDb2RlIiwiY2xpY2tQb3NpdGlvbiIsIk1hdGgiLCJmbG9vciIsImkiLCJjaGVja1dpZHRoIiwiY2FsY1Byb2dyZXNzIiwicGFnZSIsImJhc2UiLCJwcm9ncmVzcyIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJpbWFnZSIsInNyYyIsInBhZ2VXaWxsVXBkYXRlIiwiX3JlbmRlclByZXZpZXciLCJtYXAiLCJpbWciLCJkaXNwbGF5IiwiZnVsbHNjcmVlbkJvdHRvbSIsIndyYXBwZXIiLCJxdWVyeVNlbGVjdG9yIiwicHJvZ3Jlc3NCYXIiLCJiYXIiLCJ3aW5kb3ciLCJzY3JlZW4iLCJhdmFpbEhlaWdodCIsIm9mZnNldEhlaWdodCIsImJvdHRvbSIsIlBSRVZJRVciLCJTVFlMRSIsIm9wYWNpdHkiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsIl9yZW5kZXJGdWxsc2NyZWVuSWNvbiIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsIlJPT1QiLCJwYWdpbmciLCJJTUFHRSIsIlBSRVZfT05fQ09OVEVOVCIsIk5FWFRfT05fQ09OVEVOVCIsIlBST0dSRVNTX0JBUiIsImJhY2tncm91bmRDb2xvciIsImhlaWdodCIsIkJBUiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwicmlnaHQiLCJ0b3AiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUtBQSxRQUFRLGFBQVIsRUFBdUJDLFFBQXZCOztBQUVBOzs7Ozs7Ozs7OztBQWtCQTs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7O0lBS3FCQyxTOzs7QUFPbkI7Ozs7O0FBS0EscUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSxzSEFDbEJBLEtBRGtCOztBQUFBLFVBaUQxQkMsaUJBakQwQixHQWlETixZQUFNO0FBQ3hCLFVBQUksTUFBS0MsWUFBTCxDQUFrQixNQUFLRixLQUFMLENBQVdHLE1BQTdCLENBQUosRUFBMEM7QUFDeEM7QUFDRDs7QUFFRCxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsS0FBWCxLQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNEOztBQUVELFVBQU1DLFlBQVksTUFBS0YsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBQXJDO0FBQ0EsWUFBS0UsZUFBTCxDQUFxQkQsU0FBckI7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QVBOLENBQXRCIiwiZmlsZSI6IlNsaWRlU2hvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7U3R5bGVzIGFzIHN0eWxlc30gZnJvbSAnLi9TdHlsZXMnO1xuaW1wb3J0IHRvZ2dsZUZ1bGxzY3JlZW4sIHtcbiAgZnVsbHNjcmVlbkNoYW5nZSxcbiAgaXNGdWxsc2NyZWVuLFxufSBmcm9tICd0b2dnbGUtZnVsbHNjcmVlbic7XG5cbnJlcXVpcmUoJ2VzNi1wcm9taXNlJykucG9seWZpbGwoKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wc1xuICogQHByb3BlcnR5IHtPYmplY3R9IHN0eWxlXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IGltYWdlcyxcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gcHJldkljb24sXG4gKiBAcHJvcGVydHkge05vZGV9IG5leHRJY29uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdpdGhUaW1lc3RhbXBcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHBhZ2VXaWxsVXBkYXRlXG4gKi9cbnR5cGUgUHJvcHMgPSB7XG4gIHN0eWxlOiBPYmplY3QsXG4gIGltYWdlczogQXJyYXk8c3RyaW5nPixcbiAgcHJldkljb246IE5vZGUsXG4gIG5leHRJY29uOiBOb2RlLFxuICB3aXRoVGltZXN0YW1wOiBib29sZWFuLFxuICBwYWdlV2lsbFVwZGF0ZTogKGluZGV4OiBudW1iZXIsIGltYWdlOiBzdHJpbmcpID0+IHZvaWQsXG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3JjXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVzdGFtcFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByZXZpZXdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3SW5kZXhcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNGdWxsU2NyZWVuXG4gKi9cbnR5cGUgU3RhdGUgPSB7XG4gIHNyYzogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuICBwcm9ncmVzczogbnVtYmVyLFxuICB0aW1lc3RhbXA6IG51bWJlcixcbiAgcHJldmlldzogbnVtYmVyLFxuICBwcmV2aWV3SW5kZXg6IG51bWJlcixcbiAgaXNGdWxsU2NyZWVuOiBib29sZWFuLFxufTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIG5hbWVkIFNsaWRlU2hvdyBpcyB0aGUgUmVhY3QgY29tcG9uZW50IHRoYXQgYWxsb3dzIHlvdVxuICogdG8gZGV2ZWxvcCBzbGlkZXNob3cgbGlrZSAnU2xpZGVTaGFyZScgb3IgJ1NwZWFrZXJEZWNrJyB2ZXJ5IGVhc3khXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVTaG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGU6IFN0YXRlO1xuICBwcm9wczogUHJvcHM7XG4gIHN0eWxlOiBPYmplY3Q7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6IE9iamVjdDtcbiAgc3RhdGljIFByb3BUeXBlczogT2JqZWN0O1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBjYWxsIHN1cGVyIGNvbnN0cnVjdG9yIGFuZCBpbml0aWFsaXplIHN0YXRlcy5cbiAgICogQHBhcmFtIHtQcm9wc30gcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCB0aW1lc3RhbXAgPSAwO1xuICAgIGlmIChwcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5ST09ULCB0aGlzLnByb3BzLnN0eWxlKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICAgIGlzRnVsbFNjcmVlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb21wb25lbnRXaWxsTW91bnRcbiAgICogdXBkYXRlcyBzdGF0ZXMgd2l0aCBwcm9wcyB0byByZW5kZXIgZmlyc3Qgdmlldy5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMsIHBhZ2UsIGFuZCBwcm9ncmVzcy5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCBpbWFnZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnByb3BzLmltYWdlcztcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5pbWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbCgxMDAgLyBpbWFnZXMubGVuZ3RoKTtcbiAgICBpZiAocHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIHByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBpbWFnZXNbMF0sXG4gICAgICBpbmRleDogMCxcbiAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBwcmV2aWV3SW5kZXg6IDAsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuaW1hZ2VzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIG5leHQgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByb2dyZXNzQmFyIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgc3RhdGVzIHRvIG1vdmUgcGFnZS5cbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBvbkNsaWNrUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGxldCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlc2hvdy13cmFwcGVyJylbMF07XG4gICAgICBwcm9ncmVzc1dpZHRoIC09IGNvbnRlbnQub2Zmc2V0TGVmdDtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICBvbk1vdXNlTW92ZVByb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgcHJvZ3Jlc3NXaWR0aCA9IGUuY2xpZW50WDtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4pIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXNob3ctd3JhcHBlcicpWzBdO1xuICAgICAgcHJvZ3Jlc3NXaWR0aCAtPSBjb250ZW50Lm9mZnNldExlZnQ7XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY2FsY1Byb2dyZXNzSW5kZXgoYmFyV2lkdGgsIHByb2dyZXNzV2lkdGgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMSxcbiAgICAgIHByZXZpZXdJbmRleDogbmV4dEluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIG9uTW91c2VMZWF2ZVByb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2VGdWxsU2NyZWVuID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQ6IE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAnc2xpZGVzaG93LXdyYXBwZXInLFxuICAgIClbMF07XG4gICAgdG9nZ2xlRnVsbHNjcmVlbihlbGVtZW50KS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBmdWxsc2NyZWVuQ2hhbmdlKCgpID0+IHtcbiAgICAgICAgY29uc3QgaXNGdWxsU2NyZWVuID0gaXNGdWxsc2NyZWVuKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRnVsbFNjcmVlbjogaXNGdWxsU2NyZWVufSk7XG4gICAgICAgIGlmIChpc0Z1bGxTY3JlZW4pIHtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duRXZlbnQpO1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnNzAlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duRXZlbnQpO1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGtleWRvd25FdmVudCA9IChlOiBFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoXG4gICAgICBlLmtleSA9PT0gJ0Fycm93VXAnIHx8XG4gICAgICBlLmtleSA9PT0gJ0Fycm93TGVmdCcgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzcgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzhcbiAgICApIHtcbiAgICAgIHRoaXMub25DbGlja1ByZXZCdXR0b24oKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZS5rZXkgPT09ICdBcnJvd0Rvd24nIHx8XG4gICAgICBlLmtleSA9PT0gJ0Fycm93UmlnaHQnIHx8XG4gICAgICBlLmtleUNvZGUgPT09IDM5IHx8XG4gICAgICBlLmtleUNvZGUgPT09IDQwIHx8XG4gICAgICBlLmtleUNvZGUgPT09IDMyXG4gICAgKSB7XG4gICAgICB0aGlzLm9uQ2xpY2tOZXh0QnV0dG9uKCk7XG4gICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgdGhpcy5vbkNoYW5nZUZ1bGxTY3JlZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgY2FsY1Byb2dyZXNzSW5kZXggPSAoYmFyV2lkdGg6IG51bWJlciwgcHJvZ3Jlc3NXaWR0aDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBjbGlja1Bvc2l0aW9uID0gTWF0aC5mbG9vcihwcm9ncmVzc1dpZHRoIC8gYmFyV2lkdGggKiAxMDApO1xuICAgIGxldCBuZXh0SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoZWNrV2lkdGggPSB0aGlzLmNhbGNQcm9ncmVzcyhpKTtcbiAgICAgIGlmIChjbGlja1Bvc2l0aW9uID49IGNoZWNrV2lkdGgpIHtcbiAgICAgICAgbmV4dEluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5leHRJbmRleDtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBhZ2VcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGNhbGNQcm9ncmVzcyA9IChwYWdlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSAxMDAgLyB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGg7XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKGJhc2UgKiBwYWdlKTtcbiAgICBpZiAocHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIHJldHVybiAxMDA7XG4gICAgfVxuICAgIHJldHVybiBwcm9ncmVzcztcbiAgfTtcblxuICBpc0VtcHR5QXJyYXkgPSAoYXJyOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGFyciA9PT0gdW5kZWZpbmVkIHx8IGFyciA9PT0gbnVsbCB8fCBhcnIubGVuZ3RoID09PSAwO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2VTdGF0ZSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLmNhbGNQcm9ncmVzcyhpbmRleCArIDEpO1xuICAgIGNvbnN0IGltYWdlID0gdGhpcy5wcm9wcy5pbWFnZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBpbWFnZSxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLnBhZ2VXaWxsVXBkYXRlKGluZGV4LCBpbWFnZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHJlbmRlclxuICAgKiBAcmV0dXJucyB7WE1MfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBzcmMgPSB0aGlzLnN0YXRlLnNyYztcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICBzcmMgKz0gYD8ke3RoaXMuc3RhdGUudGltZXN0YW1wfWA7XG4gICAgfVxuXG4gICAgbGV0IHBhZ2luZztcbiAgICBpZiAodGhpcy5wcm9wcy5pbWFnZXMpIHtcbiAgICAgIHBhZ2luZyA9IGAke3RoaXMuc3RhdGUuaW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3RoaXMuc3R5bGV9IGNsYXNzTmFtZT1cInNsaWRlc2hvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlc2hvdy13cmFwcGVyXCIgc3R5bGU9e3ttYXJnaW46ICdhdXRvJ319PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuSU1BR0V9PlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNvbnRlbnRcIiBzcmM9e3NyY30gc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0gLz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByZXZPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5QUkVWX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuZXh0T25Db250ZW50XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuTkVYVF9PTl9DT05URU5UfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3RoaXMuX3JlbmRlclByZXZpZXcoKX1cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzc0JhclwiXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLlBST0dSRVNTX0JBUn1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1Byb2dyZXNzQmFyfVxuICAgICAgICAgICAgb25Nb3VzZU1vdmU9e3RoaXMub25Nb3VzZU1vdmVQcm9ncmVzc0Jhcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5vbk1vdXNlTGVhdmVQcm9ncmVzc0Jhcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDA3YmI2JyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5zdGF0ZS5wcm9ncmVzc30lYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydiYXInfSBzdHlsZT17c3R5bGVzLkJBUn0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsncHJldkJ1dHRvbid9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZJY29ufVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5QQUdFX1ZJRVd9PntwYWdpbmd9PC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnbmV4dEJ1dHRvbid9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRJY29ufVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Z1bGxzY3JlZW4nfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICBib3JkZXJTdHlsZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICByaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICB0b3A6IDUsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlRnVsbFNjcmVlbn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJGdWxsc2NyZWVuSWNvbigpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogcHJldmlldyByZW5kZXJlclxuICAgKiBAcmV0dXJucyB7P1hNTH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJQcmV2aWV3ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZXMgfHwgdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgcHJldmlldyA9IHRoaXMucHJvcHMuaW1hZ2VzLm1hcCgoaW1nLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheSA9IGluZGV4ID09PSB0aGlzLnN0YXRlLnByZXZpZXdJbmRleCA/ICdpbmxpbmUnIDogJ25vbmUnO1xuICAgICAgY29uc3Qga2V5ID0gYHByZXZpZXctJHtpbmRleH1gO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzTmFtZT17a2V5fVxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogZGlzcGxheSwgd2lkdGg6IDIwMH19XG4gICAgICAgICAgc3JjPXtpbWd9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICAgIGxldCBmdWxsc2NyZWVuQm90dG9tID0gMTIwO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVzaG93LXdyYXBwZXInKTtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc0JhcicpO1xuICAgIGNvbnN0IGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXInKTtcbiAgICBpZiAod3JhcHBlciAmJiBjb250ZW50ICYmIHByb2dyZXNzQmFyICYmIGJhcikge1xuICAgICAgZnVsbHNjcmVlbkJvdHRvbSA9XG4gICAgICAgIHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQgLVxuICAgICAgICBjb250ZW50Lm9mZnNldEhlaWdodCArXG4gICAgICAgIHByb2dyZXNzQmFyLm9mZnNldEhlaWdodCArXG4gICAgICAgIGJhci5vZmZzZXRIZWlnaHQgK1xuICAgICAgICAxMDtcbiAgICB9XG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW5cbiAgICAgID8gZnVsbHNjcmVlbkJvdHRvbVxuICAgICAgOiBzdHlsZXMuUFJFVklFVy5ib3R0b207XG4gICAgY29uc3QgU1RZTEUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUFJFVklFVywge1xuICAgICAgb3BhY2l0eTogdGhpcy5zdGF0ZS5wcmV2aWV3LFxuICAgICAgYm90dG9tOiBib3R0b20sXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e1NUWUxFfT5cbiAgICAgICAge3ByZXZpZXd9XG4gICAgICAgIDxwIHN0eWxlPXt7bWFyZ2luOiAwLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogNH19PlxuICAgICAgICAgIHtgJHt0aGlzLnN0YXRlLnByZXZpZXdJbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBfcmVuZGVyRnVsbHNjcmVlbkljb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c3ZnIGlkPVwidHdvLWFycm93c1wiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgNjEyIDYxMlwiPlxuICAgICAgICAgIDxnPlxuICAgICAgICAgICAgPGcgaWQ9XCJfeDM2X1wiPlxuICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD1cIk0yNjAuNjU1LDM1MS4xNzNjLTMuNjE1LTQuMDE2LTguNzIxLTYuNjM2LTE0LjU1NC02LjY1NWwtMTY0LjkxNS0wLjIyOWMtMTAuOTItMC4wMTktMTkuNzU2LDguODE2LTE5LjczNywxOS43MzcgICAgIGMwLjAxOSwxMC45MiwxMi43NTYsMjMuMTk4LDE4LjIyNiwyOC42NjhsNDEuNzExLDQxLjcxMkwwLDU1NC42MjVMNTcuMzc1LDYxMmwxMTkuNjA4LTEyMS45NzlsNDEuNzExLDQxLjcxMiAgICAgYzkuMDI3LDkuMDI3LDE4LjE4OCwxOC42MjgsMjkuMTA4LDE4LjY0NmMxMC45MiwwLjAyLDE5Ljc1Ni04LjgxNiwxOS43MzctMTkuNzM2bC0wLjIyOS0xNjQuOTE1ICAgICBDMjY3LjI5MSwzNTkuODk1LDI2NC42NzEsMzU0Ljc4OCwyNjAuNjU1LDM1MS4xNzN6IE00OTMuMTE5LDE3NS40NzJMNjEyLDU3LjM3NUw1NTQuNjI1LDBMNDM2LjU2NiwxMTguNTU2bC00Mi40MTktNDIuNjg3ICAgICBjLTkuMTgxLTkuMjM4LTE4LjQ5NC0xOS4wNjgtMjkuNTg3LTE5LjA4N2MtMTEuMTExLTAuMDE5LTIwLjA4MSw5LjAyNy0yMC4wODEsMjAuMTk2bDAuMjI5LDE2OC43OTcgICAgIGMwLDUuOTY3LDIuNjc4LDExLjE4OCw2Ljc3MSwxNC44OThjMy42OSw0LjExMiw4Ljg3NCw2Ljc4OSwxNC44MDMsNi44MDlsMTY3LjcyNiwwLjIyOWMxMS4wOTMsMC4wMTksMjAuMDgyLTkuMDI3LDIwLjA4Mi0yMC4xOTYgICAgIGMtMC4wMi0xMS4xNjktMTIuOTY3LTIzLjc1My0xOC41MzItMjkuMzM4TDQ5My4xMTksMTc1LjQ3MnpcIlxuICAgICAgICAgICAgICAgICAgZmlsbD1cIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGlkPVwiZnVsbHNjcmVlblwiXG4gICAgICAgICAgd2lkdGg9XCIxNVwiXG4gICAgICAgICAgaGVpZ2h0PVwiMTVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDM4LjUyOSA0MzguNTI5XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE4MC4xNTYsMjI1LjgyOGMtMS45MDMtMS45MDItNC4wOTMtMi44NTQtNi41NjctMi44NTRjLTIuNDc1LDAtNC42NjUsMC45NTEtNi41NjcsMi44NTRsLTk0Ljc4Nyw5NC43ODdsLTQxLjExMi00MS4xMTcgYy0zLjYxNy0zLjYxLTcuODk1LTUuNDIxLTEyLjg0Ny01LjQyMWMtNC45NTIsMC05LjIzNSwxLjgxMS0xMi44NTEsNS40MjFjLTMuNjE3LDMuNjIxLTUuNDI0LDcuOTA1LTUuNDI0LDEyLjg1NHYxMjcuOTA3IGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2MzLjYxOSwzLjYxMyw3LjkwMiw1LjQyNCwxMi44NTEsNS40MjRoMTI3LjkwNmM0Ljk0OSwwLDkuMjMtMS44MTEsMTIuODQ3LTUuNDI0IGMzLjYxNS0zLjYxNyw1LjQyNC03Ljg5OCw1LjQyNC0xMi44NDdzLTEuODA5LTkuMjMzLTUuNDI0LTEyLjg1NGwtNDEuMTEyLTQxLjEwNGw5NC43ODctOTQuNzkzIGMxLjkwMi0xLjkwMywyLjg1My00LjA4NiwyLjg1My02LjU2NGMwLTIuNDc4LTAuOTUzLTQuNjYtMi44NTMtNi41N0wxODAuMTU2LDIyNS44Mjh6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDMzLjExLDUuNDI0QzQyOS40OTYsMS44MDcsNDI1LjIxMiwwLDQyMC4yNjMsMEgyOTIuMzU2Yy00Ljk0OCwwLTkuMjI3LDEuODA3LTEyLjg0Nyw1LjQyNCBjLTMuNjE0LDMuNjE1LTUuNDIxLDcuODk4LTUuNDIxLDEyLjg0N3MxLjgwNyw5LjIzMyw1LjQyMSwxMi44NDdsNDEuMTA2LDQxLjExMmwtOTQuNzg2LDk0Ljc4NyBjLTEuOTAxLDEuOTA2LTIuODU0LDQuMDkzLTIuODU0LDYuNTY3czAuOTUzLDQuNjY1LDIuODU0LDYuNTY3bDMyLjU1MiwzMi41NDhjMS45MDIsMS45MDMsNC4wODYsMi44NTMsNi41NjMsMi44NTMgczQuNjYxLTAuOTUsNi41NjMtMi44NTNsOTQuNzk0LTk0Ljc4N2w0MS4xMDQsNDEuMTA5YzMuNjIsMy42MTYsNy45MDUsNS40MjgsMTIuODU0LDUuNDI4czkuMjI5LTEuODEyLDEyLjg0Ny01LjQyOCBjMy42MTQtMy42MTQsNS40MjEtNy44OTgsNS40MjEtMTIuODQ3VjE4LjI2OEM0MzguNTMsMTMuMzE1LDQzNi43MzQsOS4wNCw0MzMuMTEsNS40MjR6XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cblNsaWRlU2hvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IHN0eWxlcy5BUlJPV19CVVRUT04sXG4gIHN0eWxlOiB7fSxcbiAgaW1hZ2VzOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTQgMGwtNCAzIDQgM3YtNnptMCAzbDQgM3YtNmwtNCAzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk0wIDB2Nmw0LTMtNC0zem00IDN2M2w0LTMtNC0zdjN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4ge1xuICAgIHJldHVybjtcbiAgfSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlV2lsbFVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19