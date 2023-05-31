// I just recoded this ENTIRE DOCUMENT
// THIS IS THE SECOND TIME

function discordVerifier() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (!accessToken) {
        window.location.href('/');
    }

    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
    .then(result => result.json())
    .then(res => {
        const { username, discriminator, avatar, id } = res;
        
        document.getElementById("username").innerText = `${username}#${discriminator}`;
        document.getElementById("usernamea").innerText = `${username}#${discriminator}`;

        document.getElementById("userIdentifier").value = `${id}`;

        document.getElementById("pfp").src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
        document.getElementById("pfpa").src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
    })
}

function mediaLoader() {
    fetch('/getMedia')
    .then(result => result.json())
    .then(res => {
        var media = document.getElementById("media");
        res.forEach(userContent => {
            var identifier = userContent.identifier;
            var user = userContent.user;
            var videos = userContent.videos;

            var userVideos = document.createElement("div");
            userVideos.classList.add("userdiv");

            media.appendChild(userVideos);

            var userDisplay = document.createElement("h3");
            userDisplay.classList.add("section-header");
            userDisplay.textContent = user;

            userVideos.appendChild(userDisplay);

            var videoContainer = document.createElement("div");
            videoContainer.classList.add("videosContainer", "hScroll");
            
            userVideos.appendChild(videoContainer);

            videos.forEach(video => {
                var videoElement = document.createElement("video");
                videoElement.controls = true;
                videoElement.src = `/assets/videos/mediashare/${identifier}/${video}`;
                videoElement.classList.add("mediaVid");
                
                videoContainer.appendChild(videoElement);
            })
        })
        createHorizontalScrollListener();
    })
}

window.onload = () => {
    discordVerifier();
    mediaLoader();
}