<script>
  $(document).ready(function() {
    // Initialize the Lottie animation
    var nextAnimation = lottie.loadAnimation({
      container: document.querySelector('.lottie-container-next'), // Replace '.lottie-animation' with your Lottie container class name
      path: 'https://uploads-ssl.webflow.com/64b6e0f1998b586b9d1b2fba/64bd69074f4a45e83268e84c_next-button.json', // Replace 'path-to-your-lottie-json.json' with the actual path to your Lottie JSON file
      autoplay: false,
      loop: false,
    });

    var isAnimationPlaying = false; // Track the state of the animation

    // Function to handle the play event
    function toggleAnimation() {
      if ($('.button-next.roof-next').hasClass('active')) {
        if (!isAnimationPlaying) {
          nextAnimation.setDirection(1); // Play forward
          nextAnimation.play();
          isAnimationPlaying = true;
        }
      } else {
        if (isAnimationPlaying) {
          nextAnimation.setDirection(-1); // Play in reverse
          nextAnimation.play();
          isAnimationPlaying = false;
        }
      }
    }

    // MutationObserver to detect changes in the 'active' class
    var targetNode = document.querySelector('.button-next.roof-next');
    var observer = new MutationObserver(function(mutationsList) {
      for (var mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          toggleAnimation();
          break; // We only need to call the function once per mutation
        }
      }
    });

    observer.observe(targetNode, { attributes: true });
  });
</script>

<script>
  // Function to animate the movement of the "contact-center" element using GSAP's Flip plugin
  function moveContactCenterInto(element) {
    const contactCenter = document.querySelector('.contact-center-flipper');
    if (!contactCenter) return; // Return if the 'contact-center' element is not found

    const state = Flip.getState(contactCenter);
    element.appendChild(contactCenter);

    Flip.from(state, {
      duration: 0.6, // Adjusted animation duration for smoother transitions
      ease: "power2.out",
      onComplete: function () {
        // Animation completed, hide the .contact-center-flipper and show the .contact-bubble-button
        gsap.set('.contact-center-flipper', { display: 'none' });
        gsap.set('.contact-button-wrapper', { display: 'flex' });
        // Show the .contact-bubble-button after the transition and delay hiding it based on the isLastSlide variable
        gsap.to('.contact-bubble-button', { display: isLastSlide ? 'flex' : 'none', duration: 0 });
         gsap.to('.contact-center', { display: isLastSlide ? 'none' : 'flex', duration: 0 });
      },
    });
  }

  // Global variable to keep track of whether the last slide was the previous slide or not
  let isLastSlide = false;

  $(".appwrapp").each(function (index) {
    let currentVideo = null;
    const contactCenterFlipper = $(".contact-center-flipper");
    const bubbleFlip = $(".bubble-flip");
    const contactButtonFlip = $(".contact-button-flip");

    // Set the initial display state for .contact-center-flipper and .contact-center
    gsap.set('.contact-center-flipper', { display: 'none' });
    gsap.set('.contact-center', { display: 'flex' });

    const mainSwiper = new Swiper($(this).find(".main-swiper")[0], {
      direction: 'vertical',
      speed: 500,
      slidesPerView: 1,
      parallax: true,
      mousewheel: true,
      keyboard: true,
      on: {
        slideChange: function () {
          const lastSlideIndex = this.slides.length - 1;
          const activeSlideIndex = this.activeIndex;
          const bgLightOnElement = $(this.el).find(".bg-light-on");

          if (activeSlideIndex === lastSlideIndex) {
            // Delay for the light-on element animation
            setTimeout(() => {
              if (isLastSlide) {
                gsap.to(bgLightOnElement, { opacity: 1, duration: 0.3 });
              }
            }, 600); // Delay of 0.6 seconds (600 milliseconds)

            // Delay for the flipper animation
            setTimeout(() => {
              if (isLastSlide && window.Flip) {
                moveContactCenterInto(contactButtonFlip[0]);
              }
            }, 200); // Adjust this delay to your desired timing

            // Transition to the last slide, set the display of .contact-center and hide .contact-center-flipper
            gsap.set('.contact-center', { display: 'none' });
            gsap.set('.contact-center-flipper', { display: 'flex' });

            isLastSlide = true;
          } else {
            gsap.to(bgLightOnElement, { opacity: 0, duration: 0.3 });

            if (window.Flip && isLastSlide) {
              // Hide the .contact-bubble-button and show the .contact-center
              gsap.set('.contact-button-wrapper', { display: 'none' });
              gsap.set('.contact-center-flipper', { display: 'flex' });
              moveContactCenterInto(bubbleFlip[0]);
              isLastSlide = false;
            }
          }

          // Other actions you may want to perform when a slide changes in mainSwiper.
          // ...
        },
        // other options for mainSwiper as needed
      },
    });

    // Rest of your code for other Swiper instances...

    const landingSwiper = new Swiper($(this).find(".landing-swiper")[0], {
      slidesPerView: 1,
      speed: 300,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: false,
      },
      on: {
        slideChangeTransitionStart: function () {
          const currentSlide = this.realIndex + 1;
          const newVideo = document.querySelector(`.swiper-slide:nth-child(${currentSlide}) video`);
          if (newVideo && newVideo !== currentVideo) {
            newVideo.currentTime = 0;
            newVideo.play().catch(error => console.log("newVideo play error:", error));
            if (currentVideo) currentVideo.pause();
            currentVideo = newVideo;
          }
        },
      },
    });

    const allVideos = $(this).find('.swiper-slide video');
    if (allVideos.length > 0) {
      currentVideo = allVideos[0];
      currentVideo.currentTime = 0;
      currentVideo.play().catch(error => console.log("initialVideo play error:", error));
      allVideos.prop('preload', 'auto');
    } else {
      console.log("No videos found.");
    }

    landingSwiper.autoplay.start();
    landingSwiper.autoplay.delay = 8000;
    landingSwiper.loop = true;
    landingSwiper.loopedSlides = allVideos.length;

    const partnerSwiper = new Swiper($(this).find(".partner-swiper")[0], {
      grabCursor: true,
      loop: true,
      speed: 4000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 3
        },
        478: {
          slidesPerView: 4
        },
        767: {
          slidesPerView: 5
        },
        991: {
          slidesPerView: 6
        }
      }
    });
  });
</script>

<script>
const contactCenter = document.querySelector('.contact-center');
const bubbleFlip = document.querySelector('.bubble-flip');

function handleTouchStart() {
  contactCenter.style.opacity = '1';
  contactCenter.style.pointerEvents = 'auto';
  bubbleFlip.style.opacity = '0';
  bubbleFlip.style.pointerEvents = 'none';
}

function handleTouchEnd() {
  contactCenter.style.opacity = '0';
  contactCenter.style.pointerEvents = 'none';
  bubbleFlip.style.opacity = '1';
  bubbleFlip.style.pointerEvents = 'auto';
}

bubbleFlip.addEventListener('mouseover', handleTouchStart);
contactCenter.addEventListener('mouseover', handleTouchStart);
contactCenter.addEventListener('mouseout', handleTouchEnd);

document.addEventListener('touchstart', (event) => {
  if (!contactCenter.contains(event.target)) {
    handleTouchEnd();
  }
});
</script>