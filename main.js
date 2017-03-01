#!/usr/bin/env node
var handlebars = require("handlebars"),
    fs = require("fs"),
    sidebar;

// Start the CI Server
require("./lib/ci");

var getGames = require("./lib/games"),
    updateSidebar = require("./lib/sidebar")

// Read and Compile the template
fs.readFile("sidebar.hbs", (err, contents) => {
  sidebar = handlebars.compile(contents.toString());
  // Update every thirty seconds
  setInterval(() => {
    console.log("Getting scores...");
    getGames()
      .then(games => ({ games }))
      .then(sidebar)
      .then(updateSidebar)
      .then(() => console.log("Updated Sidebar successfully"))
      .catch(e => console.log("Could not update sidebar: " + e))
  }, 30000)
});
