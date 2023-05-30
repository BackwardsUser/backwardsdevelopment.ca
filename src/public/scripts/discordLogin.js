function loginViaDiscord() {
    var discordOAuth2Link = "https://discord.com/api/oauth2/authorize?client_id=723670738057560085&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify";
    window.location.href = discordOAuth2Link;
}