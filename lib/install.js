var spawn = require("child_process").spawn,
    path  = require("path");

spawn("cp", [
  path.resolve(__dirname, "../baylorbot"),
  "/etc/init.d/"
]).on("close", code => {
  spawn("chmod", [755, "/etc/init.d/baylorbot"]).on("close", code2 => {
    spawn("update-rc.d", ["baylorbot", "defaults"]).on("close", code3 => {
      spawn("sudo", ["service", "baylorbot", "restart"])
    })
  });
})
