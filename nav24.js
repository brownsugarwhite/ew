document.addEventListener("DOMContentLoaded", function () {
  // Selectors for various elements
  const navButtons = document.querySelectorAll(".nav-button");
  const subnavContents = document.querySelectorAll(".supernav-content");
  const navArrow = document.querySelector(".nav-arrow");
  const supernav = document.querySelector(".supernav");
  const navContainer = document.querySelector(".nav");
  const navContainerSuperNav = document.querySelector(".navbar");

  // Function to hide all subnav contents
  function hideAllSubnavContents() {
    subnavContents.forEach((content) => {
      content.style.display = "none";
    });
  }

  // Function to move the nav-arrow to the hovered button
  function moveNavArrowToButton(button) {
    const buttonRect = button.getBoundingClientRect();
    const navRect = navContainer.getBoundingClientRect();
    const centerPosition =
      buttonRect.left - navRect.left + buttonRect.width / 2;
    navArrow.style.left = centerPosition - navArrow.offsetWidth / 2 + "px";
    navArrow.style.opacity = "1";
  }

  // Event listeners for nav buttons
  navButtons.forEach((button, index) => {
    button.addEventListener("mouseenter", () => {
      // Hide all subnav contents and show the one related to the hovered button
      hideAllSubnavContents();
      subnavContents[index].style.display = "flex";

      moveNavArrowToButton(button);
    });
  });

  // Event listener for nav hover
  if (navContainer) {
    navContainer.addEventListener("mouseenter", () => {
      // Animate the supernav height
      gsap.to(supernav, { duration: 0.5, height: "auto", ease: "power1.out" });
    });

    navContainer.addEventListener("mouseleave", () => {
      // Hide all subnav contents
      hideAllSubnavContents();

      // Animate the supernav height back
      gsap.to(supernav, { duration: 0.5, height: 0, ease: "power1.out" });

      navArrow.style.opacity = "0";
    });
  }

  // GSAP ScrollTrigger functionality
  gsap.registerPlugin(ScrollTrigger);

  // Set initial width of .nav-logo-txt
  gsap.set(".nav-logo-txt", { width: "70%" });

  // ScrollTrigger animation for .nav-fixed
  gsap.to(".nav-fixed", {
    scrollTrigger: {
      trigger: ".body",
      start: "top top",
      end: "+=40%",
      scrub: true,
    },
    height: 70,
    ease: "none",
  });

  // ScrollTrigger animation for .nav-logo-txt
  gsap.to(".nav-logo-txt", {
    scrollTrigger: {
      trigger: ".body",
      start: "top top",
      end: "+=40%",
      scrub: true,
    },
    width: "0%",
    ease: "none",
  });

  // ScrollTrigger animation for .logo-gradient
  gsap.to(".logo-gradient", {
    scrollTrigger: {
      trigger: ".body",
      start: "top top",
      end: "+=20%",
      scrub: true,
    },
    opacity: 1,
    width: "40px",
    ease: "none",
  });
});

//einsatzgebiete dropdown
document.addEventListener("DOMContentLoaded", function () {
  var dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    var dropdownArrow = dropdown.querySelector(".dropdown-arrow");
    var isOpen = false;

    // Set initial rotation for the arrow
    if (dropdownArrow) {
      gsap.set(dropdownArrow, {
        rotate: 225,
      });
    }

    function openDropdown() {
      gsap.to(dropdown, {
        height: "auto",
        duration: 0.5,
      });
      if (dropdownArrow) {
        gsap.to(dropdownArrow, {
          rotate: 135,
          duration: 0.5,
        });
      }
      isOpen = true;
    }

    function closeDropdown() {
      gsap.to(dropdown, {
        height: "46px",
        duration: 0.5,
      });
      if (dropdownArrow) {
        gsap.to(dropdownArrow, {
          rotate: 225,
          duration: 0.5,
        });
      }
      isOpen = false;
    }

    // Open dropdown on click
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      if (!isOpen) {
        openDropdown();
      }
    });

    // Close dropdown when mouse leaves the dropdown area
    dropdown.addEventListener("mouseleave", function () {
      if (isOpen) {
        closeDropdown();
      }
    });
  });
});
