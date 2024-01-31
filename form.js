$(document).ready(function () {
  $(".appwrapp").each(function (index) {
    var swiperForm = new Swiper($(this).find(".swiper.swiper-form")[0], {
      speed: 500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      parallax: true,
      autoHeight: true,
      allowTouchMove: false,
      pagination: {
        el: $(this).find(".progress-fill-wrapper")[0],
        type: "progressbar",
        progressbarFillClass: "progress-fill",
      },
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      on: {
        slideChange: function () {
          countRequiredInputs(this, ".button-next");
        },
      },
    });

    $(".radio-button").on("click", function () {
      setTimeout(function () {
        swiperForm.slideNext();
      }, 500); // Delay of 0.5 seconds
    });

    // Add an event listener for the slide change event on swiperForm
    swiperForm.on("slideChange", function () {
      var activeSlide = this.slides[this.activeIndex];
      if ($(activeSlide).hasClass("bobby")) {
        $(".button-next").addClass("active");
      } else {
        $(".button-next").removeClass("active");
      }
    });

    function checkRequiredTextInputs(swiper, nextButtonSelector) {
      var activeSlide = swiper.slides[swiper.activeIndex];
      var requiredTextInputs = $(activeSlide).find(
        'input[required]:input[type="text"], input[required]:input[type="email"], input[required]:input[type="number"], input[required]:input[type="tel"]'
      );
      var checkboxes = $(activeSlide).find('input[type="checkbox"]');
      var checkedCheckboxes = checkboxes.filter(":checked");

      if (requiredTextInputs.length > 0 && checkedCheckboxes.length > 0) {
        var allRequiredTextInputsWithValue = requiredTextInputs.filter(
          function () {
            return $(this).val().trim() !== "";
          }
        );

        if (
          allRequiredTextInputsWithValue.length === requiredTextInputs.length
        ) {
          console.log(
            "All required text inputs have a value and at least one checkbox is checked."
          );
          $(activeSlide).addClass("bobby");
          $(nextButtonSelector).addClass("active");
        } else {
          console.log(
            "Not all required text inputs have a value, or there are no checkboxes checked."
          );
          $(activeSlide).removeClass("bobby");
          $(nextButtonSelector).removeClass("active");
        }
      }
    }

    function countRequiredInputs(swiper, nextButtonSelector) {
      var activeSlide = swiper.slides[swiper.activeIndex];
      var requiredInputs = $(activeSlide)
        .find("input[required]")
        .filter(
          ':input[type="text"], :input[type="email"], :input[type="number"], :input[type="tel"]'
        );
      var checkboxes = $(activeSlide).find('input[type="checkbox"]');
      var checkedCheckboxes = checkboxes.filter(":checked");
      var radioInputs = $(activeSlide).find('input[type="radio"]');
      var unrequiredInput = $(activeSlide).find(
        '.txt-field-wrapper-unrequired input[type="text"]'
      );
      var rangeHandle = $(activeSlide).find('input[type="range"]');

      rangeHandle.on("input", function () {
        $(activeSlide).addClass("bobby");
        $(nextButtonSelector).addClass("active");
      });

      unrequiredInput.on("input", function () {
        $(activeSlide).addClass("bobby");
        $(nextButtonSelector).addClass("active");
      });

      radioInputs.on("click", function () {
        $(activeSlide).addClass("bobby");
        $(nextButtonSelector).addClass("active");
      });

      if (requiredInputs.length > 0 && checkboxes.length > 0) {
        var allOtherInputsWithValue = null;

        requiredInputs.on("focus", function () {
          allOtherInputsWithValue = requiredInputs
            .not(this)
            .filter(function () {
              return $(this).val().trim() !== "";
            });

          var checkedCheckboxes = checkboxes.filter(":checked");

          if (
            allOtherInputsWithValue.length === requiredInputs.length - 1 &&
            checkedCheckboxes.length > 0
          ) {
            console.log(
              "All other inputs on the active slide have a value, and at least one checkbox is checked."
            );
          } else {
            console.log(
              "Not all other inputs on the active slide have a value, or there are no checkboxes checked."
            );
          }
        });

        requiredInputs.on("input", function () {
          allOtherInputsWithValue = requiredInputs
            .not(this)
            .filter(function () {
              return $(this).val().trim() !== "";
            });

          var checkedCheckboxes = checkboxes.filter(":checked");

          if (
            allOtherInputsWithValue.length === requiredInputs.length - 1 &&
            checkedCheckboxes.length > 0
          ) {
            if ($(this).val().trim() === "") {
              console.log(
                "Last required input is empty, and at least one checkbox is checked."
              );
              $(activeSlide).removeClass("bobby");
              $(nextButtonSelector).removeClass("active");
            } else {
              console.log(
                "Last required input has a value, and at least one checkbox is checked."
              );
              $(activeSlide).addClass("bobby");
              $(nextButtonSelector).addClass("active");
            }
          }
        });

        if (checkedCheckboxes.length > 0) {
          console.log("Checked checkbox detected.");
          checkRequiredTextInputs(swiper, nextButtonSelector);
        } else {
          console.log("Unchecked checkbox detected.");
          $(activeSlide).removeClass("bobby");
          $(nextButtonSelector).removeClass("active");
        }

        checkboxes.on("change", function () {
          checkedCheckboxes = checkboxes.filter(":checked");
          if (checkedCheckboxes.length > 0) {
            console.log("Checked checkbox detected.");
            checkRequiredTextInputs(swiper, nextButtonSelector);
          } else {
            console.log("Unchecked checkbox detected.");
            $(activeSlide).removeClass("bobby");
            $(nextButtonSelector).removeClass("active");
          }
        });
      } else {
        // Behave like before without displaying checkbox-related messages

        requiredInputs.on("focus", function () {
          allOtherInputsWithValue = requiredInputs
            .not(this)
            .filter(function () {
              return $(this).val().trim() !== "";
            });

          if (allOtherInputsWithValue.length === requiredInputs.length - 1) {
            console.log("All other inputs on the active slide have a value.");
          } else {
            console.log(
              "Not all other inputs on the active slide have a value."
            );
          }
        });

        requiredInputs.on("input", function () {
          if (
            allOtherInputsWithValue &&
            allOtherInputsWithValue.length === requiredInputs.length - 1
          ) {
            if ($(this).val().trim() === "") {
              console.log("Last required input is empty.");
              $(activeSlide).removeClass("bobby");
              $(nextButtonSelector).removeClass("active");
            } else {
              console.log("Last required input has a value.");
              $(activeSlide).addClass("bobby");
              $(nextButtonSelector).addClass("active");
            }
          }
        });
      }

      swiperForm.on("slideChange", function () {
        $(".progresspoint").removeClass("filled");

        // Check if it's the last slide
        if (swiper.isEnd) {
          $(".progresspoint").addClass("filled");
        }
      });
    }
  });
});

