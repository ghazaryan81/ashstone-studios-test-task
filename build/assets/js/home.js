(()=>{"use strict";var e={852:(e,t,o)=>{o.r(t)}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{function e(e){e.preventDefault(),e.stopPropagation()}o(852),document.querySelectorAll("a[href='#']").forEach((function(t){t.addEventListener("click",e)}));var t=function(e){return e?r.classList.add("display-flex"):r.classList.remove("display-flex")},n=document.querySelector(".menu"),r=document.querySelector(".mobile-menu-header"),i=document.querySelector(".hamburger-menu"),s=document.querySelector(".close-menu"),u=document.querySelector(".main-header"),l=!1;i.addEventListener("click",(function(e){(l=!l)?n.classList.add("menu-mobile-visible"):n.classList.remove("menu-mobile-visible"),t(l)})),s.addEventListener("click",(function(e){(l=!l)?n.classList.add("menu-mobile-visible"):n.classList.remove("menu-mobile-visible"),t(l)}));var c=0;window.onscroll=function(){var e=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;e>=c||n.setAttribute("class","menu menu-to-top"),c=e,function(e){e>u.offsetHeight+200?n.classList.add("menu-to-top"):n.classList.remove("menu-to-top")}(e)}})()})();