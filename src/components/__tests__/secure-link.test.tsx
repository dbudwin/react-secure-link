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

const uniqueKeyPropValues = [
    undefined,
    null,
    faker.random.number(),
    faker.random.word(),
];

function renderSecureLinkWithoutChildren(uniqueKey: Key): void {
    render(<SecureLink url={url} key={uniqueKey} />);
}

function renderSecureLinkWithChildren(text: string, uniqueKey: Key): void {
    render(<SecureLink url={url} key={uniqueKey}>{text}</SecureLink>);
}

function getLinkByRole(): HTMLAnchorElement {
    return screen.getByRole("link") as HTMLAnchorElement;
}

each(uniqueKeyPropValues).describe(`when given uniqueKey: %s`, (uniqueKey?) => {
    describe("when not given children", () => {
        it("renders link without crashing", () => {
            renderSecureLinkWithoutChildren(uniqueKey);

            expect(getLinkByRole()).toBeInTheDocument();
        });

        it("has given text", () => {
            renderSecureLinkWithoutChildren(uniqueKey);

            expect(getLinkByRole()).toHaveTextContent(url);
        });

        it("links to given URL", () => {
            renderSecureLinkWithoutChildren(uniqueKey);

            expect(getLinkByRole()).toHaveAttribute("href", url);
        });

        it("has expected attributes to open link securely", () => {
            renderSecureLinkWithoutChildren(uniqueKey);

            expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
        });

        it("has expected attributes to open link in new tab", () => {
            renderSecureLinkWithoutChildren(uniqueKey);

            expect(getLinkByRole()).toHaveAttribute("target", "_blank");
        });
    });

    describe("when given children", () => {
        let text: string;

        beforeAll(() => {
            text = faker.lorem.word();
        });

        it("renders link without crashing", () => {
            renderSecureLinkWithChildren(text, uniqueKey);

            expect(getLinkByRole()).toBeInTheDocument();
        });

        it("has given text", () => {
            renderSecureLinkWithChildren(text, uniqueKey);

            expect(getLinkByRole()).toHaveTextContent(text);
        });

        it("links to given URL", () => {
            renderSecureLinkWithChildren(text, uniqueKey);

            expect(getLinkByRole()).toHaveAttribute("href", url);
        });

        it("has expected attributes to open link securely", () => {
            renderSecureLinkWithChildren(text, uniqueKey);

            expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
        });

        it("has expected attributes to open link in new tab", () => {
            renderSecureLinkWithChildren(text, uniqueKey);

            expect(getLinkByRole()).toHaveAttribute("target", "_blank");
        });
    });
});
