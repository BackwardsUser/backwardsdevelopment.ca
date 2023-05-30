var production = true;

function loginViaDiscord() {
    if (production == false) {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=723670738057560085&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify";
    } else {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=723670738057560085&redirect_uri=https%3A%2F%2Fbackwardsdevelopment.ca%2Fauth%2Fdiscord&response_type=token&scope=identify"
    }
}