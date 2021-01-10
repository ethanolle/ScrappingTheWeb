const fs = require("fs");
const posts = require("./const/answersScrapes.json");
// let postsParse = JSON.parse(posts);
let counterTopics = fs.readFileSync("./const/counterTopics.json", "utf-8");
let answers = JSON.parse(counterTopics);

//here we are checking if the topics exist if it is we uping the counter if not creating one
const checkAndAdd = (topics) => {
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].topics == topics) {
      console.log(answers[i].counter);
      answers[i].counter = answers[i].counter + 1;
      return;
    }
  }
  answers.push({ topics: `${topics}`, counter: 1 });
};

//we are running over all answer and all there topics
const topicsCounter = () => {
  posts.forEach((item, index) => {
    posts[index].topics.forEach((item) => {
      checkAndAdd(item);
    });
  });
  counterTopics = JSON.stringify(answers);
  fs.writeFileSync("./const/counterTopics.json", counterTopics, "utf-8");
};

topicsCounter();
