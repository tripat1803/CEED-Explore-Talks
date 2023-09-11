import PastEvents from "./PastEvents.js";
import Organizers from "./Organizers.js";
import Nav from "./Nav.js";

const organizersData = [
  { name: "Simrandeep Singh", post: "post-1", image: "./public/people.jpeg" },
  { name: "Garv Sehgal", post: "post-2", image: "./public/people.jpeg" },
  { name: "Lokesh", post: "Website Devloper", image: "./public/people.jpeg" },
  { name: "Livarpit", post: "post-4", image: "./public/people.jpeg" },
  { name: "Naina", post: "post-5", image: "./public/people.jpeg" },
  {
    name: "Niharka Singla",
    post: "Website Designer",
    image: "./public/people.jpeg",
  },
  { name: "Naman", post: "post-7", image: "./public/people.jpeg" },
  { name: "Navya", post: "post-8", image: "./public/people.jpeg" },
  { name: "Pratik", post: "post-9", image: "./public/people.jpeg" },
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
// window.organizers = new Organizers(organizersData);

document.getElementsByClassName("start-padding")[0].style.height =
  document.getElementById("navbar").clientHeight + "px";

for (let i of document.getElementsByClassName("event-detail-card")) {
  i.addEventListener("mousedown", () => {
    window.location.assign("/construction.html");
    console.log("YO");
  });
}
