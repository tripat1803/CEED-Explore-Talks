export default class PastEvents {
  preX = 0;
  preMoveX = 0;
  moveX = 0;
  motion = -0.5;
  motionFast = 4;
  motionSlow = 0.5;
  click = false;
  leftArrowClick = false;
  rightArrowClick = false;
  doMotionTimeout = 20;
  doMotionTimeoutFast = 10;
  doMotionTimeoutSlow = 20;
  preCardIndex = 0;
  currentDataIndex = 0;
  updateCardImageTimeoutID = null;

  constructor(data) {
    this.data = data;
    this.pastEventOrigin =
      document.getElementsByClassName("past-event-origin")[0];
    this.pastEventCards = document.getElementsByClassName("past-event-card");

    for (let i = 0; i < 8; i++) {
      let x =
        (i >= 4
          ? -Math.min(i % 4, 4 - (i % 4))
          : Math.min(i % 4, 4 - (i % 4))) *
          200 ==
        200
          ? (i >= 4
              ? -Math.min(i % 4, 4 - (i % 4))
              : Math.min(i % 4, 4 - (i % 4))) *
              200 +
            100
          : (i >= 4
              ? -Math.min(i % 4, 4 - (i % 4))
              : Math.min(i % 4, 4 - (i % 4))) *
              200 ==
            -200
          ? (i >= 4
              ? -Math.min(i % 4, 4 - (i % 4))
              : Math.min(i % 4, 4 - (i % 4))) *
              200 -
            100
          : (i >= 4
              ? -Math.min(i % 4, 4 - (i % 4))
              : Math.min(i % 4, 4 - (i % 4))) * 200;
      this.pastEventCards[i].setAttribute("data-x", x);
      this.pastEventCards[i].setAttribute("imageDataIndex", null);
      this.pastEventCards[i].setAttribute("imageID", -1);
    }

    for (let i = 0; i <= 2; i++) {
      this.pastEventCards[i].setAttribute("imageDataIndex", i);
      this.pastEventCards[i].setAttribute("imageID", 0);
      this.pastEventCards[i].style.setProperty(
        "--bg-img",
        `url('${this.data[i].images[0]}')`
      );
      this.pastEventCards[i].children[0].innerHTML = this.data[i].name;

      this.pastEventCards[this.pastEventCards.length - 1 - i].setAttribute(
        "imageDataIndex",
        this.data.length - 1 - i
      );
      this.pastEventCards[this.pastEventCards.length - 1 - i].setAttribute(
        "imageID",
        0
      );
      this.pastEventCards[this.pastEventCards.length - 1 - i].style.setProperty(
        "--bg-img",
        `url('${this.data[this.data.length - 1 - i].images[0]}')`
      );
      this.pastEventCards[
        this.pastEventCards.length - 1 - i
      ].children[0].innerHTML = this.data[this.data.length - 1 - i].name;
    }

    this.offSetY = 0;
    let t = this.pastEventOrigin;
    while (t != null) {
      this.offSetY += t.offsetTop;
      t = t.offsetParent;
    }

    this.doMotionId = setTimeout(() => this.doMotion(), this.doMotionTimeout);

    // onDrag() Function can also be used.
    // this.pastEventOrigin.addEventListener("drag", (ev) => {
    //   this.onDrag(ev);
    // });
    this.pastEventOrigin.addEventListener("mousedown", (ev) =>
      this.onMouseDown(ev)
    );
    window.addEventListener("mouseup", (ev) => this.onMouseUp(ev));
    window.addEventListener("mousemove", (ev) => {
      {
        this.onMouseMove(ev);
      }
    });

    this.pastEventOrigin.addEventListener("touchstart", (ev) =>
      this.onTouchStart(ev)
    );
    window.addEventListener("touchend", (ev) => this.onTouchEnd(ev));
    window.addEventListener("touchmove", (ev) => this.onTouchMove(ev));

    this.pastEventOrigin.parentElement
      .getElementsByClassName("left-arrow")[0]
      .addEventListener("mousedown", (ev) => this.leftArrowOnMouseDown(ev));
    window.addEventListener("mouseup", (ev) => this.leftArrowOnMouseUp(ev));

    this.pastEventOrigin.parentElement
      .getElementsByClassName("right-arrow")[0]
      .addEventListener("mousedown", (ev) => this.rightArrowOnMouseDown(ev));
    window.addEventListener("mouseup", (ev) => this.rightArrowOnMouseUp(ev));

    this.update();
  }

  onDrag(event) {
    if (this.preX == 0) {
      this.preX = event.clientX;
    } else if (event.clientX == 0) {
      this.preX = 0;
    } else {
      if (this.preX > event.clientX) {
        this.forwardMotion(-this.motionSlow);
      } else if (this.preX < event.clientX) {
        this.forwardMotion(this.motionSlow);
      }
      this.moveX -= this.preX - event.clientX;
      this.preX = event.clientX;
    }

    this.update();
  }

  onMouseDown(event) {
    event.preventDefault();
    this.click = true;
    clearTimeout(this.doMotionId);
  }
  onMouseUp(event) {
    if (this.click) {
      this.click = false;
      this.preX = 0;
      this.doMotionId = setTimeout(() => this.doMotion(), this.doMotionTimeout);
    }
  }

  onMouseMove(event) {
    if (this.click) {
      if (this.preX == 0) {
        this.preX = event.clientX;
      } else if (event.clientX == 0) {
        this.preX = 0;
      } else {
        if (this.preX > event.clientX) {
          this.forwardMotion(-this.motionSlow);
        } else if (this.preX < event.clientX) {
          this.forwardMotion(this.motionSlow);
        }
        this.moveX -= this.preX - event.clientX;
        this.preX = event.clientX;
      }
      this.update();
    }
  }

  onTouchStart(event) {
    this.click = true;
    clearTimeout(this.doMotionId);
  }
  onTouchEnd(event) {
    if (this.click) {
      this.click = false;
      this.preX = 0;
      this.doMotionId = setTimeout(() => this.doMotion(), this.doMotionTimeout);
    }
  }

  onTouchMove(event) {
    if (this.click) {
      if (this.preX == 0) {
        this.preX = event.changedTouches[0].screenX;
      } else if (event.changedTouches[0].screenX == 0) {
        this.preX = 0;
      } else {
        if (this.preX > event.clientX) {
          this.forwardMotion(-this.motionSlow);
        } else if (this.preX < event.clientX) {
          this.forwardMotion(this.motionSlow);
        }
        this.moveX -= this.preX - event.changedTouches[0].screenX;
        this.preX = event.changedTouches[0].screenX;
      }
      this.update();
    }
  }

  update() {
    const sensitivity = this.pastEventCards[0].clientWidth / 100;

    this.pastEventOrigin.style.transform = `perspective(${this.pastEventOrigin.getAttribute(
      "data-perspective"
    )}px) rotateY(${this.moveX / sensitivity}deg) translate3d(0px, 0px, 0px)
    scale3d(0.65, 0.65, 0.65)`;

    for (let i = 0; i < 8; i++) {
      this.pastEventCards[
        i
      ].style.transform = `translateX(${this.pastEventCards[i].getAttribute(
        "data-x"
      )}px) translateY(${0}px) translateZ(${this.pastEventCards[i].getAttribute(
        "data-z"
      )}px) rotateY(${-this.moveX / sensitivity}deg)`;
    }

    let t1 = Math.floor(-this.moveX / sensitivity / 45 - 0.5 + 1);

    let t2 =
      t1 % this.pastEventCards.length < 0
        ? this.pastEventCards.length + (t1 % this.pastEventCards.length) ==
          this.pastEventCards.length
          ? 0
          : this.pastEventCards.length + (t1 % this.pastEventCards.length)
        : t1 % this.pastEventCards.length;

    if (this.preCardIndex != t2) {
      if ((this.preCardIndex == 0) & (t2 == 7)) {
        this.currentDataIndex--;
      } else if ((this.preCardIndex == 7) & (t2 == 0)) {
        this.currentDataIndex++;
      } else if (this.preCardIndex > t2) {
        this.currentDataIndex--;
      } else {
        this.currentDataIndex++;
      }
      this.preCardIndex = t2;

      {
        let tt1 = t1 + 2;
        let tt2 =
          tt1 % this.pastEventCards.length < 0
            ? this.pastEventCards.length + (tt1 % this.pastEventCards.length) ==
              this.pastEventCards.length
              ? 0
              : this.pastEventCards.length + (tt1 % this.pastEventCards.length)
            : tt1 % this.pastEventCards.length;
        let tt3 = this.currentDataIndex + 2;
        let tt4 =
          tt3 % this.data.length < 0
            ? this.data.length + (tt3 % this.data.length) == this.data.length
              ? 0
              : this.data.length + (tt3 % this.data.length)
            : tt3 % this.data.length;

        this.pastEventCards[tt2].setAttribute("imageDataIndex", tt4);
        this.pastEventCards[tt2].setAttribute("imageID", 0);
        this.pastEventCards[tt2].style.setProperty(
          "--bg-img",
          `url('${this.data[tt4].images[0]}')`
        );
        this.pastEventCards[tt2].children[0].innerHTML = this.data[tt4].name;
      }

      {
        let tt1 = t1 - 2;
        let tt2 =
          tt1 % this.pastEventCards.length < 0
            ? this.pastEventCards.length + (tt1 % this.pastEventCards.length) ==
              this.pastEventCards.length
              ? 0
              : this.pastEventCards.length + (tt1 % this.pastEventCards.length)
            : tt1 % this.pastEventCards.length;
        let tt3 = this.currentDataIndex - 2;
        let tt4 =
          tt3 % this.data.length < 0
            ? this.data.length + (tt3 % this.data.length) == this.data.length
              ? 0
              : this.data.length + (tt3 % this.data.length)
            : tt3 % this.data.length;

        this.pastEventCards[tt2].setAttribute("imageDataIndex", tt4);
        this.pastEventCards[tt2].setAttribute("imageID", 0);
        this.pastEventCards[tt2].style.setProperty(
          "--bg-img",
          `url('${this.data[tt4].images[0]}')`
        );
        this.pastEventCards[tt2].children[0].innerHTML = this.data[tt4].name;
      }
    }

    if (this.updateCardImageTimeoutID == null)
      this.updateCardImageTimeoutID = setTimeout(
        () => this.updateCardImage(t2),
        2000
      );
  }

  updateCardImage(id, restTimeoutId = true) {
    if (this.pastEventCards[id].getAttribute("imageDataIndex") == "null") {
      if (restTimeoutId) this.updateCardImageTimeoutID = null;
      return;
    }

    this.pastEventCards[id].setAttribute(
      "imageID",
      parseInt(this.pastEventCards[id].getAttribute("imageID")) + 1
    );
    this.pastEventCards[id].style.setProperty(
      "--bg-img",
      `url('${
        this.data[
          parseInt(this.pastEventCards[id].getAttribute("imageDataIndex"))
        ].images[
          parseInt(this.pastEventCards[id].getAttribute("imageID")) %
            this.data[
              parseInt(this.pastEventCards[id].getAttribute("imageDataIndex"))
            ].images.length <
          0
            ? this.data[
                parseInt(this.pastEventCards[id].getAttribute("imageDataIndex"))
              ].images.length +
                (parseInt(this.pastEventCards[id].getAttribute("imageID")) %
                  this.data[
                    parseInt(
                      this.pastEventCards[id].getAttribute("imageDataIndex")
                    )
                  ].images.length) ==
              this.data[
                parseInt(this.pastEventCards[id].getAttribute("imageDataIndex"))
              ].images.length
              ? 0
              : this.data[
                  parseInt(
                    this.pastEventCards[id].getAttribute("imageDataIndex")
                  )
                ].images.length +
                (parseInt(this.pastEventCards[id].getAttribute("imageID")) %
                  this.data[
                    parseInt(
                      this.pastEventCards[id].getAttribute("imageDataIndex")
                    )
                  ].images.length)
            : parseInt(this.pastEventCards[id].getAttribute("imageID")) %
              this.data[
                parseInt(this.pastEventCards[id].getAttribute("imageDataIndex"))
              ].images.length
        ]
      }')`
    );

    if (restTimeoutId) this.updateCardImageTimeoutID = null;
  }

  doMotion() {
    this.offSetY = 0;
    let t = this.pastEventOrigin;
    while (t != null) {
      this.offSetY += t.offsetTop;
      t = t.offsetParent;
    }

    if (
      window.scrollY + window.outerHeight > this.offSetY &&
      window.scrollY + this.pastEventOrigin.parentElement.clientHeight / 2 <
        this.offSetY + this.pastEventOrigin.parentElement.clientHeight
    ) {
      this.moveX += this.motion;
      this.update();
    }

    this.doMotionId = setTimeout(() => this.doMotion(), this.doMotionTimeout);
  }

  forwardMotion(m = 0.5, mt = 20) {
    this.doMotionTimeout = mt;
    this.motion = m;
  }

  leftArrowOnMouseDown(event) {
    if (this.leftArrowClick == false) {
      this.leftArrowClick = true;
      this.forwardMotion(-this.motionFast, this.doMotionTimeoutFast);
      setTimeout(
        () => this.forwardMotion(-this.motionSlow, this.doMotionTimeoutSlow),
        1200
      );
    }
  }
  leftArrowOnMouseUp(event) {
    if (this.leftArrowClick) {
      this.leftArrowClick = false;
    }
  }

  rightArrowOnMouseDown(event) {
    if (this.rightArrowClick == false) {
      this.rightArrowClick = true;
      this.forwardMotion(this.motionFast, this.doMotionTimeoutFast);
      setTimeout(
        () => this.forwardMotion(this.motionSlow, this.doMotionTimeoutSlow),
        1200
      );
    }
  }
  rightArrowOnMouseUp(event) {
    if (this.rightArrowClick) {
      this.rightArrowClick = false;
    }
  }
}
