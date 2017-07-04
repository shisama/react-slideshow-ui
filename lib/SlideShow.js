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
        var key = 'preview-' + index;
        return _react2.default.createElement('img', {
          className: key,
          style: { display: display, width: 200 },
          src: img,
          key: key
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJpbWFnZXMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwidXBkYXRlUGFnZVN0YXRlIiwib25DbGlja05leHRCdXR0b24iLCJsZW5ndGgiLCJvbkNsaWNrUHJvZ3Jlc3NCYXIiLCJlIiwiYmFyV2lkdGgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJjbGllbnRYIiwiY2FsY1Byb2dyZXNzSW5kZXgiLCJvbk1vdXNlTW92ZVByb2dyZXNzQmFyIiwic2V0U3RhdGUiLCJwcmV2aWV3IiwicHJldmlld0luZGV4Iiwib25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJjYWxjUHJvZ3Jlc3MiLCJwYWdlIiwiYmFzZSIsInByb2dyZXNzIiwiY2VpbCIsImFyciIsInVuZGVmaW5lZCIsImltYWdlIiwic3JjIiwicGFnZVdpbGxVcGRhdGUiLCJfcmVuZGVyUHJldmlldyIsIm1hcCIsImltZyIsImRpc3BsYXkiLCJrZXkiLCJ3aWR0aCIsIlNUWUxFIiwiT2JqZWN0IiwiYXNzaWduIiwiUFJFVklFVyIsIm9wYWNpdHkiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsInN0eWxlIiwiUk9PVCIsIkJBUiIsIklNQUdFIiwiUFJFVl9PTl9DT05URU5UIiwiTkVYVF9PTl9DT05URU5UIiwiYmFja2dyb3VuZENvbG9yIiwiaGVpZ2h0IiwibWFyZ2luVG9wIiwicG9zaXRpb24iLCJCVVRUT04iLCJwcmV2SWNvbiIsIlBBR0VfVklFVyIsIm5leHRJY29uIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiYXJyb3dCdXR0b25TdHlsZSIsIkFSUk9XX0JVVFRPTiIsIlByb3BUeXBlcyIsIm9iamVjdCIsImFycmF5Iiwibm9kZSIsImJvb2wiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQXNDQTs7Ozs7OztBQXBDQTs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7OztJQXVCcUJBLFM7OztBQU9uQjs7Ozs7QUFLQSxxQkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLHNIQUNsQkEsS0FEa0I7O0FBQUEsVUFnRDFCQyxpQkFoRDBCLEdBZ0ROLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxZQUFMLENBQWtCLE1BQUtGLEtBQUwsQ0FBV0csTUFBN0IsQ0FBSixFQUEwQztBQUN4QztBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsVUFBTUMsWUFBWSxNQUFLRixLQUFMLENBQVdDLEtBQVgsR0FBbUIsQ0FBckM7QUFDQSxZQUFLRSxlQUFMLENBQXFCRCxTQUFyQjtBQUNELEtBM0R5Qjs7QUFBQSxVQWlFMUJFLGlCQWpFMEIsR0FpRU4sWUFBTTtBQUN4QixVQUFJLENBQUMsTUFBS1IsS0FBTCxDQUFXRyxNQUFoQixFQUF3QjtBQUN0QjtBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLE1BQUtMLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBbEIsR0FBMkIsQ0FBcEQsRUFBdUQ7QUFDckQ7QUFDRDtBQUNELFVBQU1ILFlBQVksTUFBS0YsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBQXJDO0FBQ0EsWUFBS0UsZUFBTCxDQUFxQkQsU0FBckI7QUFDRCxLQTNFeUI7O0FBQUEsVUFrRjFCSSxrQkFsRjBCLEdBa0ZMLFVBQUNDLENBQUQsRUFBbUI7QUFDdEMsVUFBTUMsV0FBV0MsU0FBU0Msc0JBQVQsQ0FBZ0MsYUFBaEMsRUFBK0MsQ0FBL0MsRUFDZEMsV0FESDtBQUVBLFVBQU1DLGdCQUFnQkwsRUFBRU0sT0FBeEI7QUFDQSxVQUFNWCxZQUFZLE1BQUtZLGlCQUFMLENBQXVCTixRQUF2QixFQUFpQ0ksYUFBakMsQ0FBbEI7QUFDQSxZQUFLVCxlQUFMLENBQXFCRCxTQUFyQjtBQUNELEtBeEZ5Qjs7QUFBQSxVQTBGMUJhLHNCQTFGMEIsR0EwRkQsVUFBQ1IsQ0FBRCxFQUFtQjtBQUMxQyxVQUFNQyxXQUFXQyxTQUFTQyxzQkFBVCxDQUFnQyxhQUFoQyxFQUErQyxDQUEvQyxFQUNkQyxXQURIO0FBRUEsVUFBTUMsZ0JBQWdCTCxFQUFFTSxPQUF4QjtBQUNBLFVBQU1YLFlBQVksTUFBS1ksaUJBQUwsQ0FBdUJOLFFBQXZCLEVBQWlDSSxhQUFqQyxDQUFsQjtBQUNBLFlBQUtJLFFBQUwsQ0FBYztBQUNaQyxpQkFBUyxDQURHO0FBRVpDLHNCQUFjaEI7QUFGRixPQUFkO0FBSUQsS0FuR3lCOztBQUFBLFVBcUcxQmlCLHVCQXJHMEIsR0FxR0EsVUFBQ1osQ0FBRCxFQUFtQjtBQUMzQyxZQUFLUyxRQUFMLENBQWM7QUFDWkMsaUJBQVM7QUFERyxPQUFkO0FBR0QsS0F6R3lCOztBQUFBLFVBMkcxQkgsaUJBM0cwQixHQTJHTixVQUFDTixRQUFELEVBQW1CSSxhQUFuQixFQUFxRDtBQUN2RSxVQUFNUSxnQkFBZ0JDLEtBQUtDLEtBQUwsQ0FBV1YsZ0JBQWdCSixRQUFoQixHQUEyQixHQUF0QyxDQUF0QjtBQUNBLFVBQUlOLFlBQVksQ0FBaEI7QUFDQSxXQUFLLElBQUlxQixJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBSzNCLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBdEMsRUFBOENrQixHQUE5QyxFQUFtRDtBQUNqRCxZQUFNQyxhQUFhLE1BQUtDLFlBQUwsQ0FBa0JGLENBQWxCLENBQW5CO0FBQ0EsWUFBSUgsaUJBQWlCSSxVQUFyQixFQUFpQztBQUMvQnRCLHNCQUFZcUIsQ0FBWjtBQUNEO0FBQ0Y7QUFDRCxhQUFPckIsU0FBUDtBQUNELEtBckh5Qjs7QUFBQSxVQTRIMUJ1QixZQTVIMEIsR0E0SFgsVUFBQ0MsSUFBRCxFQUEwQjtBQUN2QyxVQUFNQyxPQUFPLE1BQU0sTUFBSy9CLEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBckM7QUFDQSxVQUFJdUIsV0FBV1AsS0FBS1EsSUFBTCxDQUFVRixPQUFPRCxJQUFqQixDQUFmO0FBQ0EsVUFBSUUsV0FBVyxHQUFmLEVBQW9CO0FBQ2xCLGVBQU8sR0FBUDtBQUNEO0FBQ0QsYUFBT0EsUUFBUDtBQUNELEtBbkl5Qjs7QUFBQSxVQXFJMUI5QixZQXJJMEIsR0FxSVgsVUFBQ2dDLEdBQUQsRUFBaUM7QUFDOUMsYUFBT0EsUUFBUUMsU0FBUixJQUFxQkQsUUFBUSxJQUE3QixJQUFxQ0EsSUFBSXpCLE1BQUosS0FBZSxDQUEzRDtBQUNELEtBdkl5Qjs7QUFBQSxVQXlJMUJGLGVBekkwQixHQXlJUixVQUFDRixLQUFELEVBQW1CO0FBQ25DLFVBQU0yQixXQUFXLE1BQUtILFlBQUwsQ0FBa0J4QixRQUFRLENBQTFCLENBQWpCO0FBQ0EsVUFBTStCLFFBQVEsTUFBS3BDLEtBQUwsQ0FBV0csTUFBWCxDQUFrQkUsS0FBbEIsQ0FBZDtBQUNBLFlBQUtlLFFBQUwsQ0FBYztBQUNaaUIsYUFBS0QsS0FETztBQUVaL0IsZUFBT0EsS0FGSztBQUdaMkIsa0JBQVVBO0FBSEUsT0FBZDtBQUtBLFlBQUtoQyxLQUFMLENBQVdzQyxjQUFYLENBQTBCakMsS0FBMUIsRUFBaUMrQixLQUFqQztBQUNELEtBbEp5Qjs7QUFBQSxVQXFPMUJHLGNBck8wQixHQXFPVCxZQUFNO0FBQ3JCLFVBQUksQ0FBQyxNQUFLdkMsS0FBTCxDQUFXRyxNQUFaLElBQXNCLE1BQUtILEtBQUwsQ0FBV0csTUFBWCxDQUFrQk0sTUFBbEIsS0FBNkIsQ0FBdkQsRUFBMEQ7QUFDeEQsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSVksVUFBVSxNQUFLckIsS0FBTCxDQUFXRyxNQUFYLENBQWtCcUMsR0FBbEIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNcEMsS0FBTixFQUFnQjtBQUNsRCxZQUFNcUMsVUFBVXJDLFVBQVUsTUFBS0QsS0FBTCxDQUFXa0IsWUFBckIsR0FBb0MsUUFBcEMsR0FBK0MsTUFBL0Q7QUFDQSxZQUFNcUIsbUJBQWlCdEMsS0FBdkI7QUFDQSxlQUNFO0FBQ0UscUJBQVdzQyxHQURiO0FBRUUsaUJBQU8sRUFBQ0QsU0FBU0EsT0FBVixFQUFtQkUsT0FBTyxHQUExQixFQUZUO0FBR0UsZUFBS0gsR0FIUDtBQUlFLGVBQUtFO0FBSlAsVUFERjtBQVFELE9BWGEsQ0FBZDtBQVlBLFVBQU1FLFFBQVFDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLGVBQU9DLE9BQXpCLEVBQWtDO0FBQzlDQyxpQkFBUyxNQUFLN0MsS0FBTCxDQUFXaUI7QUFEMEIsT0FBbEMsQ0FBZDtBQUdBLGFBQ0U7QUFBQTtBQUFBLFVBQUssT0FBT3dCLEtBQVo7QUFDR3hCLGVBREg7QUFFRTtBQUFBO0FBQUEsWUFBRyxPQUFPLEVBQUM2QixRQUFRLENBQVQsRUFBWUMsV0FBVyxRQUF2QixFQUFpQ0MsVUFBVSxDQUEzQyxFQUFWO0FBQ00sZ0JBQUtoRCxLQUFMLENBQVdrQixZQUFYLEdBQTBCLENBRGhDLFdBQ3VDLE1BQUt0QixLQUFMLENBQVdHLE1BQVgsQ0FBa0JNO0FBRHpEO0FBRkYsT0FERjtBQVFELEtBalF5Qjs7QUFHeEIsUUFBSTRDLFlBQVksQ0FBaEI7QUFDQSxRQUFJckQsTUFBTXNELGFBQU4sS0FBd0IsSUFBNUIsRUFBa0M7QUFDaENELGtCQUFZNUIsS0FBS0MsS0FBTCxDQUFXLElBQUk2QixJQUFKLEdBQVdDLE9BQVgsS0FBdUIsSUFBbEMsQ0FBWjtBQUNEOztBQUVELFVBQUtDLEtBQUwsR0FBYVgsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsZUFBT1csSUFBekIsRUFBK0IsTUFBSzFELEtBQUwsQ0FBV3lELEtBQTFDLENBQWI7O0FBRUEsVUFBS3JELEtBQUwsR0FBYTtBQUNYaUMsV0FBSyxFQURNO0FBRVhoQyxhQUFPLENBRkk7QUFHWDJCLGdCQUFVLENBSEM7QUFJWHFCLGlCQUFXQSxTQUpBO0FBS1hoQyxlQUFTLENBTEU7QUFNWEMsb0JBQWM7QUFOSCxLQUFiO0FBVndCO0FBa0J6Qjs7QUFFRDs7Ozs7Ozs7O3lDQUtxQjtBQUNuQixVQUFNbkIsU0FBd0IsS0FBS0gsS0FBTCxDQUFXRyxNQUF6QztBQUNBLFVBQUksS0FBS0QsWUFBTCxDQUFrQixLQUFLRixLQUFMLENBQVdHLE1BQTdCLENBQUosRUFBMEM7QUFDeEM7QUFDRDtBQUNELFVBQUk2QixXQUFXUCxLQUFLUSxJQUFMLENBQVUsTUFBTTlCLE9BQU9NLE1BQXZCLENBQWY7QUFDQSxVQUFJdUIsV0FBVyxHQUFmLEVBQW9CO0FBQ2xCQSxtQkFBVyxHQUFYO0FBQ0Q7O0FBRUQsV0FBS1osUUFBTCxDQUFjO0FBQ1ppQixhQUFLbEMsT0FBTyxDQUFQLENBRE87QUFFWkUsZUFBTyxDQUZLO0FBR1oyQixrQkFBVUEsUUFIRTtBQUlaWCxpQkFBUyxDQUpHO0FBS1pDLHNCQUFjO0FBTEYsT0FBZDtBQU9EOztBQUVEOzs7Ozs7QUFpQkE7Ozs7OztBQWdCQTs7Ozs7OztBQTBDQTs7Ozs7Ozs7OztBQTZCQTs7Ozs2QkFJUztBQUNQLFVBQUllLE1BQU0sS0FBS2pDLEtBQUwsQ0FBV2lDLEdBQXJCO0FBQ0EsVUFBSSxLQUFLckMsS0FBTCxDQUFXc0QsYUFBWCxLQUE2QixJQUFqQyxFQUF1QztBQUNyQ2pCLHFCQUFXLEtBQUtqQyxLQUFMLENBQVdpRCxTQUF0QjtBQUNEOztBQUVELGFBQ0U7QUFBQTtBQUFBLFVBQUssT0FBTyxLQUFLSSxLQUFqQjtBQUNFLCtDQUFLLE9BQU8sZUFBT0UsR0FBbkIsR0FERjtBQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFLLE9BQU8sZUFBT0MsS0FBbkI7QUFDRSxtREFBSyxXQUFVLFNBQWYsRUFBeUIsS0FBS3ZCLEdBQTlCLEVBQW1DLE9BQU8sRUFBQ08sT0FBTyxNQUFSLEVBQTFDLEdBREY7QUFFRTtBQUNFLHlCQUFVLGVBRFo7QUFFRSx1QkFBUyxLQUFLM0MsaUJBRmhCO0FBR0UscUJBQU8sZUFBTzREO0FBSGhCLGNBRkY7QUFPRTtBQUNFLHlCQUFVLGVBRFo7QUFFRSx1QkFBUyxLQUFLckQsaUJBRmhCO0FBR0UscUJBQU8sZUFBT3NEO0FBSGhCO0FBUEY7QUFERixTQUZGO0FBaUJHLGFBQUt2QixjQUFMLEVBakJIO0FBa0JFO0FBQUE7QUFBQTtBQUNFLHVCQUFVLGFBRFo7QUFFRSxtQkFBTztBQUNMd0IsK0JBQWlCLE1BRFo7QUFFTEMsc0JBQVEsRUFGSDtBQUdMQyx5QkFBVyxDQUFDLENBSFA7QUFJTEMsd0JBQVUsVUFKTDtBQUtMdEIscUJBQU87QUFMRixhQUZUO0FBU0UscUJBQVMsS0FBS2xDLGtCQVRoQjtBQVVFLHlCQUFhLEtBQUtTLHNCQVZwQjtBQVdFLDBCQUFjLEtBQUtJO0FBWHJCO0FBYUU7QUFDRSx1QkFBVSxVQURaO0FBRUUsbUJBQU87QUFDTHdDLCtCQUFpQixTQURaO0FBRUxDLHNCQUFRLE1BRkg7QUFHTHBCLHFCQUFVLEtBQUt4QyxLQUFMLENBQVc0QixRQUFyQjtBQUhLO0FBRlQ7QUFiRixTQWxCRjtBQXdDRTtBQUFBO0FBQUEsWUFBSyxXQUFXLEtBQWhCLEVBQXVCLE9BQU8sZUFBTzJCLEdBQXJDO0FBQ0U7QUFBQTtBQUFBO0FBQ0UseUJBQVcsWUFEYjtBQUVFLHVCQUFTLEtBQUsxRCxpQkFGaEI7QUFHRSxxQkFBTyxlQUFPa0U7QUFIaEI7QUFLRyxpQkFBS25FLEtBQUwsQ0FBV29FO0FBTGQsV0FERjtBQVFFO0FBQUE7QUFBQSxjQUFNLE9BQU8sZUFBT0MsU0FBcEI7QUFDRyxpQkFBS3JFLEtBQUwsQ0FBV0csTUFBWCxHQUNNLEtBQUtDLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixDQUR6QixXQUNnQyxLQUFLTCxLQUFMLENBQVdHLE1BQVgsQ0FBa0JNLE1BRGxELEdBRUc7QUFITixXQVJGO0FBYUU7QUFBQTtBQUFBO0FBQ0UseUJBQVcsWUFEYjtBQUVFLHVCQUFTLEtBQUtELGlCQUZoQjtBQUdFLHFCQUFPLGVBQU8yRDtBQUhoQjtBQUtHLGlCQUFLbkUsS0FBTCxDQUFXc0U7QUFMZDtBQWJGO0FBeENGLE9BREY7QUFnRUQ7O0FBRUQ7Ozs7Ozs7OztFQTVPcUMsZ0JBQU1DLFM7O2tCQUF4QnhFLFM7OztBQWdSckJBLFVBQVV5RSxZQUFWLEdBQXlCO0FBQ3ZCQyxvQkFBa0IsZUFBT0MsWUFERjtBQUV2QmpCLFNBQU8sRUFGZ0I7QUFHdkJ0RCxVQUFRLEVBSGU7QUFJdkJpRSxZQUNFO0FBQUE7QUFBQSxNQUFLLE9BQU8sZUFBT00sWUFBbkIsRUFBaUMsU0FBUSxTQUF6QztBQUNFO0FBQ0UsWUFBSyxNQURQO0FBRUUsU0FBRSxvQ0FGSjtBQUdFLGlCQUFVO0FBSFo7QUFERixHQUxxQjtBQWF2QkosWUFDRTtBQUFBO0FBQUEsTUFBSyxPQUFPLGVBQU9JLFlBQW5CLEVBQWlDLFNBQVEsU0FBekM7QUFDRTtBQUNFLFlBQUssTUFEUDtBQUVFLFNBQUUsa0NBRko7QUFHRSxpQkFBVTtBQUhaO0FBREYsR0FkcUI7QUFzQnZCcEIsaUJBQWUsS0F0QlE7QUF1QnZCaEIsa0JBQWdCLHdCQUFDakMsS0FBRCxFQUFnQitCLEtBQWhCLEVBQWtDO0FBQ2hEO0FBQ0Q7QUF6QnNCLENBQXpCOztBQTRCQXJDLFVBQVU0RSxTQUFWLEdBQXNCO0FBQ3BCRixvQkFBa0Isb0JBQVVHLE1BRFI7QUFFcEJuQixTQUFPLG9CQUFVbUIsTUFGRztBQUdwQnpFLFVBQVEsb0JBQVUwRSxLQUhFO0FBSXBCVCxZQUFVLG9CQUFVVSxJQUpBO0FBS3BCUixZQUFVLG9CQUFVUSxJQUxBO0FBTXBCeEIsaUJBQWUsb0JBQVV5QixJQU5MO0FBT3BCekMsa0JBQWdCLG9CQUFVMEM7QUFQTixDQUF0QiIsImZpbGUiOiJTbGlkZVNob3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1N0eWxlcyBhcyBzdHlsZXN9IGZyb20gJy4vU3R5bGVzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wc1xuICogQHByb3BlcnR5IHtPYmplY3R9IHN0eWxlXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IHNyYyxcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gcHJldkljb24sXG4gKiBAcHJvcGVydHkge05vZGV9IG5leHRJY29uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdpdGhUaW1lc3RhbXBcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHBhZ2VXaWxsVXBkYXRlXG4gKi9cbnR5cGUgUHJvcHMgPSB7XG4gIHN0eWxlOiBPYmplY3QsXG4gIGltYWdlczogQXJyYXk8c3RyaW5nPixcbiAgcHJldkljb246IE5vZGUsXG4gIG5leHRJY29uOiBOb2RlLFxuICB3aXRoVGltZXN0YW1wOiBib29sZWFuLFxuICBwYWdlV2lsbFVwZGF0ZTogKGluZGV4OiBudW1iZXIsIGltYWdlOiBzdHJpbmcpID0+IHZvaWQsXG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3JjXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVzdGFtcFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByZXZpZXdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3SW5kZXhcbiAqL1xudHlwZSBTdGF0ZSA9IHtcbiAgc3JjOiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXIsXG4gIHByb2dyZXNzOiBudW1iZXIsXG4gIHRpbWVzdGFtcDogbnVtYmVyLFxuICBwcmV2aWV3OiBudW1iZXIsXG4gIHByZXZpZXdJbmRleDogbnVtYmVyLFxufTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIG5hbWVkIFNsaWRlU2hvdyBpcyB0aGUgUmVhY3QgY29tcG9uZW50IHRoYXQgYWxsb3dzIHlvdVxuICogdG8gZGV2ZWxvcCBzbGlkZXNob3cgbGlrZSAnU2xpZGVTaGFyZScgb3IgJ1NwZWFrZXJEZWNrJyB2ZXJ5IGVhc3khXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVTaG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGU6IFN0YXRlO1xuICBwcm9wczogUHJvcHM7XG4gIHN0eWxlOiBPYmplY3Q7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6IE9iamVjdDtcbiAgc3RhdGljIFByb3BUeXBlczogT2JqZWN0O1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBjYWxsIHN1cGVyIGNvbnN0cnVjdG9yIGFuZCBpbml0aWFsaXplIHN0YXRlcy5cbiAgICogQHBhcmFtIHtQcm9wc30gcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCB0aW1lc3RhbXAgPSAwO1xuICAgIGlmIChwcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5ST09ULCB0aGlzLnByb3BzLnN0eWxlKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudFdpbGxNb3VudFxuICAgKiB1cGRhdGVzIHN0YXRlcyB3aXRoIHByb3BzIHRvIHJlbmRlciBmaXJzdCB2aWV3LlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYywgcGFnZSwgYW5kIHByb2dyZXNzLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IGltYWdlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMucHJvcHMuaW1hZ2VzO1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLmltYWdlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKDEwMCAvIGltYWdlcy5sZW5ndGgpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcHJvZ3Jlc3MgPSAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlc1swXSxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIHByZXZpb3VzIHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrUHJldkJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5pbWFnZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4IC0gMTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgbmV4dCBwYWdlLlxuICAgKi9cbiAgb25DbGlja05leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmltYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggKyAxO1xuICAgIHRoaXMudXBkYXRlUGFnZVN0YXRlKG5leHRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJvZ3Jlc3NCYXIgaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBzdGF0ZXMgdG8gbW92ZSBwYWdlLlxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIG9uQ2xpY2tQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgYmFyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9ncmVzc0JhcicpWzBdXG4gICAgICAub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgcHJvZ3Jlc3NXaWR0aCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmNhbGNQcm9ncmVzc0luZGV4KGJhcldpZHRoLCBwcm9ncmVzc1dpZHRoKTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0ZShuZXh0SW5kZXgpO1xuICB9O1xuXG4gIG9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aWV3OiAxLFxuICAgICAgcHJldmlld0luZGV4OiBuZXh0SW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgb25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMCxcbiAgICB9KTtcbiAgfTtcblxuICBjYWxjUHJvZ3Jlc3NJbmRleCA9IChiYXJXaWR0aDogbnVtYmVyLCBwcm9ncmVzc1dpZHRoOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBNYXRoLmZsb29yKHByb2dyZXNzV2lkdGggLyBiYXJXaWR0aCAqIDEwMCk7XG4gICAgbGV0IG5leHRJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hlY2tXaWR0aCA9IHRoaXMuY2FsY1Byb2dyZXNzKGkpO1xuICAgICAgaWYgKGNsaWNrUG9zaXRpb24gPj0gY2hlY2tXaWR0aCkge1xuICAgICAgICBuZXh0SW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dEluZGV4O1xuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgY2FsY1Byb2dyZXNzID0gKHBhZ2U6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgYmFzZSA9IDEwMCAvIHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aDtcbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoYmFzZSAqIHBhZ2UpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9O1xuXG4gIGlzRW1wdHlBcnJheSA9IChhcnI6IEFycmF5PHN0cmluZz4pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgdXBkYXRlUGFnZVN0YXRlID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKGluZGV4ICsgMSk7XG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLnByb3BzLmltYWdlc1tpbmRleF07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMucGFnZVdpbGxVcGRhdGUoaW5kZXgsIGltYWdlKTtcbiAgfTtcblxuICAvKipcbiAgICogcmVuZGVyXG4gICAqIEByZXR1cm5zIHtYTUx9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHNyYyA9IHRoaXMuc3RhdGUuc3JjO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHNyYyArPSBgPyR7dGhpcy5zdGF0ZS50aW1lc3RhbXB9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5CQVJ9IC8+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLklNQUdFfT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiIHNyYz17c3JjfSBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fSAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmV2T25Db250ZW50XCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5QUkVWX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuZXh0T25Db250ZW50XCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5ORVhUX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMuX3JlbmRlclByZXZpZXcoKX1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAtNixcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1Byb2dyZXNzQmFyfVxuICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLm9uTW91c2VMZWF2ZVByb2dyZXNzQmFyfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5zdGF0ZS5wcm9ncmVzc30lYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmFyJ30gc3R5bGU9e3N0eWxlcy5CQVJ9PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17J3ByZXZCdXR0b24nfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZJY29ufVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuUEFHRV9WSUVXfT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmltYWdlc1xuICAgICAgICAgICAgICA/IGAke3RoaXMuc3RhdGUuaW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RofWBcbiAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9eyduZXh0QnV0dG9uJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHByZXZpZXcgcmVuZGVyZXJcbiAgICogQHJldHVybnMgez9YTUx9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVuZGVyUHJldmlldyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaW1hZ2VzIHx8IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHByZXZpZXcgPSB0aGlzLnByb3BzLmltYWdlcy5tYXAoKGltZywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXkgPSBpbmRleCA9PT0gdGhpcy5zdGF0ZS5wcmV2aWV3SW5kZXggPyAnaW5saW5lJyA6ICdub25lJztcbiAgICAgIGNvbnN0IGtleSA9IGBwcmV2aWV3LSR7aW5kZXh9YDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9e2tleX1cbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6IGRpc3BsYXksIHdpZHRoOiAyMDB9fVxuICAgICAgICAgIHNyYz17aW1nfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgICBjb25zdCBTVFlMRSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5QUkVWSUVXLCB7XG4gICAgICBvcGFjaXR5OiB0aGlzLnN0YXRlLnByZXZpZXcsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e1NUWUxFfT5cbiAgICAgICAge3ByZXZpZXd9XG4gICAgICAgIDxwIHN0eWxlPXt7bWFyZ2luOiAwLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogNH19PlxuICAgICAgICAgIHtgJHt0aGlzLnN0YXRlLnByZXZpZXdJbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLmltYWdlcy5sZW5ndGh9YH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcbn1cblxuU2xpZGVTaG93LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogc3R5bGVzLkFSUk9XX0JVVFRPTixcbiAgc3R5bGU6IHt9LFxuICBpbWFnZXM6IFtdLFxuICBwcmV2SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiI2ZmZlwiXG4gICAgICAgIGQ9XCJNNCAwbC00IDMgNCAzdi02em0wIDNsNCAzdi02bC00IDN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgbmV4dEljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTAgMHY2bDQtMy00LTN6bTQgM3YzbDQtMy00LTN2M3pcIlxuICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApLFxuICB3aXRoVGltZXN0YW1wOiBmYWxzZSxcbiAgcGFnZVdpbGxVcGRhdGU6IChpbmRleDogbnVtYmVyLCBpbWFnZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuO1xuICB9LFxufTtcblxuU2xpZGVTaG93LlByb3BUeXBlcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGltYWdlczogUHJvcFR5cGVzLmFycmF5LFxuICBwcmV2SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIG5leHRJY29uOiBQcm9wVHlwZXMubm9kZSxcbiAgd2l0aFRpbWVzdGFtcDogUHJvcFR5cGVzLmJvb2wsXG4gIHBhZ2VXaWxsVXBkYXRlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG4iXX0=