function printReports(pages) {
  console.log("=======");
  console.log("REPORTS");
  console.log("=======");

  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} link to page ${url}`);
  }

  console.log("=======");
  console.log("END REPORTS");
  console.log("=======");
}

function sortPages(pages) {
  const sortedPages = Object.entries(pages);
  sortedPages.sort((a, b) => b[1] - a[1]);
  return sortedPages;
}

module.exports = { sortPages, printReports };
