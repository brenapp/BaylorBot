/**
 * BaylorBot Continous Integration
 * When new code is pushed to the GitHub repo, it redeploys here
 */
var express = require("express"),
    app = express(),
    spawn = require("child_process").spawn,
    bodyParser = require("body-parser"),
    pm2 = require("pm2");

pm2.connect();


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
      console.log("Done");
      console.log("Reinstalling Package...")
      let install = spawn("npm", ["install"]);
      install.stdout.pipe(process.stdout);
      install.stderr.pipe(process.stderr);
      install.on("close", function() {
        console.log("Done.");
        process.stdout.write("Restarting app...");
        pm2.restart("BaylorBot", (err, desc) => {
          if (err) throw err;
          console.log("Done")
        });
      })

    }
  });

});

app.listen(48065, "0.0.0.0", function() {
  console.log("CI Server Started at 0.0.0.0:48065");
});
