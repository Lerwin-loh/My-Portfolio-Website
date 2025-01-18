window.onscroll = function () { hide_title() ,sticky_func() };


// ----------------  HIDE or SHOW index title  ----------------
var title_div = document.getElementById("index_title");
var title_div_offsetTop = title_div.offsetTop - 100;

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
var insta = document.getElementById("insta_logo")
var navLinks = document.getElementsByClassName("nav-link");
var sticky = 0;
var navDiv = document.getElementById("navbar_div");
var navLogo = document.getElementById("nav");


function sticky_func() {
if (window.scrollY > sticky) {
    navDiv.classList.add("shrink")
    navLogo.classList.add("shrink-nav")
    navDiv.classList.remove("unShrink")
    navLogo.classList.remove("unShrink-nav")
    navbar.style.backgroundColor = "#ddd";
    for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].style.color = "#3e3e3e";
    }
    insta.src="/img/social-media/instagram.png";

}
else {
    navDiv.classList.remove("shrink");
    navLogo.classList.remove("shrink-nav")
    navDiv.classList.add("unShrink")
    navLogo.classList.add("unShrink-nav")
    navbar.style.backgroundColor = "#dddddd00";
    
    for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].style.color = "#ddd";
    }
    insta.src="/img/social-media/instagram_orange.png";
}
}



// ----------------  My Achievements Anchor Point  ----------------
// Anchorlink scrolling to middle of page
document.querySelector('a[href="#myAchievements"]').addEventListener('click', function(e) {
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
document.querySelector('a[href="#myTimeline"]').addEventListener('click', function(e) {
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
document.querySelector('a[href="#myAboutMe"]').addEventListener('click', function(e) {
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
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      }
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);