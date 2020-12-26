import React, { ReactElement } from "react";

type SecureLinkProps = JSX.IntrinsicElements["a"]

export function SecureLink({ ...props }: SecureLinkProps): ReactElement {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {props.children ? props.children : props.href}
        </a>
    );
}
