import PastEvents from "./PastEvents.js";
import Organizers from "./Organizers.js";
import Nav from "./Nav.js";

const pastEventsData = [
  {
    name: "Past Event-1",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-2",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-3",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-4",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-5",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-6",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-7",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-8",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-9",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-10",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-11",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
  {
    name: "Past Event-12",
    images: [
      "../public/past events/event-1.jpeg",
      "../public/past events/event-2.jpeg",
      "../public/past events/event-3.jpeg",
      "../public/past events/event-4.jpeg",
    ],
  },
];

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
window.pastEvents = new PastEvents(pastEventsData);
// window.organizers = new Organizers(organizersData);

document.documentElement.setAttribute("theme", "dark");
// document.documentElement.setAttribute("theme", "light");

document.getElementsByClassName("start-padding")[0].style.height =
  document.getElementById("navbar").clientHeight + "px";

window.addEventListener("scroll", (ev) => missionStatementScroll(ev));
function missionStatementScroll(event) {
  let l = ["mission-statement", "aboutus"];

  for (let i of l) {
    if (
      document.getElementById(i).offsetTop + 200 <=
      window.scrollY + window.innerHeight
    ) {
      document.getElementById(i).style.transform = ``;
      document.getElementById(i).style.opacity = `1`;
    } else {
      document.getElementById(i).style.opacity = `0`;
      document.getElementById(i).style.transform = `translateY(200px)`;
    }
  }

  for (let i = 0; i < 2; i++) {
    if (
      document.getElementById("event-details").children[i].offsetTop + 100 <=
      window.scrollY + window.innerHeight
    ) {
      document.getElementById("event-details").children[i].style.transform = ``;
      document.getElementById("event-details").children[i].style.opacity = `1`;
    } else {
      document.getElementById("event-details").children[i].style.opacity = `0`;
      if (i == 0) {
        document.getElementById("event-details").children[
          i
        ].style.transform = `translateX(-100%)`;
      } else if (i == 1) {
        document.getElementById("event-details").children[
          i
        ].style.transform = `translateX(100%)`;
      }
    }
  }
}

for (let i of document.getElementsByClassName("event-detail-card")) {
  i.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) window.location.assign("/construction.html");
  });
}

document.getElementsByTagName("body")[0].onload = (ev) => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 2000);
  }, 2000);
};
