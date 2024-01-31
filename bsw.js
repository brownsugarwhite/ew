// einsatzgebiete mobile
const egSlideIn = gsap.timeline({ paused: true });

egSlideIn
  .to(
    ".supernav-flyout.supernav-flyout-eg",
    {
      duration: 0.4,
      x: "-100%",
      ease: "power1.out",
    },
    0,
  )
  .to(
    ".nav-button-mobile",
    {
      duration: 0.3,
      scale: 0,
      ease: "power1.in",
    },
    0,
  )
  .to(
    ".eg-back-mobile",
    {
      duration: 0.4,
      x: "-100%",
      ease: "power1.out",
    },
    0,
  );

// Add event listener to start the animation
document
  .querySelector(".nav-button-mobile.nav-button-mobile-eg")
  .addEventListener("click", function () {
    egSlideIn.play();
  });

// burger animation
const burgerX = gsap.timeline({ paused: true });

burgerX
  .to(
    ".burger-patty.burger-top",
    {
      duration: 0.15,
      y: 9,
      width: "30px",
      ease: "power1.in",
    },
    0,
  )
  .to(
    ".burger-patty.burger-bottom",
    {
      duration: 0.15,
      y: -9,
      width: "30px",
      ease: "power1.in",
    },
    0,
  )
  .to(".burger-patty.burger-mid", {
    duration: 0,
    opacity: 0,
  })
  .to(
    ".burger-patty.burger-bottom",
    {
      duration: 0.15,
      rotate: 45,
      ease: "power1.out",
    },
    "rotate",
  )
  .to(
    ".burger-patty.burger-top",
    {
      duration: 0.15,
      rotate: -45,
      ease: "power1.out",
    },
    "rotate",
  );

// supernav buttons animation
const supernavButtons = gsap.timeline({ paused: true });
supernavButtons.from(".supernav-mobile > div", {
  opacity: 0,
  y: -10,
  duration: 0.4,
  ease: "power1.out",
  stagger: 0.07,
});

// solarcheck-c2a animation
const solarcheckc2a = gsap.timeline({ paused: true });
solarcheckc2a.from(".solarcheck-c2a", {
  opacity: 0,
  x: 100,
  duration: 0.4,
  ease: "power2.out",
});

// Get the appWrapDiv element
const appWrapDiv = document.getElementsByClassName("bsw-appwrapp-ew")[0];

// Function to calculate the transform origin based on viewport center
function getViewportCenterTransformOrigin(element) {
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;
  const rect = element.getBoundingClientRect();
  const originX = ((viewportCenterX - rect.left) / rect.width) * 100;
  const originY = ((viewportCenterY - rect.top) / rect.height) * 100;
  return `${originX}% ${originY}%`;
}

