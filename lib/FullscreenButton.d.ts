import * as React from "react";
declare type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
};
declare const FullscreenButton: ({ onClick, children }: Props) => JSX.Element;
export default FullscreenButton;
