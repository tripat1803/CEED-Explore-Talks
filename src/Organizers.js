export default class Organizers {
  constructor(data = []) {
    this.data = data;
    this.organizerView = document
      .getElementById("organizers")
      .getElementsByClassName("organizers-view")[0];

    let res = document.createElement("div");
    res.replaceChildren(
      new DOMParser()
        .parseFromString(
          `<div class="organizer-list" style="width: calc(15vw * 8)"></div>`,
          "text/html"
        )
        .getElementsByTagName("Body")[0].firstChild
    );
    res.firstChild.style.width = `max(${
      15 * this.data.length + 15 * 10
    }vw, 100vw)`;

    for (let i of data) {
      let r = `
        <div class="organizer-card">
          <img src="${i.image}" />
          <p>${i.name}</p>
          <span>${i.post}</span>
        </div>
      `;
      res.firstChild.innerHTML = res.firstChild.innerHTML + r;
    }

    res.innerHTML = res.innerHTML + res.innerHTML;
    res.children[0].classList.add("list-1");
    res.children[1].classList.add("list-2");
    this.organizerView.innerHTML = res.innerHTML;
  }
}
