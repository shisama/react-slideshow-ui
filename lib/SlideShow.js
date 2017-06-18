'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
 */


/**
 * @typedef {Object} State
 * @property {string} src
 * @property {number} index
 * @property {number} progress
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
      if (_this.isEmptyArray(_this.props.src)) {
        return;
      }

      if (_this.state.index === 0) {
        return;
      }

      var nextIndex = _this.state.index - 1;
      var nextProgress = _this.calcProgress(nextIndex + 1);
      var nextSrc = _this.props.src[nextIndex];
      var timestamp = _this.state.timestamp;

      if (timestamp > 0) {
        nextSrc += '?' + timestamp;
      }

      var nextState = {
        src: nextSrc,
        index: nextIndex,
        progress: nextProgress,
        timestamp: timestamp
      };
      _this.setState(nextState);
    };

    _this.onClickNextButton = function () {
      if (!_this.props.src) {
        return;
      }

      if (_this.state.index === _this.props.src.length - 1) {
        return;
      }
      var nextIndex = _this.state.index + 1;
      var nextProgress = _this.calcProgress(nextIndex + 1);
      if (nextProgress > 100) {
        nextProgress = 100;
      }

      var nextSrc = _this.props.src[nextIndex];
      var timestamp = _this.state.timestamp;

      if (timestamp > 0) {
        nextSrc += '?' + timestamp;
      }

      var nextState = {
        src: nextSrc,
        index: nextIndex,
        progress: nextProgress,
        timestamp: timestamp
      };
      _this.setState(nextState);
    };

    _this.onClickProgressBar = function (e) {
      var barWidth = document.getElementsByClassName('progressBar')[0].offsetWidth;
      var progressWidth = e.clientX;
      var clickPosition = Math.floor(progressWidth / barWidth * 100);
      var nextIndex = 0;
      for (var i = 0; i < _this.props.src.length; i++) {
        var checkWidth = _this.calcProgress(i);
        if (clickPosition >= checkWidth) {
          nextIndex = i;
        }
      }
      var nextProgress = _this.calcProgress(nextIndex + 1);
      var nextSrc = _this.props.src[nextIndex];
      _this.setState({
        src: nextSrc,
        index: nextIndex,
        progress: nextProgress
      });
    };

    _this.calcProgress = function (page) {
      var base = 100 / _this.props.src.length;
      var progress = Math.ceil(base * page);
      if (progress > 100) {
        return 100;
      }
      return progress;
    };

    _this.isEmptyArray = function (arr) {
      return arr === undefined || arr === null || arr.length === 0;
    };

    _this.state = {
      src: '',
      index: 0,
      progress: 0,
      timestamp: 0
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
      var images = this.props.src;
      if (this.isEmptyArray(this.props.src)) {
        return;
      }
      var src = images[0];

      var progress = Math.ceil(100 / images.length);
      if (progress > 100) {
        progress = 100;
      }

      var timestamp = 0;
      if (this.props.withTimestamp) {
        timestamp = new Date().getTime() / 1000;
        src += '?' + timestamp;
      }

      this.setState({
        src: src,
        index: 0,
        progress: progress,
        timestamp: timestamp
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
      return _react2.default.createElement(
        'div',
        { style: this.props.style },
        _react2.default.createElement('div', { style: styles.BAR }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: styles.IMAGE },
            _react2.default.createElement('img', { className: 'content',
              src: this.state.src,
              style: { width: '100%' } }),
            _react2.default.createElement('div', { className: 'prevOnContent',
              onClick: this.onClickPrevButton,
              style: styles.PREV_ON_CONTENT }),
            _react2.default.createElement('div', { className: 'nextOnContent',
              onClick: this.onClickNextButton,
              style: styles.NEXT_ON_CONTENT })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'progressBar',
            style: {
              backgroundColor: '#000',
              height: 10,
              marginTop: -6,
              position: 'relative',
              width: '100%'
            },
            onClick: this.onClickProgressBar },
          _react2.default.createElement('div', { className: 'progress',
            style: {
              backgroundColor: '#007bb6',
              height: '100%',
              width: this.state.progress + '%'
            } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'bar', style: styles.BAR },
          _react2.default.createElement(
            'button',
            { className: 'prevButton',
              onClick: this.onClickPrevButton,
              style: styles.BUTTON },
            this.props.prevIcon
          ),
          _react2.default.createElement(
            'span',
            { style: styles.PAGE_VIEW },
            this.props.src ? this.state.index + 1 + ' / ' + this.props.src.length : null
          ),
          _react2.default.createElement(
            'button',
            { className: 'nextButton',
              onClick: this.onClickNextButton,
              style: styles.BUTTON },
            this.props.nextIcon
          )
        )
      );
    }
  }]);

  return SlideShow;
}(_react2.default.Component);

exports.default = SlideShow;
;

SlideShow.defaultProps = {
  arrowButtonStyle: styles.ARROW_BUTTON,
  style: {},
  src: [],
  prevIcon: _react2.default.createElement(
    'svg',
    { style: styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', { fill: '#fff', d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)' })
  ),
  nextIcon: _react2.default.createElement(
    'svg',
    { style: styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', { fill: '#fff', d: 'M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z',
      transform: 'translate(0 1)' })
  )
};

SlideShow.PropTypes = {
  arrowButtonStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  src: _propTypes2.default.array,
  prevIcon: _propTypes2.default.node,
  nextIcon: _propTypes2.default.node
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbInN0eWxlcyIsIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJzcmMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwibmV4dFByb2dyZXNzIiwiY2FsY1Byb2dyZXNzIiwibmV4dFNyYyIsInRpbWVzdGFtcCIsIm5leHRTdGF0ZSIsInByb2dyZXNzIiwic2V0U3RhdGUiLCJvbkNsaWNrTmV4dEJ1dHRvbiIsImxlbmd0aCIsIm9uQ2xpY2tQcm9ncmVzc0JhciIsImUiLCJiYXJXaWR0aCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm9mZnNldFdpZHRoIiwicHJvZ3Jlc3NXaWR0aCIsImNsaWVudFgiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJwYWdlIiwiYmFzZSIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJpbWFnZXMiLCJ3aXRoVGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJzdHlsZSIsIkJBUiIsIklNQUdFIiwid2lkdGgiLCJQUkVWX09OX0NPTlRFTlQiLCJORVhUX09OX0NPTlRFTlQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJwb3NpdGlvbiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsTTs7Ozs7Ozs7Ozs7O0FBNkJaOzs7Ozs7O0FBM0JBOzs7Ozs7Ozs7QUFjQTs7Ozs7O0lBa0JxQkMsUzs7O0FBT25COzs7OztBQUtBLHFCQUFZQyxL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cEJuQixTQUFPLG9CQUFVbUIsTUFGRztBQUdwQnRELE9BQUssb0JBQVV1RCxLQUhLO0FBSXBCVCxZQUFVLG9CQUFVVSxJQUpBO0FBS3BCUixZQUFVLG9CQUFVUTtBQUxBLENBQXRCIiwiZmlsZSI6IlNsaWRlU2hvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUHJvcHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzdHlsZVxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBzcmMsXG4gKiBAcHJvcGVydHkge05vZGV9IHByZXZJY29uLFxuICogQHByb3BlcnR5IHtOb2RlfSBuZXh0SWNvblxuICovXG50eXBlIFByb3BzID0ge1xuICBzdHlsZTogT2JqZWN0LFxuICBzcmM6IEFycmF5PHN0cmluZz4sXG4gIHByZXZJY29uOiBOb2RlLFxuICBuZXh0SWNvbjogTm9kZSxcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNyY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge251bWJlcn0gcHJvZ3Jlc3NcbiAqL1xudHlwZSBTdGF0ZSA9IHtcbiAgc3JjOiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXIsXG4gIHByb2dyZXNzOiBudW1iZXIsXG4gIHRpbWVzdGFtcDogbnVtYmVyLFxufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgbmFtZWQgU2xpZGVTaG93IGlzIHRoZSBSZWFjdCBjb21wb25lbnQgdGhhdCBhbGxvd3MgeW91XG4gKiB0byBkZXZlbG9wIHNsaWRlc2hvdyBsaWtlICdTbGlkZVNoYXJlJyBvciAnU3BlYWtlckRlY2snIHZlcnkgZWFzeSFcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZVNob3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZTogU3RhdGU7XG4gIHByb3BzOiBQcm9wcztcbiAgc3R5bGU6IE9iamVjdDtcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogT2JqZWN0O1xuICBzdGF0aWMgUHJvcFR5cGVzOiBPYmplY3Q7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIGNhbGwgc3VwZXIgY29uc3RydWN0b3IgYW5kIGluaXRpYWxpemUgc3RhdGVzLlxuICAgKiBAcGFyYW0ge1Byb3BzfSBwcm9wc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogMCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudFdpbGxNb3VudFxuICAgKiB1cGRhdGVzIHN0YXRlcyB3aXRoIHByb3BzIHRvIHJlbmRlciBmaXJzdCB2aWV3LlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYywgcGFnZSwgYW5kIHByb2dyZXNzLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IGltYWdlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMucHJvcHMuc3JjO1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLnNyYykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNyYyA9IGltYWdlc1swXTtcblxuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbCgxMDAgLyBpbWFnZXMubGVuZ3RoKTtcbiAgICBpZiAocHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIHByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIGxldCB0aW1lc3RhbXAgPSAwO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhUaW1lc3RhbXApIHtcbiAgICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcbiAgICAgIHNyYyArPSBgPyR7dGltZXN0YW1wfWA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IHNyYyxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgY29uc3QgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG4gICAgbGV0IG5leHRTcmMgPSB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IHRoaXMuc3RhdGUudGltZXN0YW1wO1xuXG4gICAgaWYgKHRpbWVzdGFtcCA+IDApIHtcbiAgICAgIG5leHRTcmMgKz0gYD8ke3RpbWVzdGFtcH1gO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNyYzogbmV4dFNyYyxcbiAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICBwcm9ncmVzczogbmV4dFByb2dyZXNzLFxuICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gbmV4dCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBuZXh0IHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc3JjKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IHRoaXMucHJvcHMuc3JjLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCArIDE7XG4gICAgbGV0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuICAgIGlmIChuZXh0UHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIG5leHRQcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICBsZXQgbmV4dFNyYyA9IHRoaXMucHJvcHMuc3JjW25leHRJbmRleF07XG4gICAgY29uc3QgdGltZXN0YW1wID0gdGhpcy5zdGF0ZS50aW1lc3RhbXA7XG5cbiAgICBpZiAodGltZXN0YW1wID4gMCkge1xuICAgICAgbmV4dFNyYyArPSBgPyR7dGltZXN0YW1wfWA7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlID0ge1xuICAgICAgc3JjOiBuZXh0U3JjLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcm9ncmVzc0JhciBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIHN0YXRlcyB0byBtb3ZlIHBhZ2UuXG4gICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICAgKi9cbiAgb25DbGlja1Byb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBNYXRoLmZsb29yKChwcm9ncmVzc1dpZHRoIC8gYmFyV2lkdGgpICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuc3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuICAgIGNvbnN0IG5leHRTcmMgPSB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBuZXh0U3JjLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5zcmMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAoYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDApO1xuICB9O1xuXG4gIC8qKlxuICAgKiByZW5kZXJcbiAgICogQHJldHVybnMge1hNTH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5CQVJ9PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5JTUFHRX0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMuc3RhdGUuc3JjfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fS8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICAgICAgc3R5bGVzLlBSRVZfT05fQ09OVEVOVFxuICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5leHRPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICAgICAgc3R5bGVzLk5FWFRfT05fQ09OVEVOVFxuICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IC02LFxuICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJvZ3Jlc3NCYXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydiYXInfSBzdHlsZT17c3R5bGVzLkJBUn0+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydwcmV2QnV0dG9uJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLlBBR0VfVklFV30+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5zcmMgPyBgJHt0aGlzLnN0YXRlLmluZGV4XG4gICAgICAgICAgICArIDF9IC8gJHt0aGlzLnByb3BzLnNyYy5sZW5ndGh9YFxuICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnbmV4dEJ1dHRvbid9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059PlxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dEljb259XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuU2xpZGVTaG93LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogc3R5bGVzLkFSUk9XX0JVVFRPTixcbiAgc3R5bGU6IHt9LFxuICBzcmM6IFtdLFxuICBwcmV2SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNCAwbC00IDMgNCAzdi02em0wIDNsNCAzdi02bC00IDN6XCJcbiAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCIvPlxuICAgIDwvc3ZnPlxuICApLFxuICBuZXh0SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNMCAwdjZsNC0zLTQtM3ptNCAzdjNsNC0zLTQtM3YzelwiXG4gICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiLz5cbiAgICA8L3N2Zz5cbiAgKSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzcmM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG59OyJdfQ==