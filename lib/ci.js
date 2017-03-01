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
  update.on("close", code => {
    if (code) {
      console.log("Could not update from GitHub");
      res.end(500);
    } else {
      console.log("Done. Restarting daemon");
      let restart = spawn("/etc/init.d/baylorbot.sh", ["restart"]);
      restart.stdout.pipe(process.stdout);
      restart.stderr.pipe(process.stderr);
    }
  });

});

app.listen(48065);
