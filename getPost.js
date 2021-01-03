const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
let answersJson = fs.readFileSync("answersScrapes.json", "utf-8");
let urlsQuestion = [];

let url = "https://www.answers.com/t/literature-and-language/new?page=0";
const getUrlOfPage = (url) => {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let title = $("title").text();
      $("h1 a").each(function (i, elm) {
        urlsQuestion.push($(this).attr("href"));
      });
      // Logging the Data
      console.log(urlsQuestion);
      console.log("Scraping Done...");
    } else {
      console.log("Scrapping Failed");
      console.log(error);
    }
  });
};
getUrlOfPage(url);
