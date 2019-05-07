var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 50;
var totalPages;

// loading visual effect
loader = function() {
  $("html, body").css({
    overflow: "hidden",
    height: "100%"
  });

  $("#wrapper").append(
    '<div id="paginationLoader"><div class="loader">Loading...</div></div>'
  );
  $("table").css({
    filter: "blur(10px)",
    "-webkit-filter": "blur(10px)",
    "-moz-filter": "blur(10px)",
    "-o-filter": "blur(10px)",
    "-ms-filter": "blur(10px)"
  });
};

nextPage = function() {
  currentPage += 1;
  createPaginationButtons(currentPage, totalPages);
  loadList();
  loader();
  var newURL = "/" + currentPage;
  window.history.pushState("", "", newURL);
};

// next page pagination for initial server side loading of web app
nextPageSSR = function(c, t) {
  currentPage = c;
  totalPages = t;
  currentPage += 1;
  createPaginationButtons(currentPage, totalPages);
  loadList();
  loader();
  var newURL = "/" + currentPage;
  window.history.pushState("", "", newURL);
};

// non server side rendering
previousPage = function() {
  currentPage -= 1;
  createPaginationButtons(currentPage, totalPages);
  loadList();
  $(window).scrollTop(0);
  loader();
  var newURL = "/" + currentPage;
  window.history.pushState("", "", newURL);
};

// previous page pagination for initial server side loading
// when a permanent url is used
previousPageSSR = function(current, total) {
  currentPage = current;
  currentPage -= 1;
  totalPages = total;
  createPaginationButtons(currentPage, total);
  loadList();
  $(window).scrollTop(0);
  loader();
  var newURL = "/" + currentPage;
  window.history.pushState("", "", newURL);
};

loadList = function() {
  var begin = (currentPage - 1) * numberPerPage;
  var end = begin + numberPerPage;
  pageList = list.slice(begin, end);
  drawList();
  check();
};

drawList = function() {
  $.ajax({
    url: "/projects?page=" + currentPage,
    type: "GET",
    success: function(data) {
      createTable(data);
    }
  });
};

check = function() {
  document.getElementById("next").className =
    currentPage == totalPages ? "page-item disabled" : "page-item";
  document.getElementById("previous").className =
    currentPage == 1 ? "page-item disabled" : "page-item";
};

buttonClick = function(id) {
  currentPage = id;
  createPaginationButtons(currentPage, totalPages);
  loadList();
  $(window).scrollTop(0);
  loader();
  var newURL = "/" + id;
  window.history.pushState("", "", newURL);
};

buttonClickSSR = function(id, total) {
  currentPage = id;
  totalPages = total;
  createPaginationButtons(currentPage, total);
  loadList();
  $(window).scrollTop(0);
  loader();
  var newURL = "/" + id;
  window.history.pushState("", "", newURL);
};

// Create the pagination buttons depending on the range of pages
createPaginationButtons = function(c, m) {
  currentPage = c;
  totalPages = m;
  range = paginationCalculation(c, m);
  html = "";
  html += "<nav>";
  html += '<ul class="pagination justify-content-center">';
  html += '<li class="';
  if (currentPage == 1) {
    html += "page-item disabled";
  } else {
    html += "page-item";
  }
  html += '"';
  html +=
    'onclick="previousPage()" id="previous"><a class="page-link" href="javascript:void(0)">Previous</a></li>';
  for (var i = 0; i < range.length; i++) {
    if (range[i] != "...") {
      html += '<li class="page-item';
      if (range[i] == currentPage) {
        html += " active";
      }
      html += '" onclick="buttonClick(' + range[i] + ')" id="';
      html += range[i] + '"><a class="page-link" href="javascript:void(0)">';
      html += range[i] + "</a></li>";
    } else {
      html +=
        '<li class="page-item disabled" id="' +
        range[i] +
        '"><a class="page-link" href="javascript:void(0)">...</a></li>';
    }
  }
  html += '<li class="';
  if (currentPage == totalPages) {
    html += "page-item disabled";
  } else {
    html += "page-item";
  }
  html +=
    '"disabled" id="next" onclick="nextPage()"><a class="page-link" href="javascript:void(0)">Next</a></li>';
  html += "</ul></nav>";
  $("#pagination")
    .empty()
    .append(html);
};

// calculate a range of pages
// this is the logic to get the current page and nearby pages of the current page
paginationCalculation = function(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
};

module.exports = {
  paginationCalculation,
  previousPage,
  previousPageSSR,
  currentPage,
  totalPages,
  nextPage,
  nextPageSSR,
  loader,
  buttonClick,
  buttonClickSSR
};
