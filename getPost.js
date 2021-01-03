const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
let answersJson = fs.readFileSync("answersScrapes.json", "utf-8");

let url = "https://www.answers.com/t/literature-and-language/new?page=0";
request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    let $ = cheerio.load(html);
    let title = $("title").text();
    var anchors = [];
    var links = $("a");
    links.each(function (i, link) {
      anchors[i] = $(link).attr("href");
      console.log(link);
    });
    // Logging the Data
    console.log(title);
    console.log("Scraping Done...");
  } else {
    console.log("Scrapping Failed");
    console.log(error);
  }
});
