import "../styles/main";

/*
Для каждой пустой ссылки на подобии href="#"
убиваем подпрыгивание вверх при клике на неё.
*/
const hashLinks = document.querySelectorAll("a[href='#']");

hashLinks.forEach((item) => {
 item.addEventListener("click", hashLinkHandler);
});

function hashLinkHandler(e) {
 e.preventDefault();
 e.stopPropagation();
}
// Конец

/*
Функция для показа или скрытия шапки
над мобильным навигационным меню
*/
const toggleHeaderMobileMenu = (isMobileMenu) =>
 isMobileMenu
  ? mobileMenuHeader.classList.add("display-flex")
  : mobileMenuHeader.classList.remove("display-flex");
// Конец

// Главное навигационное меню в шапке
const menu = document.querySelector(".menu");

// Шапка над мобильным навигационным меню
const mobileMenuHeader = document.querySelector(".mobile-menu-header");

// Кнопка гамбургер - открытие мобильного меню
const hamburgerMenu = document.querySelector(".hamburger-menu");

// Кнопка крестик - закрытие мобильного меню
const closeMenu = document.querySelector(".close-menu");

// Шапка, там где вывешен логотип + иконка поиска
const header = document.querySelector(".main-header");

// Начальное состояние мобильного меню
let isMobileMenu = false;

/*
 Нажимаем кнопку гамбургер далее, открывается
 навигационное меню для мобильной версии
*/
hamburgerMenu.addEventListener("click", (e) => {
 isMobileMenu = !isMobileMenu;
 isMobileMenu
  ? menu.classList.add("menu-mobile-visible")
  : menu.classList.remove("menu-mobile-visible");

 toggleHeaderMobileMenu(isMobileMenu);
});
// Конец

/*
 Нажимаем кнопку крестик далее, закрывается
 навигационное меню для мобильной версии
*/
closeMenu.addEventListener("click", (e) => {
 isMobileMenu = !isMobileMenu;

 isMobileMenu
  ? menu.classList.add("menu-mobile-visible")
  : menu.classList.remove("menu-mobile-visible");

 toggleHeaderMobileMenu(isMobileMenu);
});
// Конец

let prevPosTop = 0;
window.onscroll = function () {
 let posTop =
  window.pageYOffset !== undefined
   ? window.pageYOffset
   : (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;

 if (posTop >= prevPosTop) {
  // console.log("up");
 } else {
  // console.log("down");
  // menu.setAttribute("class", "menu menu-to-top");
 }
 prevPosTop = posTop;
 menuDownUp(posTop);
};

function menuDownUp(posTop) {
 return posTop > header.offsetHeight + 200
  ? menu.classList.add("menu-to-top")
  : menu.classList.remove("menu-to-top");
}
