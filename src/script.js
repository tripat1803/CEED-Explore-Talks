import PastEvents from "./PastEvents.js";
import Organizers from "./Organizers.js";
import Nav from "./Nav.js";

const organizersData = [
  { name: "Name-1", post: "post-1", image: "./public/people.jpeg" },
  { name: "Name-2", post: "post-2", image: "./public/people.jpeg" },
  { name: "Name-3", post: "post-3", image: "./public/people.jpeg" },
  { name: "Name-4", post: "post-4", image: "./public/people.jpeg" },
  { name: "Name-5", post: "post-5", image: "./public/people.jpeg" },
  { name: "Name-6", post: "post-6", image: "./public/people.jpeg" },
  { name: "Name-7", post: "post-7", image: "./public/people.jpeg" },
  { name: "Name-8", post: "post-8", image: "./public/people.jpeg" },
  { name: "Name-9", post: "post-9", image: "./public/people.jpeg" },
  { name: "Name-10", post: "post-10", image: "./public/people.jpeg" },
  { name: "Name-11", post: "post-11", image: "./public/people.jpeg" },
  { name: "Name-12", post: "post-12", image: "./public/people.jpeg" },
  { name: "Name-13", post: "post-13", image: "./public/people.jpeg" },
  { name: "Name-14", post: "post-14", image: "./public/people.jpeg" },
  { name: "Name-15", post: "post-15", image: "./public/people.jpeg" },
  { name: "Name-16", post: "post-16", image: "./public/people.jpeg" },
  { name: "Name-17", post: "post-17", image: "./public/people.jpeg" },
  { name: "Name-18", post: "post-18", image: "./public/people.jpeg" },
];

window.nav = new Nav();
window.pastEvents = new PastEvents();
window.organizers = new Organizers(organizersData);

document.getElementsByClassName("start-padding")[0].style.height =
  document.getElementById("navbar").clientHeight + "px";
