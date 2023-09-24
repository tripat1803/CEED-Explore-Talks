export default class Events {
  constructor(data) {
    this.data = data || [];
    this.events = document.getElementById("events");
    this.eventDetailBox = document.getElementById("event-detail-box");
    this.eventDialogBox = document.getElementById("event-dialog-box");

    this.updateEventsBox();

    this.eventActiveDates = document.getElementsByClassName("date active");
    console.log(this.eventActiveDates);
    for (let i of this.eventActiveDates) {
      i.addEventListener("mouseenter", (ev) => {
        this.eventDetailBox.style.width = `20rem`;
        this.eventDetailBox.style.opacity = `1`;
      });
      i.addEventListener("mouseleave", (ev) => {
        this.eventDetailBox.style.width = `0rem`;
        this.eventDetailBox.style.opacity = `0`;
      });
    }

    window.addEventListener("mousemove", (ev) => {
      this.updateEventDetailBox(ev);
    });
  }

  updateEventsBox() {}

  updateEventDetailBox(event) {
    if (window.innerWidth / 2 < event.clientX + 5) {
      this.eventDetailBox.style.left = `calc(${event.clientX - 5}px - 20rem)`;
    } else {
      this.eventDetailBox.style.left = `${event.clientX + 5}px`;
    }
    this.eventDetailBox.style.top = `${event.clientY + 5}px`;
  }
}
