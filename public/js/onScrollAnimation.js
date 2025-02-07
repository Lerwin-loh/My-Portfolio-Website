window.onscroll = function () { hide_title(), sticky_func() };


// ----------------  HIDE or SHOW index title  ----------------
var title_div = document.getElementById("index_title");
var title_div_offsetTop = title_div.offsetTop;

function hide_title() {
  if (window.scrollY > title_div_offsetTop) {
    title_div.classList.add("hide_title")
    title_div.classList.remove("show_title");
  }
  else {
    title_div.classList.remove("hide_title");
    title_div.classList.add("show_title")
  }
}


// ----------------  Navbar Sticky  ----------------
var navbar = document.querySelector("nav");
var insta = document.getElementById("insta_logo");
var navToggler = document.getElementById("navbar-toggler-icon");
var sticky = 0;
var navLogo = document.getElementById("Name_logoo");

function navbarMenuClick() {
  sticky_func()
};

function sticky_func() {
  if (window.scrollY > sticky) {
    navbar.style.backgroundColor = "#ddd";
    navbar.style.transition = "1s";
    insta.src = "/img/social-media/instagram.png";
    navToggler.style.filter = "invert(100%) brightness(100%)"
    navLogo.style.color = "#292929"

    var collapsed = document.getElementsByClassName("collapsed").length
    if (collapsed == 0) {
      navToggler.style.filter = "invert(0%) brightness(100%)"
    }


  }
  else {
    navbar.style.backgroundColor = "#dddddd00";
    navbar.style.transition = "1s";
    insta.src = "/img/social-media/instagram_orange.png";
    navToggler.style.filter = "invert(0%) brightness(100%)"
    navLogo.style.color = "#FFF"
  }
}

// collapsing navbar when anchor link is clicked
document.addEventListener("DOMContentLoaded", function () {
  let navLinks = document.querySelectorAll(".nav-link");
  let navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });
});

// ----------------  My Achievements Anchor Point  ----------------
// Anchorlink scrolling to middle of page
document.querySelector('a[href="#myAchievements"]').addEventListener('click', function (e) {
  e.preventDefault();  // Prevent default jump to the anchor

  // Get the position of the anchor element
  const anchor = document.getElementById('myAchievements');
  const anchorPosition = anchor.getBoundingClientRect().top + window.scrollY;

  // Calculate the position to scroll to (adjust by half the window height)
  const middlePosition = anchorPosition - window.innerHeight / 2 + 80;

  // Scroll to the desired position
  window.scrollTo({
    top: middlePosition,
    behavior: 'smooth'
  });
});



// ----------------  My Timeline Anchor Point  ----------------
// Anchorlink scrolling to middle of page
document.querySelector('a[href="#myTimeline"]').addEventListener('click', function (e) {
  e.preventDefault();  // Prevent default jump to the anchor

  // Get the position of the anchor element
  const anchor = document.getElementById('myTimeline');
  const anchorPosition = anchor.getBoundingClientRect().top + window.scrollY;

  // Calculate the position to scroll to (adjust by half the window height)
  const middlePosition = anchorPosition - window.innerHeight / 2 + 70;

  // Scroll to the desired position
  window.scrollTo({
    top: middlePosition,
    behavior: 'smooth'
  });
});



// ----------------  My AboutMe Anchor Point  ----------------
// Anchorlink scrolling to middle of page
document.querySelector('a[href="#myAboutMe"]').addEventListener('click', function (e) {
  e.preventDefault();  // Prevent default jump to the anchor

  // Get the position of the anchor element
  const anchor = document.getElementById('myAboutMe');
  const anchorPosition = anchor.getBoundingClientRect().top + window.scrollY;

  // Calculate the position to scroll to (adjust by half the window height)
  const middlePosition = anchorPosition - window.innerHeight / 2;

  // Scroll to the desired position
  window.scrollTo({
    top: middlePosition,
    behavior: 'smooth'
  });
});



// ----------------  Timeline Fade In On Scroll  ----------------
var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if (!items[i].classList.contains("in-view")) {
        items[i].classList.add("in-view");
      }
    } else if (items[i].classList.contains("in-view")) {
      items[i].classList.remove("in-view");
    }
  }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);