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
