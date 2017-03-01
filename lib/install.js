var pm2 = require("pm2");

pm2.connect(function(err) {
  process.stdout.write("Restarting app...");
  pm2.restart("BaylorBot", (err, desc) => {
    if (err) throw err;
    console.log("Done")
  });
});
