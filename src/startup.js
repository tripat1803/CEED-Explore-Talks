import Nav from "./Nav.js";
import Footer from "./Footer.js";
import Highlights from "./Highlights.js";
import Startups from "./Startups.js";

const navItemsNames = [];

const highlightData = [
  { image: "", title: "", discription: "" },
  { image: "", title: "", discription: "" },
  { image: "", title: "", discription: "" },
  { image: "", title: "", discription: "" },
  { image: "", title: "", discription: "" },
];

const startupData = [
  { image: "", title: "" },
  { image: "", title: "" },
  { image: "", title: "" },
  { image: "", title: "" },
  { image: "", title: "" },
];

window.nav = new Nav(navItemsNames);
window.footer = new Footer();
window.highlights = new Highlights(highlightData);
window.startups = new Startups(startupData);

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
