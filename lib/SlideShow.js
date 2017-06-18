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
 * @property {boolean} withTimestamp
 */


/**
 * @typedef {Object} State
 * @property {string} src
 * @property {number} index
 * @property {number} progress
 * @property {number} timestamp
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

      var nextState = {
        src: _this.props.src[nextIndex],
        index: nextIndex,
        progress: nextProgress
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

      var nextState = {
        src: _this.props.src[nextIndex],
        index: nextIndex,
        progress: nextProgress
      };
      _this.setState(nextState);
    };

    _this.onClickProgressBar = function (e) {
      var barWidth = document.getElementsByClassName('progressBar')[0].offsetWidth;
      var progressWidth = e.clientX;
      var clickPosition = progressWidth / barWidth * 100;
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
      var progress = base * page;
      if (progress > 100) {
        return 100;
      }
      return progress;
    };

    _this.isEmptyArray = function (arr) {
      return arr === undefined || arr === null || arr.length === 0;
    };

    var timestamp = 0;
    if (props.withTimestamp === true) {
      timestamp = Math.floor(new Date().getTime() / 1000);
    }

    _this.state = {
      src: '',
      index: 0,
      progress: 0,
      timestamp: timestamp
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
      var progress = Math.ceil(100 / images.length);
      if (progress > 100) {
        progress = 100;
      }

      this.setState({
        src: images[0],
        index: 0,
        progress: progress
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
        { style: this.props.style },
        _react2.default.createElement('div', { style: styles.BAR }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: styles.IMAGE },
            _react2.default.createElement('img', { className: 'content',
              src: src,
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
  ),
  withTimestamp: false
};

SlideShow.PropTypes = {
  arrowButtonStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  src: _propTypes2.default.array,
  prevIcon: _propTypes2.default.node,
  nextIcon: _propTypes2.default.node,
  withTimestamp: _propTypes2.default.bool
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbInN0eWxlcyIsIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJzcmMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwibmV4dFByb2dyZXNzIiwiY2FsY1Byb2dyZXNzIiwibmV4dFN0YXRlIiwicHJvZ3Jlc3MiLCJzZXRTdGF0ZSIsIm9uQ2xpY2tOZXh0QnV0dG9uIiwibGVuZ3RoIiwib25DbGlja1Byb2dyZXNzQmFyIiwiZSIsImJhcldpZHRoIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib2Zmc2V0V2lkdGgiLCJwcm9ncmVzc1dpZHRoIiwiY2xpZW50WCIsImNsaWNrUG9zaXRpb24iLCJpIiwiY2hlY2tXaWR0aCIsIm5leHRTcmMiLCJwYWdlIiwiYmFzZSIsImFyciIsInVuZGVmaW5lZCIsInRpbWVzdGFtcCIsIndpdGhUaW1lc3RhbXAiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImltYWdlcyIsImNlaWwiLCJzdHlsZSIsIkJBUiIsIklNQUdFIiwid2lkdGgiLCJQUkVWX09OX0NPTlRFTlQiLCJORVhUX09OX0NPTlRFTlQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJwb3NpdGlvbiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLE07Ozs7Ozs7Ozs7OztBQWdDWjs7Ozs7OztBQTlCQTs7Ozs7Ozs7OztBQWdCQTs7Ozs7OztJQW1CcUJDLFM7OztBQU9uQjs7Ozs7QUFL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ZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUHJvcHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzdHlsZVxuICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBzcmMsXG4gKiBAcHJvcGVydHkge05vZGV9IHByZXZJY29uLFxuICogQHByb3BlcnR5IHtOb2RlfSBuZXh0SWNvblxuICogQHByb3BlcnR5IHtib29sZWFufSB3aXRoVGltZXN0YW1wXG4gKi9cbnR5cGUgUHJvcHMgPSB7XG4gIHN0eWxlOiBPYmplY3QsXG4gIHNyYzogQXJyYXk8c3RyaW5nPixcbiAgcHJldkljb246IE5vZGUsXG4gIG5leHRJY29uOiBOb2RlLFxuICB3aXRoVGltZXN0YW1wOiBib29sZWFuLFxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3JjXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVzdGFtcFxuICovXG50eXBlIFN0YXRlID0ge1xuICBzcmM6IHN0cmluZyxcbiAgaW5kZXg6IG51bWJlcixcbiAgcHJvZ3Jlc3M6IG51bWJlcixcbiAgdGltZXN0YW1wOiBudW1iZXIsXG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyBuYW1lZCBTbGlkZVNob3cgaXMgdGhlIFJlYWN0IGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3VcbiAqIHRvIGRldmVsb3Agc2xpZGVzaG93IGxpa2UgJ1NsaWRlU2hhcmUnIG9yICdTcGVha2VyRGVjaycgdmVyeSBlYXN5IVxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgcHJvcHM6IFByb3BzO1xuICBzdHlsZTogT2JqZWN0O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBPYmplY3Q7XG4gIHN0YXRpYyBQcm9wVHlwZXM6IE9iamVjdDtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogY2FsbCBzdXBlciBjb25zdHJ1Y3RvciBhbmQgaW5pdGlhbGl6ZSBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7UHJvcHN9IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gMDtcbiAgICBpZiAocHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogY29tcG9uZW50V2lsbE1vdW50XG4gICAqIHVwZGF0ZXMgc3RhdGVzIHdpdGggcHJvcHMgdG8gcmVuZGVyIGZpcnN0IHZpZXcuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjLCBwYWdlLCBhbmQgcHJvZ3Jlc3MuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgaW1hZ2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoMTAwIC8gaW1hZ2VzLmxlbmd0aCk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICBwcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2VzWzBdLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgY29uc3QgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICBzcmM6IHRoaXMucHJvcHMuc3JjW25leHRJbmRleF0sXG4gICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IG5leHRQcm9ncmVzcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIG5leHQgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gdGhpcy5wcm9wcy5zcmMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICBsZXQgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG4gICAgaWYgKG5leHRQcm9ncmVzcyA+IDEwMCkge1xuICAgICAgbmV4dFByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNyYzogdGhpcy5wcm9wcy5zcmNbbmV4dEluZGV4XSxcbiAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICBwcm9ncmVzczogbmV4dFByb2dyZXNzLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByb2dyZXNzQmFyIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgc3RhdGVzIHRvIG1vdmUgcGFnZS5cbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBvbkNsaWNrUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgY2xpY2tQb3NpdGlvbiA9IChwcm9ncmVzc1dpZHRoIC8gYmFyV2lkdGgpICogMTAwO1xuICAgIGxldCBuZXh0SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5zcmMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoZWNrV2lkdGggPSB0aGlzLmNhbGNQcm9ncmVzcyhpKTtcbiAgICAgIGlmIChjbGlja1Bvc2l0aW9uID49IGNoZWNrV2lkdGgpIHtcbiAgICAgICAgbmV4dEluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG4gICAgY29uc3QgbmV4dFNyYyA9IHRoaXMucHJvcHMuc3JjW25leHRJbmRleF07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IG5leHRTcmMsXG4gICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IG5leHRQcm9ncmVzcyxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBhZ2VcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGNhbGNQcm9ncmVzcyA9IChwYWdlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSAxMDAgLyB0aGlzLnByb3BzLnNyYy5sZW5ndGg7XG4gICAgbGV0IHByb2dyZXNzID0gYmFzZSAqIHBhZ2U7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAoYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDApO1xuICB9O1xuXG4gIC8qKlxuICAgKiByZW5kZXJcbiAgICogQHJldHVybnMge1hNTH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgc3JjID0gdGhpcy5zdGF0ZS5zcmM7XG4gICAgaWYgKHRoaXMucHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgc3JjICs9IGA/JHt0aGlzLnN0YXRlLnRpbWVzdGFtcH1gO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLkJBUn0+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLklNQUdFfT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgIHNyYz17c3JjfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fS8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICAgICAgc3R5bGVzLlBSRVZfT05fQ09OVEVOVFxuICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5leHRPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICAgICAgc3R5bGVzLk5FWFRfT05fQ09OVEVOVFxuICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IC02LFxuICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJvZ3Jlc3NCYXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydiYXInfSBzdHlsZT17c3R5bGVzLkJBUn0+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydwcmV2QnV0dG9uJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLlBBR0VfVklFV30+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5zcmMgPyBgJHt0aGlzLnN0YXRlLmluZGV4XG4gICAgICAgICAgICArIDF9IC8gJHt0aGlzLnByb3BzLnNyYy5sZW5ndGh9YFxuICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnbmV4dEJ1dHRvbid9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059PlxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dEljb259XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuU2xpZGVTaG93LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogc3R5bGVzLkFSUk9XX0JVVFRPTixcbiAgc3R5bGU6IHt9LFxuICBzcmM6IFtdLFxuICBwcmV2SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNCAwbC00IDMgNCAzdi02em0wIDNsNCAzdi02bC00IDN6XCJcbiAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCIvPlxuICAgIDwvc3ZnPlxuICApLFxuICBuZXh0SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNMCAwdjZsNC0zLTQtM3ptNCAzdjNsNC0zLTQtM3YzelwiXG4gICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG59O1xuXG5TbGlkZVNob3cuUHJvcFR5cGVzID0ge1xuICBhcnJvd0J1dHRvblN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3JjOiBQcm9wVHlwZXMuYXJyYXksXG4gIHByZXZJY29uOiBQcm9wVHlwZXMubm9kZSxcbiAgbmV4dEljb246IFByb3BUeXBlcy5ub2RlLFxuICB3aXRoVGltZXN0YW1wOiBQcm9wVHlwZXMuYm9vbCxcbn07Il19