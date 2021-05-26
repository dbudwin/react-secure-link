import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import { SecureLink } from "../secure-link";
import faker from "faker";

let url: string;

beforeAll(() => {
    url = faker.internet.url();
});

function renderSecureLinkWithoutChildren(): void {
    render(<SecureLink href={url} />);
}

function renderSecureLinkWithChildren(element: React.ReactNode): void {
    render(<SecureLink href={url}>{element}</SecureLink>);
}

function getLinkByRole(): HTMLAnchorElement {
    return screen.getByRole("link") as HTMLAnchorElement;
}

describe("when child component is '0'", () => {
    it("renders link without crashing", () => {
        renderSecureLinkWithChildren(0);

        expect(getLinkByRole()).toBeInTheDocument();
    });

    it("has given text", () => {
        const zero = 0;

        renderSecureLinkWithChildren(zero);

        expect(getLinkByRole()).toHaveTextContent(zero.toString());
    });

    it("links to given URL", () => {
        renderSecureLinkWithChildren(0);

        expect(getLinkByRole()).toHaveAttribute("href", url);
    });

    it("has expected attributes to open link securely", () => {
        renderSecureLinkWithChildren(0);

        expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has expected attributes to open link in new tab", () => {
        renderSecureLinkWithChildren(0);

        expect(getLinkByRole()).toHaveAttribute("target", "_blank");
    });

    it(`can use intrinsic "a" element attributes`, () => {
        const className = faker.random.word();
        const style = { color: "red" };
        const role = faker.random.word();
        const handleClick = jest.fn();

        render(<SecureLink href={url} className={className} style={style} role={role} onClick={handleClick}>{0}</SecureLink>);

        const link = screen.getByRole(role);

        fireEvent.click(link);

        expect(link).toBeInTheDocument();
        expect(link).toHaveClass(className, { exact: true });
        expect(link).toHaveStyle(style);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

describe("when not given children", () => {
    it("renders link without crashing", () => {
        renderSecureLinkWithoutChildren();

        expect(getLinkByRole()).toBeInTheDocument();
    });

    it("has given text", () => {
        renderSecureLinkWithoutChildren();

        expect(getLinkByRole()).toHaveTextContent(url);
    });

    it("links to given URL", () => {
        renderSecureLinkWithoutChildren();

        expect(getLinkByRole()).toHaveAttribute("href", url);
    });

    it("has expected attributes to open link securely", () => {
        renderSecureLinkWithoutChildren();

        expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has expected attributes to open link in new tab", () => {
        renderSecureLinkWithoutChildren();

        expect(getLinkByRole()).toHaveAttribute("target", "_blank");
    });

    it(`can use intrinsic "a" element attributes`, () => {
        const className = faker.random.word();
        const style = { color: "red" };
        const role = faker.random.word();
        const handleClick = jest.fn();

        render(<SecureLink href={url} className={className} style={style} role={role} onClick={handleClick} />);

        const link = screen.getByRole(role);

        fireEvent.click(link);

        expect(link).toBeInTheDocument();
        expect(link).toHaveClass(className, { exact: true });
        expect(link).toHaveStyle(style);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

describe("when given children", () => {
    let text: string;

    beforeAll(() => {
        text = faker.lorem.word();
    });

    it("renders link without crashing", () => {
        renderSecureLinkWithChildren(text);

        expect(getLinkByRole()).toBeInTheDocument();
    });

    it("has given text", () => {
        renderSecureLinkWithChildren(text);

        expect(getLinkByRole()).toHaveTextContent(text);
    });

    it("links to given URL", () => {
        renderSecureLinkWithChildren(text);

        expect(getLinkByRole()).toHaveAttribute("href", url);
    });

    it("has expected attributes to open link securely", () => {
        renderSecureLinkWithChildren(text);

        expect(getLinkByRole()).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has expected attributes to open link in new tab", () => {
        renderSecureLinkWithChildren(text);

        expect(getLinkByRole()).toHaveAttribute("target", "_blank");
    });

    it(`can use intrinsic "a" element attributes`, () => {
        const className = faker.random.word();
        const style = { color: "red" };
        const role = faker.random.word();
        const handleClick = jest.fn();

        render(<SecureLink href={url} className={className} style={style} role={role} onClick={handleClick} />);

        const link = screen.getByRole(role);

        fireEvent.click(link);

        expect(link).toBeInTheDocument();
        expect(link).toHaveClass(className, { exact: true });
        expect(link).toHaveStyle(style);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
