const headingText = $('[data-heading=transition]');
const text = new SplitType(headingText, { types: 'words, chars', tagName: 'span' });

// Initially set characters' position
gsap.set(text.chars, { y: "0" });

// Animate characters into view with a stagger effect
gsap.to(text.chars, {
    y: "-100%",
    duration: 0.6,
    stagger: { amount: 0.4 },
    scrollTrigger: {
        trigger: '.headingContainer',
        start: "top top", // Adjust as needed
        end: "bottom top", // Adjust as needed
        scrub: true,
        // markers: true
    }
});

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const marquee = document.querySelector(".c-textMarquee");
    let tween;

    if (marquee) {
        gsap.set(marquee.children, { autoAlpha: 0 });

        let duration = window.innerWidth > 400 ? 10 : 5;


        const playMarquee = () => {
            let progress = tween ? tween.progress() : 0;
            const text = marquee.querySelectorAll(".c-textMarquee__text");
            const translateWidth = text[0].getBoundingClientRect().width;

            duration = Math.max(0.5, duration);
            if (tween) {
                tween.kill(); // Kill the existing tween if it exists
            }

            tween = gsap.fromTo(
                marquee.children,
                { x: 0, autoAlpha: 1 },
                {
                    x: -translateWidth,
                    duration: duration,
                    ease: "none",
                    repeat: -1,
                    paused: false,
                }
            );
            tween.progress(progress);
        };

        const debouncedPlayMarquee = debounce(playMarquee, 500);
        playMarquee(); // Initial play

        window.addEventListener("orientationchange", () => {
            if (window.matchMedia("(orientation: landscape)").matches && window.innerHeight > 1024);
            playMarquee(); // Update the duration when orientation changes
        });

        window.addEventListener("resize", debouncedPlayMarquee);
    }
});


// text color change on scroll basic about


var colorchandingtext = $('[data-colorchandingtext="text"]');
const splitCharType = new SplitType(colorchandingtext, { types: 'words, chars', tagName: 'span' });
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#basicAboutSection",
        start: "top 50%",
        end: "bottom 0%",
        // pin: true,%
        scrub: 1,
        // markers:true
    }
})
    .set(splitCharType.chars, {
        color: secondaryTextColor,
        stagger: 0.1,
    }, 0.1);

// My Process
$(document).ready(function () {
    const horizontalAccordions = $(".accordion.width");
    const cardHeader = $('.card-header');

    function setAccordionStyles() {
        const isSmallScreen = window.innerWidth < 640;
        horizontalAccordions.each((index, element) => {
            const accordion = $(element);
            const collapse = accordion.find(".collapse");
            const bodies = collapse.find("> *");

            if (isSmallScreen) {
                collapse.removeClass("width").addClass("height");
            } else {
                collapse.removeClass("height").addClass("width");
                accordion.height(accordion.height());
                bodies.width(bodies.eq(0).width());
            }

            collapse.not(".show").each((index, element) => {
                $(element).parent().find("[data-toggle='collapse']").addClass("collapsed");
            });
        });
    }

    setAccordionStyles();
    $(window).resize(setAccordionStyles);
});


