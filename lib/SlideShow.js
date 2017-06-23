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
            this.props.src ? this.state.index + 1 + ' / ' + this.props.src.length : null
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
  }]);

  return SlideShow;
}(_react2.default.Component);

exports.default = SlideShow;


SlideShow.defaultProps = {
  arrowButtonStyle: _Styles.Styles.ARROW_BUTTON,
  style: {},
  src: [],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJzcmMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwibmV4dFByb2dyZXNzIiwiY2FsY1Byb2dyZXNzIiwibmV4dFN0YXRlIiwicHJvZ3Jlc3MiLCJzZXRTdGF0ZSIsIm9uQ2xpY2tOZXh0QnV0dG9uIiwibGVuZ3RoIiwib25DbGlja1Byb2dyZXNzQmFyIiwiZSIsImJhcldpZHRoIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib2Zmc2V0V2lkdGgiLCJwcm9ncmVzc1dpZHRoIiwiY2xpZW50WCIsImNsaWNrUG9zaXRpb24iLCJNYXRoIiwiZmxvb3IiLCJpIiwiY2hlY2tXaWR0aCIsIm5leHRTcmMiLCJwYWdlIiwiYmFzZSIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJ0aW1lc3RhbXAiLCJ3aXRoVGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJpbWFnZXMiLCJzdHlsZSIsIkJBUiIsIklNQUdFIiwid2lkdGgiLCJQUkVWX09OX0NPTlRFTlQiLCJORVhUX09OX0NPTlRFTlQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJwb3NpdGlvbiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFnQ0E7Ozs7Ozs7QUE5QkE7Ozs7Ozs7Ozs7QUFnQkE7Ozs7Ozs7SUFtQnFCQSxTOzs7QUFPbkI7Ozs7O0FBS0EscUJBQVlDLEtBQVosRUFBMEI7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LEtBQUwsQ0FBV0csR0FBWCxHQUNNLEtBQUtDLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixDQUR6QixXQUNnQyxLQUFLTCxLQUFMLENBQVdHLEdBQVgsQ0FBZVUsTUFEL0MsR0FFRztBQUhOLFdBUkY7QUFhRTtBQUFBO0FBQUE7QUFDRSx5QkFBVyxZQURiO0FBRUUsdUJBQVMsS0FBS0QsaUJBRmhCO0FBR0UscUJBQU8sZUFBT29DO0FBSGhCO0FBS0csaUJBQUtoRCxLQUFMLENBQVdtRDtBQUxkO0FBYkY7QUFyQ0YsT0FERjtBQTZERDs7OztFQXZOb0MsZ0JBQU1DLFM7O2tCQUF4QnJELFM7OztBQTBOckJBLFVBQVVzRCxZQUFWLEdBQXlCO0FBQ3ZCQyxvQkFBa0IsZUFBT0MsWUFERjtBQUV2QmpCLFNBQU8sRUFGZ0I7QUFHdkJuQyxPQUFLLEVBSGtCO0FBSXZCOEMsWUFDRTtBQUFBO0FBQUEsTUFBSyxPQUFPLGVBQU9NLFlBQW5CLEVBQWlDLFNBQVEsU0FBekM7QUFDRTtBQUNFLFlBQUssTUFEUDtBQUVFLFNBQUUsb0NBRko7QUFHRSxpQkFBVTtBQUhaO0FBREYsR0FMcUI7QUFhdkJKLFlBQ0U7QUFBQTtBQUFBLE1BQUssT0FBTyxlQUFPSSxZQUFuQixFQUFpQyxTQUFRLFNBQXpDO0FBQ0U7QUFDRSxZQUFLLE1BRFA7QUFFRSxTQUFFLGtDQUZKO0FBR0UsaUJBQVU7QUFIWjtBQURGLEdBZHFCO0FBc0J2QnJCLGlCQUFlO0FBdEJRLENBQXpCOztBQXlCQW5DLFVBQVV5RCxTQUFWLEdBQXNCO0FBQ3BCRixvQkFBa0Isb0JBQVVHLE1BRFI7QUFFcEJuQixTQUFPLG9CQUFVbUIsTUFGRztBQUdwQnRELE9BQUssb0JBQVV1RCxLQUhLO0FBSXBCVCxZQUFVLG9CQUFVVSxJQUpBO0FBS3BCUixZQUFVLG9CQUFVUSxJQUxBO0FBTXBCekIsaUJBQWUsb0JBQVUwQjtBQU5MLENBQXRCIiwiZmlsZSI6IlNsaWRlU2hvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7U3R5bGVzIGFzIHN0eWxlc30gZnJvbSAnLi9TdHlsZXMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BzXG4gKiBAcHJvcGVydHkge09iamVjdH0gc3R5bGVcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gc3JjLFxuICogQHByb3BlcnR5IHtOb2RlfSBwcmV2SWNvbixcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gbmV4dEljb25cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2l0aFRpbWVzdGFtcFxuICovXG50eXBlIFByb3BzID0ge1xuICBzdHlsZTogT2JqZWN0LFxuICBzcmM6IEFycmF5PHN0cmluZz4sXG4gIHByZXZJY29uOiBOb2RlLFxuICBuZXh0SWNvbjogTm9kZSxcbiAgd2l0aFRpbWVzdGFtcDogYm9vbGVhbixcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzcmNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByb2dyZXNzXG4gKiBAcHJvcGVydHkge251bWJlcn0gdGltZXN0YW1wXG4gKi9cbnR5cGUgU3RhdGUgPSB7XG4gIHNyYzogc3RyaW5nLFxuICBpbmRleDogbnVtYmVyLFxuICBwcm9ncmVzczogbnVtYmVyLFxuICB0aW1lc3RhbXA6IG51bWJlcixcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBuYW1lZCBTbGlkZVNob3cgaXMgdGhlIFJlYWN0IGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3VcbiAqIHRvIGRldmVsb3Agc2xpZGVzaG93IGxpa2UgJ1NsaWRlU2hhcmUnIG9yICdTcGVha2VyRGVjaycgdmVyeSBlYXN5IVxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlU2hvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgcHJvcHM6IFByb3BzO1xuICBzdHlsZTogT2JqZWN0O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBPYmplY3Q7XG4gIHN0YXRpYyBQcm9wVHlwZXM6IE9iamVjdDtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogY2FsbCBzdXBlciBjb25zdHJ1Y3RvciBhbmQgaW5pdGlhbGl6ZSBzdGF0ZXMuXG4gICAqIEBwYXJhbSB7UHJvcHN9IHByb3BzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgdGltZXN0YW1wID0gMDtcbiAgICBpZiAocHJvcHMud2l0aFRpbWVzdGFtcCA9PT0gdHJ1ZSkge1xuICAgICAgdGltZXN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogY29tcG9uZW50V2lsbE1vdW50XG4gICAqIHVwZGF0ZXMgc3RhdGVzIHdpdGggcHJvcHMgdG8gcmVuZGVyIGZpcnN0IHZpZXcuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjLCBwYWdlLCBhbmQgcHJvZ3Jlc3MuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgaW1hZ2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5wcm9wcy5zcmM7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoMTAwIC8gaW1hZ2VzLmxlbmd0aCk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICBwcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogaW1hZ2VzWzBdLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBwcmV2aW91cyBwYWdlLlxuICAgKi9cbiAgb25DbGlja1ByZXZCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eUFycmF5KHRoaXMucHJvcHMuc3JjKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgY29uc3QgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICBzcmM6IHRoaXMucHJvcHMuc3JjW25leHRJbmRleF0sXG4gICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IG5leHRQcm9ncmVzcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIG5leHQgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tOZXh0QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5zcmMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gdGhpcy5wcm9wcy5zcmMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICBsZXQgbmV4dFByb2dyZXNzID0gdGhpcy5jYWxjUHJvZ3Jlc3MobmV4dEluZGV4ICsgMSk7XG4gICAgaWYgKG5leHRQcm9ncmVzcyA+IDEwMCkge1xuICAgICAgbmV4dFByb2dyZXNzID0gMTAwO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNyYzogdGhpcy5wcm9wcy5zcmNbbmV4dEluZGV4XSxcbiAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICBwcm9ncmVzczogbmV4dFByb2dyZXNzLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByb2dyZXNzQmFyIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgc3RhdGVzIHRvIG1vdmUgcGFnZS5cbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBvbkNsaWNrUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgY2xpY2tQb3NpdGlvbiA9IE1hdGguZmxvb3IocHJvZ3Jlc3NXaWR0aCAvIGJhcldpZHRoICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuc3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuICAgIGNvbnN0IG5leHRTcmMgPSB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBuZXh0U3JjLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5zcmMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBhcnIgPT09IHVuZGVmaW5lZCB8fCBhcnIgPT09IG51bGwgfHwgYXJyLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICAvKipcbiAgICogcmVuZGVyXG4gICAqIEByZXR1cm5zIHtYTUx9XG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHNyYyA9IHRoaXMuc3RhdGUuc3JjO1xuICAgIGlmICh0aGlzLnByb3BzLndpdGhUaW1lc3RhbXAgPT09IHRydWUpIHtcbiAgICAgIHNyYyArPSBgPyR7dGhpcy5zdGF0ZS50aW1lc3RhbXB9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5CQVJ9IC8+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLklNQUdFfT5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY29udGVudFwiIHNyYz17c3JjfSBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fSAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmV2T25Db250ZW50XCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5QUkVWX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuZXh0T25Db250ZW50XCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5ORVhUX09OX0NPTlRFTlR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAtNixcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1Byb2dyZXNzQmFyfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5zdGF0ZS5wcm9ncmVzc30lYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmFyJ30gc3R5bGU9e3N0eWxlcy5CQVJ9PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17J3ByZXZCdXR0b24nfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZJY29ufVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuUEFHRV9WSUVXfT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnNyY1xuICAgICAgICAgICAgICA/IGAke3RoaXMuc3RhdGUuaW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5zcmMubGVuZ3RofWBcbiAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9eyduZXh0QnV0dG9uJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNsaWRlU2hvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IHN0eWxlcy5BUlJPV19CVVRUT04sXG4gIHN0eWxlOiB7fSxcbiAgc3JjOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTQgMGwtNCAzIDQgM3YtNnptMCAzbDQgM3YtNmwtNCAzelwiXG4gICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDEpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLkFSUk9XX0JVVFRPTn0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIGZpbGw9XCIjZmZmXCJcbiAgICAgICAgZD1cIk0wIDB2Nmw0LTMtNC0zem00IDN2M2w0LTMtNC0zdjN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgd2l0aFRpbWVzdGFtcDogZmFsc2UsXG59O1xuXG5TbGlkZVNob3cuUHJvcFR5cGVzID0ge1xuICBhcnJvd0J1dHRvblN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3JjOiBQcm9wVHlwZXMuYXJyYXksXG4gIHByZXZJY29uOiBQcm9wVHlwZXMubm9kZSxcbiAgbmV4dEljb246IFByb3BUeXBlcy5ub2RlLFxuICB3aXRoVGltZXN0YW1wOiBQcm9wVHlwZXMuYm9vbCxcbn07XG4iXX0=