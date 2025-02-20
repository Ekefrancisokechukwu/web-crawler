const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.host) {
    return pages;
  }

  const normalURL = normalizeURL(currentURL);
  if (pages[normalURL] > 0) {
    pages[normalURL]++;
    return pages;
  }
  pages[normalURL] = 1;
  console.log(`actively crawling ${currentURL}`);

  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      console.log(`error in fetch with statuscode:${res.status}`);
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`none html response content type`);
      return pages;
    }
    const htmlBody = await res.text();
    const nextURLs = getURLSFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log(`error in fetch:${error.message},on page ${currentURL}`);
  }

  return pages;
}

function getURLSFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  linkElements.forEach((link) => {
    if (link.href.startsWith("/")) {
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with relative url${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(`${link.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with absolute url${error.message}`);
      }
    }
  });

  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice("-1") === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = { normalizeURL, getURLSFromHTML, crawlPage };
