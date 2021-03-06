const request = require("request");
const cheerio = require("cheerio");
const { getDataOfPost } = require("./getData");
let urlsTopic = [
  "https://www.answers.com/t/science/unanswered?page=",
  // "https://www.answers.com/t/math-and-arithmetic/unanswered?page=",
  // "https://www.answers.com/t/literature-and-language/unanswered?page=",
  // "https://www.answers.com/t/history/unanswered?page=",
  // "https://www.answers.com/t/technology/unanswered?page=",
  // "https://www.answers.com/t/health/unanswered?page=",
  // "https://www.answers.com/t/law-and-legal-issues/unanswered?page=",
  // "https://www.answers.com/t/business-and-finance/unanswered?page=",
];

const getUrlsOfPage = async (url) => {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let title = $("title").text();
      $("h1 a").each(function (i, elm) {
        // urlsQuestion.push($(this).attr("href"));
        getDataOfPost($(this).attr("href"));
      });
    } else {
      console.log("Scrapping Failed");
      console.log(error);
    }
  });
};

const getPostActivation = async () => {
  urlsTopic.forEach(async (item, index, arr) => {
    let numberOfPage = 0;
    while (numberOfPage <= 2) {
      getUrlsOfPage(`${item}${numberOfPage}`);
      numberOfPage = numberOfPage + 1;
      console.log(numberOfPage);
    }
  });
};
getPostActivation();
exports.getPostActivation = getPostActivation;
