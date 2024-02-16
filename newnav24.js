console.log("Energiewatt - Die Kraft der Sonne");

//Animations

// sets
gsap.set(".ew-nav-logo", { filter: "hue-rotate(0deg) brightness(100%)" });
gsap.set(".supernav-button", { scale: 1 });

// tl: ew logo
const ewLogo = gsap.timeline({ paused: true });
ewLogo
    .to(".nav-logo-txt", { duration: 0.4, width: "70%", ease: "power1.inOut" }, 0)
    .to(".nav-logos-wrapper", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".nav-logo-gewerbe", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".nav-logo-privat", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".ew-nav-logo", { duration: 0.4, ease: "power1.inOut", filter: "hue-rotate(0deg) brightness(100%)" }, 0);

// tl: ew privat logo
const ewPrivatLogo = gsap.timeline({ paused: true });
ewPrivatLogo
    .to(".nav-logo-txt", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".nav-logos-wrapper", { duration: 0.4, width: "65%", ease: "power1.inOut" }, 0)
    .to(".nav-logo-gewerbe", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".nav-logo-privat", { duration: 0.4, width: "90%", ease: "power1.inOut" }, 0)
    .to(".ew-nav-logo", { duration: 0.4, ease: "power1.inOut", filter: "hue-rotate(80deg) brightness(60%)" }, 0);


// tl: ew gewerbe logo
const ewGewerbeLogo = gsap.timeline({ paused: true });
ewGewerbeLogo
    .to(".nav-logo-txt", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".nav-logos-wrapper", { duration: 0.4, width: "65%", ease: "power1.inOut" }, 0)
    .to(".nav-logo-gewerbe", { duration: 0.4, width: "90%", ease: "power1.inOut" }, 0)
    .to(".nav-logo-privat", { duration: 0.4, width: "0%", ease: "power1.inOut" }, 0)
    .to(".ew-nav-logo", { duration: 0.4, ease: "power1.inOut", filter: "hue-rotate(170deg) brightness(55%)" }, 0);


// Get the appWrapDiv element
const appWrapDiv = document.getElementsByClassName("bsw-appwrapp-ew")[0];
const body = document.body;

function disableScrolling() {
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
}

function enableScrolling() {
    window.removeEventListener('wheel', preventScroll, { passive: false });
    window.removeEventListener('touchmove', preventScroll, { passive: false });
}

function preventScroll(e) {
    e.preventDefault();
}

function getViewportCenterTransformOrigin(element) {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const rect = element.getBoundingClientRect();
    const originX = ((viewportCenterX - rect.left) / rect.width) * 100;
    const originY = ((viewportCenterY - rect.top) / rect.height) * 100;
    return `${originX}% ${originY}%`;
}
// nav desktop hover events
$(document).ready(function() {
    $('.ew-nav-button').on('mouseenter touchstart', function(event) {

        var navButtonIndex = $(this).index();
        var superNavContent = $('.supernav-content');
        var openSupernavContent = $('.supernav-content').eq(navButtonIndex);
        let isAnyContentOpenBefore = $('.supernav-content').hasClass("content-is-open");

        disableScrolling();

        gsap.killTweensOf('.supernav-content, .supernav-content .supernav-button, .supernav-content .supernav-quick-button');

        // If already active, do nothing more and exit the function
        if ($(this).hasClass('active')) { return; }
        $('.ew-nav-button').removeClass('active');
        $(this).addClass('active');

        const transformOrigin = getViewportCenterTransformOrigin(appWrapDiv);
        gsap.to(appWrapDiv, { scale: 0.95, duration: 0.4, ease: "power1.out", transformOrigin: transformOrigin });

        superNavContent.each(function(contentIndex) {
            // Check if the current .supernav-content matches the hovered .ew-nav-button
            if (navButtonIndex === contentIndex) {
                gsap.set(openSupernavContent, { display: "flex" }); // Set display to flex to make it visible

                // Ensure layout changes are rendered before calculating height
                requestAnimationFrame(() => {
                    let contentHeight = this.scrollHeight; // Accurately measure height

                    // Animate the parent container to the new height
                    gsap.to('.supernav-content-wrapper', { height: contentHeight, duration: 0.4, ease: "power1.inOut" });
                });
            }
        });


        // when supernav-content is open
        if (isAnyContentOpenBefore) {

            $('.supernav-content').removeClass('content-is-open');
            gsap.set('.supernav-content', { display: "none", delay: 0.1 });
            gsap.to('.supernav-content .supernav-button, .supernav-content .supernav-quick-button', { duration: 0.1, opacity: 0 });
            openSupernavContent.addClass('content-is-open');
            gsap.set(openSupernavContent, { display: "flex", delay: 0.1 });
            gsap.fromTo(openSupernavContent.find(".supernav-button"), { opacity: 0, y: -10, scale: 1 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "power1.out", delay: 0.2 });
            gsap.fromTo(openSupernavContent.find(".supernav-quick-button"), { y: 10, x: 0, opacity: 0 }, { duration: 0.4, y: 0, x: 0, opacity: 1, stagger: 0.1, ease: "power1.out", delay: 0.1 });

            // when supernav opens fresh
        } else {

            $('.supernav-content').removeClass('content-is-open');
            gsap.set('.supernav-content', { display: "none" });
            openSupernavContent.addClass('content-is-open');
            gsap.set(openSupernavContent, { display: "flex" });
            gsap.fromTo(openSupernavContent.find(".supernav-button"), { scale: 0.5, opacity: 1 }, { duration: 0.4, scale: 1, opacity: 1, ease: "power1.out" });
            gsap.fromTo(openSupernavContent.find(".supernav-quick-button"), { x: 10, opacity: 0 }, { duration: 0.4, x: 0, opacity: 1, stagger: 0.1, ease: "power1.out" });
        }

        // Continue with your existing logic...
        if (navButtonIndex === 0) {
            ewGewerbeLogo.invalidate().restart();
        } else if (navButtonIndex === 1) {
            ewPrivatLogo.invalidate().restart();
        } else {
            ewLogo.invalidate().restart();
        }

    });

    // reset navigation
    $(document).ready(function() {
        // Consolidate shared logic into a single function
        function resetNavigation() {
            var openSupernavContent = $('.supernav-content.content-is-open');
            var transformOrigin = getViewportCenterTransformOrigin(appWrapDiv); // Assuming appWrapDiv is defined elsewhere

            enableScrolling();

            $('.supernav-content').removeClass('content-is-open');
            $('.ew-nav-button').removeClass('active');
            ewLogo.invalidate().restart();

            gsap.to('.supernav-content-wrapper', { height: "0", duration: 0.4, ease: "power2.inOut" });
            gsap.fromTo(openSupernavContent.find(".supernav-button"), { scale: 1, opacity: 1 }, { duration: 0.4, scale: 0.5, opacity: 1, ease: "power1.in" });
            gsap.fromTo(openSupernavContent.find(".supernav-quick-button"), { x: 0, opacity: 1 }, { duration: 0.4, x: 10, opacity: 0, stagger: { each: 0.1, from: "end" }, ease: "power1.out" });
            gsap.to(appWrapDiv, { scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power1.out", transformOrigin: transformOrigin });
        }

        // Attach the consolidated function to mouseleave and mouseenter events
        $('.bsw-nav').mouseleave(resetNavigation);
        $('.ew-nav-quick').mouseenter(resetNavigation);
    });

});

