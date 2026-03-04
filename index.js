const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommit = async (date) => {
  const data = {
    date: date,
  };

  await jsonfile.writeFile(FILE_PATH, data);

  await git.add([FILE_PATH]);

  await git.commit(date, {
    "--date": date,
  });
};

const run = async () => {
  const startDate = moment().subtract(1, "year");
  const endDate = moment();

  let currentDate = startDate.clone();
  let totalCommits = 0;

  while (currentDate.isBefore(endDate)) {
    const randomCommits = Math.floor(Math.random() * 5);

    for (let i = 0; i < randomCommits; i++) {
      await makeCommit(currentDate.format());
      totalCommits++;
    }

    console.log(`Processed: ${currentDate.format("YYYY-MM-DD")}`);
    currentDate.add(1, "day");
  }

  console.log(`Done! Total commits: ${totalCommits}`);

  await git.push();
};

run();
