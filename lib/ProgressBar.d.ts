import * as React from "react";
declare type Props = {
    style?: React.CSSProperties;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    progress: number;
};
declare const _default: React.MemoExoticComponent<({ style, onClick, onMouseMove, onMouseLeave, progress }: Props) => JSX.Element>;
export default _default;