// Function to toggle burger animation and appWrapDiv transition
function toggleBurgerX() {
  const bswBurger = document.querySelector(".bsw-burger");
  const categories = document.querySelectorAll(".supernav-category");
  const body = document.body;

  bswBurger.classList.toggle("is-x");

  if (bswBurger.classList.contains("is-x")) {
    burgerX.play();
    gsap.delayedCall(0.1, () => supernavButtons.play());
    gsap.delayedCall(0.3, () => solarcheckc2a.play());
    body.style.overflow = "hidden";
    const transformOrigin = getViewportCenterTransformOrigin(appWrapDiv);
    gsap.to(appWrapDiv, {
      scale: 0.92,
      filter: "blur(25px)",
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: transformOrigin,
    });
    gsap.to(".blurry", {
      display: "block",
      duration: 0.4,
      opacity: 1,
      ease: "power2.out",
    });
    gsap.to(".nav-bg", {
      scale: 1.6,
      filter: "blur(12px)",
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    categories.forEach((category) => {
      category.classList.remove("category-is-open", "category-is-closed");
    });
    burgerX.reverse();
    supernavButtons.reverse();
    gsap.delayedCall(0.2, () => solarcheckc2a.reverse());
    body.style.overflow = "visible";
    const transformOrigin = getViewportCenterTransformOrigin(appWrapDiv);
    gsap.to(appWrapDiv, {
      scale: 1,
      filter: "blur(0px)",
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: transformOrigin,
    });
    gsap.to(".nav-bg", {
      scale: 1,
      filter: "blur(0px)",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(".blurry", {
      filter: "blur(10px)",
      opacity: 0,
      scale: 1.15,
      duration: 0.5,
      ease: "power2.out",
    });

    // Schedule a delayed call to reset the scale
    gsap.delayedCall(
      0.5,
      () => {
        gsap.set(".blurry", { filter: "blur(0px)", scale: 1, display: "none" });
        gsap.set(".supernav-heading", { height: "68px", opacity: 1 });
        gsap.set(".supernav-heading.supernav-h-small", {
          height: "48px",
          opacity: 1,
        });
        gsap.set(".supernav-flyout", { height: "0px" });
        gsap.set(".arrow-supernav-wrapper", { width: "0px" });
        gsap.set(".nav-button-mobile", { scale: 0 });
      },
      [],
    );
  }
}

// Add event listener to bsw-burger for click events
document.querySelector(".bsw-burger").addEventListener("click", toggleBurgerX);

//Categories Mobile
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".supernav-heading");

  headings.forEach((heading) => {
    heading.addEventListener("click", function () {
      const category = this.closest(".supernav-category");
      const flyout = category.querySelector(".supernav-flyout");
      const arrow = category.querySelector(".arrow-supernav-wrapper");
      const navButtons = category.querySelectorAll(".nav-button-mobile");
      const categories = document.querySelectorAll(".supernav-category");

      if (category.classList.contains("category-is-open")) {
        categories.forEach((cat) => {
          cat.classList.remove("category-is-open");

          const catHeading = cat.querySelector(".supernav-heading");

          gsap.to(navButtons, {
            scale: 0,
            duration: 0.3,
            ease: "power1.in",
          });
          gsap.to(catHeading, {
            height: "68px",
            duration: 0.4,
            delay: 0.1,
            ease: "power1.Out",
          });
          gsap.to(catHeading, {
            opacity: 1,
            duration: 0.4,
            delay: 0.2,
            ease: "power1.Out",
          });
          if (catHeading.classList.contains("supernav-h-small")) {
            gsap.to(catHeading, {
              height: "48px",
              duration: 0.4,
              delay: 0.1,
              ease: "power1.Out",
            });
          }
          gsap.to(cat.querySelector(".supernav-flyout"), {
            height: 0,
            duration: 0.4,
            delay: 0.1,
            ease: "power1.Out",
          });
          const catArrow = cat.querySelector(".arrow-supernav-wrapper");
          gsap.to(catArrow, {
            width: "0px",
            duration: 0.4,
            ease: "power1.Out",
          });
        });
      } else {
        categories.forEach((cat) => {
          category.classList.add("category-is-open");
          const catHeading = cat.querySelector(".supernav-heading");

          gsap.to(catHeading, {
            height: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power1.Out",
          });
          gsap.to(catHeading, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.Out",
          });
          gsap.to(cat.querySelector(".supernav-flyout"), {
            height: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power1.Out",
          });
        });
        gsap.to(navButtons, {
          scale: 1,
          duration: 0.3,
          delay: 0.2,
          ease: "power1.out",
          stagger: 0.1,
        });

        gsap.to(this, {
          opacity: 1,
          duration: 0.4,
          ease: "power1.Out",
        });
        gsap.to(this, {
          height: "68px",
          duration: 0.4,
          delay: 0.2,
          ease: "power1.Out",
        });
        gsap.to(flyout, {
          height: "auto",
          duration: 0.4,
          delay: 0.2,
          ease: "power1.Out",
        });
        if (this.classList.contains("supernav-h-small")) {
          gsap.to(this, {
            height: "48px",
            duration: 0.4,
            delay: 0.2,
            ease: "power1.Out",
          });
        }

        let arrowWidth = "50px";
        if (arrow.classList.contains("arrow-supernav-small")) {
          arrowWidth = "35px";
        }
        gsap.to(arrow, {
          width: arrowWidth,
          duration: 0.4,
          ease: "power1.Out",
        });
      }
    });
  });
});

