import React from "react";
interface Props {
    style: any;
    images: string[];
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    withTimestamp?: boolean;
    pageWillUpdate?: (index: number, image: string) => void;
    showFullscreenIcon?: boolean;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}
interface State {
    src: string;
    index: number;
    progress: number;
    preview: number;
    previewIndex: number;
    isFullScreen: boolean;
    [key: string]: string | number | boolean;
}
export default class SlideShow extends React.Component<Props, State> {
    state: State;
    timestamp: number;
    static defaultProps: {
        arrowButtonStyle: any;
        style: {};
        images: never[];
        prevIcon: JSX.Element;
        nextIcon: JSX.Element;
        withTimestamp: boolean;
        pageWillUpdate: () => void;
        className: string;
        showFullscreenIcon: boolean;
    };
    constructor(props: Props);
    componentDidMount(): void;
    onClickPrevButton: () => void;
    onClickNextButton: () => void;
    onClickProgressBar: (e: any) => void;
    onMouseMoveProgressBar: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeaveProgressBar: () => void;
    onChangeFullScreen: () => void;
    keydownEvent: (e: KeyboardEvent) => void;
    updatePageState: (index: number) => void;
    render(): JSX.Element;
}
export {};
