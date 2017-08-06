'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styles = require('./Styles');

var _fullscreen = require('./fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

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
      (0, _fullscreen2.default)(element, function (isFullScreen) {
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
      } else if (e.key === 'Escape') {
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
      var STYLE = Object.assign({}, _Styles.Styles.PREVIEW, {
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

    _this.style = Object.assign({}, _Styles.Styles.ROOT, _this.props.style);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiaXNGdWxsU2NyZWVuIiwiY29udGVudCIsIm9mZnNldExlZnQiLCJjYWxjUHJvZ3Jlc3NJbmRleCIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJzZXRTdGF0ZSIsInByZXZpZXciLCJwcmV2aWV3SW5kZXgiLCJvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciIsIm9uQ2hhbmdlRnVsbFNjcmVlbiIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwia2V5ZG93bkV2ZW50Iiwic3R5bGUiLCJ3aWR0aCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50RGVmYXVsdCIsImtleSIsImtleUNvZGUiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJjYWxjUHJvZ3Jlc3MiLCJwYWdlIiwiYmFzZSIsInByb2dyZXNzIiwiY2VpbCIsImFyciIsInVuZGVmaW5lZCIsImltYWdlIiwic3JjIiwicGFnZVdpbGxVcGRhdGUiLCJfcmVuZGVyUHJldmlldyIsIm1hcCIsImltZyIsImRpc3BsYXkiLCJmdWxsc2NyZWVuQm90dG9tIiwibW96RnVsbFNjcmVlbiIsImJvdHRvbSIsIlBSRVZJRVciLCJTVFlMRSIsIk9iamVjdCIsImFzc2lnbiIsIm9wYWNpdHkiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsIl9yZW5kZXJGdWxsc2NyZWVuSWNvbiIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsIlJPT1QiLCJJTUFHRSIsIlBSRVZfT05fQ09OVEVOVCIsIk5FWFRfT05fQ09OVEVOVCIsIlBST0dSRVNTX0JBUiIsImJhY2tncm91bmRDb2xvciIsImhlaWdodCIsIkJBUiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwicmlnaHQiLCJ0b3AiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUF3Q0E7Ozs7Ozs7QUF0Q0E7Ozs7Ozs7Ozs7O0FBa0JBOzs7Ozs7Ozs7O0lBeUJxQkEsUzs7O0FBT25COzs7OztBQUtBLHFCQUFZQyxLQUFaLEVBQTBCO0FBQUE7O0FBQUEsc0hBQ2xCQSxLQURrQjs7QUFBQSxVQWlEMUJDLGlCQWpEMEIsR0FpRE4sWUFBTTtBQUN4QixVQUFJLE1BQUtDLFlBQUwsQ0FBa0IsTUFBS0YsS0FBTCxDQUFXRyxNQUE3QixDQUFKLEVBQTBDO0FBQ3hDO0FBQ0Q7O0FBRUQsVUFBSSxNQUFLQyxLQUFMLENBQVdDLEtBQVgsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDRDs7QUFFRCxVQUFNQyxZQUFZLE1BQUtGLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixDQUFyQztBQUNBLFlBQUtFLGVBQUwsQ0FBcUJELFNBQXJCO0FBQ0QsS0E1RHlCOztBQUFBLFVBa0UxQkUsaUJBbEUwQixHQWtFTixZQUFNO0FBQ3hCLFVBQUksQ0FBQyxNQUFLUixLQUFMLENBQVdHLE1BQWhCLEVBQXdCO0FBQ3RCO0FBQ0Q7O0FBRUQsVUFBSSxNQUFLQyxLQUFMLENB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QUZKO0FBR0UsaUJBQVU7QUFIWjtBQURGLEdBZHFCO0FBc0J2QnRCLGlCQUFlLEtBdEJRO0FBdUJ2QmxCLGtCQUFnQix3QkFBQzlDLEtBQUQsRUFBZ0I0QyxLQUFoQixFQUFrQztBQUNoRDtBQUNEO0FBekJzQixDQUF6Qjs7QUE0QkFsRCxVQUFVNkYsU0FBVixHQUFzQjtBQUNwQkYsb0JBQWtCLG9CQUFVRyxNQURSO0FBRXBCOUQsU0FBTyxvQkFBVThELE1BRkc7QUFHcEIxRixVQUFRLG9CQUFVMkYsS0FIRTtBQUlwQmIsWUFBVSxvQkFBVWMsSUFKQTtBQUtwQlosWUFBVSxvQkFBVVksSUFMQTtBQU1wQjFCLGlCQUFlLG9CQUFVMkIsSUFOTDtBQU9wQjdDLGtCQUFnQixvQkFBVThDO0FBUE4sQ0FBdEIiLCJmaWxlIjoiU2xpZGVTaG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtTdHlsZXMgYXMgc3R5bGVzfSBmcm9tICcuL1N0eWxlcyc7XG5pbXBvcnQgc3dpdGNoRnVsbHNjcmVlbiBmcm9tICcuL2Z1bGxzY3JlZW4nO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BzXG4gKiBAcHJvcGVydHkge09iamVjdH0gc3R5bGVcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gaW1hZ2VzLFxuICogQHByb3BlcnR5IHtOb2RlfSBwcmV2SWNvbixcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gbmV4dEljb25cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2l0aFRpbWVzdGFtcFxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gcGFnZVdpbGxVcGRhdGVcbiAqL1xudHlwZSBQcm9wcyA9IHtcbiAgc3R5bGU6IE9iamVjdCxcbiAgaW1hZ2VzOiBBcnJheTxzdHJpbmc+LFxuICBwcmV2SWNvbjogTm9kZSxcbiAgbmV4dEljb246IE5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IGJvb2xlYW4sXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4gdm9pZCxcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzcmNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByb2dyZXNzXG4gKiBAcHJvcGVydHkge251bWJlcn0gdGltZXN0YW1wXG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJldmlld1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHByZXZpZXdJbmRleFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0Z1bGxTY3JlZW5cbiAqL1xudHlwZSBTdGF0ZSA9IHtcbiAgc3JjOiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXIsXG4gIHByb2dyZXNzOiBudW1iZXIsXG4gIHRpbWVzdGFtcDogbnVtYmVyLFxuICBwcmV2aWV3OiBudW1iZXIsXG4gIHByZXZpZXdJbmRleDogbnVtYmVyLFxuICBpc0Z1bGxTY3JlZW46IGJvb2xlYW4sXG59O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgbmFtZWQgU2xpZGVTaG93IGlzIHRoZSBSZWFjdCBjb21wb25lbnQgdGhhdCBhbGxvd3MgeW91XG4gKiB0byBkZXZlbG9wIHNsaWRlc2hvdyBsaWtlICdTbGlkZVNoYXJlJyBvciAnU3BlYWtlckRlY2snIHZlcnkgZWFzeSFcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZVNob3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZTogU3RhdGU7XG4gIHByb3BzOiBQcm9wcztcbiAgc3R5bGU6IE9iamVjdDtcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogT2JqZWN0O1xuICBzdGF0aWMgUHJvcFR5cGVzOiBPYmplY3Q7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIGNhbGwgc3VwZXIgY29uc3RydWN0b3IgYW5kIGluaXRpYWxpemUgc3RhdGVzLlxuICAgKiBAcGFyYW0ge1Byb3BzfSBwcm9wc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gICAgaWYgKHByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHRpbWVzdGFtcCA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLlJPT1QsIHRoaXMucHJvcHMuc3R5bGUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNyYzogJycsXG4gICAgICBpbmRleDogMCxcbiAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICBwcmV2aWV3OiAwLFxuICAgICAgcHJldmlld0luZGV4OiAwLFxuICAgICAgaXNGdWxsU2NyZWVuOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudFdpbGxNb3VudFxuICAgKiB1cGRhdGVzIHN0YXRlcyB3aXRoIHByb3BzIHRvIHJlbmRlciBmaXJzdCB2aWV3LlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYywgcGFnZSwgYW5kIHByb2dyZXNzLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IGltYWdlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMucHJvcHMuaW1hZ2VzO1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLmltYWdlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKDEwMCAvIGltYWdlcy5sZW5ndGgpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcHJvZ3Jlc3MgPSAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlc1swXSxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIHByZXZpb3VzIHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrUHJldkJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5pbWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4IC0gMTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgbmV4dCBwYWdlLlxuICAgKi9cbiAgb25DbGlja05leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmltYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggKyAxO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJvZ3Jlc3NCYXIgaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBzdGF0ZXMgdG8gbW92ZSBwYWdlLlxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIG9uQ2xpY2tQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgYmFyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9ncmVzc0JhcicpWzBdXG4gICAgICAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVzaG93LXdyYXBwZXInKVswXTtcbiAgICAgIHByb2dyZXNzV2lkdGggLT0gY29udGVudC5vZmZzZXRMZWZ0O1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmNhbGNQcm9ncmVzc0luZGV4KGJhcldpZHRoLCBwcm9ncmVzc1dpZHRoKTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIG9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGxldCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlc2hvdy13cmFwcGVyJylbMF07XG4gICAgICBwcm9ncmVzc1dpZHRoIC09IGNvbnRlbnQub2Zmc2V0TGVmdDtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aWV3OiAxLFxuICAgICAgcHJldmlld0luZGV4OiBuZXh0SW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgb25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMCxcbiAgICB9KTtcbiAgfTtcblxuICBvbkNoYW5nZUZ1bGxTY3JlZW4gPSAoKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudDogT2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICdzbGlkZXNob3ctd3JhcHBlcicsXG4gICAgKVswXTtcbiAgICBzd2l0Y2hGdWxsc2NyZWVuKGVsZW1lbnQsIGlzRnVsbFNjcmVlbiA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0Z1bGxTY3JlZW46IGlzRnVsbFNjcmVlbn0pO1xuICAgICAgaWYgKGlzRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duRXZlbnQpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzcwJSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duRXZlbnQpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGtleWRvd25FdmVudCA9IChlOiBFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoXG4gICAgICBlLmtleSA9PT0gJ0Fycm93VXAnIHx8XG4gICAgICBlLmtleSA9PT0gJ0Fycm93TGVmdCcgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzcgfHxcbiAgICAgIGUua2V5Q29kZSA9PT0gMzhcbiAgICApIHtcbiAgICAgIHRoaXMub25DbGlja1ByZXZCdXR0b24oKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZS5rZXkgPT09ICdBcnJvd0Rvd24nIHx8XG4gICAgICBlLmtleSA9PT0gJ0Fycm93UmlnaHQnIHx8XG4gICAgICBlLmtleUNvZGUgPT09IDM5IHx8XG4gICAgICBlLmtleUNvZGUgPT09IDQwIHx8XG4gICAgICBlLmtleUNvZGUgPT09IDMyXG4gICAgKSB7XG4gICAgICB0aGlzLm9uQ2xpY2tOZXh0QnV0dG9uKCk7XG4gICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VGdWxsU2NyZWVuKCk7XG4gICAgfVxuICB9O1xuXG4gIGNhbGNQcm9ncmVzc0luZGV4ID0gKGJhcldpZHRoOiBudW1iZXIsIHByb2dyZXNzV2lkdGg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgY2xpY2tQb3NpdGlvbiA9IE1hdGguZmxvb3IocHJvZ3Jlc3NXaWR0aCAvIGJhcldpZHRoICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXh0SW5kZXg7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBhcnIgPT09IHVuZGVmaW5lZCB8fCBhcnIgPT09IG51bGwgfHwgYXJyLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICB1cGRhdGVQYWdlU3RhdGUgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaW5kZXggKyAxKTtcbiAgICBjb25zdCBpbWFnZSA9IHRoaXMucHJvcHMuaW1hZ2VzW2luZGV4XTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2UsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5wYWdlV2lsbFVwZGF0ZShpbmRleCwgaW1hZ2UpO1xuICB9O1xuXG4gIC8qKlxuICAgKiByZW5kZXJcbiAgICogQHJldHVybnMge1hNTH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgc3JjID0gdGhpcy5zdGF0ZS5zcmM7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgc3JjICs9IGA/JHt0aGlzLnN0YXRlLnRpbWVzdGFtcH1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt0aGlzLnN0eWxlfSBjbGFzc05hbWU9XCJzbGlkZXNob3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXNob3ctd3JhcHBlclwiIHN0eWxlPXt7bWFyZ2luOiAnYXV0byd9fT5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLklNQUdFfT5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjb250ZW50XCIgc3JjPXtzcmN9IHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319IC8+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmV2T25Db250ZW50XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuUFJFVl9PTl9DT05URU5UfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV4dE9uQ29udGVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLk5FWFRfT05fQ09OVEVOVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJQcmV2aWV3KCl9XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXJcIlxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5QUk9HUkVTU19CQVJ9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcm9ncmVzc0Jhcn1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMub25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzc1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmFyJ30gc3R5bGU9e3N0eWxlcy5CQVJ9PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3ByZXZCdXR0b24nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuUEFHRV9WSUVXfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5pbWFnZXNcbiAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5zdGF0ZS5pbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YFxuICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyduZXh0QnV0dG9uJ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dEljb259XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZnVsbHNjcmVlbid9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgIHRvcDogNSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2VGdWxsU2NyZWVufVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckZ1bGxzY3JlZW5JY29uKCl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcmV2aWV3IHJlbmRlcmVyXG4gICAqIEByZXR1cm5zIHs/WE1MfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlclByZXZpZXcgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmltYWdlcyB8fCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBwcmV2aWV3ID0gdGhpcy5wcm9wcy5pbWFnZXMubWFwKChpbWcsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5ID0gaW5kZXggPT09IHRoaXMuc3RhdGUucHJldmlld0luZGV4ID8gJ2lubGluZScgOiAnbm9uZSc7XG4gICAgICBjb25zdCBrZXkgPSBgcHJldmlldy0ke2luZGV4fWA7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPXtrZXl9XG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiBkaXNwbGF5LCB3aWR0aDogMjAwfX1cbiAgICAgICAgICBzcmM9e2ltZ31cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgZnVsbHNjcmVlbkJvdHRvbSA9IGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gPyAxODAgOiAxMjA7XG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW5cbiAgICAgID8gZnVsbHNjcmVlbkJvdHRvbVxuICAgICAgOiBzdHlsZXMuUFJFVklFVy5ib3R0b207XG4gICAgY29uc3QgU1RZTEUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUFJFVklFVywge1xuICAgICAgb3BhY2l0eTogdGhpcy5zdGF0ZS5wcmV2aWV3LFxuICAgICAgYm90dG9tOiBib3R0b20sXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e1NUWUxFfT5cbiAgICAgICAge3ByZXZpZXd9XG4gICAgICAgIDxwIHN0eWxlPXt7bWFyZ2luOiAwLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogNH19PlxuICAgICAgICAgIHtgJHt0aGlzLnN0YXRlLnByZXZpZXdJbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBfcmVuZGVyRnVsbHNjcmVlbkljb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c3ZnIGlkPVwidHdvLWFycm93c1wiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgNjEyIDYxMlwiPlxuICAgICAgICAgIDxnPlxuICAgICAgICAgICAgPGcgaWQ9XCJfeDM2X1wiPlxuICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD1cIk0yNjAuNjU1LDM1MS4xNzNjLTMuNjE1LTQuMDE2LTguNzIxLTYuNjM2LTE0LjU1NC02LjY1NWwtMTY0LjkxNS0wLjIyOWMtMTAuOTItMC4wMTktMTkuNzU2LDguODE2LTE5LjczNywxOS43MzcgICAgIGMwLjAxOSwxMC45MiwxMi43NTYsMjMuMTk4LDE4LjIyNiwyOC42NjhsNDEuNzExLDQxLjcxMkwwLDU1NC42MjVMNTcuMzc1LDYxMmwxMTkuNjA4LTEyMS45NzlsNDEuNzExLDQxLjcxMiAgICAgYzkuMDI3LDkuMDI3LDE4LjE4OCwxOC42MjgsMjkuMTA4LDE4LjY0NmMxMC45MiwwLjAyLDE5Ljc1Ni04LjgxNiwxOS43MzctMTkuNzM2bC0wLjIyOS0xNjQuOTE1ICAgICBDMjY3LjI5MSwzNTkuODk1LDI2NC42NzEsMzU0Ljc4OCwyNjAuNjU1LDM1MS4xNzN6IE00OTMuMTE5LDE3NS40NzJMNjEyLDU3LjM3NUw1NTQuNjI1LDBMNDM2LjU2NiwxMTguNTU2bC00Mi40MTktNDIuNjg3ICAgICBjLTkuMTgxLTkuMjM4LTE4LjQ5NC0xOS4wNjgtMjkuNTg3LTE5LjA4N2MtMTEuMTExLTAuMDE5LTIwLjA4MSw5LjAyNy0yMC4wODEsMjAuMTk2bDAuMjI5LDE2OC43OTcgICAgIGMwLDUuOTY3LDIuNjc4LDExLjE4OCw2Ljc3MSwxNC44OThjMy42OSw0LjExMiw4Ljg3NCw2Ljc4OSwxNC44MDMsNi44MDlsMTY3LjcyNiwwLjIyOWMxMS4wOTMsMC4wMTksMjAuMDgyLTkuMDI3LDIwLjA4Mi0yMC4xOTYgICAgIGMtMC4wMi0xMS4xNjktMTIuOTY3LTIzLjc1My0xOC41MzItMjkuMzM4TDQ5My4xMTksMTc1LjQ3MnpcIlxuICAgICAgICAgICAgICAgICAgZmlsbD1cIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGlkPVwiZnVsbHNjcmVlblwiXG4gICAgICAgICAgd2lkdGg9XCIxNVwiXG4gICAgICAgICAgaGVpZ2h0PVwiMTVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDM4LjUyOSA0MzguNTI5XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE4MC4xNTYsMjI1LjgyOGMtMS45MDMtMS45MDItNC4wOTMtMi44NTQtNi41NjctMi44NTRjLTIuNDc1LDAtNC42NjUsMC45NTEtNi41NjcsMi44NTRsLTk0Ljc4Nyw5NC43ODdsLTQxLjExMi00MS4xMTcgYy0zLjYxNy0zLjYxLTcuODk1LTUuNDIxLTEyLjg0Ny01LjQyMWMtNC45NTIsMC05LjIzNSwxLjgxMS0xMi44NTEsNS40MjFjLTMuNjE3LDMuNjIxLTUuNDI0LDcuOTA1LTUuNDI0LDEyLjg1NHYxMjcuOTA3IGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2MzLjYxOSwzLjYxMyw3LjkwMiw1LjQyNCwxMi44NTEsNS40MjRoMTI3LjkwNmM0Ljk0OSwwLDkuMjMtMS44MTEsMTIuODQ3LTUuNDI0IGMzLjYxNS0zLjYxNyw1LjQyNC03Ljg5OCw1LjQyNC0xMi44NDdzLTEuODA5LTkuMjMzLTUuNDI0LTEyLjg1NGwtNDEuMTEyLTQxLjEwNGw5NC43ODctOTQuNzkzIGMxLjkwMi0xLjkwMywyLjg1My00LjA4NiwyLjg1My02LjU2NGMwLTIuNDc4LTAuOTUzLTQuNjYtMi44NTMtNi41N0wxODAuMTU2LDIyNS44Mjh6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDMzLjExLDUuNDI0QzQyOS40OTYsMS44MDcsNDI1LjIxMiwwLDQyMC4yNjMsMEgyOTIuMzU2Yy00Ljk0OCwwLTkuMjI3LDEuODA3LTEyLjg0Nyw1LjQyNCBjLTMuNjE0LDMuNjE1LTUuNDIxLDcuODk4LTUuNDIxLDEyLjg0N3MxLjgwNyw5LjIzMyw1LjQyMSwxMi44NDdsNDEuMTA2LDQxLjExMmwtOTQuNzg2LDk0Ljc4NyBjLTEuOTAxLDEuOTA2LTIuODU0LDQuMDkzLTIuODU0LDYuNTY3czAuOTUzLDQuNjY1LDIuODU0LDYuNTY3bDMyLjU1MiwzMi41NDhjMS45MDIsMS45MDMsNC4wODYsMi44NTMsNi41NjMsMi44NTMgczQuNjYxLTAuOTUsNi41NjMtMi44NTNsOTQuNzk0LTk0Ljc4N2w0MS4xMDQsNDEuMTA5YzMuNjIsMy42MTYsNy45MDUsNS40MjgsMTIuODU0LDUuNDI4czkuMjI5LTEuODEyLDEyLjg0Ny01LjQyOCBjMy42MTQtMy42MTQsNS40MjEtNy44OTgsNS40MjEtMTIuODQ3VjE4LjI2OEM0MzguNTMsMTMuMzE1LDQzNi43MzQsOS4wNCw0MzMuMTEsNS40MjR6XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cblNsaWRlU2hvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IHN0eWxlcy5BUlJPV19CVVRUT04sXG4gIHN0eWxlOiB7fSxcbiAgaW1hZ2VzOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTQgMGwtNCAzIDQgM3YtNnptMCAzbDQgM3YtNmwtNCAzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk0wIDB2Nmw0LTMtNC0zem00IDN2M2w0LTMtNC0zdjN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4ge1xuICAgIHJldHVybjtcbiAgfSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlV2lsbFVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19