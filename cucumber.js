module.exports = {
  default: {
    require: [
      "Features/Steps/*.js",
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ]
  }
};