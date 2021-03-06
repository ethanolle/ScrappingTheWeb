const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
let answersJson = fs.readFileSync("./const/answersScrapes.json", "utf-8");
let sumObject = {};

// this function is made to check the type of the url givven
const checkTypeOfWebsite = (url) => {
  if (url.includes("answers.com")) {
    return "answers.com";
  } else if (url.includes("quora.com")) {
    return "quora.com";
  } else {
    return "Unknown";
  }
};
// getting the Topics from dataObject
const getTopics = (dataObject) => {
  let arrayTopics = [];
  dataObject.content.topics.forEach((item) => {
    arrayTopics.push(item.title);
  });
  return arrayTopics;
};

//transform a json string into a javascript array, append to array, transforming back, saving
const addToJson = (objToAdd, jsonFile) => {
  let answers = JSON.parse(answersJson);
  answers.push(objToAdd);
  answersJson = JSON.stringify(answers);
  fs.writeFileSync(jsonFile, answersJson, "utf-8");
};

let url = "https://www.answers.com/Q/What_color_absorbs_the_most_light";
const getDataOfPost = (url) => {
  const websiteUrl = checkTypeOfWebsite(url);
  if (websiteUrl == "answers.com") {
    // requesting the html and then searching in it to find the data that we need.
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);
        let title = $("title").text();
        let answeredDate = $("h6").first().next().text();
        // getting the value in the script method where all the information abbout the post is stored
        var dataPost = JSON.parse(html.match(/window.appConfig = (\{.*\})/)[1]);
        let postVotes = dataPost.content.answerCount;
        let topics = getTopics(dataPost);
        // Insert the data in the object
        sumObject.websiteUrl = websiteUrl;
        sumObject.title = title;
        sumObject.topics = topics;
        sumObject.postVotes = postVotes;
        sumObject.answeredDate = answeredDate;
        sumObject.url = url;
        console.log(sumObject);
        addToJson(sumObject, "./const/answersScrapes.json");
      } else {
        console.log("Scrapping Failed");
        console.log(error);
      }
    });
  } else {
    // if the website url is not one of our website in the if else.
    console.log("not answers.com website");
  }
};

exports.getDataOfPost = getDataOfPost;
exports.addToJson = addToJson;
