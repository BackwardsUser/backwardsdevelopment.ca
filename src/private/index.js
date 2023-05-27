var express = require("express");
var { join } = require("node:path");
var favicon = require("serve-favicon")

var app = express();

var port = (process.env.NODE_ENV === "production") ? "80" : "3000";

var viewsDir = join(__dirname, "..", "public", "view");

app.use(express.static(join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.sendFile(`${viewsDir}/index.html`);
});

app.get("/about", (req, res) => {
    res.redirect("/");
});

app.get("/media", (req, res) => {
    res.sendFile(`${viewsDir}/media.html`)
})

app.listen(port, () => {
    console.log(`App Listening to Port ${port}.`);
})