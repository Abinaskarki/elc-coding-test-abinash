/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/

const data = require("./data");
const http = require("http");
const url = require("url");
const hostname = "localhost";
const port = 3035;
const corsOriginPort = 3030;

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http
  .createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format

    //Parsing url and getting query q value
    const parsedUrl = url.parse(req.url);
    const queryParams = new URLSearchParams(parsedUrl.query);
    const query = queryParams.get("q");

    //Checking for pathname /search
    if (parsedUrl.pathname === "/search") {
      //Filtering the date based on product name and tags
      const results = data.filter((product) => {
        return (
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
        );
      });
      res.setHeader("Content-Type", "application/json");

      //Using it to fix cors errors from our localhost origin
      res.setHeader(
        "Access-Control-Allow-Origin",
        `http://${hostname}:${corsOriginPort}`
      );

      //Using this to fix cors errors from any origin
      // res.setHeader("Access-Control-Allow-Origin", "*");
      // console.log(results);
      res.end(JSON.stringify(results));
    } else {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader(
        "Access-Control-Allow-Origin",
        `http://${hostname}:${corsOriginPort}`
      ); //Using it to fix cors errors
      res.end("Hello World!");
    }
  })
  .listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
