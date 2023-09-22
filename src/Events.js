export default class Events {
  constructor(data) {
    this.data = data || [];
    this.events = document.getElementById("events");
    this.eventDetailBox = document.getElementById("event-detail-box");
    this.eventDialogBox = document.getElementById("event-dialog-box");

    window.addEventListener("mousemove", (ev) => {
      this.updateEventDetailBox(ev);
    });
  }

  updateEventDetailBox(event) {
    this.eventDetailBox.style.top = `${event.clientY}px`;
    this.eventDetailBox.style.left = `${event.clientX}px`;
  }
}
