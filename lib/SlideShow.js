"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const toggle_fullscreen_1 = __importDefault(require("toggle-fullscreen"));
const FullscreenButton_1 = __importDefault(require("./FullscreenButton"));
const FullscreenIcon_1 = __importDefault(require("./FullscreenIcon"));
const PagingButton_1 = __importDefault(require("./PagingButton"));
const Preview_1 = __importDefault(require("./Preview"));
const ProgressBar_1 = __importDefault(require("./ProgressBar"));
const styles_1 = __importDefault(require("./styles"));
const Viewer_1 = __importDefault(require("./Viewer"));
const fullscreenChange = toggle_fullscreen_1.default.fullscreenChange;
const isFullscreen = toggle_fullscreen_1.default.isFullscreen;
class SlideShow extends React.Component {
    constructor(props) {
        super(props);
        this.onClickPrevButton = () => {
            if (this.isEmptyArray(this.props.images)) {
                return;
            }
            if (this.state.index === 0) {
                return;
            }
            const nextIndex = this.state.index - 1;
            this.updatePageState(nextIndex);
        };
        this.onClickNextButton = () => {
            if (!this.props.images) {
                return;
            }
            if (this.state.index === this.props.images.length - 1) {
                return;
            }
            const nextIndex = this.state.index + 1;
            this.updatePageState(nextIndex);
        };
        this.onClickProgressBar = (e) => {
            const nextIndex = this.calcProgressIndex(e);
            if (nextIndex === undefined || nextIndex === null) {
                return;
            }
            this.updatePageState(nextIndex);
        };
        this.onMouseMoveProgressBar = (e) => {
            const nextIndex = this.calcProgressIndex(e);
            if (nextIndex === undefined || nextIndex === null) {
                return;
            }
            this.setState({
                preview: 1,
                previewIndex: nextIndex,
            });
        };
        this.onMouseLeaveProgressBar = (e) => {
            this.setState({
                preview: 0,
            });
        };
        this.onChangeFullScreen = () => {
            const element = document.getElementsByClassName(`${this.props.className}-wrapper`)[0];
            const fn = () => {
                const isFullScreen = isFullscreen();
                this.setState({ isFullScreen });
                if (isFullScreen) {
                    document.addEventListener('keydown', this.keydownEvent);
                    element.style.width = '70%';
                }
                else {
                    document.removeEventListener('keydown', this.keydownEvent);
                    element.style.width = '100%';
                }
            };
            Promise.all([toggle_fullscreen_1.default(element), fullscreenChange(fn)]);
        };
        this.keydownEvent = (e) => {
            e.preventDefault();
            if (e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.keyCode === 37 ||
                e.keyCode === 38) {
                this.onClickPrevButton();
            }
            else if (e.key === 'ArrowDown' ||
                e.key === 'ArrowRight' ||
                e.keyCode === 39 ||
                e.keyCode === 40 ||
                e.keyCode === 32) {
                this.onClickNextButton();
            }
            else if (e.key === 'Escape' || e.keyCode === 27) {
                this.onChangeFullScreen();
            }
        };
        this.calcProgressIndex = (e) => {
            const parent = e.currentTarget.parentElement;
            if (!parent) {
                return;
            }
            const barWidth = parent.children[0].offsetWidth;
            const progressWidth = e.clientX - e.currentTarget.getBoundingClientRect().left;
            const clickPosition = Math.floor((progressWidth / barWidth) * 100);
            let nextIndex = 0;
            for (let i = 0; i < this.props.images.length; i++) {
                const checkWidth = this.calcProgress(i);
                if (clickPosition >= checkWidth) {
                    nextIndex = i;
                }
            }
            return nextIndex;
        };
        this.calcProgress = (page) => {
            const base = 100 / this.props.images.length;
            const progress = Math.ceil(base * page);
            if (progress > 100) {
                return 100;
            }
            return progress;
        };
        this.isEmptyArray = (arr) => {
            return arr === undefined || arr === null || arr.length === 0;
        };
        this.updatePageState = (index) => {
            const progress = this.calcProgress(index + 1);
            const image = this.props.images[index];
            this.setState({
                src: image,
                index,
                progress,
            });
            if (this.props.pageWillUpdate) {
                this.props.pageWillUpdate(index, image);
            }
        };
        this.timestamp = 0;
        if (props.withTimestamp === true) {
            this.timestamp = Math.floor(new Date().getTime() / 1000);
        }
        if (props.style) {
            for (const key in props.style) {
                if (props.style.hasOwnProperty(key)) {
                    styles_1.default.ROOT[key] = props.style[key];
                }
            }
        }
        if (styles_1.default.ROOT.height) {
            styles_1.default.IMAGE.height =
                styles_1.default.ROOT.height - styles_1.default.BAR.height - styles_1.default.PROGRESS_BAR.height + 5;
        }
        this.state = {
            src: '',
            index: 0,
            progress: 0,
            preview: 0,
            previewIndex: 0,
            isFullScreen: false,
        };
    }
    componentWillMount() {
        const images = this.props.images;
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
            progress,
            preview: 0,
            previewIndex: 0,
            isFullScreen: false,
        });
    }
    render() {
        return (React.createElement("div", { style: styles_1.default.ROOT, className: this.props.className },
            React.createElement("div", { className: `${this.props.className}-wrapper`, style: { margin: 'auto' } },
                React.createElement(Viewer_1.default, { imgClassName: `${this.props.className}-image`, styles: styles_1.default, src: this.state.src, onClickPrevButton: this.onClickPrevButton, onClickNextButton: this.onClickNextButton, timestamp: this.timestamp }),
                React.createElement(Preview_1.default, { opacity: this.state.preview, previewIndex: this.state.previewIndex, images: this.props.images, isFullScreen: this.state.isFullScreen, imgClassName: `${this.props.className}-image` }),
                React.createElement(ProgressBar_1.default, { style: styles_1.default.PROGRESS_BAR, onClick: this.onClickProgressBar, onMouseMove: this.onMouseMoveProgressBar, onMouseLeave: this.onMouseLeaveProgressBar, progress: this.state.progress }),
                React.createElement("div", { style: styles_1.default.BAR },
                    React.createElement(PagingButton_1.default, { onClick: this.onClickPrevButton }, this.props.prevIcon),
                    React.createElement("span", { style: styles_1.default.PAGE_VIEW }, `${this.state.index + 1} / ${this.props.images ? this.props.images.length : 0}`),
                    React.createElement(PagingButton_1.default, { onClick: this.onClickNextButton }, this.props.nextIcon),
                    this.props.showFullscreenIcon ? (React.createElement(FullscreenButton_1.default, { onClick: this.onChangeFullScreen },
                        React.createElement(FullscreenIcon_1.default, { isFullScreen: this.state.isFullScreen }))) : null))));
    }
}
exports.default = SlideShow;
SlideShow.defaultProps = {
    arrowButtonStyle: styles_1.default.ARROW_BUTTON,
    style: {},
    images: [],
    prevIcon: (React.createElement("svg", { style: styles_1.default.ARROW_BUTTON, viewBox: "0 0 8 8" },
        React.createElement("path", { fill: "#fff", d: "M4 0l-4 3 4 3v-6zm0 3l4 3v-6l-4 3z", transform: "translate(0 1)" }))),
    nextIcon: (React.createElement("svg", { style: styles_1.default.ARROW_BUTTON, viewBox: "0 0 8 8" },
        React.createElement("path", { fill: "#fff", d: "M0 0v6l4-3-4-3zm4 3v3l4-3-4-3v3z", transform: "translate(0 1)" }))),
    withTimestamp: false,
    pageWillUpdate: (index, image) => {
        return;
    },
    className: 'slideshow',
    showFullscreenIcon: true,
};
