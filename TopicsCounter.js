const fs = require("fs");
const posts = require("./answersScrapes.json");
let counterTopics = fs.readFileSync("counterTopics.json", "utf-8");
let topicsValueParse = JSON.parse(counterTopics);
let answers = JSON.parse(counterTopics);

const checkExist = (topics) => {
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].topics == topics) {
      answers[i].counter = answers[i].counter++;
      return true;
    }
  }
  answers.push({ topics: `${topics}`, counter: 0 });
  return false;
};

const addToJson = (objToAdd, jsonFile) => {
  counterTopics = JSON.stringify(answers);
  fs.writeFileSync(jsonFile, counterTopics, "utf-8");
};

const topicsCounter = () => {
  posts.forEach((item, index) => {
    posts[index].topics.forEach((item, index) => {
      checkExist(item);
    });
  });
  console.log(answers);
  counterTopics = JSON.stringify(answers);
  fs.writeFileSync("counterTopics.json", counterTopics, "utf-8");
};

topicsCounter();
// let answers = JSON.parse(counterTopics);
