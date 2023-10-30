import { getPage } from "./model.js";

function initListeners() {
  $(window).on("hashchange", getPage);
  getPage();
}

$(".hamburger-icon").on("click", () => {
  $(".hamburger-icon").toggleClass("open");
  $("body").toggleClass("mobile-overflow");
});

$(document).ready(function () {
  initListeners();
});
