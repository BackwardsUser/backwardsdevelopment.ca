var fileUpload = document.getElementById("fileUpload");
var uploadStatus = document.getElementById("status");
fileUpload.addEventListener("submit", submitForm)
/**
 * 
 * @param {Event} e 
 */
function submitForm(e) {
    e.preventDefault();
    uploadStatus.classList.remove("hidden")
    uploadStatus.textContent = "Uploading..."
    const user = document.getElementById("userIdentifier");
    const files = document.getElementById("video")
    const formData = new FormData();
    console.log(formData)
    formData.append("user", user.value);
    for (var i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i])
    }

    var options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: formData
    }

    console.log(options)

    fetch("http://upload.backwardsdevelopment.ca/upload", options)
    .then(res => {
        if (files.files.length > 1) {
            uploadStatus.textContent = `Video Successfully Uploaded`;
        } else {
            uploadStatus.textContent = `Videos Successfully Uploaded`;
        }
        setTimeout( () => {
            uploadStatus.textContent = "";
            uploadStatus.classList.add("hidden")
        })
    })
    .catch(() => {
        uploadStatus.textContent = `Failed to Upload at this time, Please try again later.`;
    });
}