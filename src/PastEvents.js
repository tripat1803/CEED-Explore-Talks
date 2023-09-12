export default class PastEvents {
  preX = 0;
  preMoveX = 0;
  moveX = 0;
  motion = 0.5;
  motionFast = 4;
  motionSlow = 0.5;
  click = false;
  leftArrowClick = false;
  rightArrowClick = false;
  doMotionTimeout = 20;
  doMotionTimeoutFast = 10;
  doMotionTimeoutSlow = 20;

  constructor() {
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
    }

    this.update();
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
    }

    this.update();
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
  }

  doMotion() {
    this.offSetY = 0;
    let t = this.pastEventOrigin;
    while (t != null) {
      this.offSetY += t.offsetTop;
      t = t.offsetParent;
    }

    // console.log(
    //   window,
    //   window.scrollY + window.outerHeight,
    //   this.offSetY,
    //   window.scrollY,
    //   this.pastEventOrigin.parentElement.clientHeight,
    //   this.pastEventOrigin.parentElement.clientHeight / 2,
    //   window.scrollY + this.pastEventOrigin.parentElement.clientHeight / 2,
    //   this.pastEventOrigin.parentElement.clientHeight,
    //   this.offSetY + this.pastEventOrigin.parentElement.clientHeight,
    //   window.scrollY + window.outerHeight > this.offSetY,
    //   window.scrollY + this.pastEventOrigin.parentElement.clientHeight / 2 <
    //     this.offSetY + this.pastEventOrigin.parentElement.clientHeight,
    //   window.scrollY <
    //     this.offSetY + this.pastEventOrigin.parentElement.clientHeight,
    //   window.scrollY + window.outerHeight > this.offSetY &&
    //     window.scrollY + this.pastEventOrigin.parentElement.clientHeight / 2 <
    //       this.offSetY + this.pastEventOrigin.parentElement.clientHeight,
    //   window.scrollY + window.outerHeight > this.offSetY &&
    //     window.scrollY + this.pastEventOrigin.parentElement.clientHeight / 2 <
    //       this.offSetY + this.pastEventOrigin.parentElement.clientHeight
    // );

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
    this.leftArrowClick = true;
    this.forwardMotion(-this.motionFast, this.doMotionTimeoutFast);
  }
  leftArrowOnMouseUp(event) {
    if (this.leftArrowClick) {
      this.leftArrowClick = false;
      this.forwardMotion(-this.motionSlow, this.doMotionTimeoutSlow);
    }
  }

  rightArrowOnMouseDown(event) {
    this.rightArrowClick = true;
    this.forwardMotion(this.motionFast, this.doMotionTimeoutFast);
  }
  rightArrowOnMouseUp(event) {
    if (this.rightArrowClick) {
      this.rightArrowClick = false;
      this.forwardMotion(this.motionSlow, this.doMotionTimeoutSlow);
    }
  }
}
