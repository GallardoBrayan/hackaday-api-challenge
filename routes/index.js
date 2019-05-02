var express = require("express"),
  http = require("http"),
  request = require("request"),
  router = express.Router();

var clientId = "moG119pnGbK2BxCzliJ4EzFezKm41Ev6OMvebyUerHnm7nrP";
var clientSecret = "Xu6XNriu77w4FofDcLNZlTAY2m3u37M8FgYitvZoEQXQElOF";
var userKey = "557T5zaOC4yzJDfs";

var apiKey = "?api_key=" + userKey;
var apiUrl = "https://api.hackaday.io/v1";
var apiAuthUrl = "https://api.hackaday.io/v1/me" + apiKey;
var oAuthRedirect =
  "https://hackaday.io/authorize?client_id=" + clientId + "&response_type=code";
var createTokenUrl = function(code) {
  return (
    "https://auth.hackaday.io/access_token?" +
    "client_id=" +
    clientId +
    "&client_secret=" +
    clientSecret +
    "&code=" +
    code +
    "&grant_type=authorization_code"
  );
};
/*
        for (
          var project = 0;
          project < bodyData["projects"].length;
          project++
        ) {
          for (
            var tag = 0;
            tag < bodyData["projects"][project]["tags"].length;
            tag++
          ) {
            if (bodyData["projects"][project]["tags"][tag] in recommendedData) {
              recommendedData[bodyData["projects"][project]["tags"][tag]].push(
                bodyData["projects"][project].name
              );
            } else {
              recommendedData[bodyData["projects"][project]["tags"][tag]] = [
                bodyData["projects"][project].name
              ];
            }
          }
        }
        console.log(recommendedData);
        */

router.get("/", function(req, res, next) {
  var url = apiUrl + "/projects" + apiKey;
  request.get(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      res.render("index", { data: json });
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

//  createPagination(data.page, last_page )

router.get("/projects", function(req, res, next) {
  var url = apiUrl + "/projects" + apiKey + "&page=" + req.query.page;
  console.log("asdilnfsk");
  request.get({ url: url, json: true }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.json(body);
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

router.get("/:page", function(req, res, next) {
  var url = apiUrl + "/projects" + apiKey + "&page=" + req.params.page;
  request.get(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      res.render("index", { data: json });
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

router.get("/projects/:id", function(req, res, next) {
  var url = apiUrl + "/projects/" + req.params.id + apiKey;
  request.get({ url: url, json: true }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

module.exports = router;
