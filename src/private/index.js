var express = require("express");
var { join } = require("node:path");
var { readdirSync, renameSync } = require("node:fs");
var favicon = require("serve-favicon");

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var app = express();

var port = (process.env.NODE_ENV === "production") ? "80" : "3000";

var viewsDir = join(__dirname, "..", "public", "view");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.sendFile(`${viewsDir}/index.html`);
});

app.get("/about", (req, res) => {
    res.redirect("/");
});

app.get("/media", (req, res) => {
    res.sendFile(`${viewsDir}/mediaLogin.html`)
})

app.get("/auth/discord", (req, res) => {
    res.sendFile(`${viewsDir}/media.html`)
})

app.get("/getMedia", (req, res) => {
    
    var userFiles = readdirSync(join(__dirname, "..", "public", "assets", "videos", "mediashare"));
    var mediaFiles = [];

    userFiles.forEach(user => {
        var userFiles = readdirSync(join(__dirname, "..", "public", "assets", "videos", "mediashare", user))
        var userContent = {
            submitter: user,
            videos: userFiles
        }
        mediaFiles.push(userContent);
    })
    

    res.send(mediaFiles)
})

var uploadedFiles_dir = join(__dirname, "..", "..", "uploads")
var media_dir = join(__dirname, "..", "public", "assets", "videos", "mediashare")

app.post("/upload", upload.array("files"), (req, res) => {
    res.json({ message: "Successfully Uploaded Files." })
    req.files.forEach(file => {
        renameSync(`${uploadedFiles_dir}/${file.filename}`, `${media_dir}/${req.body.user}/${file.originalname}`)
    })
})

app.listen(port, () => {
    console.log(`App Listening to Port ${port}.`);
})