$(document).ready(function () {
  // Function to handle the play event
  function toggleAnimation(element, animation) {
    if (element.hasClass("active")) {
      if (!animation.isAnimationPlaying) {
        animation.setDirection(1); // Play forward
        animation.play();
        animation.isAnimationPlaying = true;
      }
    } else {
      if (animation.isAnimationPlaying) {
        animation.setDirection(-1); // Play in reverse
        animation.play();
        animation.isAnimationPlaying = false;
      }
    }
  }

  var nextAnimation = lottie.loadAnimation({
    container: document.querySelector(".lottie-container-next"),
    path: "https://uploads-ssl.webflow.com/64be6448914fcfbddd6681a9/64d78153f923330e1011b3b0_next-button.json", // Replace 'path-to-your-space-next-animation.json' with the actual path to your Lottie JSON file for the space-next animation
    autoplay: false,
    loop: false,
    isAnimationPlaying: false,
  });

  // MutationObserver to detect changes in the 'active' class for .button-next.roof-next
  var nextButton = $(".button-next");
  var nextObserver = new MutationObserver(function (mutationsList) {
    for (var mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        toggleAnimation(nextButton, nextAnimation);
        break; // We only need to call the function once per mutation
      }
    }
  });

  nextObserver.observe(nextButton[0], { attributes: true });
});

$(document).ready(function () {
  $(".selection-button").on("click", function () {
    $(".button-next").addClass("active");
  });
});

const sliderSize = document.querySelector(".slider-gewerbe01");
const txtFieldSize = document.querySelector(".txt-input.size");

// Add an event listener to the range slider
sliderSize.addEventListener("input", function () {
  // Update the value of the input field with 'm2' appended
  txtFieldSize.value = sliderSize.value + " m2";
});
