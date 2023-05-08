var express = require("express");
var { join } = require("node:path");

var app = express();

var port = (process.env.NODE_ENV === "production") ? "80" : "3000";

var viewsDir = join(__dirname, "..", "public", "view");

app.use(express.static(join(__dirname, "..", "public")))

app.get("/", (req, res) => {
    res.sendFile(`${viewsDir}/index.html`);
});

app.listen(port, () => {
    console.log(`App Listening to Port ${port}.`);
})