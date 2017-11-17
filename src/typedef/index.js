/**
 * @typedef {Object} Props
 * @property {Object} style
 * @property {Array<string>} images
 * @property {React.Node} prevIcon
 * @property {React.Node} nextIcon
 * @property {boolean} withTimestamp
 * @property {function} pageWillUpdate
 * @property {React.Node} children
 */
export type Props = {
  style: Object,
  images: Array<string>,
  prevIcon: React.Node,
  nextIcon: React.Node,
  withTimestamp: boolean,
  pageWillUpdate: (index: number, image: string) => void,
  showFullscreenIcon: boolean,
  className: string,
  children: React.Node,
};

/**
 * @typedef {Object} State
 * @property {string} src
 * @property {number} index
 * @property {number} progress
 * @property {number} preview
 * @property {number} previewIndex
 * @property {boolean} isFullScreen
 */
export type State = {
  src: string,
  index: number,
  progress: number,
  preview: number,
  previewIndex: number,
  isFullScreen: boolean,
};
