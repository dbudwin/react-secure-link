import React, { Key, ReactElement } from "react";

interface SecureLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    url: string;
    uniqueKey?: Key;
}

export function SecureLink({ url, uniqueKey, children }: SecureLinkProps): ReactElement {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={uniqueKey}
        >
            {children ? children : url}
        </a>
    );
}
