import "@testing-library/jest-dom";

import React, { CSSProperties } from "react";
import { render, screen } from "@testing-library/react";

import { SecureLink } from "../secure-link";
import each from "jest-each";
import faker from "faker";

let url: string;

beforeAll(() => {
    url = faker.internet.url();
});

const emptyTextValues = [
    undefined,
    null,
    "",
];

const classNamePropValues = [
    undefined,
    null,
    "",
    faker.lorem.word(),
];

const stylePropValues = [
    undefined,
    null,
    {},
    { color: "red" },
];

function renderSecureLink(text: string, className: string, style: CSSProperties): void {
    render(<SecureLink text={text} url={url} className={className} style={style} />);
}

function getLinkByRole(): HTMLAnchorElement {
    return screen.getByRole("link") as HTMLAnchorElement;
}

function itRendersWithoutCrashing(text: string, className: string, style: CSSProperties): void {
    it("renders link without crashing", () => {
        renderSecureLink(text, className, style);

        expect(getLinkByRole()).toBeInTheDocument();
    });
}

function itHasExpectedAttributes(text: string, className: string, style: CSSProperties): void {
    it("links to given URL", () => {
        renderSecureLink(text, className, style);

        expect(getLinkByRole()).toHaveAttribute("href", url);
    });

    it("has expected attributes to open link securely", () => {
        renderSecureLink(text, className, style);

        expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has expected attributes to open link in new tab", () => {
        renderSecureLink(text, className, style);

        expect(getLinkByRole()).toHaveAttribute("target", "_blank");
    });
}

each(classNamePropValues).describe(`when given className="%s"`, (className?) => {
    each(stylePropValues).describe(`when given style="%s"`, (style?) => {
        each(emptyTextValues).describe(`when given empty text="%s"`, (text?) => {
            itRendersWithoutCrashing(text, className, style);
            itHasExpectedAttributes(text, className, style);

            it("text is the same as the URL", () => {
                renderSecureLink(text, className, style);

                expect(getLinkByRole()).toHaveTextContent(url);
            });
        });

        describe("when given text", () => {
            let text: string;

            beforeAll(() => {
                text = faker.lorem.word();
            });

            itRendersWithoutCrashing(text, className, style);
            itHasExpectedAttributes(text, className, style);

            it("has given text", () => {
                renderSecureLink(text, className, style);

                expect(getLinkByRole()).toHaveTextContent(text);
            });
        });
    });
});
