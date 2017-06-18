'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

    _this.state = {
      src: '',
      index: 0,
      progress: 0
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
      return _react2.default.createElement(
        'div',
        { style: this.props.style },
        _react2.default.createElement('div', { style: styles.bar }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: styles.image },
            _react2.default.createElement('img', { className: 'content',
              src: this.state.src,
              style: { width: '100%' } }),
            _react2.default.createElement('div', { className: 'prevOnContent',
              onClick: this.onClickPrevButton,
              style: {
                display: 'block',
                width: '40%',
                height: '100%',
                top: 0,
                left: 0,
                position: 'absolute',
                cursor: 'w-resize'
              } }),
            _react2.default.createElement('div', { className: 'nextOnContent',
              onClick: this.onClickNextButton,
              style: {
                display: 'block',
                width: '40%',
                height: '100%',
                top: 0,
                right: 0,
                position: 'absolute',
                cursor: 'e-resize'
              } })
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
          { className: 'bar', style: styles.bar },
          _react2.default.createElement(
            'button',
            { className: 'prevButton',
              onClick: this.onClickPrevButton,
              style: styles.button },
            this.props.prevIcon
          ),
          _react2.default.createElement(
            'span',
            { style: styles.pageView },
            this.props.src ? this.state.index + 1 + ' / ' + this.props.src.length : null
          ),
          _react2.default.createElement(
            'button',
            { className: 'nextButton',
              onClick: this.onClickNextButton,
              style: styles.button },
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

var styles = {
  image: {
    position: 'relative',
    width: '100%'
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    margin: '0 20px',
    padding: 0
  },
  bar: {
    backgroundColor: '#323232',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    margin: 'auto',
    width: '100%'
  },
  pageView: {
    color: '#fff'
  },
  arrowButtonStyle: {
    backgroundColor: 'transparent',
    height: '15px'
  }
};

SlideShow.defaultProps = {
  arrowButtonStyle: styles.arrowButtonStyle,
  style: {},
  src: [],
  prevIcon: _react2.default.createElement(
    'svg',
    { style: styles.arrowButtonStyle, viewBox: '0 0 8 8' },
    _react2.default.createElement('path', { fill: '#fff', d: 'M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z',
      transform: 'translate(0 1)' })
  ),
  nextIcon: _react2.default.createElement(
    'svg',
    { style: styles.arrowButtonStyle, viewBox: '0 0 8 8' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJzcmMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwibmV4dFByb2dyZXNzIiwiY2FsY1Byb2dyZXNzIiwibmV4dFN0YXRlIiwicHJvZ3Jlc3MiLCJzZXRTdGF0ZSIsIm9uQ2xpY2tOZXh0QnV0dG9uIiwibGVuZ3RoIiwib25DbGlja1Byb2dyZXNzQmFyIiwiZSIsImJhcldpZHRoIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib2Zmc2V0V2lkdGgiLCJwcm9ncmVzc1dpZHRoIiwiY2xpZW50WCIsImNsaWNrUG9zaXRpb24iLCJNYXRoIiwiZmxvb3IiLCJpIiwiY2hlY2tXaWR0aCIsIm5leHRTcmMiLCJwYWdlIiwiYmFzZSIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJpbWFnZXMiLCJzdHlsZSIsInN0eWxlcyIsImJhciIsImltYWdlIiwid2lkdGgiLCJkaXNwbGF5IiwiaGVpZ2h0IiwidG9wIiwibGVmdCIsInBvc2l0aW9uIiwiY3Vyc29yIiwicmlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtYXJnaW5Ub3AiLCJidXR0b24iLCJwcmV2SWNvbiIsInBhZ2VWaWV3IiwibmV4dEljb24iLCJDb21wb25lbnQiLCJib3JkZXIiLCJtYXJnaW4iLCJwYWRkaW5nIiwidGV4dEFsaWduIiwibGluZUhlaWdodCIsImNvbG9yIiwiYXJyb3dCdXR0b25TdHlsZSIsImRlZmF1bHRQcm9wcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImFycmF5Iiwibm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUE0QkE7Ozs7Ozs7QUExQkE7Ozs7Ozs7OztBQWNBOzs7Ozs7SUFpQnFCQSxTOzs7QUFPbkI7Ozs7O0FBS0EscUJBQVlDLEtBQVosRUFBMEI7QUFB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TUFBWCxFQUFrQixHQUFFLGtDQUFwQjtBQUNNLGlCQUFVLGdCQURoQjtBQURGO0FBWHFCLENBQXpCOztBQWtCQTVELFVBQVU4RCxTQUFWLEdBQXNCO0FBQ3BCRixvQkFBa0Isb0JBQVVHLE1BRFI7QUFFcEI1QixTQUFPLG9CQUFVNEIsTUFGRztBQUdwQjNELE9BQUssb0JBQVU0RCxLQUhLO0FBSXBCZCxZQUFVLG9CQUFVZSxJQUpBO0FBS3BCYixZQUFVLG9CQUFVYTtBQUxBLENBQXRCIiwiZmlsZSI6IlNsaWRlU2hvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wc1xuICogQHByb3BlcnR5IHtPYmplY3R9IHN0eWxlXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IHNyYyxcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gcHJldkljb24sXG4gKiBAcHJvcGVydHkge05vZGV9IG5leHRJY29uXG4gKi9cbnR5cGUgUHJvcHMgPSB7XG4gIHN0eWxlOiBPYmplY3QsXG4gIHNyYzogQXJyYXk8c3RyaW5nPixcbiAgcHJldkljb246IE5vZGUsXG4gIG5leHRJY29uOiBOb2RlLFxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3JjXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzc1xuICovXG50eXBlIFN0YXRlID0ge1xuICBzcmM6IHN0cmluZyxcbiAgaW5kZXg6IG51bWJlcixcbiAgcHJvZ3Jlc3M6IG51bWJlclxufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgbmFtZWQgU2xpZGVTaG93IGlzIHRoZSBSZWFjdCBjb21wb25lbnQgdGhhdCBhbGxvd3MgeW91XG4gKiB0byBkZXZlbG9wIHNsaWRlc2hvdyBsaWtlICdTbGlkZVNoYXJlJyBvciAnU3BlYWtlckRlY2snIHZlcnkgZWFzeSFcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZVNob3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZTogU3RhdGU7XG4gIHByb3BzOiBQcm9wcztcbiAgc3R5bGU6IE9iamVjdDtcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogT2JqZWN0O1xuICBzdGF0aWMgUHJvcFR5cGVzOiBPYmplY3Q7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIGNhbGwgc3VwZXIgY29uc3RydWN0b3IgYW5kIGluaXRpYWxpemUgc3RhdGVzLlxuICAgKiBAcGFyYW0ge1Byb3BzfSBwcm9wc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudFdpbGxNb3VudFxuICAgKiB1cGRhdGVzIHN0YXRlcyB3aXRoIHByb3BzIHRvIHJlbmRlciBmaXJzdCB2aWV3LlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYywgcGFnZSwgYW5kIHByb2dyZXNzLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IGltYWdlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMucHJvcHMuc3JjO1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLnNyYykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKDEwMCAvIGltYWdlcy5sZW5ndGgpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcHJvZ3Jlc3MgPSAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlc1swXSxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJldmlvdXMgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgcHJldmlvdXMgcGFnZS5cbiAgICovXG4gIG9uQ2xpY2tQcmV2QnV0dG9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLnNyYykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggLSAxO1xuICAgIGNvbnN0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuXG4gICAgY29uc3QgbmV4dFN0YXRlID0ge1xuICAgICAgc3JjOiB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gbmV4dCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBpbWFnZSBzcmMgYW5kIHBhZ2UgdG8gbW92ZSBuZXh0IHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrTmV4dEJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc3JjKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IHRoaXMucHJvcHMuc3JjLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCArIDE7XG4gICAgbGV0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuICAgIGlmIChuZXh0UHJvZ3Jlc3MgPiAxMDApIHtcbiAgICAgIG5leHRQcm9ncmVzcyA9IDEwMDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICBzcmM6IHRoaXMucHJvcHMuc3JjW25leHRJbmRleF0sXG4gICAgICBpbmRleDogbmV4dEluZGV4LFxuICAgICAgcHJvZ3Jlc3M6IG5leHRQcm9ncmVzcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZXhlY3V0ZWQgd2hlbiBwcm9ncmVzc0JhciBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIHN0YXRlcyB0byBtb3ZlIHBhZ2UuXG4gICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICAgKi9cbiAgb25DbGlja1Byb2dyZXNzQmFyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBiYXJXaWR0aCA9IGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2dyZXNzQmFyJylbMF1cbiAgICAgIC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBwcm9ncmVzc1dpZHRoID0gZS5jbGllbnRYO1xuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBNYXRoLmZsb29yKChwcm9ncmVzc1dpZHRoIC8gYmFyV2lkdGgpICogMTAwKTtcbiAgICBsZXQgbmV4dEluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuc3JjLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGVja1dpZHRoID0gdGhpcy5jYWxjUHJvZ3Jlc3MoaSk7XG4gICAgICBpZiAoY2xpY2tQb3NpdGlvbiA+PSBjaGVja1dpZHRoKSB7XG4gICAgICAgIG5leHRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5leHRQcm9ncmVzcyA9IHRoaXMuY2FsY1Byb2dyZXNzKG5leHRJbmRleCArIDEpO1xuICAgIGNvbnN0IG5leHRTcmMgPSB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3JjOiBuZXh0U3JjLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBjYWxjUHJvZ3Jlc3MgPSAocGFnZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBiYXNlID0gMTAwIC8gdGhpcy5wcm9wcy5zcmMubGVuZ3RoO1xuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguY2VpbChiYXNlICogcGFnZSk7XG4gICAgaWYgKHByb2dyZXNzID4gMTAwKSB7XG4gICAgICByZXR1cm4gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gIH07XG5cbiAgaXNFbXB0eUFycmF5ID0gKGFycjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAoYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDApO1xuICB9O1xuXG4gIC8qKlxuICAgKiByZW5kZXJcbiAgICogQHJldHVybnMge1hNTH1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5iYXJ9PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5pbWFnZX0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBzcmM9e3RoaXMuc3RhdGUuc3JjfVxuICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fS8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZPbkNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tQcmV2QnV0dG9ufVxuICAgICAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNDAlJyxcbiAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAndy1yZXNpemUnLFxuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXh0T25Db250ZW50XCJcbiAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrTmV4dEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzQwJScsXG4gICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdlLXJlc2l6ZScsXG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IC02LFxuICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJvZ3Jlc3NCYXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuc3RhdGUucHJvZ3Jlc3N9JWAsXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydiYXInfSBzdHlsZT17c3R5bGVzLmJhcn0+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydwcmV2QnV0dG9uJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnBhZ2VWaWV3fT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnNyYyA/IGAke3RoaXMuc3RhdGUuaW5kZXhcbiAgICAgICAgICAgICsgMX0gLyAke3RoaXMucHJvcHMuc3JjLmxlbmd0aH1gXG4gICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eyduZXh0QnV0dG9uJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIGltYWdlOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIG1hcmdpbjogJzAgMjBweCcsXG4gICAgcGFkZGluZzogMCxcbiAgfSxcbiAgYmFyOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzMyMzIzMicsXG4gICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICBsaW5lSGVpZ2h0OiAnMzBweCcsXG4gICAgbWFyZ2luOiAnYXV0bycsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgfSxcbiAgcGFnZVZpZXc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICB9LFxuICBhcnJvd0J1dHRvblN0eWxlOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgIGhlaWdodDogJzE1cHgnLFxuICB9LFxufTtcblxuU2xpZGVTaG93LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogc3R5bGVzLmFycm93QnV0dG9uU3R5bGUsXG4gIHN0eWxlOiB7fSxcbiAgc3JjOiBbXSxcbiAgcHJldkljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuYXJyb3dCdXR0b25TdHlsZX0gdmlld0JveD1cIjAgMCA4IDhcIj5cbiAgICAgIDxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk00IDBsLTQgMyA0IDN2LTZ6bTAgM2w0IDN2LTZsLTQgM3pcIlxuICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIi8+XG4gICAgPC9zdmc+XG4gICksXG4gIG5leHRJY29uOiAoXG4gICAgPHN2ZyBzdHlsZT17c3R5bGVzLmFycm93QnV0dG9uU3R5bGV9IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNMCAwdjZsNC0zLTQtM3ptNCAzdjNsNC0zLTQtM3YzelwiXG4gICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiLz5cbiAgICA8L3N2Zz5cbiAgKSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzcmM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG59O1xuIl19