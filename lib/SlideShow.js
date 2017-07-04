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
      var nextIndex = _this.calcProgressIndex(barWidth, progressWidth);
      _this.updatePageState(nextIndex);
    };

    _this.onMouseMoveProgressBar = function (e) {
      var barWidth = document.getElementsByClassName('progressBar')[0].offsetWidth;
      var progressWidth = e.clientX;
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
        return _react2.default.createElement('img', {
          className: 'preview-' + index,
          style: { display: display, width: 200 },
          src: img
        });
      });
      var STYLE = Object.assign({}, _Styles.Styles.PREVIEW, {
        opacity: _this.state.preview
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
      previewIndex: 0
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
        { style: this.style },
        _react2.default.createElement('div', { style: _Styles.Styles.BAR }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiY2FsY1Byb2dyZXNzSW5kZXgiLCJvbk1vdXNlTW92ZVByb2dyZXNzQmFyIiwic2V0U3RhdGUiLCJwcmV2aWV3IiwicHJldmlld0luZGV4Iiwib25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJjYWxjUHJvZ3Jlc3MiLCJwYWdlIiwiYmFzZSIsInByb2dyZXNzIiwiY2VpbCIsImFyciIsInVuZGVmaW5lZCIsImltYWdlIiwic3JjIiwicGFnZVdpbGxVcGRhdGUiLCJfcmVuZGVyUHJldmlldyIsIm1hcCIsImltZyIsImRpc3BsYXkiLCJ3aWR0aCIsIlNUWUxFIiwiT2JqZWN0IiwiYXNzaWduIiwiUFJFVklFVyIsIm9wYWNpdHkiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsInN0eWxlIiwiUk9PVCIsIkJBUiIsIklNQUdFIiwiUFJFVl9PTl9DT05URU5UIiwiTkVYVF9PTl9DT05URU5UIiwiYmFja2dyb3VuZENvbG9yIiwiaGVpZ2h0IiwibWFyZ2luVG9wIiwicG9zaXRpb24iLCJCVVRUT04iLCJwcmV2SWNvbiIsIlBBR0VfVklFVyIsIm5leHRJY29uIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiYXJyb3dCdXR0b25TdHlsZSIsIkFSUk9XX0JVVFRPTiIsIlByb3BUeXBlcyIsIm9iamVjdCIsImFycmF5Iiwibm9kZSIsImJvb2wiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQXNDQTs7Ozs7OztBQXBDQTs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7OztJQXVCcUJBLFM7OztBQU9uQjs7Ozs7QUFLQSxxQkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLHNIQUNsQkEsS0FEa0I7O0FBQUEsVUFnRDFCQyxpQkFoRDBCLEdBZ0ROLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxZQUFMLENBQWtCLE1BQUtGLEtBQUwsQ0FBV0csTUFBN0IsQ0FBSixFQUEwQztBQUN4QztBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsVUFBTUMsWUFBWSxNQUFLRixLQUFMLENBQVdDLEtBQVgsR0FBbUIsQ0FBckM7QUFDQSxZQUFLRSxlQUFMLENBQXFCRCxTQUFyQjtBQUNELEtBM0R5Qjs7QUFBQSxVQWlFMUJFLGlCQWpFMEIsR0FpRU4sWUFBTTtBQUN4QixVQUFJLENBQUMsTUFBS1IsS0FBTCxDQUFXRyxNQUFoQixFQUF3QjtBQUN0QjtBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLE1BQUtMLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBbEIsR0FBMkIsQ0FBcEQsRUFBdUQ7QUFDckQ7QUFDRDtBQUNELFVBQU1ILFlBQVksTUFBS0YsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBQXJDO0FBQ0EsWUFBS0UsZUFBTCxDQUFxQkQsU0FBckI7QUFDRCxLQTNFeUI7O0FBQUEsVUFrRjFCSSxrQkFsRjBCLEdBa0ZMLFVBQUNDLENBQUQsRUFBbUI7QUFDdEMsVUFBTUMsV0FBV0MsU0FBU0Msc0JBQVQsQ0FBZ0MsYUFBaEMsRUFBK0MsQ0FBL0MsRUFDZEMsV0FESDtBQUVBLFVBQU1DLGdCQUFnQkwsRUFBRU0sT0FBeEI7QUFDQSxVQUFNWCxZQUFZLE1BQUtZLGlCQUFMLENBQXVCTixRQUF2QixFQUFpQ0ksYUFBakMsQ0FBbEI7QUFDQSxZQUFLVCxlQUFMLENBQXFCRCxTQUFyQjtBQUNELEtBeEZ5Qjs7QUFBQSxVQTBGMUJhLHNCQTFGMEIsR0EwRkQsVUFBQ1IsQ0FBRCxFQUFtQjtBQUMxQyxVQUFNQyxXQUFXQyxTQUFTQyxzQkFBVCxDQUFnQyxhQUFoQyxFQUErQyxDQUEvQyxFQUNkQyxXQURIO0FBRUEsVUFBTUMsZ0JBQWdCTCxFQUFFTSxPQUF4QjtBQUNBLFVBQU1YLFlBQVksTUFBS1ksaUJBQUwsQ0FBdUJOLFFBQXZCLEVBQWlDSSxhQUFqQyxDQUFsQjtBQUNBLFlBQUtJLFFBQUwsQ0FBYztBQUNaQyxpQkFBUyxDQURHO0FBRVpDLHNCQUFjaEI7QUFGRixPQUFkO0FBSUQsS0FuR3lCOztBQUFBLFVBcUcxQmlCLHVCQXJHMEIsR0FxR0EsVUFBQ1osQ0FBRCxFQUFtQjtBQUMzQyxZQUFLUyxRQUFMLENBQWM7QUFDWkMsaUJBQVM7QUFERyxPQUFkO0FBR0QsS0F6R3lCOztBQUFBLFVBMkcxQkgsaUJBM0cwQixHQTJHTixVQUFDTixRQUFELEVBQW1CSSxhQUFuQixFQUFxRDtBQUN2RSxVQUFNUSxnQkFBZ0JDLEtBQUtDLEtBQUwsQ0FBV1YsZ0JBQWdCSixRQUFoQixHQUEyQixHQUF0QyxDQUF0QjtBQUNBLFVBQUlOLFlBQVksQ0FBaEI7QUFDQSxXQUFLLElBQUlxQixJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBSzNCLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBdEMsRUFBOENrQixHQUE5QyxFQUFtRDtBQUNqRCxZQUFNQyxhQUFhLE1BQUtDLFlBQUwsQ0FBa0JGLENBQWxCLENBQW5CO0FBQ0EsWUFBSUgsaUJBQWlCSSxVQUFyQixFQUFpQztBQUMvQnRCLHNCQUFZcUIsQ0FBWjtBQUNEO0FBQ0Y7QUFDRCxhQUFPckIsU0FBUDtBQUNELEtBckh5Qjs7QUFBQSxVQTRIMUJ1QixZQTVIMEIsR0E0SFgsVUFBQ0MsSUFBRCxFQUEwQjtBQUN2QyxVQUFNQyxPQUFPLE1BQU0sTUFBSy9CLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBckM7QUFDQSxVQUFJdUIsV0FBV1AsS0FBS1EsSUFBTCxDQUFVRixPQUFPRCxJQUFqQixDQUFmO0FBQ0EsVUFBSUUsV0FBVyxHQUFmLEVBQW9CO0FBQ2xCLGVBQU8sR0FBUDtBQUNEO0FBQ0QsYUFBT0EsUUFBUDtBQUNELEtBbkl5Qjs7QUFBQSxVQXFJMUI5QixZQXJJMEIsR0FxSVgsVUFBQ2dDLEdBQUQsRUFBaUM7QUFDOUMsYUFBT0EsUUFBUUMsU0FBUixJQUFxQkQsUUFBUSxJQUE3QixJQUFxQ0EsSUFBSXpCLE1BQUosS0FBZSxDQUEzRDtBQUNELEtBdkl5Qjs7QUFBQSxVQXlJMUJGLGVBekkwQixHQXlJUixVQUFDRixLQUFELEVBQW1CO0FBQ25DLFVBQU0yQixXQUFXLE1BQUtILFlBQUwsQ0FBa0J4QixRQUFRLENBQTFCLENBQWpCO0FBQ0EsVUFBTStCLFFBQVEsTUFBS3BDLEtBQUwsQ0FBV0csTUFBWCxDQUFrQkUsS0FBbEIsQ0FBZDtBQUNBLFlBQUtlLFFBQUwsQ0FBYztBQUNaaUIsYUFBS0QsS0FETztBQUVaL0IsZUFBT0EsS0FGSztBQUdaMkIsa0JBQVVBO0FBSEUsT0FBZDtBQUtBLFlBQUtoQyxLQUFMLENBQVdzQyxjQUFYLENBQTBCakMsS0FBMUIsRUFBaUMrQixLQUFqQztBQUNELEtBbEp5Qjs7QUFBQSxVQXFPMUJHLGNBck8wQixHQXFPVCxZQUFNO0FBQ3JCLFVBQUksQ0FBQyxNQUFLdkMsS0FBTCxDQUFXRyxNQUFaLElBQXNCLE1BQUtILEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBbEIsS0FBNkIsQ0FBdkQsRUFBMEQ7QUFDeEQsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSVksVUFBVSxNQUFLckIsS0FBTCxDQUFXRyxNQUFYLENBQWtCcUMsR0FBbEIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNcEMsS0FBTixFQUFnQjtBQUNsRCxZQUFNcUMsVUFBVXJDLFVBQVUsTUFBS0QsS0FBTCxDQUFXa0IsWUFBckIsR0FBb0MsUUFBcEMsR0FBK0MsTUFBL0Q7QUFDQSxlQUNFO0FBQ0Usa0NBQXNCakIsS0FEeEI7QUFFRSxpQkFBTyxFQUFDcUMsU0FBU0EsT0FBVixFQUFtQkMsT0FBTyxHQUExQixFQUZUO0FBR0UsZUFBS0Y7QUFIUCxVQURGO0FBT0QsT0FUYSxDQUFkO0FBVUEsVUFBTUcsUUFBUUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsZUFBT0MsT0FBekIsRUFBa0M7QUFDOUNDLGlCQUFTLE1BQUs1QyxLQUFMLENBQVdpQjtBQUQwQixPQUFsQyxDQUFkO0FBR0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxPQUFPdUIsS0FBWjtBQUNHdkIsZUFESDtBQUVFO0FBQUE7QUFBQSxZQUFHLE9BQU8sRUFBQzRCLFFBQVEsQ0FBVCxFQUFZQyxXQUFXLFFBQXZCLEVBQWlDQyxVQUFVLENBQTNDLEVBQVY7QUFDTSxnQkFBSy9DLEtBQUwsQ0FBV2tCLFlBQVgsR0FBMEIsQ0FEaEMsV0FDdUMsTUFBS3RCLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk07QUFEekQ7QUFGRixPQURGO0FBUUQsS0EvUHlCOztBQUd4QixRQUFJMkMsWUFBWSxDQUFoQjtBQUNBLFFBQUlwRCxNQUFNcUQsYUFBTixLQUF3QixJQUE1QixFQUFrQztBQUNoQ0Qsa0JBQVkzQixLQUFLQyxLQUFMLENBQVcsSUFBSTRCLElBQUosR0FBV0MsT0FBWCxLQUF1QixJQUFsQyxDQUFaO0FBQ0Q7O0FBRUQsVUFBS0MsS0FBTCxHQUFhWCxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixlQUFPVyxJQUF6QixFQUErQixNQUFLekQsS0FBTCxDQUFXd0QsS0FBMUMsQ0FBYjs7QUFFQSxVQUFLcEQsS0FBTCxHQUFhO0FBQ1hpQyxXQUFLLEVBRE07QUFFWGhDLGFBQU8sQ0FGSTtBQUdYMkIsZ0JBQVUsQ0FIQztBQUlYb0IsaUJBQVdBLFNBSkE7QUFLWC9CLGVBQVMsQ0FMRTtBQU1YQyxvQkFBYztBQU5ILEtBQWI7QUFWd0I7QUFrQnpCOztBQUVEOzs7Ozs7Ozs7eUNBS3FCO0FBQ25CLFVBQU1uQixTQUF3QixLQUFLSCxLQUFMLENBQVdHLE1BQXpDO0FBQ0EsVUFBSSxLQUFLRCxZQUFMLENBQWtCLEtBQUtGLEtBQUwsQ0FBV0csTUFBN0IsQ0FBSixFQUEwQztBQUN4QztBQUNEO0FBQ0QsVUFBSTZCLFdBQVdQLEtBQUtRLElBQUwsQ0FBVSxNQUFNOUIsT0FBT00sTUFBdkIsQ0FBZjtBQUNBLFVBQUl1QixXQUFXLEdBQWYsRUFBb0I7QUFDbEJBLG1CQUFXLEdBQVg7QUFDRDs7QUFFRCxXQUFLWixRQUFMLENBQWM7QUFDWmlCLGFBQUtsQyxPQUFPLENBQVAsQ0FETztBQUVaRSxlQUFPLENBRks7QUFHWjJCLGtCQUFVQSxRQUhFO0FBSVpYLGlCQUFTLENBSkc7QUFLWkMsc0JBQWM7QUFMRixPQUFkO0FBT0Q7O0FBRUQ7Ozs7OztBQWlCQTs7Ozs7O0FBZ0JBOzs7Ozs7O0FBMENBOzs7Ozs7Ozs7O0FBNkJBOzs7OzZCQUlTO0FBQ1AsVUFBSWUsTUFBTSxLQUFLakMsS0FBTCxDQUFXaUMsR0FBckI7QUFDQSxVQUFJLEtBQUtyQyxLQUFMLENBQVdxRCxhQUFYLEtBQTZCLElBQWpDLEVBQXVDO0FBQ3JDaEIscUJBQVcsS0FBS2pDLEtBQUwsQ0FBV2dELFNBQXRCO0FBQ0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUEsVUFBSyxPQUFPLEtBQUtJLEtBQWpCO0FBQ0UsK0NBQUssT0FBTyxlQUFPRSxHQUFuQixHQURGO0FBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUssT0FBTyxlQUFPQyxLQUFuQjtBQUNFLG1EQUFLLFdBQVUsU0FBZixFQUF5QixLQUFLdEIsR0FBOUIsRUFBbUMsT0FBTyxFQUFDTSxPQUFPLE1BQVIsRUFBMUMsR0FERjtBQUVFO0FBQ0UseUJBQVUsZUFEWjtBQUVFLHVCQUFTLEtBQUsxQyxpQkFGaEI7QUFHRSxxQkFBTyxlQUFPMkQ7QUFIaEIsY0FGRjtBQU9FO0FBQ0UseUJBQVUsZUFEWjtBQUVFLHVCQUFTLEtBQUtwRCxpQkFGaEI7QUFHRSxxQkFBTyxlQUFPcUQ7QUFIaEI7QUFQRjtBQURGLFNBRkY7QUFpQkcsYUFBS3RCLGNBQUwsRUFqQkg7QUFrQkU7QUFBQTtBQUFBO0FBQ0UsdUJBQVUsYUFEWjtBQUVFLG1CQUFPO0FBQ0x1QiwrQkFBaUIsTUFEWjtBQUVMQyxzQkFBUSxFQUZIO0FBR0xDLHlCQUFXLENBQUMsQ0FIUDtBQUlMQyx3QkFBVSxVQUpMO0FBS0x0QixxQkFBTztBQUxGLGFBRlQ7QUFTRSxxQkFBUyxLQUFLakMsa0JBVGhCO0FBVUUseUJBQWEsS0FBS1Msc0JBVnBCO0FBV0UsMEJBQWMsS0FBS0k7QUFYckI7QUFhRTtBQUNFLHVCQUFVLFVBRFo7QUFFRSxtQkFBTztBQUNMdUMsK0JBQWlCLFNBRFo7QUFFTEMsc0JBQVEsTUFGSDtBQUdMcEIscUJBQVUsS0FBS3ZDLEtBQUwsQ0FBVzRCLFFBQXJCO0FBSEs7QUFGVDtBQWJGLFNBbEJGO0FBd0NFO0FBQUE7QUFBQSxZQUFLLFdBQVcsS0FBaEIsRUFBdUIsT0FBTyxlQUFPMEIsR0FBckM7QUFDRTtBQUFBO0FBQUE7QUFDRSx5QkFBVyxZQURiO0FBRUUsdUJBQVMsS0FBS3pELGlCQUZoQjtBQUdFLHFCQUFPLGVBQU9pRTtBQUhoQjtBQUtHLGlCQUFLbEUsS0FBTCxDQUFXbUU7QUFMZCxXQURGO0FBUUU7QUFBQTtBQUFBLGNBQU0sT0FBTyxlQUFPQyxTQUFwQjtBQUNHLGlCQUFLcEUsS0FBTCxDQUFXRyxNQUFYLEdBQ00sS0FBS0MsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBRHpCLFdBQ2dDLEtBQUtMLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFEbEQsR0FFRztBQUhOLFdBUkY7QUFhRTtBQUFBO0FBQUE7QUFDRSx5QkFBVyxZQURiO0FBRUUsdUJBQVMsS0FBS0QsaUJBRmhCO0FBR0UscUJBQU8sZUFBTzBEO0FBSGhCO0FBS0csaUJBQUtsRSxLQUFMLENBQVdxRTtBQUxkO0FBYkY7QUF4Q0YsT0FERjtBQWdFRDs7QUFFRDs7Ozs7Ozs7O0VBNU9xQyxnQkFBTUMsUzs7a0JBQXhCdkUsUzs7O0FBOFFyQkEsVUFBVXdFLFlBQVYsR0FBeUI7QUFDdkJDLG9CQUFrQixlQUFPQyxZQURGO0FBRXZCakIsU0FBTyxFQUZnQjtBQUd2QnJELFVBQVEsRUFIZTtBQUl2QmdFLFlBQ0U7QUFBQTtBQUFBLE1BQUssT0FBTyxlQUFPTSxZQUFuQixFQUFpQyxTQUFRLFNBQXpDO0FBQ0U7QUFDRSxZQUFLLE1BRFA7QUFFRSxTQUFFLG9DQUZKO0FBR0UsaUJBQVU7QUFIWjtBQURGLEdBTHFCO0FBYXZCSixZQUNFO0FBQUE7QUFBQSxNQUFLLE9BQU8sZUFBT0ksWUFBbkIsRUFBaUMsU0FBUSxTQUF6QztBQUNFO0FBQ0UsWUFBSyxNQURQO0FBRUUsU0FBRSxrQ0FGSjtBQUdFLGlCQUFVO0FBSFo7QUFERixHQWRxQjtBQXNCdkJwQixpQkFBZSxLQXRCUTtBQXVCdkJmLGtCQUFnQix3QkFBQ2pDLEtBQUQsRUFBZ0IrQixLQUFoQixFQUFrQztBQUNoRDtBQUNEO0FBekJzQixDQUF6Qjs7QUE0QkFyQyxVQUFVMkUsU0FBVixHQUFzQjtBQUNwQkYsb0JBQWtCLG9CQUFVRyxNQURSO0FBRXBCbkIsU0FBTyxvQkFBVW1CLE1BRkc7QUFHcEJ4RSxVQUFRLG9CQUFVeUUsS0FIRTtBQUlwQlQsWUFBVSxvQkFBVVUsSUFKQTtBQUtwQlIsWUFBVSxvQkFBVVEsSUFMQTtBQU1wQnhCLGlCQUFlLG9CQUFVeUIsSUFOTDtBQU9wQnhDLGtCQUFnQixvQkFBVXlDO0FBUE4sQ0FBdEIiLCJmaWxlIjoiU2xpZGVTaG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtTdHlsZXMgYXMgc3R5bGVzfSBmcm9tICcuL1N0eWxlcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUHJvcHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzdHlsZVxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBzcmMsXG4gKiBAcHJvcGVydHkge05vZGV9IHByZXZJY29uLFxuICogQHByb3BlcnR5IHtOb2RlfSBuZXh0SWNvblxuICogQHByb3BlcnR5IHtib29sZWFufSB3aXRoVGltZXN0YW1wXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBwYWdlV2lsbFVwZGF0ZVxuICovXG50eXBlIFByb3BzID0ge1xuICBzdHlsZTogT2JqZWN0LFxuICBpbWFnZXM6IEFycmF5PHN0cmluZz4sXG4gIHByZXZJY29uOiBOb2RlLFxuICBuZXh0SWNvbjogTm9kZSxcbiAgd2l0aFRpbWVzdGFtcDogYm9vbGVhbixcbiAgcGFnZVdpbGxVcGRhdGU6IChpbmRleDogbnVtYmVyLCBpbWFnZTogc3RyaW5nKSA9PiB2b2lkLFxufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNyY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJldmlld0luZGV4XG4gKi9cbnR5cGUgU3RhdGUgPSB7XG4gIHNyYzogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuICBwcm9ncmVzczogbnVtYmVyLFxuICB0aW1lc3RhbXA6IG51bWJlcixcbiAgcHJldmlldzogbnVtYmVyLFxuICBwcmV2aWV3SW5kZXg6IG51bWJlcixcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBuYW1lZCBTbGlkZVNob3cgaXMgdGhlIFJlYWN0IGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3VcbiAqIHRvIGRldmVsb3Agc2xpZGVzaG93IGxpa2UgJ1NsaWRlU2hhcmUnIG9yICdTcGVha2VyRGVjaycgdmVyeSBlYXN5IVxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgcHJvcHM6IFByb3BzO1xuICBzdHlsZTogT2JqZWN0O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBPYmplY3Q7XG4gIHN0YXRpYyBQcm9wVHlwZXM6IE9iamVjdDtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogY2FsbCBzdXBlciBjb25zdHJ1Y3RvciBhbmQgaW5pdGlhbGl6ZSBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7UHJvcHN9IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gMDtcbiAgICBpZiAocHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIHRoaXMuc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUk9PVCwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3JjOiAnJyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBwcmV2aWV3SW5kZXg6IDAsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb21wb25lbnRXaWxsTW91bnRcbiAgICogdXBkYXRlcyBzdGF0ZXMgd2l0aCBwcm9wcyB0byByZW5kZXIgZmlyc3Qgdmlldy5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMsIHBhZ2UsIGFuZCBwcm9ncmVzcy5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCBpbWFnZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnByb3BzLmltYWdlcztcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5pbWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbCgxMDAgLyBpbWFnZXMubGVuZ3RoKTtcbiAgICBpZiAocHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIHByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBpbWFnZXNbMF0sXG4gICAgICBpbmRleDogMCxcbiAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBwcmV2aWV3SW5kZXg6IDAsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuaW1hZ2VzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIG5leHQgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByb2dyZXNzQmFyIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgc3RhdGVzIHRvIG1vdmUgcGFnZS5cbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBvbkNsaWNrUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy51cGRhdGVQYWdlU3RhdGUobmV4dEluZGV4KTtcbiAgfTtcblxuICBvbk1vdXNlTW92ZVByb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY2FsY1Byb2dyZXNzSW5kZXgoYmFyV2lkdGgsIHByb2dyZXNzV2lkdGgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMSxcbiAgICAgIHByZXZpZXdJbmRleDogbmV4dEluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIG9uTW91c2VMZWF2ZVByb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgfSk7XG4gIH07XG5cbiAgY2FsY1Byb2dyZXNzSW5kZXggPSAoYmFyV2lkdGg6IG51bWJlciwgcHJvZ3Jlc3NXaWR0aDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBjbGlja1Bvc2l0aW9uID0gTWF0aC5mbG9vcihwcm9ncmVzc1dpZHRoIC8gYmFyV2lkdGggKiAxMDApO1xuICAgIGxldCBuZXh0SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoZWNrV2lkdGggPSB0aGlzLmNhbGNQcm9ncmVzcyhpKTtcbiAgICAgIGlmIChjbGlja1Bvc2l0aW9uID49IGNoZWNrV2lkdGgpIHtcbiAgICAgICAgbmV4dEluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5leHRJbmRleDtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBhZ2VcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGNhbGNQcm9ncmVzcyA9IChwYWdlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSAxMDAgLyB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGg7XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKGJhc2UgKiBwYWdlKTtcbiAgICBpZiAocHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIHJldHVybiAxMDA7XG4gICAgfVxuICAgIHJldHVybiBwcm9ncmVzcztcbiAgfTtcblxuICBpc0VtcHR5QXJyYXkgPSAoYXJyOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGFyciA9PT0gdW5kZWZpbmVkIHx8IGFyciA9PT0gbnVsbCB8fCBhcnIubGVuZ3RoID09PSAwO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2VTdGF0ZSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLmNhbGNQcm9ncmVzcyhpbmRleCArIDEpO1xuICAgIGNvbnN0IGltYWdlID0gdGhpcy5wcm9wcy5pbWFnZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBpbWFnZSxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLnBhZ2VXaWxsVXBkYXRlKGluZGV4LCBpbWFnZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHJlbmRlclxuICAgKiBAcmV0dXJucyB7WE1MfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBzcmMgPSB0aGlzLnN0YXRlLnNyYztcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICBzcmMgKz0gYD8ke3RoaXMuc3RhdGUudGltZXN0YW1wfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuQkFSfSAvPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5JTUFHRX0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNvbnRlbnRcIiBzcmM9e3NyY30gc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0gLz5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJldk9uQ29udGVudFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuUFJFVl9PTl9DT05URU5UfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV4dE9uQ29udGVudFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuTkVYVF9PTl9DT05URU5UfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLl9yZW5kZXJQcmV2aWV3KCl9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzc0JhclwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgICAgICAgIG1hcmdpblRvcDogLTYsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcm9ncmVzc0Jhcn1cbiAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5vbk1vdXNlTW92ZVByb2dyZXNzQmFyfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5vbk1vdXNlTGVhdmVQcm9ncmVzc0Jhcn1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdiYjYnLFxuICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2Jhcid9IHN0eWxlPXtzdHlsZXMuQkFSfT5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9eydwcmV2QnV0dG9uJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLlBBR0VfVklFV30+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5pbWFnZXNcbiAgICAgICAgICAgICAgPyBgJHt0aGlzLnN0YXRlLmluZGV4ICsgMX0gLyAke3RoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aH1gXG4gICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXsnbmV4dEJ1dHRvbid9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dEljb259XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcmV2aWV3IHJlbmRlcmVyXG4gICAqIEByZXR1cm5zIHs/WE1MfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlclByZXZpZXcgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmltYWdlcyB8fCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBwcmV2aWV3ID0gdGhpcy5wcm9wcy5pbWFnZXMubWFwKChpbWcsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5ID0gaW5kZXggPT09IHRoaXMuc3RhdGUucHJldmlld0luZGV4ID8gJ2lubGluZScgOiAnbm9uZSc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHJldmlldy0ke2luZGV4fWB9XG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiBkaXNwbGF5LCB3aWR0aDogMjAwfX1cbiAgICAgICAgICBzcmM9e2ltZ31cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgU1RZTEUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuUFJFVklFVywge1xuICAgICAgb3BhY2l0eTogdGhpcy5zdGF0ZS5wcmV2aWV3LFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtTVFlMRX0+XG4gICAgICAgIHtwcmV2aWV3fVxuICAgICAgICA8cCBzdHlsZT17e21hcmdpbjogMCwgdGV4dEFsaWduOiAnY2VudGVyJywgZm9udFNpemU6IDR9fT5cbiAgICAgICAgICB7YCR7dGhpcy5zdGF0ZS5wcmV2aWV3SW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWB9XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG59XG5cblNsaWRlU2hvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IHN0eWxlcy5BUlJPV19CVVRUT04sXG4gIHN0eWxlOiB7fSxcbiAgaW1hZ2VzOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTQgMGwtNCAzIDQgM3YtNnptMCAzbDQgM3YtNmwtNCAzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk0wIDB2Nmw0LTMtNC0zem00IDN2M2w0LTMtNC0zdjN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG4gIHBhZ2VXaWxsVXBkYXRlOiAoaW5kZXg6IG51bWJlciwgaW1hZ2U6IHN0cmluZykgPT4ge1xuICAgIHJldHVybjtcbiAgfSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlV2lsbFVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuIl19