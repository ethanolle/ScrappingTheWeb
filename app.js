const { getPostActivation } = require("./getPost");
const { topicsCounterActivation } = require("./topicsCounter");

async function startScraping() {
  try {
    await getPostActivation();
    console.log("get post finished");
    await topicsCounterActivation();
    console.log("topicsCounterFinished");
  } catch (err) {
    console.log(err);
  }
}

startScraping();
