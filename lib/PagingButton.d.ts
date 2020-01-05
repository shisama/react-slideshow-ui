import * as React from "react";
declare type Props = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
};
declare const PagingButton: ({ onClick, children }: Props) => JSX.Element;
export default PagingButton;