//nav desktop
$(document).ready(function () {
  const navButtons = $(".ew-nav-button");
  const superNavContents = $(".supernav-content");
  const nav = $(".bsw-nav");
  const arrowWrapper = $(".nav-arrow-wrapper");
  const lineWrap = $(".nav-arrow-line");

  // Function to set the initial position of the supernav-arrow
  function setInitialArrowPosition(content) {
    const firstButton = $(content).find(".supernav-button").first();
    const arrow = $(content).find(".supernav-arrow");
    if (firstButton.length && arrow.length) {
      const buttonRect = firstButton[0].getBoundingClientRect();
      const superNavRect = content.getBoundingClientRect();
      const centerY = buttonRect.top + buttonRect.height / 2 - superNavRect.top;

      gsap.set(arrow, { y: centerY });
    }
  }

  // Function to move the supernav-arrow on hover
  function setArrowOnHover(content) {
    $(content)
      .find(".supernav-button")
      .hover(function () {
        const buttonRect = this.getBoundingClientRect();
        const superNavRect = content.getBoundingClientRect();
        const centerY =
          buttonRect.top + buttonRect.height / 2 - superNavRect.top;

        gsap.to($(content).find(".supernav-arrow"), {
          y: centerY,
          duration: 0.3,
          ease: "power2.inOut",
        });
      });
  }

  navButtons.mouseenter(function () {
    const index = navButtons.index(this);
    let isAnyContentOpen = superNavContents.is(".content-is-open");
    const buttonRect = this.getBoundingClientRect(); // Get the hovered button's rect
    const arrowWrapper = $(".nav-arrow-wrapper");
    const lineWrapper = $(".nav-line-wrapper");
    const arrowWrapperWidth = arrowWrapper.outerWidth(); // Consider the total width including margins
    const centerX =
      buttonRect.left + buttonRect.width / 2 - arrowWrapperWidth / 2;

    // If the nav-arrow-wrapper is inside a positioned container, adjust for the container's offset
    const containerOffset = arrowWrapper.offsetParent().offset().left;
    const adjustedCenterX = centerX - containerOffset;
    const buttonWidth = $(this).outerWidth(); // Get the width of the hovered button
    const arrowLine = $(".nav-arrow-line");
    const targetWidth = buttonWidth * 0.8; // Calculate 80% of the button's width

    // Animate the nav-arrow-wrapper
    gsap.to(arrowWrapper, {
      x: adjustedCenterX,
      duration: 0.3,
      ease: "power1.inOut",
    });

    // Animate the nav-line-wrapper
    gsap.to(lineWrapper, {
      x: adjustedCenterX,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Animate the width of the nav-arrow-line
    gsap.to(arrowLine, {
      width: 120,
      duration: 0.5,
      ease: "power2.out",
    });

    // Delay the start of the second animation for a smoother transition
    gsap.to(arrowLine, {
      width: targetWidth,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.4, // Adjust the delay to ensure a smooth transition
    });
    gsap.to([arrowWrapper, lineWrap], {
      opacity: 1,
      duration: 0.3,
      ease: "power1.inOut",
    });
    superNavContents.each(function (idx) {
      if (index === idx) {
        gsap.set(this, { display: "flex" });
        $(this).addClass("content-is-open");
        requestAnimationFrame(() => {
          let contentHeight = this.scrollHeight;
          gsap.to(this.parentNode, {
            height: contentHeight,
            duration: 0.4,
            ease: "power2.inOut",
          });

          setInitialArrowPosition(this);
          setArrowOnHover(this);

          if (!isAnyContentOpen) {
            gsap.fromTo(
              $(this).find(".supernav-button"),
              { autoAlpha: 0.3, y: 30 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power1.out",
              },
            );
          }
        });
      } else {
        gsap.set(this, { display: "none" });
        $(this).removeClass("content-is-open");
      }
    });
  });

  // Function to handle common actions
  function handleMouseActions() {
    // Animate the height of superNavContents
    superNavContents.each(function () {
      gsap.to(this.parentNode, {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(this, { display: "none" });
          $(this).removeClass("content-is-open");
        },
      });
    });

    // Set the opacity of the line and the arrow to 0
    gsap.to([arrowWrapper, lineWrap], {
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  }

  // Mouse leave event for nav
  nav.mouseleave(function () {
    handleMouseActions();
  });

  // Mouse enter events for ew-nav-logo and ew-nav-quick
  $(".ew-nav-logo, .ew-nav-quick").mouseenter(function () {
    handleMouseActions();
  });
  superNavContents.each(function () {
    setInitialArrowPosition(this);
  });

  $(".supernav-button").hover(function () {
    $(this).click();
  });
});
