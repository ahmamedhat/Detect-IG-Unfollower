
# Who Unfollowed Me on Instagram

This is a nodejs app that detects who has unfollowed you.

## Installation

After cloning the app install the dependencies.

Using npm

```bash
  npm install
```
Using yarn

```bash
  yarn
```
## Usage/Examples

Replace the 'IG-followers.csv' and 'IG-following.csv' files with your instagram data.

```javascript
var oldFollowingStream = fs.createReadStream("./data/old/IG-following.csv");
var oldFollowersStream = fs.createReadStream("./data/old/IG-followers.csv");

var newFollowingStream = fs.createReadStream("./data/new/IG-following.csv");
var newFollowersStream = fs.createReadStream("./data/new/IG-followers.csv");
```

When you first run the app there's no old followers data to test on so add your followers and following csv files to both old and new folders.

Whenever you notice that your unfollowers number decreases update the two files inside the 'new' folder with the new csv files, consider naming the new files to 'IG-following.csv' and 'IG-followers.csv' to work.



Then run in terminal using

```bash
  npm start
```

OR

```bash
  yarn start
```
