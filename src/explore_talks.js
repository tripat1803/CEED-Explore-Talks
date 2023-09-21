import Footer from "./Footer.js";
import Nav from "./Nav.js";

window.nav = new Nav();
window.footer = new Footer();

document.documentElement.setAttribute("theme", "dark");
// document.documentElement.setAttribute("theme", "light");

document.getElementsByClassName("start-padding")[0].style.height =
  document.getElementById("navbar").clientHeight + "px";

document.getElementsByTagName("body")[0].onload = (ev) => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 2000);
  }, 2000);
};
