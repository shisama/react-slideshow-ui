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
      var nextIndex = _this.calcProgressIndex(barWidth, progressWidth);
      var nextProgress = _this.calcProgress(nextIndex + 1);
      var nextSrc = _this.props.src[nextIndex];
      _this.setState({
        src: nextSrc,
        index: nextIndex,
        progress: nextProgress
      });
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
      for (var i = 0; i < _this.props.src.length; i++) {
        var checkWidth = _this.calcProgress(i);
        if (clickPosition >= checkWidth) {
          nextIndex = i;
        }
      }
      return nextIndex;
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

    _this._buildPreview = function () {
      if (!_this.props.src || _this.props.src.length === 0) {
        return null;
      }

      var preview = _this.props.src.map(function (img, index) {
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
          _this.state.previewIndex + 1 + ' / ' + _this.props.src.length
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
        this._buildPreview(),
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

    /**
     *
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TbGlkZVNob3cuanN4Il0sIm5hbWVzIjpbIlNsaWRlU2hvdyIsInByb3BzIiwib25DbGlja1ByZXZCdXR0b24iLCJpc0VtcHR5QXJyYXkiLCJzcmMiLCJzdGF0ZSIsImluZGV4IiwibmV4dEluZGV4IiwibmV4dFByb2dyZXNzIiwiY2FsY1Byb2dyZXNzIiwibmV4dFN0YXRlIiwicHJvZ3Jlc3MiLCJzZXRTdGF0ZSIsIm9uQ2xpY2tOZXh0QnV0dG9uIiwibGVuZ3RoIiwib25DbGlja1Byb2dyZXNzQmFyIiwiZSIsImJhcldpZHRoIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib2Zmc2V0V2lkdGgiLCJwcm9ncmVzc1dpZHRoIiwiY2xpZW50WCIsImNhbGNQcm9ncmVzc0luZGV4IiwibmV4dFNyYyIsIm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIiLCJwcmV2aWV3IiwicHJldmlld0luZGV4Iiwib25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIiLCJjbGlja1Bvc2l0aW9uIiwiTWF0aCIsImZsb29yIiwiaSIsImNoZWNrV2lkdGgiLCJwYWdlIiwiYmFzZSIsImNlaWwiLCJhcnIiLCJ1bmRlZmluZWQiLCJfYnVpbGRQcmV2aWV3IiwibWFwIiwiaW1nIiwiZGlzcGxheSIsIndpZHRoIiwiU1RZTEUiLCJPYmplY3QiLCJhc3NpZ24iLCJQUkVWSUVXIiwib3BhY2l0eSIsIm1hcmdpbiIsInRleHRBbGlnbiIsImZvbnRTaXplIiwidGltZXN0YW1wIiwid2l0aFRpbWVzdGFtcCIsIkRhdGUiLCJnZXRUaW1lIiwic3R5bGUiLCJST09UIiwiaW1hZ2VzIiwiQkFSIiwiSU1BR0UiLCJQUkVWX09OX0NPTlRFTlQiLCJORVhUX09OX0NPTlRFTlQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJwb3NpdGlvbiIsIkJVVFRPTiIsInByZXZJY29uIiwiUEFHRV9WSUVXIiwibmV4dEljb24iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJhcnJvd0J1dHRvblN0eWxlIiwiQVJST1dfQlVUVE9OIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiYXJyYXkiLCJub2RlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFvQ0E7Ozs7Ozs7QUFsQ0E7Ozs7Ozs7Ozs7QUFnQkE7Ozs7Ozs7OztJQXVCcUJBLFM7OztBQU9uQjs7Ozs7QUFLQSxxQkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLHNIQUNsQkEsS0FEa0I7O0FBQUEsVUFnRDFCQyxpQkFoRDBCLEdBZ0ROLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxZQUFMLENBQWtCLE1BQUtGLEtBQUwsQ0FBV0csR0FBN0IsQ0FBSixFQUF1QztBQUNyQztBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsVUFBTUMsWUFBWSxNQUFLRixLQUFMLENBQVdDLEtBQVgsR0FBbUIsQ0FBckM7QUFDQSxVQUFNRSxlQUFlLE1BQUtDLFlBQUwsQ0FBa0JGLFlBQVksQ0FBOUIsQ0FBckI7O0FBRUEsVUFBTUcsWUFBWTtBQUNoQk4sYUFBSyxNQUFLSCxLQUFMLENBQVdHLEdBQVgsQ0FBZUcsU0FBZixDQURXO0FBRWhCRCxlQUFPQyxTQUZTO0FBR2hCSSxrQkFBVUg7QUFITSxPQUFsQjtBQUtBLFlBQUtJLFFBQUwsQ0FBY0YsU0FBZDtBQUNELEtBbEV5Qjs7QUFBQSxVQXdFMUJHLGlCQXhFMEIsR0F3RU4sWUFBTTtBQUN4QixVQUFJLENBQUMsTUFBS1osS0FBTCxDQUFXRyxHQUFoQixFQUFxQjtBQUNuQjtBQUNEOztBQUVELFVBQUksTUFBS0MsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLE1BQUtMLEtBQUwsQ0FBV0csR0FBWCxDQUFlVSxNQUFmLEdBQXdCLENBQWpELEVBQW9EO0FBQ2xEO0FBQ0Q7QUFDRCxVQUFNUCxZQUFZLE1BQUtGLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixDQUFyQztBQUNBLFVBQUlFLGVBQWUsTUFBS0MsWUFBTCxDQUFrQkYsWUFBWSxDQUE5QixDQUFuQjtBQUNBLFVBQUlDLGVBQWUsR0FBbkIsRUFBd0I7QUFDdEJBLHVCQUFlLEdBQWY7QUFDRDs7QUFFRCxVQUFNRSxZQUFZO0FBQ2hCTixhQUFLLE1BQUtILEtBQUwsQ0FBV0csR0FBWCxDQUFlRyxTQUFmLENBRFc7QUFFaEJELGVBQU9DLFNBRlM7QUFHaEJJLGtCQUFVSDtBQUhNLE9BQWxCO0FBS0EsWUFBS0ksUUFBTCxDQUFjRixTQUFkO0FBQ0QsS0E1RnlCOztBQUFBLFVBbUcxQkssa0JBbkcwQixHQW1HTCxVQUFDQyxDQUFELEVBQW1CO0FBQ3RDLFVBQU1DLFdBQVdDLFNBQVNDLHNCQUFULENBQWdDLGFBQWhDLEVBQStDLENBQS9DLEVBQ2RDLFdBREg7QUFFQSxVQUFNQyxnQkFBZ0JMLEVBQUVNLE9BQXhCO0FBQ0EsVUFBTWYsWUFBWSxNQUFLZ0IsaUJBQUwsQ0FBdUJOLFFBQXZCLEVBQWlDSSxhQUFqQyxDQUFsQjtBQUNBLFVBQU1iLGVBQWUsTUFBS0MsWUFBTCxDQUFrQkYsWUFBWSxDQUE5QixDQUFyQjtBQUNBLFVBQU1pQixVQUFVLE1BQUt2QixLQUFMLENBQVdHLEdBQVgsQ0FBZUcsU0FBZixDQUFoQjtBQUNBLFlBQUtLLFFBQUwsQ0FBYztBQUNaUixhQUFLb0IsT0FETztBQUVabEIsZUFBT0MsU0FGSztBQUdaSSxrQkFBVUg7QUFIRSxPQUFkO0FBS0QsS0EvR3lCOztBQUFBLFVBaUgxQmlCLHNCQWpIMEIsR0FpSEQsVUFBQ1QsQ0FBRCxFQUFtQjtBQUMxQyxVQUFNQyxXQUFXQyxTQUFTQyxzQkFBVCxDQUFnQyxhQUFoQyxFQUErQyxDQUEvQyxFQUNkQyxXQURIO0FBRUEsVUFBTUMsZ0JBQWdCTCxFQUFFTSxPQUF4QjtBQUNBLFVBQU1mLFlBQVksTUFBS2dCLGlCQUFMLENBQXVCTixRQUF2QixFQUFpQ0ksYUFBakMsQ0FBbEI7QUFDQSxZQUFLVCxRQUFMLENBQWM7QUFDWmMsaUJBQVMsQ0FERztBQUVaQyxzQkFBY3BCO0FBRkYsT0FBZDtBQUlELEtBMUh5Qjs7QUFBQSxVQTRIMUJxQix1QkE1SDBCLEdBNEhBLFVBQUNaLENBQUQsRUFBbUI7QUFDM0MsWUFBS0osUUFBTCxDQUFjO0FBQ1pjLGlCQUFTO0FBREcsT0FBZDtBQUdELEtBaEl5Qjs7QUFBQSxVQWtJMUJILGlCQWxJMEIsR0FrSU4sVUFBQ04sUUFBRCxFQUFtQkksYUFBbkIsRUFBcUQ7QUFDdkUsVUFBTVEsZ0JBQWdCQyxLQUFLQyxLQUFMLENBQVdWLGdCQUFnQkosUUFBaEIsR0FBMkIsR0FBdEMsQ0FBdEI7QUFDQSxVQUFJVixZQUFZLENBQWhCO0FBQ0EsV0FBSyxJQUFJeUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLE1BQUsvQixLQUFMLENBQVdHLEdBQVgsQ0FBZVUsTUFBbkMsRUFBMkNrQixHQUEzQyxFQUFnRDtBQUM5QyxZQUFNQyxhQUFhLE1BQUt4QixZQUFMLENBQWtCdUIsQ0FBbEIsQ0FBbkI7QUFDQSxZQUFJSCxpQkFBaUJJLFVBQXJCLEVBQWlDO0FBQy9CMUIsc0JBQVl5QixDQUFaO0FBQ0Q7QUFDRjtBQUNELGFBQU96QixTQUFQO0FBQ0QsS0E1SXlCOztBQUFBLFVBbUoxQkUsWUFuSjBCLEdBbUpYLFVBQUN5QixJQUFELEVBQTBCO0FBQ3ZDLFVBQU1DLE9BQU8sTUFBTSxNQUFLbEMsS0FBTCxDQUFXRyxHQUFYLENBQWVVLE1BQWxDO0FBQ0EsVUFBSUgsV0FBV21CLEtBQUtNLElBQUwsQ0FBVUQsT0FBT0QsSUFBakIsQ0FBZjtBQUNBLFVBQUl2QixXQUFXLEdBQWYsRUFBb0I7QUFDbEIsZUFBTyxHQUFQO0FBQ0Q7QUFDRCxhQUFPQSxRQUFQO0FBQ0QsS0ExSnlCOztBQUFBLFVBNEoxQlIsWUE1SjBCLEdBNEpYLFVBQUNrQyxHQUFELEVBQWlDO0FBQzlDLGFBQU9BLFFBQVFDLFNBQVIsSUFBcUJELFFBQVEsSUFBN0IsSUFBcUNBLElBQUl2QixNQUFKLEtBQWUsQ0FBM0Q7QUFDRCxLQTlKeUI7O0FBQUEsVUFpUDFCeUIsYUFqUDBCLEdBaVBWLFlBQU07QUFDcEIsVUFBSSxDQUFDLE1BQUt0QyxLQUFMLENBQVdHLEdBQVosSUFBbUIsTUFBS0gsS0FBTCxDQUFXRyxHQUFYLENBQWVVLE1BQWYsS0FBMEIsQ0FBakQsRUFBb0Q7QUFDbEQsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSVksVUFBVSxNQUFLekIsS0FBTCxDQUFXRyxHQUFYLENBQWVvQyxHQUFmLENBQW1CLFVBQUNDLEdBQUQsRUFBTW5DLEtBQU4sRUFBZ0I7QUFDL0MsWUFBTW9DLFVBQVVwQyxVQUFVLE1BQUtELEtBQUwsQ0FBV3NCLFlBQXJCLEdBQW9DLFFBQXBDLEdBQStDLE1BQS9EO0FBQ0EsZUFDRTtBQUNFLGtDQUFzQnJCLEtBRHhCO0FBRUUsaUJBQU8sRUFBQ29DLFNBQVNBLE9BQVYsRUFBbUJDLE9BQU8sR0FBMUIsRUFGVDtBQUdFLGVBQUtGO0FBSFAsVUFERjtBQU9ELE9BVGEsQ0FBZDtBQVVBLFVBQU1HLFFBQVFDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLGVBQU9DLE9BQXpCLEVBQWtDO0FBQzlDQyxpQkFBUyxNQUFLM0MsS0FBTCxDQUFXcUI7QUFEMEIsT0FBbEMsQ0FBZDtBQUdBLGFBQ0U7QUFBQTtBQUFBLFVBQUssT0FBT2tCLEtBQVo7QUFDR2xCLGVBREg7QUFFRTtBQUFBO0FBQUEsWUFBRyxPQUFPLEVBQUN1QixRQUFRLENBQVQsRUFBWUMsV0FBVyxRQUF2QixFQUFpQ0MsVUFBVSxDQUEzQyxFQUFWO0FBQ00sZ0JBQUs5QyxLQUFMLENBQVdzQixZQUFYLEdBQTBCLENBRGhDLFdBQ3VDLE1BQUsxQixLQUFMLENBQVdHLEdBQVgsQ0FBZVU7QUFEdEQ7QUFGRixPQURGO0FBUUQsS0EzUXlCOztBQUd4QixRQUFJc0MsWUFBWSxDQUFoQjtBQUNBLFFBQUluRCxNQUFNb0QsYUFBTixLQUF3QixJQUE1QixFQUFrQztBQUNoQ0Qsa0JBQVl0QixLQUFLQyxLQUFMLENBQVcsSUFBSXVCLElBQUosR0FBV0MsT0FBWCxLQUF1QixJQUFsQyxDQUFaO0FBQ0Q7O0FBRUQsVUFBS0MsS0FBTCxHQUFhWCxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixlQUFPVyxJQUF6QixFQUErQixNQUFLeEQsS0FBTCxDQUFXdUQsS0FBMUMsQ0FBYjs7QUFFQSxVQUFLbkQsS0FBTCxHQUFhO0FBQ1hELFdBQUssRUFETTtBQUVYRSxhQUFPLENBRkk7QUFHWEssZ0JBQVUsQ0FIQztBQUlYeUMsaUJBQVdBLFNBSkE7QUFLWDFCLGVBQVMsQ0FMRTtBQU1YQyxvQkFBYztBQU5ILEtBQWI7QUFWd0I7QUFrQnpCOztBQUVEOzs7Ozs7Ozs7eUNBS3FCO0FBQ25CLFVBQU0rQixTQUF3QixLQUFLekQsS0FBTCxDQUFXRyxHQUF6QztBQUNBLFVBQUksS0FBS0QsWUFBTCxDQUFrQixLQUFLRixLQUFMLENBQVdHLEdBQTdCLENBQUosRUFBdUM7QUFDckM7QUFDRDtBQUNELFVBQUlPLFdBQVdtQixLQUFLTSxJQUFMLENBQVUsTUFBTXNCLE9BQU81QyxNQUF2QixDQUFmO0FBQ0EsVUFBSUgsV0FBVyxHQUFmLEVBQW9CO0FBQ2xCQSxtQkFBVyxHQUFYO0FBQ0Q7O0FBRUQsV0FBS0MsUUFBTCxDQUFjO0FBQ1pSLGFBQUtzRCxPQUFPLENBQVAsQ0FETztBQUVacEQsZUFBTyxDQUZLO0FBR1pLLGtCQUFVQSxRQUhFO0FBSVplLGlCQUFTLENBSkc7QUFLWkMsc0JBQWM7QUFMRixPQUFkO0FBT0Q7O0FBRUQ7Ozs7OztBQXdCQTs7Ozs7O0FBMEJBOzs7Ozs7O0FBZ0RBOzs7Ozs7Ozs7O0FBa0JBOzs7OzZCQUlTO0FBQ1AsVUFBSXZCLE1BQU0sS0FBS0MsS0FBTCxDQUFXRCxHQUFyQjtBQUNBLFVBQUksS0FBS0gsS0FBTCxDQUFXb0QsYUFBWCxLQUE2QixJQUFqQyxFQUF1QztBQUNyQ2pELHFCQUFXLEtBQUtDLEtBQUwsQ0FBVytDLFNBQXRCO0FBQ0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUEsVUFBSyxPQUFPLEtBQUtJLEtBQWpCO0FBQ0UsK0NBQUssT0FBTyxlQUFPRyxHQUFuQixHQURGO0FBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUssT0FBTyxlQUFPQyxLQUFuQjtBQUNFLG1EQUFLLFdBQVUsU0FBZixFQUF5QixLQUFLeEQsR0FBOUIsRUFBbUMsT0FBTyxFQUFDdUMsT0FBTyxNQUFSLEVBQTFDLEdBREY7QUFFRTtBQUNFLHlCQUFVLGVBRFo7QUFFRSx1QkFBUyxLQUFLekMsaUJBRmhCO0FBR0UscUJBQU8sZUFBTzJEO0FBSGhCLGNBRkY7QUFPRTtBQUNFLHlCQUFVLGVBRFo7QUFFRSx1QkFBUyxLQUFLaEQsaUJBRmhCO0FBR0UscUJBQU8sZUFBT2lEO0FBSGhCO0FBUEY7QUFERixTQUZGO0FBaUJHLGFBQUt2QixhQUFMLEVBakJIO0FBa0JFO0FBQUE7QUFBQTtBQUNFLHVCQUFVLGFBRFo7QUFFRSxtQkFBTztBQUNMd0IsK0JBQWlCLE1BRFo7QUFFTEMsc0JBQVEsRUFGSDtBQUdMQyx5QkFBVyxDQUFDLENBSFA7QUFJTEMsd0JBQVUsVUFKTDtBQUtMdkIscUJBQU87QUFMRixhQUZUO0FBU0UscUJBQVMsS0FBSzVCLGtCQVRoQjtBQVVFLHlCQUFhLEtBQUtVLHNCQVZwQjtBQVdFLDBCQUFjLEtBQUtHO0FBWHJCO0FBYUU7QUFDRSx1QkFBVSxVQURaO0FBRUUsbUJBQU87QUFDTG1DLCtCQUFpQixTQURaO0FBRUxDLHNCQUFRLE1BRkg7QUFHTHJCLHFCQUFVLEtBQUt0QyxLQUFMLENBQVdNLFFBQXJCO0FBSEs7QUFGVDtBQWJGLFNBbEJGO0FBd0NFO0FBQUE7QUFBQSxZQUFLLFdBQVcsS0FBaEIsRUFBdUIsT0FBTyxlQUFPZ0QsR0FBckM7QUFDRTtBQUFBO0FBQUE7QUFDRSx5QkFBVyxZQURiO0FBRUUsdUJBQVMsS0FBS3pELGlCQUZoQjtBQUdFLHFCQUFPLGVBQU9pRTtBQUhoQjtBQUtHLGlCQUFLbEUsS0FBTCxDQUFXbUU7QUFMZCxXQURGO0FBUUU7QUFBQTtBQUFBLGNBQU0sT0FBTyxlQUFPQyxTQUFwQjtBQUNHLGlCQUFLcEUsS0FBTCxDQUFXRyxHQUFYLEdBQ00sS0FBS0MsS0FBTCxDQUFXQyxLQUFYLEdBQW1CLENBRHpCLFdBQ2dDLEtBQUtMLEtBQUwsQ0FBV0csR0FBWCxDQUFlVSxNQUQvQyxHQUVHO0FBSE4sV0FSRjtBQWFFO0FBQUE7QUFBQTtBQUNFLHlCQUFXLFlBRGI7QUFFRSx1QkFBUyxLQUFLRCxpQkFGaEI7QUFHRSxxQkFBTyxlQUFPc0Q7QUFIaEI7QUFLRyxpQkFBS2xFLEtBQUwsQ0FBV3FFO0FBTGQ7QUFiRjtBQXhDRixPQURGO0FBZ0VEOztBQUVEOzs7Ozs7Ozs7RUF4UHFDLGdCQUFNQyxTOztrQkFBeEJ2RSxTOzs7QUEwUnJCQSxVQUFVd0UsWUFBVixHQUF5QjtBQUN2QkMsb0JBQWtCLGVBQU9DLFlBREY7QUFFdkJsQixTQUFPLEVBRmdCO0FBR3ZCcEQsT0FBSyxFQUhrQjtBQUl2QmdFLFlBQ0U7QUFBQTtBQUFBLE1BQUssT0FBTyxlQUFPTSxZQUFuQixFQUFpQyxTQUFRLFNBQXpDO0FBQ0U7QUFDRSxZQUFLLE1BRFA7QUFFRSxTQUFFLG9DQUZKO0FBR0UsaUJBQVU7QUFIWjtBQURGLEdBTHFCO0FBYXZCSixZQUNFO0FBQUE7QUFBQSxNQUFLLE9BQU8sZUFBT0ksWUFBbkIsRUFBaUMsU0FBUSxTQUF6QztBQUNFO0FBQ0UsWUFBSyxNQURQO0FBRUUsU0FBRSxrQ0FGSjtBQUdFLGlCQUFVO0FBSFo7QUFERixHQWRxQjtBQXNCdkJyQixpQkFBZTtBQXRCUSxDQUF6Qjs7QUF5QkFyRCxVQUFVMkUsU0FBVixHQUFzQjtBQUNwQkYsb0JBQWtCLG9CQUFVRyxNQURSO0FBRXBCcEIsU0FBTyxvQkFBVW9CLE1BRkc7QUFHcEJ4RSxPQUFLLG9CQUFVeUUsS0FISztBQUlwQlQsWUFBVSxvQkFBVVUsSUFKQTtBQUtwQlIsWUFBVSxvQkFBVVEsSUFMQTtBQU1wQnpCLGlCQUFlLG9CQUFVMEI7QUFOTCxDQUF0QiIsImZpbGUiOiJTbGlkZVNob3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1N0eWxlcyBhcyBzdHlsZXN9IGZyb20gJy4vU3R5bGVzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wc1xuICogQHByb3BlcnR5IHtPYmplY3R9IHN0eWxlXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IHNyYyxcbiAqIEBwcm9wZXJ0eSB7Tm9kZX0gcHJldkljb24sXG4gKiBAcHJvcGVydHkge05vZGV9IG5leHRJY29uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdpdGhUaW1lc3RhbXBcbiAqL1xudHlwZSBQcm9wcyA9IHtcbiAgc3R5bGU6IE9iamVjdCxcbiAgc3JjOiBBcnJheTxzdHJpbmc+LFxuICBwcmV2SWNvbjogTm9kZSxcbiAgbmV4dEljb246IE5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IGJvb2xlYW4sXG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3JjXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW5kZXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVzdGFtcFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHByZXZpZXdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcmV2aWV3SW5kZXhcbiAqL1xudHlwZSBTdGF0ZSA9IHtcbiAgc3JjOiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXIsXG4gIHByb2dyZXNzOiBudW1iZXIsXG4gIHRpbWVzdGFtcDogbnVtYmVyLFxuICBwcmV2aWV3OiBudW1iZXIsXG4gIHByZXZpZXdJbmRleDogbnVtYmVyLFxufTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIG5hbWVkIFNsaWRlU2hvdyBpcyB0aGUgUmVhY3QgY29tcG9uZW50IHRoYXQgYWxsb3dzIHlvdVxuICogdG8gZGV2ZWxvcCBzbGlkZXNob3cgbGlrZSAnU2xpZGVTaGFyZScgb3IgJ1NwZWFrZXJEZWNrJyB2ZXJ5IGVhc3khXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVTaG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGU6IFN0YXRlO1xuICBwcm9wczogUHJvcHM7XG4gIHN0eWxlOiBPYmplY3Q7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6IE9iamVjdDtcbiAgc3RhdGljIFByb3BUeXBlczogT2JqZWN0O1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBjYWxsIHN1cGVyIGNvbnN0cnVjdG9yIGFuZCBpbml0aWFsaXplIHN0YXRlcy5cbiAgICogQHBhcmFtIHtQcm9wc30gcHJvcHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCB0aW1lc3RhbXAgPSAwO1xuICAgIGlmIChwcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5ST09ULCB0aGlzLnByb3BzLnN0eWxlKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzcmM6ICcnLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudFdpbGxNb3VudFxuICAgKiB1cGRhdGVzIHN0YXRlcyB3aXRoIHByb3BzIHRvIHJlbmRlciBmaXJzdCB2aWV3LlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYywgcGFnZSwgYW5kIHByb2dyZXNzLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IGltYWdlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMucHJvcHMuc3JjO1xuICAgIGlmICh0aGlzLmlzRW1wdHlBcnJheSh0aGlzLnByb3BzLnNyYykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByb2dyZXNzID0gTWF0aC5jZWlsKDEwMCAvIGltYWdlcy5sZW5ndGgpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcHJvZ3Jlc3MgPSAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzcmM6IGltYWdlc1swXSxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIHByZXZpZXdJbmRleDogMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiB1cGRhdGVzIGltYWdlIHNyYyBhbmQgcGFnZSB0byBtb3ZlIHByZXZpb3VzIHBhZ2UuXG4gICAqL1xuICBvbkNsaWNrUHJldkJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc0VtcHR5QXJyYXkodGhpcy5wcm9wcy5zcmMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUuaW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4IC0gMTtcbiAgICBjb25zdCBuZXh0UHJvZ3Jlc3MgPSB0aGlzLmNhbGNQcm9ncmVzcyhuZXh0SW5kZXggKyAxKTtcblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNyYzogdGhpcy5wcm9wcy5zcmNbbmV4dEluZGV4XSxcbiAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICBwcm9ncmVzczogbmV4dFByb2dyZXNzLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBleGVjdXRlZCB3aGVuIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqIHVwZGF0ZXMgaW1hZ2Ugc3JjIGFuZCBwYWdlIHRvIG1vdmUgbmV4dCBwYWdlLlxuICAgKi9cbiAgb25DbGlja05leHRCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNyYykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09PSB0aGlzLnByb3BzLnNyYy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggKyAxO1xuICAgIGxldCBuZXh0UHJvZ3Jlc3MgPSB0aGlzLmNhbGNQcm9ncmVzcyhuZXh0SW5kZXggKyAxKTtcbiAgICBpZiAobmV4dFByb2dyZXNzID4gMTAwKSB7XG4gICAgICBuZXh0UHJvZ3Jlc3MgPSAxMDA7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlID0ge1xuICAgICAgc3JjOiB0aGlzLnByb3BzLnNyY1tuZXh0SW5kZXhdLFxuICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgIHByb2dyZXNzOiBuZXh0UHJvZ3Jlc3MsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGV4ZWN1dGVkIHdoZW4gcHJvZ3Jlc3NCYXIgaXMgY2xpY2tlZC5cbiAgICogdXBkYXRlcyBzdGF0ZXMgdG8gbW92ZSBwYWdlLlxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIG9uQ2xpY2tQcm9ncmVzc0JhciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgYmFyV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9ncmVzc0JhcicpWzBdXG4gICAgICAub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgcHJvZ3Jlc3NXaWR0aCA9IGUuY2xpZW50WDtcbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmNhbGNQcm9ncmVzc0luZGV4KGJhcldpZHRoLCBwcm9ncmVzc1dpZHRoKTtcbiAgICBjb25zdCBuZXh0UHJvZ3Jlc3MgPSB0aGlzLmNhbGNQcm9ncmVzcyhuZXh0SW5kZXggKyAxKTtcbiAgICBjb25zdCBuZXh0U3JjID0gdGhpcy5wcm9wcy5zcmNbbmV4dEluZGV4XTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNyYzogbmV4dFNyYyxcbiAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICBwcm9ncmVzczogbmV4dFByb2dyZXNzLFxuICAgIH0pO1xuICB9O1xuXG4gIG9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGNvbnN0IGJhcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZ3Jlc3NCYXInKVswXVxuICAgICAgLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHByb2dyZXNzV2lkdGggPSBlLmNsaWVudFg7XG4gICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jYWxjUHJvZ3Jlc3NJbmRleChiYXJXaWR0aCwgcHJvZ3Jlc3NXaWR0aCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aWV3OiAxLFxuICAgICAgcHJldmlld0luZGV4OiBuZXh0SW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgb25Nb3VzZUxlYXZlUHJvZ3Jlc3NCYXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlldzogMCxcbiAgICB9KTtcbiAgfTtcblxuICBjYWxjUHJvZ3Jlc3NJbmRleCA9IChiYXJXaWR0aDogbnVtYmVyLCBwcm9ncmVzc1dpZHRoOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBNYXRoLmZsb29yKHByb2dyZXNzV2lkdGggLyBiYXJXaWR0aCAqIDEwMCk7XG4gICAgbGV0IG5leHRJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLnNyYy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hlY2tXaWR0aCA9IHRoaXMuY2FsY1Byb2dyZXNzKGkpO1xuICAgICAgaWYgKGNsaWNrUG9zaXRpb24gPj0gY2hlY2tXaWR0aCkge1xuICAgICAgICBuZXh0SW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dEluZGV4O1xuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgY2FsY1Byb2dyZXNzID0gKHBhZ2U6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgYmFzZSA9IDEwMCAvIHRoaXMucHJvcHMuc3JjLmxlbmd0aDtcbiAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoYmFzZSAqIHBhZ2UpO1xuICAgIGlmIChwcm9ncmVzcyA+IDEwMCkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9O1xuXG4gIGlzRW1wdHlBcnJheSA9IChhcnI6IEFycmF5PHN0cmluZz4pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gYXJyID09PSB1bmRlZmluZWQgfHwgYXJyID09PSBudWxsIHx8IGFyci5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqIHJlbmRlclxuICAgKiBAcmV0dXJucyB7WE1MfVxuICAgKi9cbiAgcmVuZGVyKCkge1xuICAgIGxldCBzcmMgPSB0aGlzLnN0YXRlLnNyYztcbiAgICBpZiAodGhpcy5wcm9wcy53aXRoVGltZXN0YW1wID09PSB0cnVlKSB7XG4gICAgICBzcmMgKz0gYD8ke3RoaXMuc3RhdGUudGltZXN0YW1wfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuQkFSfSAvPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5JTUFHRX0+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNvbnRlbnRcIiBzcmM9e3NyY30gc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0gLz5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJldk9uQ29udGVudFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1ByZXZCdXR0b259XG4gICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuUFJFVl9PTl9DT05URU5UfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV4dE9uQ29udGVudFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuTkVYVF9PTl9DT05URU5UfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLl9idWlsZFByZXZpZXcoKX1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzQmFyXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAtNixcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja1Byb2dyZXNzQmFyfVxuICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlUHJvZ3Jlc3NCYXJ9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLm9uTW91c2VMZWF2ZVByb2dyZXNzQmFyfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JiNicsXG4gICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5zdGF0ZS5wcm9ncmVzc30lYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmFyJ30gc3R5bGU9e3N0eWxlcy5CQVJ9PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17J3ByZXZCdXR0b24nfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrUHJldkJ1dHRvbn1cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuQlVUVE9OfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZJY29ufVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuUEFHRV9WSUVXfT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnNyY1xuICAgICAgICAgICAgICA/IGAke3RoaXMuc3RhdGUuaW5kZXggKyAxfSAvICR7dGhpcy5wcm9wcy5zcmMubGVuZ3RofWBcbiAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9eyduZXh0QnV0dG9uJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja05leHRCdXR0b259XG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLkJVVFRPTn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0SWNvbn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHs/WE1MfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2J1aWxkUHJldmlldyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc3JjIHx8IHRoaXMucHJvcHMuc3JjLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHByZXZpZXcgPSB0aGlzLnByb3BzLnNyYy5tYXAoKGltZywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXkgPSBpbmRleCA9PT0gdGhpcy5zdGF0ZS5wcmV2aWV3SW5kZXggPyAnaW5saW5lJyA6ICdub25lJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9e2BwcmV2aWV3LSR7aW5kZXh9YH1cbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6IGRpc3BsYXksIHdpZHRoOiAyMDB9fVxuICAgICAgICAgIHNyYz17aW1nfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgICBjb25zdCBTVFlMRSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5QUkVWSUVXLCB7XG4gICAgICBvcGFjaXR5OiB0aGlzLnN0YXRlLnByZXZpZXcsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e1NUWUxFfT5cbiAgICAgICAge3ByZXZpZXd9XG4gICAgICAgIDxwIHN0eWxlPXt7bWFyZ2luOiAwLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogNH19PlxuICAgICAgICAgIHtgJHt0aGlzLnN0YXRlLnByZXZpZXdJbmRleCArIDF9IC8gJHt0aGlzLnByb3BzLnNyYy5sZW5ndGh9YH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcbn1cblxuU2xpZGVTaG93LmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJyb3dCdXR0b25TdHlsZTogc3R5bGVzLkFSUk9XX0JVVFRPTixcbiAgc3R5bGU6IHt9LFxuICBzcmM6IFtdLFxuICBwcmV2SWNvbjogKFxuICAgIDxzdmcgc3R5bGU9e3N0eWxlcy5BUlJPV19CVVRUT059IHZpZXdCb3g9XCIwIDAgOCA4XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiI2ZmZlwiXG4gICAgICAgIGQ9XCJNNCAwbC00IDMgNCAzdi02em0wIDNsNCAzdi02bC00IDN6XCJcbiAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMSlcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgKSxcbiAgbmV4dEljb246IChcbiAgICA8c3ZnIHN0eWxlPXtzdHlsZXMuQVJST1dfQlVUVE9OfSB2aWV3Qm94PVwiMCAwIDggOFwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cIiNmZmZcIlxuICAgICAgICBkPVwiTTAgMHY2bDQtMy00LTN6bTQgM3YzbDQtMy00LTN2M3pcIlxuICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAxKVwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApLFxuICB3aXRoVGltZXN0YW1wOiBmYWxzZSxcbn07XG5cblNsaWRlU2hvdy5Qcm9wVHlwZXMgPSB7XG4gIGFycm93QnV0dG9uU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBzcmM6IFByb3BUeXBlcy5hcnJheSxcbiAgcHJldkljb246IFByb3BUeXBlcy5ub2RlLFxuICBuZXh0SWNvbjogUHJvcFR5cGVzLm5vZGUsXG4gIHdpdGhUaW1lc3RhbXA6IFByb3BUeXBlcy5ib29sLFxufTtcbiJdfQ==