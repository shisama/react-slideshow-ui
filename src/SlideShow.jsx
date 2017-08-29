// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Styles as styles} from './Styles';
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen';

/**
 * @typedef {Object} Props
 * @property {Object} style
 * @property {Array<string>} images,
 * @property {Node} prevIcon,
 * @property {Node} nextIcon
 * @property {boolean} withTimestamp
 * @property {function} pageWillUpdate
 */
type Props = {
  style: Object,
  images: Array<string>,
  prevIcon: Node,
  nextIcon: Node,
  withTimestamp: boolean,
  pageWillUpdate: (index: number, image: string) => void,
};

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
type State = {
  src: string,
  index: number,
  progress: number,
  timestamp: number,
  preview: number,
  previewIndex: number,
  isFullScreen: boolean,
};

/**
 * This class named SlideShow is the React component that allows you
 * to develop slideshow like 'SlideShare' or 'SpeakerDeck' very easy!
 * @class
 */
export default class SlideShow extends React.Component {
  state: State;
  props: Props;
  style: Object;
  static defaultProps: Object;
  static PropTypes: Object;

  /**
   * constructor
   * call super constructor and initialize states.
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    let timestamp = 0;
    if (props.withTimestamp === true) {
      timestamp = Math.floor(new Date().getTime() / 1000);
    }

    this.style = Object.assign({}, styles.ROOT, this.props.style);

    this.state = {
      src: '',
      index: 0,
      progress: 0,
      timestamp: timestamp,
      preview: 0,
      previewIndex: 0,
      isFullScreen: false,
    };
  }

  /**
   * componentWillMount
   * updates states with props to render first view.
   * updates image src, page, and progress.
   */
  componentWillMount() {
    const images: Array<string> = this.props.images;
    if (this.isEmptyArray(this.props.images)) {
      return;
    }
    let progress = Math.ceil(100 / images.length);
    if (progress > 100) {
      progress = 100;
    }

    this.setState({
      src: images[0],
      index: 0,
      progress: progress,
      preview: 0,
      previewIndex: 0,
    });
  }

  /**
   * event executed when previous button is clicked.
   * updates image src and page to move previous page.
   */
  onClickPrevButton = () => {
    if (this.isEmptyArray(this.props.images)) {
      return;
    }

    if (this.state.index === 0) {
      return;
    }

    const nextIndex = this.state.index - 1;
    this.updatePageState(nextIndex);
  };

  /**
   * event executed when next button is clicked.
   * updates image src and page to move next page.
   */
  onClickNextButton = () => {
    if (!this.props.images) {
      return;
    }

    if (this.state.index === this.props.images.length - 1) {
      return;
    }
    const nextIndex = this.state.index + 1;
    this.updatePageState(nextIndex);
  };

  /**
   * event executed when progressBar is clicked.
   * updates states to move page.
   * @param {MouseEvent} e
   */
  onClickProgressBar = (e: MouseEvent) => {
    const barWidth = document.getElementsByClassName('progressBar')[0]
      .offsetWidth;
    let progressWidth = e.clientX;
    if (this.state.isFullScreen) {
      const content = document.getElementsByClassName('slideshow-wrapper')[0];
      progressWidth -= content.offsetLeft;
    }
    const nextIndex = this.calcProgressIndex(barWidth, progressWidth);
    this.updatePageState(nextIndex);
  };

  onMouseMoveProgressBar = (e: MouseEvent) => {
    const barWidth = document.getElementsByClassName('progressBar')[0]
      .offsetWidth;
    let progressWidth = e.clientX;
    if (this.state.isFullScreen) {
      const content = document.getElementsByClassName('slideshow-wrapper')[0];
      progressWidth -= content.offsetLeft;
    }
    const nextIndex = this.calcProgressIndex(barWidth, progressWidth);
    this.setState({
      preview: 1,
      previewIndex: nextIndex,
    });
  };

  onMouseLeaveProgressBar = (e: MouseEvent) => {
    this.setState({
      preview: 0,
    });
  };

  onChangeFullScreen = () => {
    const element: Object = document.getElementsByClassName(
      'slideshow-wrapper',
    )[0];
    toggleFullscreen(element).then(() => {
      return fullscreenChange(() => {
        const isFullScreen = isFullscreen();
        this.setState({isFullScreen: isFullScreen});
        if (isFullScreen) {
          document.addEventListener('keydown', this.keydownEvent);
          element.style.width = '70%';
        } else {
          document.removeEventListener('keydown', this.keydownEvent);
          element.style.width = '100%';
        }
      });
    });
  };

