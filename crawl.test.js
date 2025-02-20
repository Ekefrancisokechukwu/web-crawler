const { normalizeURL, getURLSFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path/";
  const actualOutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expected);
});

test("normalizeURL strip trialing slashs", () => {
  const input = "https://blog.boot.dev/path/";
  const actualOutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://blog.boot.dev/path/";
  const actualOutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expected);
});

test("normalizeURL CAPITALS", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actualOutput = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actualOutput).toEqual(expected);
});

test("getURLSFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
   <body>
   <a href="https://blog.boot.dev">boot.dev</a>
  </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actualOutput).toEqual(expected);
});

test("getURLSFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
   <body>
   <a href="/path/">boot.dev</a>
  </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actualOutput).toEqual(expected);
});

test("getURLSFromHTML multiple", () => {
  const inputHTMLBody = `
  <html>
   <body>
   <a href="https://blog.boot.dev/path1/">boot.dev path 1</a>
   <a href="/path2/">boot.dev path 2</a>
  </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actualOutput).toEqual(expected);
});

test("getURLSFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
   <body>
   <a href="invalid">boot.dev path 1</a>
  </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualOutput = getURLSFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actualOutput).toEqual(expected);
});
