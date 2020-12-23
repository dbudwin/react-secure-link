# react-secure-link 🔒

A TypeScript compatible React component to avoid security exploits when opening a link in a new tab.  `react-secure-link` is **lightweight** and has **zero dependencies**!

## The Exploit 💥

It's possible when opening a link to a webpage in a new tab that the webpage in the new tab can hijack the webpage in the original tab via the `window.opener` property.  This is an easy, low-level exploit.  Here is how it can occur:

A hacker knows they can leave links in comments on your webpage and that they will open in a new tab.  When a user to your website clicks that link, it will show them a seemingly harmless webpage.  This newly opened tab has access to the `window.opener` property which the hacker can exploit.  This webpage will use the `window.opener` property to run a little JavaScript like: `window.opener.location = "https://www.some-malicious-website.com/login.html"`.  This changes what webpage is opened in the original tab where the user clicked the link.  This is problematic if the hacker redirects the original tab to a webpage that _looks_ like the original.  The hacker could show a message like, "You have been automatically logged out, log back in to continue."  Since the webpage _looks_ the same and the user knows they were just on the same webpage in that same tab, they'll trust the login form, but now their account has been compromised and they don't know it.  The hacker could then redirect back to the original webpage after the login form is submitted to further cover their tracks.

## What is the `window.opener` Property?

From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/opener):

> The Window interface's opener property returns a reference to the window that opened the window, either with open(), or by navigating a link with a target attribute.

## How Does `react-secure-link` Prevent this Exploit?

Using `react-secure-link` for outbound links prevents the new tab from having access to the `window.opener` property altogether.

## Usage

1. Add `react-secure-link` to your project via `npm install react-secure-link`
2. Import the package: `import { SecureLink } from "react-secure-link";`
3. Use the following for links you want to open in a new tab: `<SecureLink url="https://www.npmjs.com/package/react-secure-link" text="react-secure-link on NPM" />`

### API

The `SecureLink` component has the following props:

| prop        | Required | Type     | Description                                                              |
|-------------|----------|----------|--------------------------------------------------------------------------|
| `url`       | Yes      | `string` | The URL to navigate to.                                                  |
| `text`      | No       | `string` | The text to show.  If not provided, the given URL will be shown instead. |
| `className` | No       | `string` | The CSS class to apply to the link.                                      |
| `style`     | No       | `object` | The CSS styling to apply to the link.                                    |


### Full Usage Example

```tsx
<SecureLink
    url="https://www.npmjs.com/package/react-secure-link"
    text="react-secure-link on NPM"
    className="no-link-decoration"
    style={{ color: "red" }}
/>
```
