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

router.get("/projects", function(req, res, next) {
  var url = apiUrl + "/projects" + apiKey + "&page=" + req.query.page;
  request.get({ url: url, json: true }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
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

//6668

var recommendationData = function(jsonData, owner_name, res) {
  var recommendedData = {};
  var urls = [];
  var count = 0;
  var responses = [];
  var base_url = "https://api.hackaday.io/v1/projects/search?search_term=";
  for (var i = 0; i < jsonData.tags.length; i++) {
    var value = encodeURIComponent(jsonData.tags[i]).replace(/%20/g, "+");
    urls.push(base_url + value + "&api_key=" + userKey);
  }

  for (var url = 0; url < urls.length; url++) {
    request.get(urls[url], function(error, response, body) {
      if (!error && response.statusCode === 200) {
        responses.push(body);

        if (urls.length == responses.length) {
          for (var i = 0; i < jsonData.tags.length; i++) {
            for (var result = 0; result < responses.length; result++) {
              parsed = JSON.parse(responses[result]);
              for (var proj = 0; proj < parsed.projects.length; proj++) {
                if (parsed.projects[proj].name) {
                  if (
                    !(parsed.projects[proj].name in recommendedData) &&
                    jsonData.name != parsed.projects[proj].name
                  ) {
                    recommendedData[parsed.projects[proj].name] =
                      parsed.projects[proj].id;
                  }
                }
              }
            }
          }
          res.render("projectDetail", {
            data: jsonData,
            owner_name: owner_name,
            recommended: recommendedData
          });
        }
      } else {
        console.log("\nError: ", error, "\nResponse body: ", body);
        res.render(error);
      }
    });
  }
};

// request for owner name
var owner_info = function(owner_url, jsonData, res) {
  request.get(owner_url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var ownerjson = JSON.parse(body);
      console.log(ownerjson);
      recommendationData(jsonData, ownerjson.screen_name, res);
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
};

// get request for specific project
router.get("/projects/:id", function(req, res, next) {
  var url = apiUrl + "/projects/" + req.params.id + apiKey;
  request.get(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      var ownerURL =
        "http://api.hackaday.io/v1/users/" + json.owner_id + apiKey;
      // request for owner information
      owner_info(ownerURL, json, res);
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

module.exports = router;
