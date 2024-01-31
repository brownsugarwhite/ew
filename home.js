$(document).ready(function () {
  var footerSwiper = new Swiper($(".swiper-footer")[0], {
    speed: 500,
    slidesPerView: "auto",
    direction: "vertical",
    mousewheel: true,
    keyboard: true,
    // other options for footerSwiper as needed
  });

  var bgSwiper = new Swiper($(".bg-swiper")[0], {
    effect: "fade",
    speed: 500,
    allowTouchMove: false,
    nested: true,
    parallax: true,
    // other options for bgSwiper as needed
  });

  var mainSwiper = new Swiper($(".main-swiper")[0], {
    direction: "vertical",
    speed: 500,
    nested: true,
    hashNavigation: true,
    slidesPerView: "auto",
    parallax: true,
    thumbs: {
      swiper: bgSwiper,
    },
    mousewheel: {
      noMousewheelClass: "hoppla",
    },
    keyboard: true,
    // other options for mainSwiper as needed
  });

  var quotesSwiper = new Swiper($(".swiper-quotes")[0], {
    centeredSlides: true,
    slideActiveClass: "quote-active",
    nested: true,
    autoplay: {
      delay: 2000,
    },
    spaceBetween: 32,
    loopedSlides: 3,
    loop: true,
    slidesPerView: "auto",
    speed: 1500,
    navigation: {
      nextEl: ".swiper-quotes-next",
      prevEl: ".swiper-quotes-prev",
    },
    // ... other options for quotesSwiper
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
      // when window width is >= 640px
      992: {
        slidesPerView: "auto",
        spaceBetween: 32,
      },
    },
  });
  $(".bubble, .slide-to-anfrage").on("click", function () {
    mainSwiper.slideTo(1, 500); // 2 is the index of the third slide, and 500 is the speed in milliseconds
  });

  // Attach transitionEnd event to footerSwiper
  footerSwiper.on("transitionEnd", function () {
    if (footerSwiper.isEnd) {
      mainSwiper.allowTouchMove = false; // Disable touch move
      $(".no-swiping").addClass("hoppla");
    } else {
      mainSwiper.allowTouchMove = true; // Enable touch move
      $(".no-swiping").removeClass("hoppla");
    }
  });

  bgSwiper.on("slideChange", function () {
    // Get the current active slide index
    var activeSlideIndex = bgSwiper.activeIndex;

    // Check if the active slide index is the 4th slide (index 3)
    if (activeSlideIndex === 3) {
      // Set a timeout to delay the opacity change
      setTimeout(function () {
        // Change the opacity of the element with class 'bg-light-on' after a delay
        $(".bg-light-on").addClass("light-switch");
      }, 500); // 500 milliseconds delay
    } else {
      $(".bg-light-on").removeClass("light-switch");
    }
  });

  mainSwiper.on("slideChange", function () {
    if (mainSwiper.activeIndex === 1) {
      // Check if the third slide is active (indexes are 0-based)
      $(".nav-button-wrapper").addClass("orange-buttons");
      $(".phone-nav").addClass("orange");
      $(".phone-icon-nav").addClass("phone-icon-orange");
      $(".burger-label").removeClass("white");
      $(".burger-line").removeClass("line-whiteout");

      // Create a GSAP timeline
      var tl = gsap.timeline();

      // Add animations to the timeline
      tl.to(".nav-logo-wrapper", {
        opacity: 0,
        duration: 0.1,
        onComplete: function () {
          $(".nav-logo-wrapper").css("display", "none");
        },
      })
        .set(".nav-logo-wrapper.orange", { display: "flex" })
        .to(".nav-logo-wrapper.orange", {
          opacity: 1,
          duration: 0.1,
        });
    } else {
      // Reset the elements to their initial state
      $(".burger-line").addClass("line-whiteout");
      $(".burger-label").addClass("white");
      $(".phone-icon-nav").removeClass("phone-icon-orange");
      $(".phone-nav").removeClass("orange");
      $(".nav-button-wrapper").removeClass("orange-buttons");
      $(".nav-logo-wrapper").css("display", "flex").css("opacity", 1);
      $(".nav-logo-wrapper.orange").css("display", "none").css("opacity", 0);
    }
  });
});

$(document).ready(function () {
  // Function to add ellipsis for overflowed paragraphs
  function addEllipsisToOverflowedParagraphs() {
    $(".paragraph-quotes").each(function () {
      var element = $(this)[0];
      if (element.scrollHeight > element.clientHeight) {
        // Text overflows the div's height, add ellipsis
        var originalText = $(this).text();
        var truncatedText =
          originalText.substring(0, originalText.lastIndexOf(" ")) + "...";
        $(this).text(truncatedText);
      }
    });
  }

  // Call the function initially and on window resize
  addEllipsisToOverflowedParagraphs();
  $(window).resize(function () {
    addEllipsisToOverflowedParagraphs();
  });
});
