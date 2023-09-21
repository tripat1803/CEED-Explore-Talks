export default class Highlights {
  constructor(data) {
    this.data = data || [];
    this.highlights = document.getElementById("highlights");

    this.setup();
  }

  setup() {
    let res = document.createElement("div");
    for (let i of this.data) {
      let r = `
        <div class="highlight-card h">
          <img src="${i.image}" />
          <div class="highlight-card-content">
            <h1>${i.title}</h1>
            <p>${i.discription}</p>
          </div>
        </div>
      `;
      res.innerHTML = res.innerHTML + r;
    }
    this.highlights.innerHTML = res.innerHTML;
  }
}
