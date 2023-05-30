var isUploadShown = false;

function usernameClicked() {
    var media = document.getElementById("mediaContainer")
    var upload = document.getElementById("uploadContainer")

    if (isUploadShown) {
        isUploadShown = !isUploadShown;
        upload.classList.add("hidden");
        media.classList.remove("hidden");
    } else {
        isUploadShown = !isUploadShown;
        media.classList.add("hidden");
        upload.classList.remove("hidden");
    }
}