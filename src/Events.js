export default class Events {
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(data) {
    this.data = data ? this.setupData(data) : [];
    this.events = document.getElementById("events");
    this.eventDetailBox = document.getElementById("event-detail-box");
    this.eventDialogBox = document.getElementById("event-dialog-box");

    this.updateEventsBox();

    this.eventActiveDates = document.getElementsByClassName("date active");
    for (let i of this.eventActiveDates) {
      i.addEventListener("mouseenter", (ev) =>
        this.mouseEnterOnEventActiveDates(ev)
      );
      i.addEventListener("mouseleave", (ev) => {
        this.eventDetailBox.style.width = `0rem`;
        this.eventDetailBox.style.opacity = `0`;
      });
      i.addEventListener("click", (ev) => this.clickOnEventActiveDates(ev));
    }

    window.addEventListener("mousemove", (ev) => {
      this.updateEventDetailBox(ev);
    });
  }

  setupData(data) {
    const years = new Set();
    for (let i in data) {
      let t = data[i].date.split("/").map((e) => parseInt(e));
      years.add(t[2]);
      data[i].date = { d: t[0], m: t[1], y: t[2] };
    }
    this.dataYears = [...years].sort();
    return data;
  }

  updateEventsBox() {
    const resDiv = document.createElement("div");
    for (let i of this.dataYears) {
      const dataY = this.data.filter((e) => e.date.y == i);
      const yearDiv = `
        <div class="year-box">
          <div class="name">${i}</div>
        </div>
      `;
      resDiv.innerHTML = resDiv.innerHTML + yearDiv;

      let months = new Set();
      for (let i of dataY) {
        months.add(i.date.m);
      }
      months = [...months].sort((a, b) => a > b);

      for (let i of months) {
        const dataM = dataY.filter((e) => e.date.m == i);
        let dates = new Set();
        for (let i of dataM) {
          dates.add(i.date.d);
        }
        dates = [...dates].sort((a, b) => a > b);
        let j = 0;

        const monthDiv = document.createElement("div");
        monthDiv.innerHTML = `
          <div class="month-box">
            <div class="name">${this.months[i - 1]}</div>
            <div class="dates">
            </div>
          </div>
        `;

        for (let i = 0; i < 31; i++) {
          let dateDiv = document.createElement("div");
          dateDiv.innerHTML = `<div class="date"><span>${i}</span></div>`;
          if (dates[j] == i) {
            j++;
            dateDiv.children[0].classList.add("active");
            let d = dataM.filter((e) => e.date.d == i)[0];
            d.title_1 &&
              dateDiv.children[0].setAttribute("data-title-1", d.title_1);
            d.title_2 &&
              dateDiv.children[0].setAttribute("data-title-2", d.title_2);
          }
          monthDiv.children[0].children[1].innerHTML =
            monthDiv.children[0].children[1].innerHTML + dateDiv.innerHTML;
        }

        resDiv.innerHTML = resDiv.innerHTML + monthDiv.innerHTML;
      }
    }
    this.events.innerHTML = resDiv.innerHTML;
  }

  updateEventDetailBox(event) {
    if (window.innerWidth / 2 < event.clientX + 5) {
      this.eventDetailBox.style.left = `calc(${event.clientX - 5}px - 20rem)`;
    } else {
      this.eventDetailBox.style.left = `${event.clientX + 5}px`;
    }
    this.eventDetailBox.style.top = `${event.clientY + 5}px`;
  }

  mouseEnterOnEventActiveDates(event) {
    this.eventDetailBox.style.width =
      this.eventDetailBox.getAttribute("data-width");
    this.eventDetailBox.style.opacity = `1`;

    this.eventDetailBox.innerHTML = `
      <div style="width: 20rem; height: 10rem">
        <div class="title">
          ${
            (event.target.getAttribute("data-title-1") &&
              `<div>${event.target.getAttribute("data-title-1")}</div>`) ||
            ""
          }
          ${
            (event.target.getAttribute("data-title-2") &&
              `<div>${event.target.getAttribute("data-title-2")}</div>`) ||
            ""
          }
        </div>
        <div class="discription">Date DD-MM-YYYY</div>
      </div>
    `;
  }

  clickOnEventActiveDates(event) {
    const eventTarget =
      event.target.localName == "span"
        ? event.target.parentElement
        : event.target;

    console.log(eventTarget);
  }
}
