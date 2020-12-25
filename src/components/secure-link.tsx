import React, { Key, ReactElement } from "react";

interface SecureLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    url: string;
    text?: string;
    uniqueKey?: Key;
}

export function SecureLink({ url, text, uniqueKey }: SecureLinkProps): ReactElement {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={uniqueKey}
        >
            {
                text ? text : url
            }
        </a>
    );
}
