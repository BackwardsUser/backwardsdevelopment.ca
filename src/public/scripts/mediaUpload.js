document.getElementById("fileUpload").addEventListener("submit", submitForm)
/**
 * 
 * @param {Event} e 
 */
function submitForm(e) {
    e.preventDefault();
    const user = document.getElementById("usernameb");
    const files = document.getElementById("video")
    const formData = new FormData();
    formData.append("user", user);
    for (var i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i])
    }
    fetch("/upload", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "mmultipart/form-data"
        }
    })
    .then(res => {console.log(res)})
    .catch(console.error);
}