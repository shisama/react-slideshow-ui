import * as React from "react";

export interface Props {
    style: any,
    images: string[],
    prevIcon?: React.ReactNode,
    nextIcon?: React.ReactNode,
    withTimestamp?: boolean,
    pageWillUpdate?: (index: number, image: string) => void,
    showFullscreenIcon?: boolean,
    className?: string,
    children?: React.ReactNode,
    [key: string]: any,
}

declare class SlideShow extends React.Component<Props, any> {}

declare module "react-slideshow-ui" {}

export default SlideShow;