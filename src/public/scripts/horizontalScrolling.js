document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const scrollContainer = document.getElementsByClassName("H-Scroll");
        console.log(scrollContainer)
        for (scroller of scrollContainer) {
            console.log(scroller)
            scroller.addEventListener("wheel", (evt) => {
                scroller.scrollLeft += evt.deltaY;
            });
        }
    }, 150);
})