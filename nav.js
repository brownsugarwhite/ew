$(document).ready(function () {
  function animateBurgerContainer(isClosed) {
    var tl = gsap.timeline();

    if (isClosed) {
      tl.to(".background-blur", {
        opacity: 1,
        ease: "power1.inout",
        duration: 0.4,
      })
        .to(".overlay-container", { display: "block" }, "-=0.4")
        .to(".mobile-nav", { display: "block" }, "-=0.4")
        .to(
          ".overlay-container .nav",
          { opacity: 1, ease: "power2.out", duration: 0.4 },
          "-=0.4"
        )
        .to(
          ".mobile-nav",
          { opacity: 1, ease: "power2.out", duration: 0.4 },
          "-=0.6"
        )
        .to(
          ".line-top",
          { marginBottom: 0, ease: "power2.in", duration: 0.2 },
          "-=0.4"
        )
        .to(
          ".line-bottom",
          { marginTop: 0, ease: "power2.in", duration: 0.2 },
          "-=0.4"
        )
        .to(
          ".line-mid",
          { opacity: 0, ease: "power2.in", duration: 0 },
          "-=0.2"
        )
        .to(
          ".line-top",
          { rotate: 45, ease: "power2.out", duration: 0.2 },
          "-=0.2"
        )
        .to(
          ".line-bottom",
          { rotate: -45, ease: "power2.out", duration: 0.2 },
          "-=0.2"
        )
        .to(
          ".burger-label",
          { opacity: 0, ease: "power2.in", duration: 0.3 },
          "-=0.6"
        );
    } else {
      $(".mobile-nav-form-wrapper").animate({ scrollTop: 0 }, 300); // Scroll content to the top with a duration of 500 milliseconds
      tl.to(".mobile-nav-form-wrapper", {
        y: "100vh",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: function () {
          $(".nav-burger-container").removeClass("burger-closed");
          $(".mobile-nav-accordion").removeClass("mobile-subnav-active");
          $(".mobile-nav-accordion").removeClass("mobile-nav-hider");
        },
      });
      tl.to(".background-blur", {
        opacity: 0,
        ease: "power1.inout",
        duration: 0.4,
      })
        .to(".overlay-container", { display: "none" }, "-=0.4")
        .to(".mobile-nav", { display: "none" }, "-=0.4")
        .to(
          ".overlay-container .nav",
          { opacity: 0, ease: "power1.inout", duration: 0.2 },
          "-=0.4"
        )
        .to(
          ".mobile-nav",
          { opacity: 0, ease: "power2.out", duration: 0.3 },
          "-=0.7"
        )
        .to(
          ".line-top",
          { rotate: 0, ease: "power2.in", duration: 0.2 },
          "-=0.4"
        )
        .to(
          ".line-bottom",
          { rotate: 0, ease: "power2.in", duration: 0.2 },
          "-=0.4"
        )
        .to(
          ".burger-label",
          { opacity: 1, ease: "power2.out", duration: 0.3 },
          "-=0.4"
        )
        .to(
          ".line-mid",
          { opacity: 1, ease: "power2.in", duration: 0 },
          "-=0.2"
        )
        .to(
          ".line-top",
          { marginBottom: "14", ease: "power2.out", duration: 0.2 },
          "-=0.2"
        )
        .to(
          ".line-bottom",
          { marginTop: "14", ease: "power2.out", duration: 0.2 },
          "-=0.2"
        );
    }
  }

  $(".nav-burger-container").on("click", function () {
    $(".nav-burger-container").toggleClass("burger-closed");
    var isClosed = $(".nav-burger-container").hasClass("burger-closed");
    animateBurgerContainer(isClosed);
  });

  $(".subnav-contact-close-mobile, .subnav-item-mobile, .bubble").on(
    "click",
    function () {
      $(".nav-burger-container").removeClass("burger-closed");
      animateBurgerContainer(false);
    }
  );

  $(".mobile-nav-button").click(function () {
    var $accordion = $(this).closest(".mobile-nav-accordion");
    if ($accordion.hasClass("mobile-subnav-active")) {
      $(".mobile-nav-accordion").removeClass(
        "mobile-subnav-active mobile-nav-hider"
      );
    } else {
      $(".mobile-nav-accordion")
        .not($accordion)
        .addClass("mobile-nav-hider")
        .removeClass("mobile-subnav-active");
      $accordion
        .removeClass("mobile-nav-hider")
        .toggleClass("mobile-subnav-active");
    }
  });

  var tl = gsap.timeline({ paused: true });
  var subnavWrappers = $(".subnav-button-wrapper");
  var subnav = $(".subnav");
  var subnavContactContainer = $(".subnav-contact-container");
  var contactButton = $(".open-contact");
  var navButtons = $(".nav-button");

  // Check the window width and apply the functionality for screens wider than 992px
  if ($(window).width() >= 992) {
    // Add a click event handler to buttons with class "button-open-contact"
    $(".button-open-contact").click(function () {
      subnavWrappers.hide().css("opacity", 0);
      subnav.removeClass("subnav-active");
      subnav.addClass("subnav-contact");
      subnavContactContainer.css("display", "flex");
    });

    // Modify the click event handler to exclude removing "subnav-contact" class
    $(document).on("click", function (event) {
      // Exclude elements with class ".button-open-contact"
      if (
        !$(event.target).closest(".subnav").length &&
        !$(event.target).hasClass("button-open-contact")
      ) {
        $(".subnav").removeClass("subnav-contact");
      }
    });
  } else if ($(window).width() <= 991) {
    // Add the class "burger-closed" to "nav-burger-container"
    $(".button-open-contact").click(function () {
      $(".nav-burger-container").addClass("burger-closed");
      animateBurgerContainer(true); // Start the animation here
      var tl = gsap.timeline();
      tl.to(".mobile-nav", {
        opacity: 0,
        duration: 0.4,
        onComplete: function () {
          $(".mobile-nav").css("display", "none");
          $(".mobile-nav-form-wrapper").css("display", "block");
          gsap.to(".mobile-nav-form-wrapper", {
            y: "0vh",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });
  }

  $(".nav-button").hover(function () {
    var index = $(this).index();
    tl.clear();
    subnav.addClass("subnav-active");
    subnav.removeClass("subnav-contact");
    subnavWrappers.not(subnavWrappers.eq(index)).hide().css("opacity", 0);
    subnavContactContainer.hide();
    tl.to(subnavWrappers.eq(index), {
      opacity: 1,
      display: "flex",
      duration: 0.3,
    });
    tl.play();

    if ($(this).closest(".nav-button-wrapper").hasClass("orange-buttons")) {
      subnav.addClass("subnav-dark");
      $(".subnav .nav-button-container .nav-button-wrapper").addClass(
        "orange-buttons"
      );
    } else {
      subnav.removeClass("subnav-dark");
      $(".subnav .nav-button-container .nav-button-wrapper").removeClass(
        "orange-buttons"
      );
    }
    navButtons.removeClass("nav-button-active");
    $(this).addClass("nav-button-active");
  });

  $(".subnav").hover(null, function () {
    subnav.removeClass("subnav-active");
    subnav.removeClass("subnav-dark");
  });

  contactButton.on("click", function () {
    subnavWrappers.hide().css("opacity", 0);
    subnav.removeClass("subnav-active");
    subnav.addClass("subnav-contact");
    subnavContactContainer.css("display", "flex");
  });

  $(".subnav-contact-close").click(function () {
    subnav.removeClass("subnav-contact");
  });
  $(".subnav-item").click(function () {
    subnav.removeClass("subnav-active");
  });

  $(".open-contact-mobile").on("click", function () {
    var tl = gsap.timeline();
    tl.to(".mobile-nav", {
      opacity: 0,
      duration: 0.4,
      onComplete: function () {
        $(".mobile-nav").css("display", "none");
        $(".mobile-nav-form-wrapper").css("display", "block");
        gsap.to(".mobile-nav-form-wrapper", {
          y: "0vh",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  });

  $(".subnav-contact-close-mobile").on("click", function () {
    $(".nav-burger-container").removeClass("burger-closed");
  });
});