  keydownEvent = (e: Event) => {
    e.preventDefault();
    if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowLeft' ||
      e.keyCode === 37 ||
      e.keyCode === 38
    ) {
      this.onClickPrevButton();
    } else if (
      e.key === 'ArrowDown' ||
      e.key === 'ArrowRight' ||
      e.keyCode === 39 ||
      e.keyCode === 40 ||
      e.keyCode === 32
    ) {
      this.onClickNextButton();
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      this.onChangeFullScreen();
    }
  };

  calcProgressIndex = (barWidth: number, progressWidth: number): number => {
    const clickPosition = Math.floor(progressWidth / barWidth * 100);
    let nextIndex = 0;
    for (let i = 0; i < this.props.images.length; i++) {
      const checkWidth = this.calcProgress(i);
      if (clickPosition >= checkWidth) {
        nextIndex = i;
      }
    }
    return nextIndex;
  };

  /**
   *
   * @param {number} page
   * @returns {number}
   */
  calcProgress = (page: number): number => {
    const base = 100 / this.props.images.length;
    let progress = Math.ceil(base * page);
    if (progress > 100) {
      return 100;
    }
    return progress;
  };

  isEmptyArray = (arr: Array<string>): boolean => {
    return arr === undefined || arr === null || arr.length === 0;
  };

  updatePageState = (index: number) => {
    const progress = this.calcProgress(index + 1);
    const image = this.props.images[index];
    this.setState({
      src: image,
      index: index,
      progress: progress,
    });
    this.props.pageWillUpdate(index, image);
  };

  /**
   * render
   * @returns {XML}
   */
  render() {
    let src = this.state.src;
    if (this.props.withTimestamp === true) {
      src += `?${this.state.timestamp}`;
    }

    let paging;
    if (this.props.images) {
      paging = `${this.state.index + 1} / ${this.props.images.length}`;
    }

    return (
      <div style={this.style} className="slideshow">
        <div className="slideshow-wrapper" style={{margin: 'auto'}}>
          <div>
            <div style={styles.IMAGE}>
              <img className="content" src={src} style={{width: '100%'}} />
              <div
                className="prevOnContent"
                onClick={this.onClickPrevButton}
                style={styles.PREV_ON_CONTENT}
              />
              <div
                className="nextOnContent"
                onClick={this.onClickNextButton}
                style={styles.NEXT_ON_CONTENT}
              />
            </div>
          </div>
          {this._renderPreview()}
          <div
            className="progressBar"
            style={styles.PROGRESS_BAR}
            onClick={this.onClickProgressBar}
            onMouseMove={this.onMouseMoveProgressBar}
            onMouseLeave={this.onMouseLeaveProgressBar}
          >
            <div
              className="progress"
              style={{
                backgroundColor: '#007bb6',
                height: '100%',
                width: `${this.state.progress}%`,
              }}
            />
          </div>
          <div className={'bar'} style={styles.BAR}>
            <div>
              <button
                className={'prevButton'}
                onClick={this.onClickPrevButton}
                style={styles.BUTTON}
              >
                {this.props.prevIcon}
              </button>
              <span style={styles.PAGE_VIEW}>{paging}</span>
              <button
                className={'nextButton'}
                onClick={this.onClickNextButton}
                style={styles.BUTTON}
              >
                {this.props.nextIcon}
              </button>
            </div>
            <div>
              <button
                className={'fullscreen'}
                style={{
                  backgroundColor: 'transparent',
                  borderStyle: 'none',
                  position: 'absolute',
                  right: 10,
                  top: 5,
                }}
                onClick={this.onChangeFullScreen}
              >
                {this._renderFullscreenIcon()}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * preview renderer
   * @returns {?XML}
   * @private
   */
  _renderPreview = () => {
    if (!this.props.images || this.props.images.length === 0) {
      return null;
    }

    let preview = this.props.images.map((img, index) => {
      const display = index === this.state.previewIndex ? 'inline' : 'none';
      const key = `preview-${index}`;
      return (
        <img
          className={key}
          style={{display: display, width: 200}}
          src={img}
          key={key}
        />
      );
    });
    let fullscreenBottom = 120;
    const wrapper = document.querySelector('.slideshow-wrapper');
    const content = document.querySelector('.content');
    const progressBar = document.querySelector('.progressBar');
    const bar = document.querySelector('.bar');
    if (wrapper && content && progressBar && bar) {
      fullscreenBottom =
        window.screen.availHeight -
        content.offsetHeight +
        progressBar.offsetHeight +
        bar.offsetHeight +
        10;
    }
    const bottom = this.state.isFullScreen
      ? fullscreenBottom
      : styles.PREVIEW.bottom;
    const STYLE = Object.assign({}, styles.PREVIEW, {
      opacity: this.state.preview,
      bottom: bottom,
    });
    return (
      <div style={STYLE}>
        {preview}
        <p style={{margin: 0, textAlign: 'center', fontSize: 4}}>
          {`${this.state.previewIndex + 1} / ${this.props.images.length}`}
        </p>
      </div>
    );
  };

  _renderFullscreenIcon = () => {
    if (this.state.isFullScreen) {
      return (
        <svg id="two-arrows" width="15" height="15" viewBox="0 0 612 612">
          <g>
            <g id="_x36_">
              <g>
                <path
                  d="M260.655,351.173c-3.615-4.016-8.721-6.636-14.554-6.655l-164.915-0.229c-10.92-0.019-19.756,8.816-19.737,19.737     c0.019,10.92,12.756,23.198,18.226,28.668l41.711,41.712L0,554.625L57.375,612l119.608-121.979l41.711,41.712     c9.027,9.027,18.188,18.628,29.108,18.646c10.92,0.02,19.756-8.816,19.737-19.736l-0.229-164.915     C267.291,359.895,264.671,354.788,260.655,351.173z M493.119,175.472L612,57.375L554.625,0L436.566,118.556l-42.419-42.687     c-9.181-9.238-18.494-19.068-29.587-19.087c-11.111-0.019-20.081,9.027-20.081,20.196l0.229,168.797     c0,5.967,2.678,11.188,6.771,14.898c3.69,4.112,8.874,6.789,14.803,6.809l167.726,0.229c11.093,0.019,20.082-9.027,20.082-20.196     c-0.02-11.169-12.967-23.753-18.532-29.338L493.119,175.472z"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </g>
        </svg>
      );
    } else {
      return (
        <svg
          id="fullscreen"
          width="15"
          height="15"
          viewBox="0 0 438.529 438.529"
        >
          <g fill="#fff">
            <path d="M180.156,225.828c-1.903-1.902-4.093-2.854-6.567-2.854c-2.475,0-4.665,0.951-6.567,2.854l-94.787,94.787l-41.112-41.117 c-3.617-3.61-7.895-5.421-12.847-5.421c-4.952,0-9.235,1.811-12.851,5.421c-3.617,3.621-5.424,7.905-5.424,12.854v127.907 c0,4.948,1.807,9.229,5.424,12.847c3.619,3.613,7.902,5.424,12.851,5.424h127.906c4.949,0,9.23-1.811,12.847-5.424 c3.615-3.617,5.424-7.898,5.424-12.847s-1.809-9.233-5.424-12.854l-41.112-41.104l94.787-94.793 c1.902-1.903,2.853-4.086,2.853-6.564c0-2.478-0.953-4.66-2.853-6.57L180.156,225.828z" />
            <path d="M433.11,5.424C429.496,1.807,425.212,0,420.263,0H292.356c-4.948,0-9.227,1.807-12.847,5.424 c-3.614,3.615-5.421,7.898-5.421,12.847s1.807,9.233,5.421,12.847l41.106,41.112l-94.786,94.787 c-1.901,1.906-2.854,4.093-2.854,6.567s0.953,4.665,2.854,6.567l32.552,32.548c1.902,1.903,4.086,2.853,6.563,2.853 s4.661-0.95,6.563-2.853l94.794-94.787l41.104,41.109c3.62,3.616,7.905,5.428,12.854,5.428s9.229-1.812,12.847-5.428 c3.614-3.614,5.421-7.898,5.421-12.847V18.268C438.53,13.315,436.734,9.04,433.11,5.424z" />
          </g>
        </svg>
      );
    }
  };
}

SlideShow.defaultProps = {
  arrowButtonStyle: styles.ARROW_BUTTON,
  style: {},
  images: [],
  prevIcon: (
    <svg style={styles.ARROW_BUTTON} viewBox="0 0 8 8">
      <path
        fill="#fff"
        d="M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z"
        transform="translate(0 1)"
      />
    </svg>
  ),
  nextIcon: (
    <svg style={styles.ARROW_BUTTON} viewBox="0 0 8 8">
      <path
        fill="#fff"
        d="M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z"
        transform="translate(0 1)"
      />
    </svg>
  ),
  withTimestamp: false,
  pageWillUpdate: (index: number, image: string) => {
    return;
  },
};

SlideShow.PropTypes = {
  arrowButtonStyle: PropTypes.object,
  style: PropTypes.object,
  images: PropTypes.array,
  prevIcon: PropTypes.node,
  nextIcon: PropTypes.node,
  withTimestamp: PropTypes.bool,
  pageWillUpdate: PropTypes.func,
};
