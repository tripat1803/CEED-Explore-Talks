import PastEvents from "./PastEvents.js";

window.pastEvents = new PastEvents();

document.getElementsByClassName("start-padding")[0].style.height =
  document.getElementById("navbar").clientHeight + "px";
