window.onscroll = function () { sticky_func(), scrollFunction()};



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



var toTop_button = document.getElementById("backToTopBtn");

function scrollFunction() {
    console.log(document.body.scrollTop, document.documentElement.scrollTop)
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      toTop_button.style.display = "flex";
    } else {
      toTop_button.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// ----------------  myTestimonials Anchor Point  ----------------
// Select all anchor links pointing to "#myAboutMe"
let all_testimonials = document.querySelectorAll("a");
let filtered_testimonials = Array.from(all_testimonials).filter(link => link.getAttribute("href") === "/#myTestimonials");

for (let i = 0; i < filtered_testimonials.length; i++) {
  filtered_testimonials[i].addEventListener("click", function (e) {
    e.preventDefault();  // Prevent default anchor jump

    // Check if the link is for the same page
    const anchor = document.getElementById('myTestimonials');
    if (anchor) {
      scrollToAnchor(anchor);
    } else {
      // Different page: Navigate first, then scroll on load
      window.location.href = "/#myTestimonials";
    }
  });
}

// ----------------  myAchievements Anchor Point  ----------------
// Select all anchor links pointing to "#myAboutMe"
let all_achievements = document.querySelectorAll("a");
let filtered_achievements = Array.from(all_achievements).filter(link => link.getAttribute("href") === "/#myAchievements");

for (let i = 0; i < filtered_achievements.length; i++) {
  filtered_achievements[i].addEventListener("click", function (e) {
    e.preventDefault();  // Prevent default anchor jump

    // Check if the link is for the same page
    const anchor = document.getElementById('myAchievements');
    if (anchor) {
      scrollToAnchor(anchor);
    } else {
      // Different page: Navigate first, then scroll on load
      window.location.href = "/#myAchievements";
    }
  });
}

// ----------------  myTimeline Anchor Point  ----------------
// Select all anchor links pointing to "#myAboutMe"
let all_timelines = document.querySelectorAll("a");
let filtered_timelines = Array.from(all_timelines).filter(link => link.getAttribute("href") === "/#myTimeline");

for (let i = 0; i < filtered_timelines.length; i++) {
  filtered_timelines[i].addEventListener("click", function (e) {
    e.preventDefault();  // Prevent default anchor jump

    // Check if the link is for the same page
    const anchor = document.getElementById('myTimeline');
    if (anchor) {
      scrollToAnchor(anchor);
    } else {
      // Different page: Navigate first, then scroll on load
      window.location.href = "/#myTimeline";
    }
  });
}

// ----------------  myAboutMe Anchor Point  ----------------
// Select all anchor links pointing to "#myAboutMe"
let all_aboutMes = document.querySelectorAll("a");
let filtered_aboutMes = Array.from(all_aboutMes).filter(link => link.getAttribute("href") === "/#myAboutMe");

for (let i = 0; i < filtered_aboutMes.length; i++) {
  filtered_aboutMes[i].addEventListener("click", function (e) {
    e.preventDefault();  // Prevent default anchor jump

    // Check if the link is for the same page
    const anchor = document.getElementById('myAboutMe');
    if (anchor) {
      scrollToAnchor(anchor);
    } else {
      // Different page: Navigate first, then scroll on load
      window.location.href = "/#myAboutMe";
    }
  });
}

// Function to smoothly scroll to the anchor in the middle of the screen
function scrollToAnchor(anchor) {
  setTimeout(() => {
    const anchorPosition = anchor.getBoundingClientRect().top + window.scrollY;
    const middlePosition = anchorPosition - window.innerHeight / 2 + 30;

    // Smooth scroll to the middle of the page
    window.scrollTo({
      top: middlePosition,
      behavior: "smooth"
    });
  }, 100); // Small delay to ensure rendering
}

// Handle anchor scrolling when loading the page
window.addEventListener("load", function () {
  if (window.location.hash === "#myAboutMe") {
    const anchor = document.getElementById('myAboutMe');
    scrollToAnchor(anchor);
  }

  if (window.location.hash === "#myAchievements") {
    const anchor = document.getElementById('myAchievements');
    scrollToAnchor(anchor);
  }

  if (window.location.hash === "#myTestimonials") {
    const anchor = document.getElementById('myTestimonials');
    scrollToAnchor(anchor);
  }

  if (window.location.hash === "#myTimeline") {
    const anchor = document.getElementById('myTimeline');
    scrollToAnchor(anchor);
  }
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

  // for (var i = 0; i < achieve_head_title_elements.length; i++) {
  //   if (isElementInViewport(achieve_head_title_elements[i])) {
  //     if (!achieve_head_title_elements[i].classList.contains("head_title_visible")) {
  //       achieve_head_title_elements[i].classList.add("head_title_visible");
  //     }
  //   } else if (achieve_head_title_elements[i].classList.contains("head_title_visible")) {
  //     achieve_head_title_elements[i].classList.remove("head_title_visible");
  //   }
  // }

}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);