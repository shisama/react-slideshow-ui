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
            _react2.default.createElement('img', { className: 'content', src: src, style: { width: '100%' } }),
            _react2.default.createElement('div', {
              className: 'prevOnContent',
              onClick: this.onClickPrevButton,
              style: styles.PREV_ON_CONTENT
            }),
            _react2.default.createElement('div', {
              className: 'nextOnContent',
              onClick: this.onClickNextButton,
              style: styles.NEXT_ON_CONTENT
            })
          )
        ),
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
            onClick: this.onClickProgressBar
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
          { className: 'bar', style: styles.BAR },
          _react2.default.createElement(
            'button',
            {
              className: 'prevButton',
              onClick: this.onClickPrevButton,
              style: styles.BUTTON
            },
            this.props.prevIcon
          ),
          _react2.default.createElement(
            'span',
            { style: styles.PAGE_VIEW },
            this.props.src ? this.state.index + 1 + ' / ' + this.props.src.length : null
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'nextButton',
              onClick: this.onClickNextButton,
              style: styles.BUTTON
            },
            this.props.nextIcon
          )
        )
      );
    }
  }]);

  return SlideShow;
}(_react2.default.Component);

exports.default = SlideShow;


SlideShow.defaultProps = {
  arrowButtonStyle: styles.ARROW_BUTTON,
  style: {},
  src: [],
  prevIcon: _react2.default.createElement(
    'svg',
    { style: styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', {
      fill: '#fff',
      d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)'
    })
  ),
  nextIcon: _react2.default.createElement(
    'svg',
    { style: styles.ARROW_BUTTON, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', {
      fill: '#fff',
      d: 'M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z',
      transform: 'translate(0 1)'
    })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbInN0eWxlcyIsIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJzcmMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwibmV4dFByb2dyZXNzIiwiY2FsY1Byb2dyZXNzIiwibmV4dFN0YXRlIiwicHJvZ3Jlc3MiLCJzZXRTdGF0ZSIsIm9uQ2xpY2tOZXh0QnV0dG9uIiwibGVuZ3RoIiwib25DbGlja1Byb2dyZXNzQmFyIiwiZSIsImJhcldpZHRoIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib2Zmc2V0V2lkdGgiLCJwcm9ncmVzc1dpZHRoIiwiY2xpZW50WCIsImNsaWNrUG9zaXRpb24iLCJNYXRoIiwiZmxvb3IiLCJpIiwiY2hlY2tXaWR0aCIsIm5leHRTcmMiLCJwYWdlIiwiYmFzZSIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJ0aW1lc3RhbXAiLCJ3aXRoVGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJpbWFnZXMiLCJzdHlsZSIsIkJBUiIsIklNQUdFIiwid2lkdGgiLCJQUkVWX09OX0NPTlRFTlQiLCJORVhUX09OX0NPTlRFTlQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJwb3NpdGlvbiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLE07Ozs7Ozs7Ozs7OztBQWdDWjs7Ozs7OztBQTlCQTs7Ozs7Ozs7OztBQWdCQTs7Ozs7OztJQW1CcUJDLFM7OztBQU9uQjs7Ozs7QUFL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Q29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BzXG4gKiBAcHJvcGVydHkge09iamVjdH0gc3R5bGVcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gc3JjLFxuICogQHByb3BlcnR5IHtOb2RlfSBwcmV2SWNvbixcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gbmV4dEljb25cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2l0aFRpbWVzdGFtcFxuICovXG50eXBlIFByb3BzID0ge1xuICBzdHlsZTogT2JqZWN0LFxuICBzcmM6IEFycmF5PHN0cmluZz4sXG4gIHByZXZJY29uOiBOb2RlLFxuICBuZXh0SWNvbjogTm9kZSxcbiAgd2l0aFRpbWVzdGFtcDogYm9vbGVhbixcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzcmNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByb2dyZXNzXG4gKiBAcHJvcGVydHkge251bWJlcn0gdGltZXN0YW1wXG4gKi9cbnR5cGUgU3RhdGUgPSB7XG4gIHNyYzogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuICBwcm9ncmVzczogbnVtYmVyLFxuICB0aW1lc3RhbXA6IG51bWJlcixcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBuYW1lZCBTbGlkZVNob3cgaXMgdGhlIFJlYWN0IGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3VcbiAqIHRvIGRldmVsb3Agc2xpZGVzaG93IGxpa2UgJ1NsaWRlU2hhcmUnIG9yICdTcGVha2VyRGVjaycgdmVyeSBlYXN5IVxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgcHJvcHM6IFByb3BzO1xuICBzdHlsZTogT2JqZWN0O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBPYmplY3Q7XG4gIHN0YXRpYyBQcm9wVHlwZXM6IE9iamVjdDtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogY2FsbCBzdXBlciBjb25zdHJ1Y3RvciBhbmQgaW5pdGlhbGl6ZSBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7UHJvcHN9IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gMDtcbiAgICBpZiAocHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogY29tcG9uZW50V2lsbE1vdW50XG4gICAqIHVwZGF0ZXMgc3RhdGVzIHdpdGggcHJvcHMgdG8gcmVuZGVyIGZpcnN0IHZpZXcuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjLCBwYWdlLCBhbmQgcHJvZ3Jlc3MuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgaW1hZ2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoMTAwIC8gaW1hZ2VzLmxlbmd0aCk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICBwcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2VzWzBdLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgY29uc3QgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICBzcmM6IHRoaXMucHJvcHMuc3JjW25leHRJbmRleF0sXG4gICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IG5leHRQcm9ncmVzcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIG5leHQgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gdGhpcy5wcm9wcy5zcmMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICBsZXQgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG4gICAgaWYgKG5leHRQcm9ncmVzcyA+IDEwMCkge1xuICAgICAgbmV4dFByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNyYzogdGhpcy5wcm9wcy5zcmNbbmV4dEluZGV4XSxcbiAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICBwcm9ncmVzczogbmV4dFByb2dyZXNzLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByb2dyZXNzQmFyIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgc3RhdGVzIHRvIG1vdmUgcGFnZS5cbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBvbkNsaWNrUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgY2xpY2tQb3NpdGlvbiA9IE1hdGguZmxvb3IocHJvZ3Jlc3NXaWR0aCAvIGJhcldpZHRoICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuc3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuICAgIGNvbnN0IG5leHRTcmMgPSB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBuZXh0U3JjLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5zcmMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBhcnIgPT09IHVuZGVmaW5lZCB8fCBhcnIgPT09IG51bGwgfHwgYXJyLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICAvKipcbiAgICogcmVuZGVyXG4gICAqIEByZXR1cm5zIHtYTUx9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHNyYyA9IHRoaXMuc3RhdGUuc3JjO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHNyYyArPSBgPyR7dGhpcy5zdGF0ZS50aW1lc3RhbXB9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5CQVJ9IC8+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLklNQUdFfT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiIHNyYz17c3JjfSBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19IC8+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByZXZPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLlBSRVZfT05fQ09OVEVOVH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5leHRPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tOZXh0QnV0dG9ufVxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLk5FWFRfT05fQ09OVEVOVH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NCYXJcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgIGhlaWdodDogMTAsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IC02LFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgIH19XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJvZ3Jlc3NCYXJ9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzc1wiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDA3YmI2JyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnN0YXRlLnByb2dyZXNzfSVgLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydiYXInfSBzdHlsZT17c3R5bGVzLkJBUn0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXsncHJldkJ1dHRvbid9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5CVVRUT059XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMucHJldkljb259XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5QQUdFX1ZJRVd9PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuc3JjXG4gICAgICAgICAgICAgID8gYCR7dGhpcy5zdGF0ZS5pbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLnNyYy5sZW5ndGh9YFxuICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17J25leHRCdXR0b24nfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRJY29ufVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2xpZGVTaG93LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogc3R5bGVzLkFSUk9XX0JVVFRPTixcbiAgc3R5bGU6IHt9LFxuICBzcmM6IFtdLFxuICBwcmV2SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiI2ZmZlwiXG4gICAgICAgIGQ9XCJNNCAwbC00IDMgNCAzdi02em0wIDNsNCAzdi02bC00IDN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgbmV4dEljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTAgMHY2bDQtMy00LTN6bTQgM3YzbDQtMy00LTN2M3pcIlxuICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApLFxuICB3aXRoVGltZXN0YW1wOiBmYWxzZSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzcmM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxufTtcbiJdfQ==