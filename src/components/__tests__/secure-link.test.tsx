import "@testing-library/jest-dom";

import React, { Key } from "react";
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

const uniqueKeyPropValues = [
    undefined,
    null,
    faker.random.number(),
    faker.random.word(),
];

function renderSecureLink(text: string, uniqueKey: Key): void {
    render(<SecureLink text={text} url={url} key={uniqueKey} />);
}

function getLinkByRole(): HTMLAnchorElement {
    return screen.getByRole("link") as HTMLAnchorElement;
}

function itRendersWithoutCrashing(text: string, uniqueKey: Key): void {
    it("renders link without crashing", () => {
        renderSecureLink(text, uniqueKey);

        expect(getLinkByRole()).toBeInTheDocument();
    });
}

function itHasExpectedAttributes(text: string, uniqueKey: Key): void {
    it("links to given URL", () => {
        renderSecureLink(text, uniqueKey);

        expect(getLinkByRole()).toHaveAttribute("href", url);
    });

    it("has expected attributes to open link securely", () => {
        renderSecureLink(text, uniqueKey);

        expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has expected attributes to open link in new tab", () => {
        renderSecureLink(text, uniqueKey);

        expect(getLinkByRole()).toHaveAttribute("target", "_blank");
    });
}

each(uniqueKeyPropValues).describe(`when given uniqueKey="%s"`, (uniqueKey?) => {
    each(emptyTextValues).describe(`when given empty text="%s"`, (text?) => {
        itRendersWithoutCrashing(text, uniqueKey);
        itHasExpectedAttributes(text, uniqueKey);

        it("text is the same as the URL", () => {
            renderSecureLink(text, uniqueKey);

            expect(getLinkByRole()).toHaveTextContent(url);
        });
    });

    describe("when given text", () => {
        let text: string;

        beforeAll(() => {
            text = faker.lorem.word();
        });

        itRendersWithoutCrashing(text, uniqueKey);
        itHasExpectedAttributes(text, uniqueKey);

        it("has given text", () => {
            renderSecureLink(text, uniqueKey);

            expect(getLinkByRole()).toHaveTextContent(text);
        });
    });
});
