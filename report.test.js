const { sortPages } = require("./report");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://ekefrancisokechukwu.vercel.app/about": 1,
    "https://ekefrancisokechukwu.vercel.app/": 3,
  };

  const actual = sortPages(input);

  const expected = [
    ["https://ekefrancisokechukwu.vercel.app/", 3],
    ["https://ekefrancisokechukwu.vercel.app/about", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "https://ekefrancisokechukwu.vercel.app/about": 1,
    "https://ekefrancisokechukwu.vercel.app/components": 3,
    "https://ekefrancisokechukwu.vercel.app/maze": 5,
    "https://ekefrancisokechukwu.vercel.app/dance": 4,
    "https://ekefrancisokechukwu.vercel.app/better": 2,
  };

  const actual = sortPages(input);

  const expected = [
    ["https://ekefrancisokechukwu.vercel.app/maze", 5],
    ["https://ekefrancisokechukwu.vercel.app/dance", 4],
    ["https://ekefrancisokechukwu.vercel.app/components", 3],
    ["https://ekefrancisokechukwu.vercel.app/better", 2],
    ["https://ekefrancisokechukwu.vercel.app/about", 1],
  ];
  expect(actual).toEqual(expected);
});
