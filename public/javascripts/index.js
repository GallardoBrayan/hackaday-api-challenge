$(document).ready(function() {
  $.ajax({
    url: "/projects?page=1",
    type: "GET",
    success: function(data) {
      createTable(data);
    }
  });
});

var tooltipData = {};

var clientId = "moG119pnGbK2BxCzliJ4EzFezKm41Ev6OMvebyUerHnm7nrP";
var clientSecret = "Xu6XNriu77w4FofDcLNZlTAY2m3u37M8FgYitvZoEQXQElOF";
var userKey = "557T5zaOC4yzJDfs";
var apiKey = "?api_key=" + userKey;
function createTable(data) {
  var html = "";
  for (var row = 0; row < data.per_page; row++) {
    html +=
      "<tr><td>" +
      data.projects[row].name +
      "</td><td><span class='tool-tip'>" +
      data.projects[row].owner_id +
      "</span><div id='" +
      data.projects[row].owner_id +
      "'" +
      "class='tool-tip-details'></div></td><td>" +
      data.projects[row].summary +
      "</td></tr>";
  }

  $(".table_body").append(html);

  function appendHTML(owner_id) {
    var html_append = "<div>";
    html_append +=
      "<div class='owner-text'><b>Username</b> " +
      tooltipData[owner_id].username +
      "</div>";
    html_append +=
      "<div class='owner-text'><b>Screen Name</b> " +
      tooltipData[owner_id].screen_name +
      "</div>";
    html_append +=
      "<div class='owner-text'><b>About me</b> " +
      tooltipData[owner_id].about_me +
      "</div>";
    html_append +=
      "<div class='owner-text'><b>Location</b> <i class='fa fa-map-marker'></i> " +
      tooltipData[owner_id].location +
      "</div>";
    html_append +=
      "<div class='owner-text'><b># of Projects</b> <i class='fa fa-code-fork'></i> " +
      tooltipData[owner_id].projects +
      "</div>";
    html_append +=
      "<div class='owner-text'><b>Skulls</b> " +
      tooltipData[owner_id].skulls +
      "</div>";
    html_append +=
      "<div class='owner-text'><b>Followers</b> <i class='fa fa-users'></i> " +
      tooltipData[owner_id].followers +
      "</div>";
    html_append += "</div>";

    $("#" + owner_id).append(html_append);
  }

  $(".tool-tip").mouseenter(function() {
    var owner_id = $(this).html();
    $("#" + owner_id).css({
      display: "inline",
      position: "absolute",
      color: "#111",
      border: "1px solid #dca",
      background: "#fffaf0"
    });

    var owner_url = "http://api.hackaday.io/v1/users/" + owner_id + apiKey;
    if (!(owner_id in tooltipData)) {
      $.ajax({
        url: owner_url,
        type: "GET",

        success: function(data) {
          tooltipData[owner_id] = {
            username: data.username,
            screen_name: data.screen_name,
            about_me: data.about_me,
            location: data.location,
            projects: data.projects,
            skulls: data.skulls,
            followers: data.followers
          };
          appendHTML(owner_id);
        }
      });
    } else {
      appendHTML(owner_id);
    }
  });

  $(".tool-tip").mouseleave(function() {
    var owner_id = $(this).html();
    $("#" + owner_id).html("");
    $("#" + owner_id).css({
      display: "none"
    });
  });
}
