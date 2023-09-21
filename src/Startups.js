export default class Startups {
  constructor(data) {
    this.data = data || [];
    this.startups = document.getElementById("startups");

    this.setup();
  }

  setup() {
    let res = document.createElement("div");
    for (let i of this.data) {
      let r = `
        <div class="startup-card">
          <img src="${i.image}" />
          <div class="startup-card-content">
            <h1>${i.title}</h1>
          </div>
        </div>
      `;
      res.innerHTML = res.innerHTML + r;
    }
    this.startups.innerHTML = res.innerHTML;
  }
}
