function createHorizontalScrollListener() {
    const scrollContainers = document.getElementsByClassName("hScroll");

    for (scroller of scrollContainers) {
        
        scroller.addEventListener("mouseenter", () => {
            document.body.style.overflow = "hidden";
        });
        
        scroller.addEventListener("mouseleave", () => {
            document.body.style.overflow = "auto";
        });
        
        scroller.addEventListener("wheel", (evt) => {
            evt.currentTarget.scrollLeft += evt.deltaY;
        });
    }
}