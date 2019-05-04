var totalPages;

function appendHTML(owner_id) {
  var html_append = "<div>";
  html_append +=
    "<div><b>Username</b> " + tooltipData[owner_id].username + "</div>";
  html_append +=
    "<div><b>Screen Name</b> " + tooltipData[owner_id].screen_name + "</div>";
  html_append +=
    "<div><b>About me</b> " + tooltipData[owner_id].about_me + "</div>";
  html_append +=
    "<div><b>Location</b> <i class='fa fa-map-marker'></i> " +
    tooltipData[owner_id].location +
    "</div>";
  html_append +=
    "<div><b># of Projects</b> <i class='fa fa-code-fork'></i> " +
    tooltipData[owner_id].projects +
    "</div>";
  html_append +=
    "<div><b>Skulls</b> " + tooltipData[owner_id].skulls + "</div>";
  html_append +=
    "<div><b>Followers</b> <i class='fa fa-users'></i> " +
    tooltipData[owner_id].followers +
    "</div>";
  html_append += "</div>";

  $("#" + owner_id)
    .empty()
    .append(html_append);
}

// keep track of tooltip data from previous tooltip uses
// to prevent additional calls for the same owner
var tooltipData = {};

var clientId = "moG119pnGbK2BxCzliJ4EzFezKm41Ev6OMvebyUerHnm7nrP";
var clientSecret = "Xu6XNriu77w4FofDcLNZlTAY2m3u37M8FgYitvZoEQXQElOF";
var userKey = "557T5zaOC4yzJDfs";
var apiKey = "?api_key=" + userKey;
var apiUrl = "https://api.hackaday.io/v1";

// creation of table upon receiving data from the HAD api
function createTable(data) {
  var html = "";

  for (var row = 0; row < data.per_page; row++) {
    html +=
      "<tr><td>" +
      data.projects[row].name +
      "</td><td><span class='tool-tip'>" +
      data.projects[row].owner_id +
      "</span><div style='z-index: 1000 !important' id='" +
      data.projects[row].owner_id +
      "'" +
      "class='tool-tip-details'></div></td><td>" +
      data.projects[row].summary +
      "</td></tr>";
  }

  // loading visual effect
  $("#paginationLoader").fadeOut(500, function() {
    $("#paginationLoader").remove();
    $("table").css({
      filter: "blur(0px)",
      "-webkit-filter": "blur(0px)",
      "-moz-filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-ms-filter": "blur(0px)"
    });
  });
  $("html, body").css({
    overflow: "auto",
    height: "auto"
  });
  $(".table_body")
    .empty()
    .append(html);
}

// H.A.D api call when tooltip hover
$(".tool-tip").mouseenter(function() {
  var owner_id = $(this).html();
  $("#" + owner_id).css({
    display: "inline",
    position: "absolute",
    color: "#111",
    border: "1px solid #dca",
    background: "#fffaf0",
    "z-index": "1000 !important"
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
