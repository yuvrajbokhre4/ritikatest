
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

// Image Transition
document.addEventListener("DOMContentLoaded", function () {
    const imageContainers = document.querySelectorAll(".imageTransitionContainers");

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) * .8 &&
            rect.bottom > 0
        );
    }

    function revealImages() {
        imageContainers.forEach((imageContainer) => {
            const imgs = imageContainer.querySelectorAll(".imageTransition"); // Get all image elements within the container
            if (isInViewport(imageContainer)) { // Check if the container is in the viewport
                imgs.forEach((img) => { // Iterate over each image
                    if (!img.classList.contains('revealed')) { // Check if the image has already been revealed
                        gsap.fromTo(img,
                            {
                                // scale: "1.1"
                            },
                            {
                                // scale: "1",
                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                duration: 1.5,
                                ease: "power1.out"
                            });
                        img.classList.add('revealed'); // Mark the image as revealed
                    }
                });
            }
        });
    }


    window.addEventListener('scroll', revealImages);
    revealImages(); // Initial check
});



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
        // $(".footerContainer").css({
        //     bottom: "0px",
        // });
        const footerMotion = gsap.utils.mapRange(n, n + heightFooter, -heightFooter / 3, 0, scrollY);
        document.querySelector(".footerContainer").style.bottom = `${footerMotion}px`;
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