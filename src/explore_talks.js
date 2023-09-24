import Nav from "./Nav.js";
import Events from "./Events.js";
import Footer from "./Footer.js";

const navItemsNames = [];
// navEventsData Date Format DD/MM/YYYY
const navEventsData = [
  { date: "12/09/2023", title_1: "Ashneer Grover" },
  {
    date: "15/09/2023",
    title_1: "Dr. Subhrangshu Sanyal",
    title_2: "Dr. Gaurav kapoor",
  },
  { date: "22/09/2023", title_1: "Ashneer Grover -2" },
  { date: "02/12/2023", title_1: "Ashneer Grover -3" },
  {
    date: "14/04/2024",
    title_1: "Ashneer Grover -4",
    title_2: "Ashneer Grover -4",
  },
];

window.nav = new Nav(navItemsNames);
window.events = new Events(navEventsData);
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
