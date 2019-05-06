function getOwnerName(owner) {
  var owner_url = "http://api.hackaday.io/v1/users/" + owner + apiKey;

  $.ajax({
    url: owner_url,
    type: "GET",
    success: function(data) {
      return data.username;
    }
  });
}

module.exports = {
  getOwnerName
};
