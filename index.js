const { parseStream } = require("fast-csv");
const fs = require("fs");

var oldFollowingStream = fs.createReadStream("./data/old/IG-following.csv");
var oldFollowersStream = fs.createReadStream("./data/old/IG-followers.csv");

var newFollowingStream = fs.createReadStream("./data/new/IG-following.csv");
var newFollowersStream = fs.createReadStream("./data/new/IG-followers.csv");

const oldFollowing = [];
const oldFollowers = [];

const newFollowing = [];
const newFollowers = [];

const readOldFollowing = new Promise((resolve) => {
  parseStream(oldFollowingStream, { headers: true })
    .on("data", function (data) {
      oldFollowing.push(data);
    })
    .on("end", function () {
      resolve();
    });
});

const readOldFollowers = new Promise((resolve) => {
  parseStream(oldFollowersStream, { headers: true })
    .on("data", function (data) {
      oldFollowers.push(data);
    })
    .on("end", function () {
      resolve();
    });
});

const readNewFollowing = new Promise((resolve) => {
  parseStream(newFollowingStream, { headers: true })
    .on("data", function (data) {
      newFollowing.push(data);
    })
    .on("end", function () {
      resolve(newFollowing);
    });
});

const readNewFollowers = new Promise((resolve) => {
  parseStream(newFollowersStream, { headers: true })
    .on("data", function (data) {
      newFollowers.push(data);
    })
    .on("end", function () {
      resolve();
    });
});

const comparingOldToNewData = async () => {
  Promise.all([
    readOldFollowing,
    readOldFollowers,
    readNewFollowing,
    readNewFollowers,
  ]).then(() => {
    console.log(
      "Has number of Following changed?",
      JSON.stringify(oldFollowing) !== JSON.stringify(newFollowing)
    );
    console.log(
      "Has number of Followers changed?",
      JSON.stringify(oldFollowers) !== JSON.stringify(newFollowers)
    );
    const result = oldFollowers.filter((person) => {
      return !newFollowers.find(
        (element) => JSON.stringify(element) == JSON.stringify(person)
      );
    });
    console.log("-----------------------------------------------");
    console.log(result.length, "People unfollowed you");
    result.map((person) => console.log(person.userName, "Unfollowed you"));
  });
};

comparingOldToNewData();
