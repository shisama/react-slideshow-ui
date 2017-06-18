// @flow
import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles';

/**
 * @typedef {Object} Props
 * @property {Object} style
 * @property {Array<string>} src,
 * @property {Node} prevIcon,
 * @property {Node} nextIcon
 * @property {boolean} withTimestamp
 */
type Props = {
  style: Object,
  src: Array<string>,
  prevIcon: Node,
  nextIcon: Node,
  withTimestamp: boolean,
}

/**
 * @typedef {Object} State
 * @property {string} src
 * @property {number} index
 * @property {number} progress
 * @property {number} timestamp
 */
type State = {
  src: string,
  index: number,
  progress: number,
  timestamp: number,
}

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

    this.state = {
      src: '',
      index: 0,
      progress: 0,
      timestamp: timestamp,
    };
  }

  /**
   * componentWillMount
   * updates states with props to render first view.
   * updates image src, page, and progress.
   */
  componentWillMount() {
    const images: Array<string> = this.props.src;
    if (this.isEmptyArray(this.props.src)) {
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
    });
  }

  /**
   * event executed when previous button is clicked.
   * updates image src and page to move previous page.
   */
  onClickPrevButton = () => {
    if (this.isEmptyArray(this.props.src)) {
      return;
    }

    if (this.state.index === 0) {
      return;
    }

    const nextIndex = this.state.index - 1;
    const nextProgress = this.calcProgress(nextIndex + 1);

    const nextState = {
      src: this.props.src[nextIndex],
      index: nextIndex,
      progress: nextProgress,
    };
    this.setState(nextState);
  };

  /**
   * event executed when next button is clicked.
   * updates image src and page to move next page.
   */
  onClickNextButton = () => {
    if (!this.props.src) {
      return;
    }

    if (this.state.index === this.props.src.length - 1) {
      return;
    }
    const nextIndex = this.state.index + 1;
    let nextProgress = this.calcProgress(nextIndex + 1);
    if (nextProgress > 100) {
      nextProgress = 100;
    }

    const nextState = {
      src: this.props.src[nextIndex],
      index: nextIndex,
      progress: nextProgress,
    };
    this.setState(nextState);
  };

  /**
   * event executed when progressBar is clicked.
   * updates states to move page.
   * @param {MouseEvent} e
   */
  onClickProgressBar = (e: MouseEvent) => {
    const barWidth = document
    .getElementsByClassName('progressBar')[0]
      .offsetWidth;
    const progressWidth = e.clientX;
    const clickPosition = Math.floor((progressWidth / barWidth) * 100);
    let nextIndex = 0;
    for (let i = 0; i < this.props.src.length; i++) {
      const checkWidth = this.calcProgress(i);
      if (clickPosition >= checkWidth) {
        nextIndex = i;
      }
    }
    const nextProgress = this.calcProgress(nextIndex + 1);
    const nextSrc = this.props.src[nextIndex];
    this.setState({
      src: nextSrc,
      index: nextIndex,
      progress: nextProgress,
    });
  };

  /**
   *
   * @param {number} page
   * @returns {number}
   */
  calcProgress = (page: number): number => {
    const base = 100 / this.props.src.length;
    let progress = Math.ceil(base * page);
    if (progress > 100) {
      return 100;
    }
    return progress;
  };

  isEmptyArray = (arr: Array<string>): boolean => {
    return (arr === undefined || arr === null || arr.length === 0);
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
      <div style={this.props.style}>
        <div style={styles.BAR}>

        </div>
        <div>
          <div style={styles.IMAGE}>
            <img className="content"
                 src={src}
                 style={{width: '100%'}}/>
            <div className="prevOnContent"
                 onClick={this.onClickPrevButton}
                 style={
                   styles.PREV_ON_CONTENT
                 }>
            </div>
            <div className="nextOnContent"
                 onClick={this.onClickNextButton}
                 style={
                   styles.NEXT_ON_CONTENT
                 }>
            </div>
          </div>
        </div>
        <div className="progressBar"
             style={
               {
                 backgroundColor: '#000',
                 height: 10,
                 marginTop: -6,
                 position: 'relative',
                 width: '100%',
               }
             }
             onClick={this.onClickProgressBar}>
          <div className="progress"
               style={
                 {
                   backgroundColor: '#007bb6',
                   height: '100%',
                   width: `${this.state.progress}%`,
                 }
               }/>
        </div>
        <div className={'bar'} style={styles.BAR}>
          <button className={'prevButton'}
                  onClick={this.onClickPrevButton}
                  style={styles.BUTTON}>
            {this.props.prevIcon}
          </button>
          <span style={styles.PAGE_VIEW}>
            {this.props.src ? `${this.state.index
            + 1} / ${this.props.src.length}`
              : null}
          </span>
          <button className={'nextButton'}
                  onClick={this.onClickNextButton}
                  style={styles.BUTTON}>
            {this.props.nextIcon}
          </button>
        </div>
      </div>
    );
  }
};

SlideShow.defaultProps = {
  arrowButtonStyle: styles.ARROW_BUTTON,
  style: {},
  src: [],
  prevIcon: (
    <svg style={styles.ARROW_BUTTON} viewBox="0 0 8 8">
      <path fill="#fff" d="M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z"
            transform="translate(0 1)"/>
    </svg>
  ),
  nextIcon: (
    <svg style={styles.ARROW_BUTTON} viewBox="0 0 8 8">
      <path fill="#fff" d="M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z"
            transform="translate(0 1)"/>
    </svg>
  ),
  withTimestamp: false,
};

SlideShow.PropTypes = {
  arrowButtonStyle: PropTypes.object,
  style: PropTypes.object,
  src: PropTypes.array,
  prevIcon: PropTypes.node,
  nextIcon: PropTypes.node,
  withTimestamp: PropTypes.bool,
};