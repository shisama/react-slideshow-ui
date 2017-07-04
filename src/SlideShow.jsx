// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Styles as styles} from './Styles';

/**
 * @typedef {Object} Props
 * @property {Object} style
 * @property {Array<string>} src,
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
 */
type State = {
  src: string,
  index: number,
  progress: number,
  timestamp: number,
  preview: number,
  previewIndex: number,
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
    const progressWidth = e.clientX;
    const nextIndex = this.calcProgressIndex(barWidth, progressWidth);
    this.updatePageState(nextIndex);
  };

  onMouseMoveProgressBar = (e: MouseEvent) => {
    const barWidth = document.getElementsByClassName('progressBar')[0]
      .offsetWidth;
    const progressWidth = e.clientX;
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

    return (
      <div style={this.style}>
        <div style={styles.BAR} />
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
          style={{
            backgroundColor: '#000',
            height: 10,
            marginTop: -6,
            position: 'relative',
            width: '100%',
          }}
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
          <button
            className={'prevButton'}
            onClick={this.onClickPrevButton}
            style={styles.BUTTON}
          >
            {this.props.prevIcon}
          </button>
          <span style={styles.PAGE_VIEW}>
            {this.props.images
              ? `${this.state.index + 1} / ${this.props.images.length}`
              : null}
          </span>
          <button
            className={'nextButton'}
            onClick={this.onClickNextButton}
            style={styles.BUTTON}
          >
            {this.props.nextIcon}
          </button>
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
      return (
        <img
          className={`preview-${index}`}
          style={{display: display, width: 200}}
          src={img}
        />
      );
    });
    const STYLE = Object.assign({}, styles.PREVIEW, {
      opacity: this.state.preview,
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
