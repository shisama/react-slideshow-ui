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
      (0, _toggleFullscreen2.default)(element).then(function (isFullScreen) {
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
      var fullscreenBottom = document.mozFullScreen ? 180 : 120;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJwb2x5ZmlsbCIsIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiaXNGdWxsU2NyZWVuIiwiY29udGVudCIsIm9mZnNldExlZnQiLCJjYWxjUHJvZ3Jlc3NJbmRleCIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJzZXRTdGF0ZSIsInByZXZpZXciLCJwcmV2aWV3SW5kZXgiLCJvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciIsIm9uQ2hhbmdlRnVsbFNjcmVlbiIsImVsZW1lbnQiLCJ0aGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImtleWRvd25FdmVudCIsInN0eWxlIiwid2lkdGgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJrZXkiLCJrZXlDb2RlIiwiY2xpY2tQb3NpdGlvbiIsIk1hdGgiLCJmbG9vciIsImkiLCJjaGVja1dpZHRoIiwiY2FsY1Byb2dyZXNzIiwicGFnZSIsImJhc2UiLCJwcm9ncmVzcyIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJpbWFnZSIsInNyYyIsInBhZ2VXaWxsVXBkYXRlIiwiX3JlbmRlclByZXZpZXciLCJtYXAiLCJpbWciLCJkaXNwbGF5IiwiZnVsbHNjcmVlbkJvdHRvbSIsIm1vekZ1bGxTY3JlZW4iLCJib3R0b20iLCJQUkVWSUVXIiwiU1RZTEUiLCJvcGFjaXR5IiwibWFyZ2luIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJfcmVuZGVyRnVsbHNjcmVlbkljb24iLCJ0aW1lc3RhbXAiLCJ3aXRoVGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJST09UIiwiSU1BR0UiLCJQUkVWX09OX0NPTlRFTlQiLCJORVhUX09OX0NPTlRFTlQiLCJQUk9HUkVTU19CQVIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoZWlnaHQiLCJCQVIiLCJCVVRUT04iLCJwcmV2SWNvbiIsIlBBR0VfVklFVyIsIm5leHRJY29uIiwiYm9yZGVyU3R5bGUiLCJwb3NpdGlvbiIsInJpZ2h0IiwidG9wIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiYXJyb3dCdXR0b25TdHlsZSIsIkFSUk9XX0JVVFRPTiIsIlByb3BUeXBlcyIsIm9iamVjdCIsImFycmF5Iiwibm9kZSIsImJvb2wiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQUEsUUFBUSxhQUFSLEVBQXVCQyxRQUF2Qjs7QUFFQTs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7Ozs7O0FBb0JBOzs7OztJQUtxQkMsUzs7O0FBT25COzs7OztBQUtBLHFCQUFZQyxLQUFaLEVBQTBCO0FBQUE7O0FBQUEsc0hBQ2xCQSxLQURrQjs7QUFBQSxVQWlEMUJDLGlCQWpEMEIsR0FpRE4sWUFBTTtBQUN4QixVQUFJLE1BQUtDLFlBQUwsQ0FBa0IsTUFBS0YsS0FBTCxDQUFXRyxNQUE3QixDQUFKLEVBQTBDO0FBQ3hDO0FBQ0Q7O0FBRUQsVUFBSSxNQUFLQyxLQUFMLENBQVdDLEtBQVgsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDRDs7QUFFRCxVQUFNQyxZQUFZLE1BQUtGLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixDQUFyQztBQUNBLFlBQUtFLGVBQUwsQ0FBcUJELFNBQXJCO0FBQ0QsS0E1RHlCOztBQUFBLFVBa0UxQkUsaUJBbEUwQixHQWtFTixZQUFNO0FBQ3hCLFVBQUksQ0FBQyxNQUFLUixLQUFMLENBQVdHLE1BQWhCLEVB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QU9RLFlBQW5CLEVBQWlDLFNBQVEsU0FBekM7QUFDRTtBQUNFLFlBQUssTUFEUDtBQUVFLFNBQUUsa0NBRko7QUFHRSxpQkFBVTtBQUhaO0FBREYsR0FkcUI7QUFzQnZCdEIsaUJBQWUsS0F0QlE7QUF1QnZCaEIsa0JBQWdCLHdCQUFDL0MsS0FBRCxFQUFnQjZDLEtBQWhCLEVBQWtDO0FBQ2hEO0FBQ0Q7QUF6QnNCLENBQXpCOztBQTRCQW5ELFVBQVU0RixTQUFWLEdBQXNCO0FBQ3BCRixvQkFBa0Isb0JBQVVHLE1BRFI7QUFFcEI1RCxTQUFPLG9CQUFVNEQsTUFGRztBQUdwQnpGLFVBQVEsb0JBQVUwRixLQUhFO0FBSXBCYixZQUFVLG9CQUFVYyxJQUpBO0FBS3BCWixZQUFVLG9CQUFVWSxJQUxBO0FBTXBCMUIsaUJBQWUsb0JBQVUyQixJQU5MO0FBT3BCM0Msa0JBQWdCLG9CQUFVNEM7QUFQTixDQUF0QiIsImZpbGUiOiJTbGlkZVNob3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1N0eWxlcyBhcyBzdHlsZXN9IGZyb20gJy4vU3R5bGVzJztcbmltcG9ydCB0b2dnbGVGdWxsc2NyZWVuIGZyb20gJ3RvZ2dsZS1mdWxsc2NyZWVuJztcblxucmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BzXG4gKiBAcHJvcGVydHkge09iamVjdH0gc3R5bGVcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gaW1hZ2VzLFxuICogQHByb3BlcnR5IHtOb2RlfSBwcmV2SWNvbixcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gbmV4dEljb25cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2l0aFRpbWVzdGFtcFxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gcGFnZVdpbGxVcGRhdGVcbiAqL1xudHlwZSBQcm9wcyA9IHtcbiAgc3R5bGU6IE9iamVjdCxcbiAgaW1hZ2VzOiBBcnJheTxzdHJpbmc+LFxuICBwcmV2SWNvbjogTm9kZSxcbiAgbmV4dEljb246IE5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IGJvb2xlYW4sXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4gdm9pZCxcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzcmNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByb2dyZXNzXG4gKiBAcHJvcGVydHkge251bWJlcn0gdGltZXN0YW1wXG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJldmlld1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHByZXZpZXdJbmRleFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0Z1bGxTY3JlZW5cbiAqL1xudHlwZSBTdGF0ZSA9IHtcbiAgc3JjOiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXIsXG4gIHByb2dyZXNzOiBudW1iZXIsXG4gIHRpbWVzdGFtcDogbnVtYmVyLFxuICBwcmV2aWV3OiBudW1iZXIsXG4gIHByZXZpZXdJbmRleDogbnVtYmVyLFxuICBpc0Z1bGxTY3JlZW46IGJvb2xlYW4sXG59O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgbmFtZWQgU2xpZGVTaG93IGlzIHRoZSBSZWFjdCBjb21wb25lbnQgdGhhdCBhbGxvd3MgeW91XG4gKiB0byBkZXZlbG9wIHNsaWRlc2hvdyBsaWtlICdTbGlkZVNoYXJlJyBvciAnU3BlYWtlckRlY2snIHZlcnkgZWFzeSFcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZVNob3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZTogU3RhdGU7XG4gIHByb3BzOiBQcm9wcztcbiAgc3R5bGU6IE9iamVjdDtcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogT2JqZWN0O1xuICBzdGF0aWMgUHJvcFR5cGVzOiBPYmplY3Q7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIGNhbGwgc3VwZXIgY29uc3RydWN0b3IgYW5kIGluaXRpYWxpemUgc3RhdGVzLlxuICAgKiBAcGFyYW0ge1Byb3BzfSBwcm9wc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gICAgaWYgKHByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHRpbWVzdGFtcCA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLlJPT1QsIHRoaXMucHJvcHMuc3R5bGUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNyYzogJycsXG4gICAgICBpbmRleDogMCxcbiAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICBwcmV2aWV3OiAwLFxuICAgICAgcHJldmlld0luZGV4OiAwLFxuICAgICAgaXNGdWxsU2NyZWVuOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudFdpbGxNb3VudFxuICAgKiB1cGRhdGVzIHN0YXRlcyB3aXRoIHByb3BzIHRvIHJlbmRlciBmaXJzdCB2aWV3LlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYywgcGFnZSwgYW5kIHByb2dyZXNzLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IGltYWdlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMucHJvcHMuaW1hZ2VzO1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLmltYWdlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKDEwMCAvIGltYWdlcy5sZW5ndGgpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcHJvZ3Jlc3MgPSAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlc1swXSxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIHByZXZpb3VzIHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrUHJldkJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5pbWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4IC0gMTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgbmV4dCBwYWdlLlxuICAgKi9cbiAgb25DbGlja05leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmltYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggKyAxO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJvZ3Jlc3NCYXIgaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBzdGF0ZXMgdG8gbW92ZSBwYWdlLlxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIG9uQ2xpY2tQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgYmFyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9ncmVzc0JhcicpWzBdXG4gICAgICAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVzaG93LXdyYXBwZXInKVswXTtcbiAgICAgIHByb2dyZXNzV2lkdGggLT0gY29udGVudC5vZmZzZXRMZWZ0O1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmNhbGNQcm9ncmVzc0luZGV4KGJhcldpZHRoLCBwcm9ncmVzc1dpZHRoKTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIG9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGxldCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlc2hvdy13cmFwcGVyJylbMF07XG4gICAgICBwcm9ncmVzc1dpZHRoIC09IGNvbnRlbnQub2Zmc2V0TGVmdDtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aWV3OiAxLFxuICAgICAgcHJldmlld0luZGV4OiBuZXh0SW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgb25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMCxcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZUZ1bGxTY3JlZW4gPSAoKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudDogT2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICdzbGlkZXNob3ctd3JhcHBlcicsXG4gICAgKVswXTtcbiAgICB0b2dnbGVGdWxsc2NyZWVuKGVsZW1lbnQpLnRoZW4oaXNGdWxsU2NyZWVuID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRnVsbFNjcmVlbjogaXNGdWxsU2NyZWVufSk7XG4gICAgICBpZiAoaXNGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25FdmVudCk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnNzAlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25FdmVudCk7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAga2V5ZG93bkV2ZW50ID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChcbiAgICAgIGUua2V5ID09PSAnQXJyb3dVcCcgfHxcbiAgICAgIGUua2V5ID09PSAnQXJyb3dMZWZ0JyB8fFxuICAgICAgZS5rZXlDb2RlID09PSAzNyB8fFxuICAgICAgZS5rZXlDb2RlID09PSAzOFxuICAgICkge1xuICAgICAgdGhpcy5vbkNsaWNrUHJldkJ1dHRvbigpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBlLmtleSA9PT0gJ0Fycm93RG93bicgfHxcbiAgICAgIGUua2V5ID09PSAnQXJyb3dSaWdodCcgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzkgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gNDAgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzJcbiAgICApIHtcbiAgICAgIHRoaXMub25DbGlja05leHRCdXR0b24oKTtcbiAgICB9IGVsc2UgaWYgKGUua2V5ID09PSAnRXNjYXBlJyB8fCBlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlRnVsbFNjcmVlbigpO1xuICAgIH1cbiAgfTtcblxuICBjYWxjUHJvZ3Jlc3NJbmRleCA9IChiYXJXaWR0aDogbnVtYmVyLCBwcm9ncmVzc1dpZHRoOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBNYXRoLmZsb29yKHByb2dyZXNzV2lkdGggLyBiYXJXaWR0aCAqIDEwMCk7XG4gICAgbGV0IG5leHRJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hlY2tXaWR0aCA9IHRoaXMuY2FsY1Byb2dyZXNzKGkpO1xuICAgICAgaWYgKGNsaWNrUG9zaXRpb24gPj0gY2hlY2tXaWR0aCkge1xuICAgICAgICBuZXh0SW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dEluZGV4O1xuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgY2FsY1Byb2dyZXNzID0gKHBhZ2U6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgYmFzZSA9IDEwMCAvIHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aDtcbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoYmFzZSAqIHBhZ2UpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9O1xuXG4gIGlzRW1wdHlBcnJheSA9IChhcnI6IEFycmF5PHN0cmluZz4pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgdXBkYXRlUGFnZVN0YXRlID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKGluZGV4ICsgMSk7XG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLnByb3BzLmltYWdlc1tpbmRleF07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMucGFnZVdpbGxVcGRhdGUoaW5kZXgsIGltYWdlKTtcbiAgfTtcblxuICAvKipcbiAgICogcmVuZGVyXG4gICAqIEByZXR1cm5zIHtYTUx9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHNyYyA9IHRoaXMuc3RhdGUuc3JjO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHNyYyArPSBgPyR7dGhpcy5zdGF0ZS50aW1lc3RhbXB9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5zdHlsZX0gY2xhc3NOYW1lPVwic2xpZGVzaG93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVzaG93LXdyYXBwZXJcIiBzdHlsZT17e21hcmdpbjogJ2F1dG8nfX0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5JTUFHRX0+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiIHNyYz17c3JjfSBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fSAvPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJldk9uQ29udGVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLlBSRVZfT05fQ09OVEVOVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5leHRPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5ORVhUX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5fcmVuZGVyUHJldmlldygpfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuUFJPR1JFU1NfQkFSfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5vbk1vdXNlTW92ZVByb2dyZXNzQmFyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLm9uTW91c2VMZWF2ZVByb2dyZXNzQmFyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdiYjYnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnN0YXRlLnByb2dyZXNzfSVgLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2Jhcid9IHN0eWxlPXtzdHlsZXMuQkFSfT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydwcmV2QnV0dG9uJ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMucHJldkljb259XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLlBBR0VfVklFV30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaW1hZ2VzXG4gICAgICAgICAgICAgICAgICA/IGAke3RoaXMuc3RhdGUuaW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWBcbiAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnbmV4dEJ1dHRvbid9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRJY29ufVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Z1bGxzY3JlZW4nfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICBib3JkZXJTdHlsZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICByaWdodDogMTAsXG4gICAgICAgICAgICAgICAgICB0b3A6IDUsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2hhbmdlRnVsbFNjcmVlbn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJGdWxsc2NyZWVuSWNvbigpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogcHJldmlldyByZW5kZXJlclxuICAgKiBAcmV0dXJucyB7P1hNTH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJQcmV2aWV3ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZXMgfHwgdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgcHJldmlldyA9IHRoaXMucHJvcHMuaW1hZ2VzLm1hcCgoaW1nLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheSA9IGluZGV4ID09PSB0aGlzLnN0YXRlLnByZXZpZXdJbmRleCA/ICdpbmxpbmUnIDogJ25vbmUnO1xuICAgICAgY29uc3Qga2V5ID0gYHByZXZpZXctJHtpbmRleH1gO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzTmFtZT17a2V5fVxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogZGlzcGxheSwgd2lkdGg6IDIwMH19XG4gICAgICAgICAgc3JjPXtpbWd9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICAgIGNvbnN0IGZ1bGxzY3JlZW5Cb3R0b20gPSBkb2N1bWVudC5tb3pGdWxsU2NyZWVuID8gMTgwIDogMTIwO1xuICAgIGNvbnN0IGJvdHRvbSA9IHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuXG4gICAgICA/IGZ1bGxzY3JlZW5Cb3R0b21cbiAgICAgIDogc3R5bGVzLlBSRVZJRVcuYm90dG9tO1xuICAgIGNvbnN0IFNUWUxFID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLlBSRVZJRVcsIHtcbiAgICAgIG9wYWNpdHk6IHRoaXMuc3RhdGUucHJldmlldyxcbiAgICAgIGJvdHRvbTogYm90dG9tLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtTVFlMRX0+XG4gICAgICAgIHtwcmV2aWV3fVxuICAgICAgICA8cCBzdHlsZT17e21hcmdpbjogMCwgdGV4dEFsaWduOiAnY2VudGVyJywgZm9udFNpemU6IDR9fT5cbiAgICAgICAgICB7YCR7dGhpcy5zdGF0ZS5wcmV2aWV3SW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWB9XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgX3JlbmRlckZ1bGxzY3JlZW5JY29uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHN2ZyBpZD1cInR3by1hcnJvd3NcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDYxMiA2MTJcIj5cbiAgICAgICAgICA8Zz5cbiAgICAgICAgICAgIDxnIGlkPVwiX3gzNl9cIj5cbiAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMjYwLjY1NSwzNTEuMTczYy0zLjYxNS00LjAxNi04LjcyMS02LjYzNi0xNC41NTQtNi42NTVsLTE2NC45MTUtMC4yMjljLTEwLjkyLTAuMDE5LTE5Ljc1Niw4LjgxNi0xOS43MzcsMTkuNzM3ICAgICBjMC4wMTksMTAuOTIsMTIuNzU2LDIzLjE5OCwxOC4yMjYsMjguNjY4bDQxLjcxMSw0MS43MTJMMCw1NTQuNjI1TDU3LjM3NSw2MTJsMTE5LjYwOC0xMjEuOTc5bDQxLjcxMSw0MS43MTIgICAgIGM5LjAyNyw5LjAyNywxOC4xODgsMTguNjI4LDI5LjEwOCwxOC42NDZjMTAuOTIsMC4wMiwxOS43NTYtOC44MTYsMTkuNzM3LTE5LjczNmwtMC4yMjktMTY0LjkxNSAgICAgQzI2Ny4yOTEsMzU5Ljg5NSwyNjQuNjcxLDM1NC43ODgsMjYwLjY1NSwzNTEuMTczeiBNNDkzLjExOSwxNzUuNDcyTDYxMiw1Ny4zNzVMNTU0LjYyNSwwTDQzNi41NjYsMTE4LjU1NmwtNDIuNDE5LTQyLjY4NyAgICAgYy05LjE4MS05LjIzOC0xOC40OTQtMTkuMDY4LTI5LjU4Ny0xOS4wODdjLTExLjExMS0wLjAxOS0yMC4wODEsOS4wMjctMjAuMDgxLDIwLjE5NmwwLjIyOSwxNjguNzk3ICAgICBjMCw1Ljk2NywyLjY3OCwxMS4xODgsNi43NzEsMTQuODk4YzMuNjksNC4xMTIsOC44NzQsNi43ODksMTQuODAzLDYuODA5bDE2Ny43MjYsMC4yMjljMTEuMDkzLDAuMDE5LDIwLjA4Mi05LjAyNywyMC4wODItMjAuMTk2ICAgICBjLTAuMDItMTEuMTY5LTEyLjk2Ny0yMy43NTMtMTguNTMyLTI5LjMzOEw0OTMuMTE5LDE3NS40NzJ6XCJcbiAgICAgICAgICAgICAgICAgIGZpbGw9XCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzdmdcbiAgICAgICAgICBpZD1cImZ1bGxzY3JlZW5cIlxuICAgICAgICAgIHdpZHRoPVwiMTVcIlxuICAgICAgICAgIGhlaWdodD1cIjE1XCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDQzOC41MjkgNDM4LjUyOVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xODAuMTU2LDIyNS44MjhjLTEuOTAzLTEuOTAyLTQuMDkzLTIuODU0LTYuNTY3LTIuODU0Yy0yLjQ3NSwwLTQuNjY1LDAuOTUxLTYuNTY3LDIuODU0bC05NC43ODcsOTQuNzg3bC00MS4xMTItNDEuMTE3IGMtMy42MTctMy42MS03Ljg5NS01LjQyMS0xMi44NDctNS40MjFjLTQuOTUyLDAtOS4yMzUsMS44MTEtMTIuODUxLDUuNDIxYy0zLjYxNywzLjYyMS01LjQyNCw3LjkwNS01LjQyNCwxMi44NTR2MTI3LjkwNyBjMCw0Ljk0OCwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDdjMy42MTksMy42MTMsNy45MDIsNS40MjQsMTIuODUxLDUuNDI0aDEyNy45MDZjNC45NDksMCw5LjIzLTEuODExLDEyLjg0Ny01LjQyNCBjMy42MTUtMy42MTcsNS40MjQtNy44OTgsNS40MjQtMTIuODQ3cy0xLjgwOS05LjIzMy01LjQyNC0xMi44NTRsLTQxLjExMi00MS4xMDRsOTQuNzg3LTk0Ljc5MyBjMS45MDItMS45MDMsMi44NTMtNC4wODYsMi44NTMtNi41NjRjMC0yLjQ3OC0wLjk1My00LjY2LTIuODUzLTYuNTdMMTgwLjE1NiwyMjUuODI4elwiIC8+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTQzMy4xMSw1LjQyNEM0MjkuNDk2LDEuODA3LDQyNS4yMTIsMCw0MjAuMjYzLDBIMjkyLjM1NmMtNC45NDgsMC05LjIyNywxLjgwNy0xMi44NDcsNS40MjQgYy0zLjYxNCwzLjYxNS01LjQyMSw3Ljg5OC01LjQyMSwxMi44NDdzMS44MDcsOS4yMzMsNS40MjEsMTIuODQ3bDQxLjEwNiw0MS4xMTJsLTk0Ljc4Niw5NC43ODcgYy0xLjkwMSwxLjkwNi0yLjg1NCw0LjA5My0yLjg1NCw2LjU2N3MwLjk1Myw0LjY2NSwyLjg1NCw2LjU2N2wzMi41NTIsMzIuNTQ4YzEuOTAyLDEuOTAzLDQuMDg2LDIuODUzLDYuNTYzLDIuODUzIHM0LjY2MS0wLjk1LDYuNTYzLTIuODUzbDk0Ljc5NC05NC43ODdsNDEuMTA0LDQxLjEwOWMzLjYyLDMuNjE2LDcuOTA1LDUuNDI4LDEyLjg1NCw1LjQyOHM5LjIyOS0xLjgxMiwxMi44NDctNS40MjggYzMuNjE0LTMuNjE0LDUuNDIxLTcuODk4LDUuNDIxLTEyLjg0N1YxOC4yNjhDNDM4LjUzLDEzLjMxNSw0MzYuNzM0LDkuMDQsNDMzLjExLDUuNDI0elwiIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5TbGlkZVNob3cuZGVmYXVsdFByb3BzID0ge1xuICBhcnJvd0J1dHRvblN0eWxlOiBzdHlsZXMuQVJST1dfQlVUVE9OLFxuICBzdHlsZToge30sXG4gIGltYWdlczogW10sXG4gIHByZXZJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk00IDBsLTQgMyA0IDN2LTZ6bTAgM2w0IDN2LTZsLTQgM3pcIlxuICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApLFxuICBuZXh0SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiI2ZmZlwiXG4gICAgICAgIGQ9XCJNMCAwdjZsNC0zLTQtM3ptNCAzdjNsNC0zLTQtM3YzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIHdpdGhUaW1lc3RhbXA6IGZhbHNlLFxuICBwYWdlV2lsbFVwZGF0ZTogKGluZGV4OiBudW1iZXIsIGltYWdlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm47XG4gIH0sXG59O1xuXG5TbGlkZVNob3cuUHJvcFR5cGVzID0ge1xuICBhcnJvd0J1dHRvblN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgaW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG4gIHByZXZJY29uOiBQcm9wVHlwZXMubm9kZSxcbiAgbmV4dEljb246IFByb3BUeXBlcy5ub2RlLFxuICB3aXRoVGltZXN0YW1wOiBQcm9wVHlwZXMuYm9vbCxcbiAgcGFnZVdpbGxVcGRhdGU6IFByb3BUeXBlcy5mdW5jLFxufTtcbiJdfQ==