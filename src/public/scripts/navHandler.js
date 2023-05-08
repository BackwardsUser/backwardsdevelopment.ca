// This script will run the second the site is opened.

// This function runs when the Dom is loaded.
document.addEventListener("DOMContentLoaded", () => {

    /**
     * @description Gets if the nav is under the header and reveals the hamburger icon if it is.
     * @author Backwards
     */
    var header = document.getElementById("header");
    var nav = document.getElementById("navigation");
    var nav_button = document.getElementById("nav-button");

    // Skip Variable is a very rudimentary (but functional) fix to the document automatically resetting the nav's position type.
    var skip = false

    document.addEventListener("scroll", () => {
        
        if (!skip) {
            nav.style.position = "initial";
        }
        skip = false;

        var nav_pos = nav.getBoundingClientRect();
        var header_pos = header.getBoundingClientRect();

        if (nav_pos.bottom < header_pos.bottom) {
            nav_button.classList.add("nav-btn-left");
        } else {
            nav_button.classList.remove("nav-btn-left");
        }
    })

    /**
    * @description Nav Hamburger Button Click Handling
    * @author Backwards
    */

    nav_button.addEventListener("click", (e) => {
        var nav_pos = nav.getBoundingClientRect();
        var header_pos = header.getBoundingClientRect();
        skip = true;
        nav.style.position = (nav.style.position == "initial") ? "sticky" : "initial";
        nav.style.top = `${header_pos.bottom}px`;
    })

})