(()=>{"use strict";var e={852:(e,t,o)=>{o.r(t)}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var u=t[n]={exports:{}};return e[n](u,u.exports,o),u.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{function e(e){e.preventDefault(),e.stopPropagation()}o(852),document.querySelectorAll("a[href='#']").forEach((function(t){t.addEventListener("click",e)})),window.onscroll=function(){void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop};var t=document.querySelector(".menu"),n=document.querySelector(".mobile-menu-header"),r=document.querySelector(".hamburger-menu"),u=document.querySelector(".close-menu"),i=!1;r.addEventListener("click",(function(e){i=!i,t.setAttribute("class",i?"menu menu-mobile-visible":"menu"),n.setAttribute("class",i?"mobile-menu-header display-flex":"mobile-menu-header")})),u.addEventListener("click",(function(e){i=!i,t.setAttribute("class",i?"menu menu-mobile-visible":"menu"),n.setAttribute("class",i?"mobile-menu-header display-flex":"mobile-menu-header")}))})()})();