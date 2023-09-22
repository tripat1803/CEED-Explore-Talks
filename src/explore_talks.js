import Nav from "./Nav.js";
import Events from "./Events.js";
import Footer from "./Footer.js";

const navItemsNames = [];

window.nav = new Nav(navItemsNames);
window.events = new Events();
window.footer = new Footer();

document.documentElement.setAttribute("theme", "dark");
// document.documentElement.setAttribute("theme", "light");

document.getElementsByClassName("nav-padding")[0].style.height =
  document.getElementById("navbar").clientHeight + "px";

document.getElementsByTagName("body")[0].onload = (ev) => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 2000);
  }, 2000);
};
