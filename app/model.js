var loggedOut = true;
export function getPage() {
  let hash = window.location.hash;
  let pageID = hash.replace("#", "");

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      if (pageID == "login") {
        setLoginToggle();
      }
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  }
}

function setLoginToggle() {
  if (loggedOut) {
    $("nav .login").html("Login");
    $(".hamburger-icon .login").html("Login");
    $.get(`pages/loggedout.html`, function (data) {
      $("#app #login-inject").html(data);
      loggedOut = false;
      loginToggle();
    });
  } else {
    $("nav .login").html("Log out");
    $(".hamburger-icon .login").html("Log out");
    $.get(`pages/loggedin.html`, function (data) {
      $("#app #login-inject").html(data);
      loggedOut = true;
      loginToggle();
    });
  }
}

function loginToggle() {
  $(document)
    .off("submit", "#loginForm")
    .on("submit", "#loginForm", function (e) {
      e.preventDefault();
      loggedOut = false;
      setLoginToggle();
    });

  $(document)
    .off("submit", "#signupForm")
    .on("submit", "#signupForm", function (e) {
      e.preventDefault();
      loggedOut = false;
      setLoginToggle();
    });

  if (!loggedOut) {
    $(".nav-holder nav ul li .login")
      .off("click")
      .on("click", function (e) {
        setLoginToggle();
      });
    $(".hamburger-icon .login")
      .off("click")
      .on("click", function (e) {
        setLoginToggle();
      });
  }
}

$(document).on("click", ".signout", function (e) {
  setLoginToggle();
  loggedOut = true;
});
