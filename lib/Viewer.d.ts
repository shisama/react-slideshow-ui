import * as React from "react";
declare type Props = {
    styles: {
        IMAGE: React.CSSProperties;
        PREV_ON_CONTENT: React.CSSProperties;
        NEXT_ON_CONTENT: React.CSSProperties;
    };
    src: string;
    onClickPrevButton: (e: React.MouseEvent<HTMLDivElement>) => void;
    onClickNextButton: (e: React.MouseEvent<HTMLDivElement>) => void;
    timestamp: number;
    imgClassName: string;
};
declare const _default: React.MemoExoticComponent<({ styles, src, onClickPrevButton, onClickNextButton, timestamp, imgClassName }: Props) => JSX.Element>;
export default _default;
