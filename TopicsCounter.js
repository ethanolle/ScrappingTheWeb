const fs = require("fs");
const posts = require("./const/answersScrapes.json");
let counterTopics = fs.readFileSync("./const/counterTopics.json", "utf-8");
let counterTopicsPars = JSON.parse(counterTopics);

//here we are checking if the topics exist if it is we uping the counter if not creating one
const checkAndAdd = (topics) => {
  for (var i = 0; i < counterTopicsPars.length; i++) {
    if (counterTopicsPars[i].topics == topics) {
      counterTopicsPars[i].counter = counterTopicsPars[i].counter + 1;
      return;
    }
  }
  counterTopicsPars.push({ topics: `${topics}`, counter: 1 });
};

//we are running over all answer and all there topics
const topicsCounterActivation = () => {
  posts.forEach((item, index) => {
    posts[index].topics.forEach((item) => {
      checkAndAdd(item);
    });
  });
  counterTopics = JSON.stringify(counterTopicsPars);
  fs.writeFileSync("./const/counterTopics.json", counterTopics, "utf-8");
};
topicsCounterActivation();
exports.topicsCounterActivation = topicsCounterActivation;
