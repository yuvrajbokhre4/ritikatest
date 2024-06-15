gsap.registerPlugin(ScrollTrigger);
// Get the root element
var root = document.documentElement;
var style = getComputedStyle(root);
const primeTextColor = style.getPropertyValue('--prime-text-color');
const secondaryTextColor = style.getPropertyValue('--secondary-text-color');

var eyeCircle = $('.eyeCircle');
// console.log(eyeCircle.width());
var eyeLocationX = $('.eyeButton').offset().left - $(window).scrollLeft() + $('.stickyEyeButton').width() / 2;
var eyeLocationY = $('.eyeButton').offset().top - $(window).scrollTop() + $('.stickyEyeButton').height() / 2;

let xTo = gsap.quickTo(eyeCircle, "x", { duration: 0.6, ease: "power4" }),
    yTo = gsap.quickTo(eyeCircle, "y", { duration: 0.6, ease: "power4" }),
    xEyeTo = gsap.quickTo(".stickyEye", "x", { duration: 0.6, ease: "power3" }),
    yEyeTo = gsap.quickTo(".stickyEye", "y", { duration: 0.6, ease: "power3" }),
    eyeOutlineMask = $('.eyeOuterPath');


$(document).ready(function () {
    setInterval(function () {
        // Create a GSAP timeline
        var tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

        // Add the eye closing animation
        tl.to(".eyeOuterPath", { duration: 0.05, scaleY: 0.1, transformOrigin: "center", ease: "ease" });

        // Add a delay for the closed state before reopening
        tl.to(".eyeOuterPath", { duration: 0.5, scaleY: 1, transformOrigin: "center", delay: 0, ease: "ease" });
        tl.to(".eyeOuterPath", { duration: 0.15, scaleY: 1.1, transformOrigin: "center", delay: 1, ease: "ease" });

    }, 2500);
});



if (window.DetectIt.deviceType === 'mouseOnly' | 'hybrid') {
    // console.log("cursor");
    window.addEventListener("mousemove", e => {
        // console.log("clientX", e.clientX, 'clientY', e.clientY);


        if ((event.pageX - eyeLocationX) > 0) {
            xTo(gsap.utils.mapRange(0, eyeLocationX, -40, 0, e.clientX));
        }
        else {
            xTo(gsap.utils.mapRange(eyeLocationX, window.innerWidth, 0, 40, e.clientX));
        }

        if ((event.pageY - eyeLocationY) < 0) {
            yTo(gsap.utils.mapRange(0, eyeLocationY, -40, 0, e.clientY));
        }
        else {
            // console.log("yExtrene", eyeLocationY, "\n", event.pageY - eyeLocationY);
            yTo(gsap.utils.mapRange(eyeLocationY, window.innerHeight, 0, 40, e.clientY));
        }
        // yTo(gsap.utils.mapRange(0, window.innerHeight, -40, 40, e.clientY));

        xEyeTo(gsap.utils.mapRange(0, window.innerWidth, -20, 20, e.clientX));
        yEyeTo(gsap.utils.mapRange(0, window.innerHeight, 0, 30, e.clientY));

    });
}
else {
    $(document).ready(function () {

        // Create a GSAP timeline
        var tl = gsap.timeline({ repeat: -1, repeatDelay: .2 });


        
        tl.to(eyeCircle, { duration: .8, y: 0, x: 10, delay: 1, ease: "power1.inOut" });
        tl.to(eyeCircle, { duration: .8, y: 0, x: -10, delay: 0, ease: "power1.inOut" });
        tl.to(eyeCircle, { duration: .4, y: 0, x: 0, delay: 0, ease: "power1.in" });
    });
}
// let intentObserver = ScrollTrigger.observe({
//     onUp: (self) => headerup(),
//     onDown: (self) => headerdown(),
//     wheelSpeed: -1,
//     tolerance: 10,
//     preventDefault: false,
// });

function headerup() {
    $(".stickyEye").css('top', '-20%');
}
function headerdown() {
    $(".stickyEye").css('top', '10px');

}



// Footer

var windowHeight = window.innerHeight,
    footerHeight = $(".footerContainer").innerHeight(),
    sectionheight = $(".footerParallex").innerHeight() + footerHeight;

$("#scroll-animate, #footerAnimationMain").css({
    height: sectionheight + "px",
});
// console.log(sectionheight - windowHeight, sectionheight);

scrollFooter(window.scrollY, footerHeight);


// when scrolling
window.onscroll = function () {
    var scroll = window.scrollY;

    $("#footerAnimationMain").css({
        top: "-" + scroll + "px",
    });

    scrollFooter(scroll, footerHeight);
};

// Footer


// stacking
function scrollFooter(scrollY, heightFooter) {
    // console.log(scrollFooter);
    const body = document.body;
    const html = document.documentElement;
    const bdheight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    const n = bdheight - heightFooter - $(window).height();

    if (scrollY >= n) {

        if (scrollY - n >= $(window).height()) {
            $(".footerContainer").css({
                "z-index": "1",
            });
        } else {
            $(".footerContainer").css({
                "z-index": "0",
            });
        }
        $(".footerContainer").css({
            bottom: "0px",
        });
        $(".background").css({
            position: "absolute",
        });
    } else {
        $(".footerContainer").css({
            bottom: "-" + heightFooter + "px",
        });
        $(".background").css({
            position: "fixed",
        });
    }
}