/**
 * BaylorBot Continous Integration
 * When new code is pushed to the GitHub repo, it redeploys here
 */
var express = require("express"),
    app = express(),
    spawn = require("child_process").spawn,
    bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/", function(req, res) {
  console.log("Got CI Webhook for GitHub, downloading...");

  let updater = spawn("git", ["pull"]);
  updater.stdout.pipe(process.stdout);
  updater.stderr.pipe(process.stderr);
  updater.on("close", code => {
    if (code) {
      console.log("Could not update from GitHub");
      res.status(500);
      res.end("Could not clone from github");
    } else {
      console.log("Done. Restarting daemon");
      let restart = spawn("npm", ["install"]);
      restart.stdout.pipe(process.stdout);
      restart.stderr.pipe(process.stderr);
      res.status(200);
      res.end("Updated daemon successfully");
    }
  });

});

app.listen(48065, "0.0.0.0", function() {
  console.log("CI Server Started at 0.0.0.0:48065");
});
