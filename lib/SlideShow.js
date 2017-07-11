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
 * @property {Array<string>} src,
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

    _this.onChangeFullScreen = function (e) {
      var targets = document.getElementsByClassName('slideshow-wrapper');
      (0, _fullscreen2.default)(targets[0], function (isFullScreen) {
        _this.setState({ isFullScreen: isFullScreen });

        var keydownEvent = function keydownEvent(e) {
          if (e.keyCode === 37 || e.keyCode === 38) {
            _this.onClickPrevButton();
          } else if (e.keyCode === 39 || e.keyCode === 40) {
            _this.onClickNextButton();
          }
        };

        if (isFullScreen) {
          document.addEventListener('keydown', keydownEvent, false);
        } else {
          document.removeEventListener('keydown', keydownEvent, false);
        }
      });
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
      var bottom = _this.state.isFullScreen ? 180 : _Styles.Styles.PREVIEW.bottom;
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
          { className: 'slideshow-wrapper', style: {} },
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
              style: {
                backgroundColor: '#000',
                height: 10,
                marginTop: -6,
                position: 'relative',
                width: '100%'
              },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiaXNGdWxsU2NyZWVuIiwiY29udGVudCIsIm9mZnNldExlZnQiLCJjYWxjUHJvZ3Jlc3NJbmRleCIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJzZXRTdGF0ZSIsInByZXZpZXciLCJwcmV2aWV3SW5kZXgiLCJvbk1vdXNlTGVhdmVQcm9ncmVzc0JhciIsIm9uQ2hhbmdlRnVsbFNjcmVlbiIsInRhcmdldHMiLCJrZXlkb3duRXZlbnQiLCJrZXlDb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJjYWxjUHJvZ3Jlc3MiLCJwYWdlIiwiYmFzZSIsInByb2dyZXNzIiwiY2VpbCIsImFyciIsInVuZGVmaW5lZCIsImltYWdlIiwic3JjIiwicGFnZVdpbGxVcGRhdGUiLCJfcmVuZGVyUHJldmlldyIsIm1hcCIsImltZyIsImRpc3BsYXkiLCJrZXkiLCJ3aWR0aCIsImJvdHRvbSIsIlBSRVZJRVciLCJTVFlMRSIsIk9iamVjdCIsImFzc2lnbiIsIm9wYWNpdHkiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsIl9yZW5kZXJGdWxsc2NyZWVuSWNvbiIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsInN0eWxlIiwiUk9PVCIsIklNQUdFIiwiUFJFVl9PTl9DT05URU5UIiwiTkVYVF9PTl9DT05URU5UIiwiYmFja2dyb3VuZENvbG9yIiwiaGVpZ2h0IiwibWFyZ2luVG9wIiwicG9zaXRpb24iLCJCQVIiLCJCVVRUT04iLCJwcmV2SWNvbiIsIlBBR0VfVklFVyIsIm5leHRJY29uIiwiYm9yZGVyU3R5bGUiLCJyaWdodCIsInRvcCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImFycm93QnV0dG9uU3R5bGUiLCJBUlJPV19CVVRUT04iLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJhcnJheSIsIm5vZGUiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQXdDQTs7Ozs7OztBQXRDQTs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7Ozs7SUF5QnFCQSxTOzs7QUFPbkI7Ozs7O0FBS0EscUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSxzSEFDbEJBLEtBRGtCOztBQUFBLFVBaUQxQkMsaUJBakQwQixHQWlETixZQUFNO0FBQ3hCLFVBQUksTUFBS0MsWUFBTCxDQUFrQixNQUFLRixLQUFMLENBQVdHLE1BQTdCLENBQUosRUFBMEM7QUFDeEM7QUFDRDs7QUFFRCxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsS0FBWCxLQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNEOztBQUVELFVBQU1DLFlBQVksTUFBS0YsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBQXJDO0FBQ0EsWUFBS0UsZUFBTCxDQUFxQkQsU0FBckI7QUFDRCxLQTVEeUI7O0FBQUEsVUFrRTFCRSxpQkFsRTBCLEdBa0VOLFlBQU07QUFDeEIsVUFBSSxDQUFDLE1BQUtSLEtBQUwsQ0FBV0csTUFBaEIsRUFBd0I7QUFDdEI7QUFDRDs7QUFFRCxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsS0FBWCxLQUFxQixNQUFLTCxLQUFMLENBQVdHLE1BQVgsQ0FBa0JNLE1BQWxCLEdBQTJC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IiwiZmlsZSI6IlNsaWRlU2hvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7U3R5bGVzIGFzIHN0eWxlc30gZnJvbSAnLi9TdHlsZXMnO1xuaW1wb3J0IHN3aXRjaEZ1bGxzY3JlZW4gZnJvbSAnLi9mdWxsc2NyZWVuJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wc1xuICogQHByb3BlcnR5IHtPYmplY3R9IHN0eWxlXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IHNyYyxcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gcHJldkljb24sXG4gKiBAcHJvcGVydHkge05vZGV9IG5leHRJY29uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdpdGhUaW1lc3RhbXBcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHBhZ2VXaWxsVXBkYXRlXG4gKi9cbnR5cGUgUHJvcHMgPSB7XG4gIHN0eWxlOiBPYmplY3QsXG4gIGltYWdlczogQXJyYXk8c3RyaW5nPixcbiAgcHJldkljb246IE5vZGUsXG4gIG5leHRJY29uOiBOb2RlLFxuICB3aXRoVGltZXN0YW1wOiBib29sZWFuLFxuICBwYWdlV2lsbFVwZGF0ZTogKGluZGV4OiBudW1iZXIsIGltYWdlOiBzdHJpbmcpID0+IHZvaWQsXG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3JjXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVzdGFtcFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByZXZpZXdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3SW5kZXhcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNGdWxsU2NyZWVuXG4gKi9cbnR5cGUgU3RhdGUgPSB7XG4gIHNyYzogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuICBwcm9ncmVzczogbnVtYmVyLFxuICB0aW1lc3RhbXA6IG51bWJlcixcbiAgcHJldmlldzogbnVtYmVyLFxuICBwcmV2aWV3SW5kZXg6IG51bWJlcixcbiAgaXNGdWxsU2NyZWVuOiBib29sZWFuLFxufTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIG5hbWVkIFNsaWRlU2hvdyBpcyB0aGUgUmVhY3QgY29tcG9uZW50IHRoYXQgYWxsb3dzIHlvdVxuICogdG8gZGV2ZWxvcCBzbGlkZXNob3cgbGlrZSAnU2xpZGVTaGFyZScgb3IgJ1NwZWFrZXJEZWNrJyB2ZXJ5IGVhc3khXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVTaG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGU6IFN0YXRlO1xuICBwcm9wczogUHJvcHM7XG4gIHN0eWxlOiBPYmplY3Q7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6IE9iamVjdDtcbiAgc3RhdGljIFByb3BUeXBlczogT2JqZWN0O1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBjYWxsIHN1cGVyIGNvbnN0cnVjdG9yIGFuZCBpbml0aWFsaXplIHN0YXRlcy5cbiAgICogQHBhcmFtIHtQcm9wc30gcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCB0aW1lc3RhbXAgPSAwO1xuICAgIGlmIChwcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5ST09ULCB0aGlzLnByb3BzLnN0eWxlKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICAgIGlzRnVsbFNjcmVlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb21wb25lbnRXaWxsTW91bnRcbiAgICogdXBkYXRlcyBzdGF0ZXMgd2l0aCBwcm9wcyB0byByZW5kZXIgZmlyc3Qgdmlldy5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMsIHBhZ2UsIGFuZCBwcm9ncmVzcy5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCBpbWFnZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnByb3BzLmltYWdlcztcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5pbWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbCgxMDAgLyBpbWFnZXMubGVuZ3RoKTtcbiAgICBpZiAocHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIHByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBpbWFnZXNbMF0sXG4gICAgICBpbmRleDogMCxcbiAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBwcmV2aWV3SW5kZXg6IDAsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuaW1hZ2VzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIG5leHQgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByb2dyZXNzQmFyIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgc3RhdGVzIHRvIG1vdmUgcGFnZS5cbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBvbkNsaWNrUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGxldCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzRnVsbFNjcmVlbikge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlc2hvdy13cmFwcGVyJylbMF07XG4gICAgICBwcm9ncmVzc1dpZHRoIC09IGNvbnRlbnQub2Zmc2V0TGVmdDtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICBvbk1vdXNlTW92ZVByb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgcHJvZ3Jlc3NXaWR0aCA9IGUuY2xpZW50WDtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4pIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXNob3ctd3JhcHBlcicpWzBdO1xuICAgICAgcHJvZ3Jlc3NXaWR0aCAtPSBjb250ZW50Lm9mZnNldExlZnQ7XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY2FsY1Byb2dyZXNzSW5kZXgoYmFyV2lkdGgsIHByb2dyZXNzV2lkdGgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMSxcbiAgICAgIHByZXZpZXdJbmRleDogbmV4dEluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIG9uTW91c2VMZWF2ZVByb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2VGdWxsU2NyZWVuID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVzaG93LXdyYXBwZXInKTtcbiAgICBzd2l0Y2hGdWxsc2NyZWVuKHRhcmdldHNbMF0sIGlzRnVsbFNjcmVlbiA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0Z1bGxTY3JlZW46IGlzRnVsbFNjcmVlbn0pO1xuXG4gICAgICBjb25zdCBrZXlkb3duRXZlbnQgPSBlID0+IHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOCkge1xuICAgICAgICAgIHRoaXMub25DbGlja1ByZXZCdXR0b24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM5IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgICB0aGlzLm9uQ2xpY2tOZXh0QnV0dG9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChpc0Z1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25FdmVudCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25FdmVudCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNhbGNQcm9ncmVzc0luZGV4ID0gKGJhcldpZHRoOiBudW1iZXIsIHByb2dyZXNzV2lkdGg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgY2xpY2tQb3NpdGlvbiA9IE1hdGguZmxvb3IocHJvZ3Jlc3NXaWR0aCAvIGJhcldpZHRoICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXh0SW5kZXg7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBhcnIgPT09IHVuZGVmaW5lZCB8fCBhcnIgPT09IG51bGwgfHwgYXJyLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICB1cGRhdGVQYWdlU3RhdGUgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaW5kZXggKyAxKTtcbiAgICBjb25zdCBpbWFnZSA9IHRoaXMucHJvcHMuaW1hZ2VzW2luZGV4XTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2UsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5wYWdlV2lsbFVwZGF0ZShpbmRleCwgaW1hZ2UpO1xuICB9O1xuXG4gIC8qKlxuICAgKiByZW5kZXJcbiAgICogQHJldHVybnMge1hNTH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgc3JjID0gdGhpcy5zdGF0ZS5zcmM7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgc3JjICs9IGA/JHt0aGlzLnN0YXRlLnRpbWVzdGFtcH1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt0aGlzLnN0eWxlfSBjbGFzc05hbWU9XCJzbGlkZXNob3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXNob3ctd3JhcHBlclwiIHN0eWxlPXt7fX0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5JTUFHRX0+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiIHNyYz17c3JjfSBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fSAvPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJldk9uQ29udGVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLlBSRVZfT05fQ09OVEVOVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5leHRPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5ORVhUX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dGhpcy5fcmVuZGVyUHJldmlldygpfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICBtYXJnaW5Ub3A6IC02LFxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcm9ncmVzc0Jhcn1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMub25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzc1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmFyJ30gc3R5bGU9e3N0eWxlcy5CQVJ9PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J3ByZXZCdXR0b24nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuUEFHRV9WSUVXfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5pbWFnZXNcbiAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5zdGF0ZS5pbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YFxuICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyduZXh0QnV0dG9uJ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dEljb259XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZnVsbHNjcmVlbid9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgIHRvcDogNSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DaGFuZ2VGdWxsU2NyZWVufVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckZ1bGxzY3JlZW5JY29uKCl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcmV2aWV3IHJlbmRlcmVyXG4gICAqIEByZXR1cm5zIHs/WE1MfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlclByZXZpZXcgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmltYWdlcyB8fCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBwcmV2aWV3ID0gdGhpcy5wcm9wcy5pbWFnZXMubWFwKChpbWcsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5ID0gaW5kZXggPT09IHRoaXMuc3RhdGUucHJldmlld0luZGV4ID8gJ2lubGluZScgOiAnbm9uZSc7XG4gICAgICBjb25zdCBrZXkgPSBgcHJldmlldy0ke2luZGV4fWA7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPXtrZXl9XG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiBkaXNwbGF5LCB3aWR0aDogMjAwfX1cbiAgICAgICAgICBzcmM9e2ltZ31cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgYm90dG9tID0gdGhpcy5zdGF0ZS5pc0Z1bGxTY3JlZW4gPyAxODAgOiBzdHlsZXMuUFJFVklFVy5ib3R0b207XG4gICAgY29uc3QgU1RZTEUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUFJFVklFVywge1xuICAgICAgb3BhY2l0eTogdGhpcy5zdGF0ZS5wcmV2aWV3LFxuICAgICAgYm90dG9tOiBib3R0b20sXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e1NUWUxFfT5cbiAgICAgICAge3ByZXZpZXd9XG4gICAgICAgIDxwIHN0eWxlPXt7bWFyZ2luOiAwLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogNH19PlxuICAgICAgICAgIHtgJHt0aGlzLnN0YXRlLnByZXZpZXdJbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICBfcmVuZGVyRnVsbHNjcmVlbkljb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNGdWxsU2NyZWVuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c3ZnIGlkPVwidHdvLWFycm93c1wiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgNjEyIDYxMlwiPlxuICAgICAgICAgIDxnPlxuICAgICAgICAgICAgPGcgaWQ9XCJfeDM2X1wiPlxuICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD1cIk0yNjAuNjU1LDM1MS4xNzNjLTMuNjE1LTQuMDE2LTguNzIxLTYuNjM2LTE0LjU1NC02LjY1NWwtMTY0LjkxNS0wLjIyOWMtMTAuOTItMC4wMTktMTkuNzU2LDguODE2LTE5LjczNywxOS43MzcgICAgIGMwLjAxOSwxMC45MiwxMi43NTYsMjMuMTk4LDE4LjIyNiwyOC42NjhsNDEuNzExLDQxLjcxMkwwLDU1NC42MjVMNTcuMzc1LDYxMmwxMTkuNjA4LTEyMS45NzlsNDEuNzExLDQxLjcxMiAgICAgYzkuMDI3LDkuMDI3LDE4LjE4OCwxOC42MjgsMjkuMTA4LDE4LjY0NmMxMC45MiwwLjAyLDE5Ljc1Ni04LjgxNiwxOS43MzctMTkuNzM2bC0wLjIyOS0xNjQuOTE1ICAgICBDMjY3LjI5MSwzNTkuODk1LDI2NC42NzEsMzU0Ljc4OCwyNjAuNjU1LDM1MS4xNzN6IE00OTMuMTE5LDE3NS40NzJMNjEyLDU3LjM3NUw1NTQuNjI1LDBMNDM2LjU2NiwxMTguNTU2bC00Mi40MTktNDIuNjg3ICAgICBjLTkuMTgxLTkuMjM4LTE4LjQ5NC0xOS4wNjgtMjkuNTg3LTE5LjA4N2MtMTEuMTExLTAuMDE5LTIwLjA4MSw5LjAyNy0yMC4wODEsMjAuMTk2bDAuMjI5LDE2OC43OTcgICAgIGMwLDUuOTY3LDIuNjc4LDExLjE4OCw2Ljc3MSwxNC44OThjMy42OSw0LjExMiw4Ljg3NCw2Ljc4OSwxNC44MDMsNi44MDlsMTY3LjcyNiwwLjIyOWMxMS4wOTMsMC4wMTksMjAuMDgyLTkuMDI3LDIwLjA4Mi0yMC4xOTYgICAgIGMtMC4wMi0xMS4xNjktMTIuOTY3LTIzLjc1My0xOC41MzItMjkuMzM4TDQ5My4xMTksMTc1LjQ3MnpcIlxuICAgICAgICAgICAgICAgICAgZmlsbD1cIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGlkPVwiZnVsbHNjcmVlblwiXG4gICAgICAgICAgd2lkdGg9XCIxNVwiXG4gICAgICAgICAgaGVpZ2h0PVwiMTVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDM4LjUyOSA0MzguNTI5XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE4MC4xNTYsMjI1LjgyOGMtMS45MDMtMS45MDItNC4wOTMtMi44NTQtNi41NjctMi44NTRjLTIuNDc1LDAtNC42NjUsMC45NTEtNi41NjcsMi44NTRsLTk0Ljc4Nyw5NC43ODdsLTQxLjExMi00MS4xMTcgYy0zLjYxNy0zLjYxLTcuODk1LTUuNDIxLTEyLjg0Ny01LjQyMWMtNC45NTIsMC05LjIzNSwxLjgxMS0xMi44NTEsNS40MjFjLTMuNjE3LDMuNjIxLTUuNDI0LDcuOTA1LTUuNDI0LDEyLjg1NHYxMjcuOTA3IGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2MzLjYxOSwzLjYxMyw3LjkwMiw1LjQyNCwxMi44NTEsNS40MjRoMTI3LjkwNmM0Ljk0OSwwLDkuMjMtMS44MTEsMTIuODQ3LTUuNDI0IGMzLjYxNS0zLjYxNyw1LjQyNC03Ljg5OCw1LjQyNC0xMi44NDdzLTEuODA5LTkuMjMzLTUuNDI0LTEyLjg1NGwtNDEuMTEyLTQxLjEwNGw5NC43ODctOTQuNzkzIGMxLjkwMi0xLjkwMywyLjg1My00LjA4NiwyLjg1My02LjU2NGMwLTIuNDc4LTAuOTUzLTQuNjYtMi44NTMtNi41N0wxODAuMTU2LDIyNS44Mjh6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDMzLjExLDUuNDI0QzQyOS40OTYsMS44MDcsNDI1LjIxMiwwLDQyMC4yNjMsMEgyOTIuMzU2Yy00Ljk0OCwwLTkuMjI3LDEuODA3LTEyLjg0Nyw1LjQyNCBjLTMuNjE0LDMuNjE1LTUuNDIxLDcuODk4LTUuNDIxLDEyLjg0N3MxLjgwNyw5LjIzMyw1LjQyMSwxMi44NDdsNDEuMTA2LDQxLjExMmwtOTQuNzg2LDk0Ljc4NyBjLTEuOTAxLDEuOTA2LTIuODU0LDQuMDkzLTIuODU0LDYuNTY3czAuOTUzLDQuNjY1LDIuODU0LDYuNTY3bDMyLjU1MiwzMi41NDhjMS45MDIsMS45MDMsNC4wODYsMi44NTMsNi41NjMsMi44NTMgczQuNjYxLTAuOTUsNi41NjMtMi44NTNsOTQuNzk0LTk0Ljc4N2w0MS4xMDQsNDEuMTA5YzMuNjIsMy42MTYsNy45MDUsNS40MjgsMTIuODU0LDUuNDI4czkuMjI5LTEuODEyLDEyLjg0Ny01LjQyOCBjMy42MTQtMy42MTQsNS40MjEtNy44OTgsNS40MjEtMTIuODQ3VjE4LjI2OEM0MzguNTMsMTMuMzE1LDQzNi43MzQsOS4wNCw0MzMuMTEsNS40MjR6XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cblNsaWRlU2hvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IHN0eWxlcy5BUlJPV19CVVRUT04sXG4gIHN0eWxlOiB7fSxcbiAgaW1hZ2VzOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTQgMGwtNCAzIDQgM3YtNnptMCAzbDQgM3YtNmwtNCAzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk0wIDB2Nmw0LTMtNC0zem00IDN2M2w0LTMtNC0zdjN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4ge1xuICAgIHJldHVybjtcbiAgfSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlV2lsbFVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19