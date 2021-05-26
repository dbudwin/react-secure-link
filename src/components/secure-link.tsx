import React, { ReactElement } from "react";

type SecureLinkProps = JSX.IntrinsicElements["a"]

export function SecureLink({ ...props }: SecureLinkProps): ReactElement {
    let element: React.ReactNode;

    if (props.children === null || props.children === undefined || props.children === "") {
        element = props.href;
    } else {
        element = props.children;
    }

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {element}
        </a>
    );
}
