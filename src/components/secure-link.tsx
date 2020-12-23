import React, { CSSProperties, ReactElement } from "react";

interface SecureLinkProps {
    url: string;
    text?: string;
    className?: string;
    style?: CSSProperties;
}

export function SecureLink({ url, text, className, style }: SecureLinkProps): ReactElement {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            style={style}
        >
            {
                text ? text : url
            }
        </a>
    );
}
