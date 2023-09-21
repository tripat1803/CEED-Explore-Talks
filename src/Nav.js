export default class Nav {
  constructor(navItemsNames) {
    this.navItemsNames = navItemsNames || [];
    this.nav = document.getElementById("navbar");
    this.prevPos = window.scrollY;

    window.addEventListener("scroll", (ev) => this.onScroll(ev));
  }

  onScroll(event) {
    this.updateMainNav();
    this.updateNavLinks();
  }

  updateMainNav() {
    if (0 == window.scrollY) {
      this.prevPos = window.scrollY;
      this.nav.classList.remove("hidden");
    } else if (
      document.body.clientHeight - document.documentElement.clientHeight ==
        window.scrollY ||
      window.scrollY < this.prevPos
    ) {
      this.prevPos = window.scrollY;
      this.nav.classList.remove("hidden");
    } else {
      this.prevPos = window.scrollY;
      this.nav.classList.add("hidden");
    }
  }

  updateNavLinks() {
    let navItems = this.nav.getElementsByClassName("nav-item");

    for (let i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove("active");
    }
    for (let i = 0; i < this.navItemsNames.length; i++) {
      if (
        window.scrollY + this.nav.clientHeight >=
          document.getElementById(this.navItemsNames[i]).offsetTop &&
        window.scrollY + this.nav.clientHeight <
          document.getElementById(this.navItemsNames[i]).clientHeight +
            document.getElementById(this.navItemsNames[i]).offsetTop
      ) {
        navItems[i].classList.add("active");
      }
    }
  }
}
