var snoowrap = require("snoowrap"),
    credentials = require("../credentials");

var reddit = new snoowrap(credentials.reddit);

var lastSidebar = ""

module.exports = function updateSidebar(sidebar) {
  return new Promise(function(resolve, reject) {
    try {
      if (sidebar === lastSidebar) {
        resolve(false);
      } else {
        reddit.getSubreddit("baylorsports")
          .editSettings({
            description: sidebar
          })
        lastSidebar = sidebar;
      }
    } catch(e) {
      reject(e);
    }
  });
}
