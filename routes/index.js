var express = require("express"),
  http = require("http"),
  request = require("request"),
  router = express.Router();

var apiData = {};
apiData.clientId = "moG119pnGbK2BxCzliJ4EzFezKm41Ev6OMvebyUerHnm7nrP";
apiData.clientSecret = "Xu6XNriu77w4FofDcLNZlTAY2m3u37M8FgYitvZoEQXQElOF";
apiData.userKey = "557T5zaOC4yzJDfs";

apiData.apiKey = "?api_key=" + apiData.userKey;
apiData.apiUrl = "https://api.hackaday.io/v1";
apiData.apiAuthUrl = "https://api.hackaday.io/v1/me" + apiData.apiKey;
apiData.oAuthRedirect =
  "https://hackaday.io/authorize?client_id=" +
  apiData.clientId +
  "&response_type=code";
apiData.createTokenUrl = function(code) {
  return (
    "https://auth.hackaday.io/access_token?" +
    "client_id=" +
    this.clientId +
    "&client_secret=" +
    this.clientSecret +
    "&code=" +
    code +
    "&grant_type=authorization_code"
  );
};

if (!apiData.userKey || !apiData.clientId || !apiData.clientSecret) {
  console.log("Please fill in your client data!  See line 10 in server.js.");
  console.log("Ending node process.");
  process.exit();
}

/*
      <!--
              <div>
        <ul>
          <%= apiData.forEach(function(item) { %>
          <li><%= item %></li>
          <% }); %>
        </ul>
      </div>

        <div><%= JSON.stringify(apiData) %></div>
      -->
*/

/* GET home page. */
router.get("/projects", function(req, res, next) {
  var url = apiData.apiUrl + "/projects" + apiData.apiKey + "&per_page=10"; // + "&sortby=skulls";
  console.log("\nProject Data Query: ", url);

  request.get(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var bodyData = parseJSON(body);
      var recommendedData = {};
      for (var project = 0; project < bodyData["projects"].length; project++) {
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
      res.render("index", {
        dataType: "Top Skulled Projects",
        title: "Express",
        apiData: bodyData["projects"]
      });
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

router.get("/projects/:id", function(req, res, next) {
  var url = apiData.apiUrl + "/projects/" + req.params.id + apiData.apiKey;
  console.log("\nProject Data Query: ", url);

  request.get(url, function(error, response, body) {
    console.log(body);
    if (!error && response.statusCode === 200) {
      var bodyData = parseJSON(body);
      res.send(bodyData);
    } else {
      console.log("\nError: ", error, "\nResponse body: ", body);
      res.render(error);
    }
  });
});

function parseJSON(value) {
  var parsed;
  try {
    parsed = JSON.parse(value);
  } catch (e) {
    console.log("Error parsing JSON: ", e, "\nInput: ", value);
  }
  return parsed || false;
}

module.exports = router;
