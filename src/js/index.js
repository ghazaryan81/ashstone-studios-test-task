import "../styles/main";

const hashLinks = document.querySelectorAll("a[href='#']");

hashLinks.forEach((item) => {
 item.addEventListener("click", hashLinkHandler);
});

function hashLinkHandler(e) {
 e.preventDefault();
 e.stopPropagation();
}

window.onscroll = function () {
 let posTop =
  window.pageYOffset !== undefined
   ? window.pageYOffset
   : (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
 console.log(posTop);
};

let menu = document.querySelector(".menu");
let mobileMenuHeader = document.querySelector(".mobile-menu-header");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const closeMenu = document.querySelector(".close-menu");
let mobile = false;
hamburgerMenu.addEventListener("click", (e) => {
 mobile = !mobile;
 menu.setAttribute("class", mobile ? "menu menu-mobile-visible" : "menu");
 mobileMenuHeader.setAttribute(
  "class",
  mobile ? "mobile-menu-header display-flex" : "mobile-menu-header"
 );
});

closeMenu.addEventListener("click", (e) => {
 mobile = !mobile;
 menu.setAttribute("class", mobile ? "menu menu-mobile-visible" : "menu");
 mobileMenuHeader.setAttribute(
  "class",
  mobile ? "mobile-menu-header display-flex" : "mobile-menu-header"
 );
});
