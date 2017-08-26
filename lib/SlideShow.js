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
      (0, _toggleFullscreen2.default)(element, function (isFullScreen) {
        _this.setState({ isFullScreen: isFullScreen });
        if (isFullScreen) {
          document.addEventListener('keydown', _this.keydownEvent);
          element.style.width = '70%';
        } else {
          document.removeEventListener('keydown', _this.keydownEvent);
          element.style.width = '100%';
        }
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
                this.props.images ? this.state.index + 1 + ' / ' + this.props.images.length : null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJwb2x5ZmlsbCIsIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiaXNGdWxsU2NyZWVuIiwiY29udGVudCIsIm9mZnNldExlZnQiLCJjYWxjUHJvZ3Jlc3NJbmRleCIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJzZXRTdGF0ZSIsInByZXZpZXciLCJwcmV2aWV3SW5kZXgiLCJvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciIsIm9uQ2hhbmdlRnVsbFNjcmVlbiIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwia2V5ZG93bkV2ZW50Iiwic3R5bGUiLCJ3aWR0aCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50RGVmYXVsdCIsImtleSIsImtleUNvZGUiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJjYWxjUHJvZ3Jlc3MiLCJwYWdlIiwiYmFzZSIsInByb2dyZXNzIiwiY2VpbCIsImFyciIsInVuZGVmaW5lZCIsImltYWdlIiwic3JjIiwicGFnZVdpbGxVcGRhdGUiLCJfcmVuZGVyUHJldmlldyIsIm1hcCIsImltZyIsImRpc3BsYXkiLCJmdWxsc2NyZWVuQm90dG9tIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJwcm9ncmVzc0JhciIsImJhciIsIndpbmRvdyIsInNjcmVlbiIsImF2YWlsSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiYm90dG9tIiwiUFJFVklFVyIsIlNUWUxFIiwib3BhY2l0eSIsIm1hcmdpbiIsInRleHRBbGlnbiIsImZvbnRTaXplIiwiX3JlbmRlckZ1bGxzY3JlZW5JY29uIiwidGltZXN0YW1wIiwid2l0aFRpbWVzdGFtcCIsIkRhdGUiLCJnZXRUaW1lIiwiUk9PVCIsIklNQUdFIiwiUFJFVl9PTl9DT05URU5UIiwiTkVYVF9PTl9DT05URU5UIiwiUFJPR1JFU1NfQkFSIiwiYmFja2dyb3VuZENvbG9yIiwiaGVpZ2h0IiwiQkFSIiwiQlVUVE9OIiwicHJldkljb24iLCJQQUdFX1ZJRVciLCJuZXh0SWNvbiIsImJvcmRlclN0eWxlIiwicG9zaXRpb24iLCJyaWdodCIsInRvcCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImFycm93QnV0dG9uU3R5bGUiLCJBUlJPV19CVVRUT04iLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJhcnJheSIsIm5vZGUiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUFBLFFBQVEsYUFBUixFQUF1QkMsUUFBdkI7O0FBRUE7Ozs7Ozs7Ozs7O0FBa0JBOzs7Ozs7Ozs7OztBQW9CQTs7Ozs7SUFLcUJDLFM7OztBQU9uQjs7Ozs7QUFLQSxxQkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLHNIQUNsQkEsS0FEa0I7O0FBQUEsVUFpRDFCQyxpQkFqRDBCLEdBaUROLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxZQUFMLENBQWtCLE1BQUtGLEtBQUwsQ0FBV0csTUFBN0IsQ0FBSixFQUEwQztBQUN4QztBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsVUFBTUMsWUFBWSxNQUFLRixLQUFMLENBQVdDLEtBQVgsR0FBbUIsQ0FBckM7QUFDQSxZQUFLRSxlQUFMLENBQXFCRCxTQUFyQjtBQUNELEtBNUR5Qjs7QUFB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QUZUO0FBU0UsMkJBQVMsS0FBS2pFO0FBVGhCO0FBV0cscUJBQUs2QyxxQkFBTDtBQVhIO0FBREY7QUF0QkY7QUFqQ0Y7QUFERixPQURGO0FBNEVEOztBQUVEOzs7Ozs7Ozs7RUF2U3FDLGdCQUFNcUIsUzs7a0JBQXhCOUYsUzs7O0FBNlhyQkEsVUFBVStGLFlBQVYsR0FBeUI7QUFDdkJDLG9CQUFrQixlQUFPQyxZQURGO0FBRXZCakUsU0FBTyxFQUZnQjtBQUd2QjVCLFVBQVEsRUFIZTtBQUl2Qm1GLFlBQ0U7QUFBQTtBQUFBLE1BQUssT0FBTyxlQUFPVSxZQUFuQixFQUFpQyxTQUFRLFNBQXpDO0FBQ0U7QUFDRSxZQUFLLE1BRFA7QUFFRSxTQUFFLG9DQUZKO0FBR0UsaUJBQVU7QUFIWjtBQURGLEdBTHFCO0FBYXZCUixZQUNFO0FBQUE7QUFBQSxNQUFLLE9BQU8sZUFBT1EsWUFBbkIsRUFBaUMsU0FBUSxTQUF6QztBQUNFO0FBQ0UsWUFBSyxNQURQO0FBRUUsU0FBRSxrQ0FGSjtBQUdFLGlCQUFVO0FBSFo7QUFERixHQWRxQjtBQXNCdkJ0QixpQkFBZSxLQXRCUTtBQXVCdkJ2QixrQkFBZ0Isd0JBQUM5QyxLQUFELEVBQWdCNEMsS0FBaEIsRUFBa0M7QUFDaEQ7QUFDRDtBQXpCc0IsQ0FBekI7O0FBNEJBbEQsVUFBVWtHLFNBQVYsR0FBc0I7QUFDcEJGLG9CQUFrQixvQkFBVUcsTUFEUjtBQUVwQm5FLFNBQU8sb0JBQVVtRSxNQUZHO0FBR3BCL0YsVUFBUSxvQkFBVWdHLEtBSEU7QUFJcEJiLFlBQVUsb0JBQVVjLElBSkE7QUFLcEJaLFlBQVUsb0JBQVVZLElBTEE7QUFNcEIxQixpQkFBZSxvQkFBVTJCLElBTkw7QUFPcEJsRCxrQkFBZ0Isb0JBQVVtRDtBQVBOLENBQXRCIiwiZmlsZSI6IlNsaWRlU2hvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7U3R5bGVzIGFzIHN0eWxlc30gZnJvbSAnLi9TdHlsZXMnO1xuaW1wb3J0IHRvZ2dsZUZ1bGxzY3JlZW4gZnJvbSAndG9nZ2xlLWZ1bGxzY3JlZW4nO1xuXG5yZXF1aXJlKCdlczYtcHJvbWlzZScpLnBvbHlmaWxsKCk7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUHJvcHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzdHlsZVxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBpbWFnZXMsXG4gKiBAcHJvcGVydHkge05vZGV9IHByZXZJY29uLFxuICogQHByb3BlcnR5IHtOb2RlfSBuZXh0SWNvblxuICogQHByb3BlcnR5IHtib29sZWFufSB3aXRoVGltZXN0YW1wXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBwYWdlV2lsbFVwZGF0ZVxuICovXG50eXBlIFByb3BzID0ge1xuICBzdHlsZTogT2JqZWN0LFxuICBpbWFnZXM6IEFycmF5PHN0cmluZz4sXG4gIHByZXZJY29uOiBOb2RlLFxuICBuZXh0SWNvbjogTm9kZSxcbiAgd2l0aFRpbWVzdGFtcDogYm9vbGVhbixcbiAgcGFnZVdpbGxVcGRhdGU6IChpbmRleDogbnVtYmVyLCBpbWFnZTogc3RyaW5nKSA9PiB2b2lkLFxufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNyY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJldmlld0luZGV4XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzRnVsbFNjcmVlblxuICovXG50eXBlIFN0YXRlID0ge1xuICBzcmM6IHN0cmluZyxcbiAgaW5kZXg6IG51bWJlcixcbiAgcHJvZ3Jlc3M6IG51bWJlcixcbiAgdGltZXN0YW1wOiBudW1iZXIsXG4gIHByZXZpZXc6IG51bWJlcixcbiAgcHJldmlld0luZGV4OiBudW1iZXIsXG4gIGlzRnVsbFNjcmVlbjogYm9vbGVhbixcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBuYW1lZCBTbGlkZVNob3cgaXMgdGhlIFJlYWN0IGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3VcbiAqIHRvIGRldmVsb3Agc2xpZGVzaG93IGxpa2UgJ1NsaWRlU2hhcmUnIG9yICdTcGVha2VyRGVjaycgdmVyeSBlYXN5IVxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgcHJvcHM6IFByb3BzO1xuICBzdHlsZTogT2JqZWN0O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBPYmplY3Q7XG4gIHN0YXRpYyBQcm9wVHlwZXM6IE9iamVjdDtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogY2FsbCBzdXBlciBjb25zdHJ1Y3RvciBhbmQgaW5pdGlhbGl6ZSBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7UHJvcHN9IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gMDtcbiAgICBpZiAocHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIHRoaXMuc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUk9PVCwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3JjOiAnJyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBwcmV2aWV3SW5kZXg6IDAsXG4gICAgICBpc0Z1bGxTY3JlZW46IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogY29tcG9uZW50V2lsbE1vdW50XG4gICAqIHVwZGF0ZXMgc3RhdGVzIHdpdGggcHJvcHMgdG8gcmVuZGVyIGZpcnN0IHZpZXcuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjLCBwYWdlLCBhbmQgcHJvZ3Jlc3MuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgaW1hZ2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5wcm9wcy5pbWFnZXM7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuaW1hZ2VzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoMTAwIC8gaW1hZ2VzLmxlbmd0aCk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICBwcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2VzWzBdLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICBwcmV2aWV3OiAwLFxuICAgICAgcHJldmlld0luZGV4OiAwLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJldmlvdXMgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgcHJldmlvdXMgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tQcmV2QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLmltYWdlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggLSAxO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gbmV4dCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBuZXh0IHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW1hZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCArIDE7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcm9ncmVzc0JhciBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIHN0YXRlcyB0byBtb3ZlIHBhZ2UuXG4gICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICAgKi9cbiAgb25DbGlja1Byb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgcHJvZ3Jlc3NXaWR0aCA9IGUuY2xpZW50WDtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4pIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXNob3ctd3JhcHBlcicpWzBdO1xuICAgICAgcHJvZ3Jlc3NXaWR0aCAtPSBjb250ZW50Lm9mZnNldExlZnQ7XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY2FsY1Byb2dyZXNzSW5kZXgoYmFyV2lkdGgsIHByb2dyZXNzV2lkdGgpO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgb25Nb3VzZU1vdmVQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgYmFyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9ncmVzc0JhcicpWzBdXG4gICAgICAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVzaG93LXdyYXBwZXInKVswXTtcbiAgICAgIHByb2dyZXNzV2lkdGggLT0gY29udGVudC5vZmZzZXRMZWZ0O1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmNhbGNQcm9ncmVzc0luZGV4KGJhcldpZHRoLCBwcm9ncmVzc1dpZHRoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZXZpZXc6IDEsXG4gICAgICBwcmV2aWV3SW5kZXg6IG5leHRJbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aWV3OiAwLFxuICAgIH0pO1xuICB9O1xuXG4gIG9uQ2hhbmdlRnVsbFNjcmVlbiA9ICgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50OiBPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgJ3NsaWRlc2hvdy13cmFwcGVyJyxcbiAgICApWzBdO1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4oZWxlbWVudCwgaXNGdWxsU2NyZWVuID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRnVsbFNjcmVlbjogaXNGdWxsU2NyZWVufSk7XG4gICAgICBpZiAoaXNGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25FdmVudCk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnNzAlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25FdmVudCk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAga2V5ZG93bkV2ZW50ID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChcbiAgICAgIGUua2V5ID09PSAnQXJyb3dVcCcgfHxcbiAgICAgIGUua2V5ID09PSAnQXJyb3dMZWZ0JyB8fFxuICAgICAgZS5rZXlDb2RlID09PSAzNyB8fFxuICAgICAgZS5rZXlDb2RlID09PSAzOFxuICAgICkge1xuICAgICAgdGhpcy5vbkNsaWNrUHJldkJ1dHRvbigpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBlLmtleSA9PT0gJ0Fycm93RG93bicgfHxcbiAgICAgIGUua2V5ID09PSAnQXJyb3dSaWdodCcgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzkgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gNDAgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzJcbiAgICApIHtcbiAgICAgIHRoaXMub25DbGlja05leHRCdXR0b24oKTtcbiAgICB9IGVsc2UgaWYgKGUua2V5ID09PSAnRXNjYXBlJyB8fCBlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlRnVsbFNjcmVlbigpO1xuICAgIH1cbiAgfTtcblxuICBjYWxjUHJvZ3Jlc3NJbmRleCA9IChiYXJXaWR0aDogbnVtYmVyLCBwcm9ncmVzc1dpZHRoOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBNYXRoLmZsb29yKHByb2dyZXNzV2lkdGggLyBiYXJXaWR0aCAqIDEwMCk7XG4gICAgbGV0IG5leHRJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hlY2tXaWR0aCA9IHRoaXMuY2FsY1Byb2dyZXNzKGkpO1xuICAgICAgaWYgKGNsaWNrUG9zaXRpb24gPj0gY2hlY2tXaWR0aCkge1xuICAgICAgICBuZXh0SW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dEluZGV4O1xuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgY2FsY1Byb2dyZXNzID0gKHBhZ2U6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgYmFzZSA9IDEwMCAvIHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aDtcbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoYmFzZSAqIHBhZ2UpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9O1xuXG4gIGlzRW1wdHlBcnJheSA9IChhcnI6IEFycmF5PHN0cmluZz4pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgdXBkYXRlUGFnZVN0YXRlID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKGluZGV4ICsgMSk7XG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLnByb3BzLmltYWdlc1tpbmRleF07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMucGFnZVdpbGxVcGRhdGUoaW5kZXgsIGltYWdlKTtcbiAgfTtcblxuICAvKipcbiAgICogcmVuZGVyXG4gICAqIEByZXR1cm5zIHtYTUx9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHNyYyA9IHRoaXMuc3RhdGUuc3JjO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHNyYyArPSBgPyR7dGhpcy5zdGF0ZS50aW1lc3RhbXB9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5zdHlsZX0gY2xhc3NOYW1lPVwic2xpZGVzaG93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVzaG93LXdyYXBwZXJcIiBzdHlsZT17e21hcmdpbjogJ2F1dG8nfX0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5JTUFHRX0+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiIHNyYz17c3JjfSBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fSAvPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJldk9uQ29udGVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLlBSRVZfT05fQ09OVEVOVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5leHRPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5ORVhUX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5fcmVuZGVyUHJldmlldygpfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuUFJPR1JFU1NfQkFSfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5vbk1vdXNlTW92ZVByb2dyZXNzQmFyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLm9uTW91c2VMZWF2ZVByb2dyZXNzQmFyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdiYjYnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnN0YXRlLnByb2dyZXNzfSVgLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2Jhcid9IHN0eWxlPXtzdHlsZXMuQkFSfT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydwcmV2QnV0dG9uJ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMucHJldkljb259XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLlBBR0VfVklFV30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaW1hZ2VzXG4gICAgICAgICAgICAgICAgICA/IGAke3RoaXMuc3RhdGUuaW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWBcbiAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnbmV4dEJ1dHRvbid9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRJY29ufVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Z1bGxzY3JlZW4nfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICBib3JkZXJTdHlsZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICByaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICB0b3A6IDUsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlRnVsbFNjcmVlbn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJGdWxsc2NyZWVuSWNvbigpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogcHJldmlldyByZW5kZXJlclxuICAgKiBAcmV0dXJucyB7P1hNTH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJQcmV2aWV3ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZXMgfHwgdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgcHJldmlldyA9IHRoaXMucHJvcHMuaW1hZ2VzLm1hcCgoaW1nLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheSA9IGluZGV4ID09PSB0aGlzLnN0YXRlLnByZXZpZXdJbmRleCA/ICdpbmxpbmUnIDogJ25vbmUnO1xuICAgICAgY29uc3Qga2V5ID0gYHByZXZpZXctJHtpbmRleH1gO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzTmFtZT17a2V5fVxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogZGlzcGxheSwgd2lkdGg6IDIwMH19XG4gICAgICAgICAgc3JjPXtpbWd9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICAgIGxldCBmdWxsc2NyZWVuQm90dG9tID0gMTIwO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVzaG93LXdyYXBwZXInKTtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc0JhcicpO1xuICAgIGNvbnN0IGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXInKTtcbiAgICBpZiAod3JhcHBlciAmJiBjb250ZW50ICYmIHByb2dyZXNzQmFyICYmIGJhcikge1xuICAgICAgZnVsbHNjcmVlbkJvdHRvbSA9XG4gICAgICAgIHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQgLVxuICAgICAgICBjb250ZW50Lm9mZnNldEhlaWdodCArXG4gICAgICAgIHByb2dyZXNzQmFyLm9mZnNldEhlaWdodCArXG4gICAgICAgIGJhci5vZmZzZXRIZWlnaHQgK1xuICAgICAgICAxMDtcbiAgICB9XG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW5cbiAgICAgID8gZnVsbHNjcmVlbkJvdHRvbVxuICAgICAgOiBzdHlsZXMuUFJFVklFVy5ib3R0b207XG4gICAgY29uc3QgU1RZTEUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUFJFVklFVywge1xuICAgICAgb3BhY2l0eTogdGhpcy5zdGF0ZS5wcmV2aWV3LFxuICAgICAgYm90dG9tOiBib3R0b20sXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e1NUWUxFfT5cbiAgICAgICAge3ByZXZpZXd9XG4gICAgICAgIDxwIHN0eWxlPXt7bWFyZ2luOiAwLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogNH19PlxuICAgICAgICAgIHtgJHt0aGlzLnN0YXRlLnByZXZpZXdJbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBfcmVuZGVyRnVsbHNjcmVlbkljb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c3ZnIGlkPVwidHdvLWFycm93c1wiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgNjEyIDYxMlwiPlxuICAgICAgICAgIDxnPlxuICAgICAgICAgICAgPGcgaWQ9XCJfeDM2X1wiPlxuICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD1cIk0yNjAuNjU1LDM1MS4xNzNjLTMuNjE1LTQuMDE2LTguNzIxLTYuNjM2LTE0LjU1NC02LjY1NWwtMTY0LjkxNS0wLjIyOWMtMTAuOTItMC4wMTktMTkuNzU2LDguODE2LTE5LjczNywxOS43MzcgICAgIGMwLjAxOSwxMC45MiwxMi43NTYsMjMuMTk4LDE4LjIyNiwyOC42NjhsNDEuNzExLDQxLjcxMkwwLDU1NC42MjVMNTcuMzc1LDYxMmwxMTkuNjA4LTEyMS45NzlsNDEuNzExLDQxLjcxMiAgICAgYzkuMDI3LDkuMDI3LDE4LjE4OCwxOC42MjgsMjkuMTA4LDE4LjY0NmMxMC45MiwwLjAyLDE5Ljc1Ni04LjgxNiwxOS43MzctMTkuNzM2bC0wLjIyOS0xNjQuOTE1ICAgICBDMjY3LjI5MSwzNTkuODk1LDI2NC42NzEsMzU0Ljc4OCwyNjAuNjU1LDM1MS4xNzN6IE00OTMuMTE5LDE3NS40NzJMNjEyLDU3LjM3NUw1NTQuNjI1LDBMNDM2LjU2NiwxMTguNTU2bC00Mi40MTktNDIuNjg3ICAgICBjLTkuMTgxLTkuMjM4LTE4LjQ5NC0xOS4wNjgtMjkuNTg3LTE5LjA4N2MtMTEuMTExLTAuMDE5LTIwLjA4MSw5LjAyNy0yMC4wODEsMjAuMTk2bDAuMjI5LDE2OC43OTcgICAgIGMwLDUuOTY3LDIuNjc4LDExLjE4OCw2Ljc3MSwxNC44OThjMy42OSw0LjExMiw4Ljg3NCw2Ljc4OSwxNC44MDMsNi44MDlsMTY3LjcyNiwwLjIyOWMxMS4wOTMsMC4wMTksMjAuMDgyLTkuMDI3LDIwLjA4Mi0yMC4xOTYgICAgIGMtMC4wMi0xMS4xNjktMTIuOTY3LTIzLjc1My0xOC41MzItMjkuMzM4TDQ5My4xMTksMTc1LjQ3MnpcIlxuICAgICAgICAgICAgICAgICAgZmlsbD1cIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGlkPVwiZnVsbHNjcmVlblwiXG4gICAgICAgICAgd2lkdGg9XCIxNVwiXG4gICAgICAgICAgaGVpZ2h0PVwiMTVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDM4LjUyOSA0MzguNTI5XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE4MC4xNTYsMjI1LjgyOGMtMS45MDMtMS45MDItNC4wOTMtMi44NTQtNi41NjctMi44NTRjLTIuNDc1LDAtNC42NjUsMC45NTEtNi41NjcsMi44NTRsLTk0Ljc4Nyw5NC43ODdsLTQxLjExMi00MS4xMTcgYy0zLjYxNy0zLjYxLTcuODk1LTUuNDIxLTEyLjg0Ny01LjQyMWMtNC45NTIsMC05LjIzNSwxLjgxMS0xMi44NTEsNS40MjFjLTMuNjE3LDMuNjIxLTUuNDI0LDcuOTA1LTUuNDI0LDEyLjg1NHYxMjcuOTA3IGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2MzLjYxOSwzLjYxMyw3LjkwMiw1LjQyNCwxMi44NTEsNS40MjRoMTI3LjkwNmM0Ljk0OSwwLDkuMjMtMS44MTEsMTIuODQ3LTUuNDI0IGMzLjYxNS0zLjYxNyw1LjQyNC03Ljg5OCw1LjQyNC0xMi44NDdzLTEuODA5LTkuMjMzLTUuNDI0LTEyLjg1NGwtNDEuMTEyLTQxLjEwNGw5NC43ODctOTQuNzkzIGMxLjkwMi0xLjkwMywyLjg1My00LjA4NiwyLjg1My02LjU2NGMwLTIuNDc4LTAuOTUzLTQuNjYtMi44NTMtNi41N0wxODAuMTU2LDIyNS44Mjh6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDMzLjExLDUuNDI0QzQyOS40OTYsMS44MDcsNDI1LjIxMiwwLDQyMC4yNjMsMEgyOTIuMzU2Yy00Ljk0OCwwLTkuMjI3LDEuODA3LTEyLjg0Nyw1LjQyNCBjLTMuNjE0LDMuNjE1LTUuNDIxLDcuODk4LTUuNDIxLDEyLjg0N3MxLjgwNyw5LjIzMyw1LjQyMSwxMi44NDdsNDEuMTA2LDQxLjExMmwtOTQuNzg2LDk0Ljc4NyBjLTEuOTAxLDEuOTA2LTIuODU0LDQuMDkzLTIuODU0LDYuNTY3czAuOTUzLDQuNjY1LDIuODU0LDYuNTY3bDMyLjU1MiwzMi41NDhjMS45MDIsMS45MDMsNC4wODYsMi44NTMsNi41NjMsMi44NTMgczQuNjYxLTAuOTUsNi41NjMtMi44NTNsOTQuNzk0LTk0Ljc4N2w0MS4xMDQsNDEuMTA5YzMuNjIsMy42MTYsNy45MDUsNS40MjgsMTIuODU0LDUuNDI4czkuMjI5LTEuODEyLDEyLjg0Ny01LjQyOCBjMy42MTQtMy42MTQsNS40MjEtNy44OTgsNS40MjEtMTIuODQ3VjE4LjI2OEM0MzguNTMsMTMuMzE1LDQzNi43MzQsOS4wNCw0MzMuMTEsNS40MjR6XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cblNsaWRlU2hvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IHN0eWxlcy5BUlJPV19CVVRUT04sXG4gIHN0eWxlOiB7fSxcbiAgaW1hZ2VzOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTQgMGwtNCAzIDQgM3YtNnptMCAzbDQgM3YtNmwtNCAzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk0wIDB2Nmw0LTMtNC0zem00IDN2M2w0LTMtNC0zdjN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4ge1xuICAgIHJldHVybjtcbiAgfSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlV2lsbFVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19