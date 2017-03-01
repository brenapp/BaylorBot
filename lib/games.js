var x = require('x-ray')({
  filters: {
    extractScore(value, target) {
      return [
        value.substring(0, value.indexOf(",")).replace(/[^0-9]/g,""),
        value.substring(value.indexOf(",") + 1, value.lastIndexOf("-")).replace(/[^0-9]+/g, ""),
        value.substring(value.lastIndexOf("-") + 1, value.lastIndexOf("\n"))
      ].map(a=>a.trim())[target]

    },
    opponent: (value, target) => [value.split("vs. ")[1], value.replace(/Baylor [0-9]+\, ([^0-9]+)[^]+/g, "$1").trim()][target],
    date: value => new Date(value),
    cleanse: value => value.replace(/ +/g, " ")
  }
});

module.exports = function getGames() {
  return new Promise(function(resolve, reject) {
    x("http://www.statbroadcast.com/events/statmonitr.php?gid=bay", ".sb_body_content .ui-widget-content", [{
      "sport": ".sidebyside.alignmiddle p:nth-child(1)",
      "date": ".sidebyside.alignmiddle p:nth-child(2) | date",
      "opponent": {
        "full": ".sidebyside.alignmiddle .bcs_p2 .bcs_p1 | opponent:0",
        "short": ".sidebyside.alignmiddle .bcs_p2 b:nth-child(3) | opponent:1"
      },
      "score": {
        "baylor": ".sidebyside.alignmiddle .bcs_p2 b:nth-child(3) | extractScore:0",
        "opponent": ".sidebyside.alignmiddle .bcs_p2 b:nth-child(3) | extractScore:1"
      },
      "status": ".sidebyside.alignmiddle .bcs_p2 b:nth-child(3) | extractScore:2",
      "location": ".sidebyside.alignmiddle .bcs_p3:last-child | cleanse"
    }])( (err, res) => err ? reject(err) : resolve(res) )
  })
}
