const http = require("http");
const url = require("url");
const fs = require("fs");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((i) => slugify(i.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObj
      .map((card) => replaceTemplate(tempCard, card))
      .join(" ");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(3000, "localhost", () => {
  console.log("Listening to req on port");
});
