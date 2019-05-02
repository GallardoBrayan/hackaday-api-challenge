var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 50;

function nextPage() {
  currentPage += 1;
  createPaginationButtons(currentPage, totalPages);
  loadList();
}

function previousPage() {
  currentPage -= 1;
  createPaginationButtons(currentPage, totalPages);
  loadList();
}

function loadList() {
  var begin = (currentPage - 1) * numberPerPage;
  var end = begin + numberPerPage;

  pageList = list.slice(begin, end);
  drawList();
  check();
}

function drawList() {
  $.ajax({
    url: "/projects?page=" + currentPage,
    type: "GET",
    success: function(data) {
      createTable(data);
    }
  });
}

function check() {
  document.getElementById("next").className =
    currentPage == totalPages ? "page-item disabled" : "page-item";
  document.getElementById("previous").className =
    currentPage == 1 ? "page-item disabled" : "page-item";
}

function buttonClick(id) {
  currentPage = id;
  createPaginationButtons(currentPage, totalPages);
  loadList();
}

createPaginationButtons = function(c, m) {
  range = paginationCalculation(c, m);
  html = "";
  html += '<nav aria-label="Page navigation example">';
  html += '<ul class="pagination">';
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

/*
function createPaginationButtons(c, m) {
  html = "";
  range = paginationCalculation(c, m);
  html +=
    "<input class='btn btn-light' type='button' id='previous' onclick='previousPage()' value='previous'/>";
  for (var i = 0; i < range.length; i++) {
    if (range[i] != "...") {
      html += "<input class='";
      if (currentPage == range[i]) {
        html += "btn btn-primary";
      } else {
        html += "btn btn-light";
      }
      html +=
        "' type='button' id='" +
        range[i] +
        "' onclick='buttonClick(" +
        range[i] +
        ")' value='" +
        range[i] +
        "' />";
    } else {
      html +=
        "<input class='btn btn-light' type='button' id='" +
        range[i] +
        "' value='" +
        range[i] +
        "' disabled/>";
    }
  }
  html +=
    "<input class='btn btn-light' type='button' id='next' onclick='nextPage()' value='next' />";
  $("#pagination")
    .empty()
    .append(html);
}
*/

function paginationCalculation(c, m) {
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
}

module.exports = { paginationCalculation };
