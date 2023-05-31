function createHorizontalScrollListener() {
    const scrollContainers = document.getElementsByClassName("hScroll");

    for (scroller of scrollContainers) {
        
        scroller.addEventListener("mouseenter", () => {
            document.addEventListener("mousewheel", preventScrolling, { passive: false });
            document.addEventListener("DOMMouseScroll", preventScrolling, { passive: false });
        });
        
        scroller.addEventListener("mouseleave", () => {
            document.removeEventListener("mousewheel", preventScrolling);
            document.removeEventListener("DOMMouseScroll", preventScrolling);
        });
        
        scroller.addEventListener("wheel", (evt) => {
            scroller.scrollLeft += evt.deltaY;
        });
    }
}

function preventScrolling(event) {
    event.preventDefault();
}