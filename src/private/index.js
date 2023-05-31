var express = require("express");
var { join } = require("node:path");
var { readdirSync, renameSync, mkdirSync } = require("node:fs");
var favicon = require("serve-favicon");

require("dotenv").config();

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
    var userDirectories = readdirSync(join(__dirname, "..", "public", "assets", "videos", "mediashare"));
    var mediaFiles = [];

    var fetchPromises = userDirectories.map(identifier => {
        var userFiles = readdirSync(join(__dirname, "..", "public", "assets", "videos", "mediashare", identifier));

        return fetch(`https://discord.com/api/v9/users/${identifier}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        })
            .then(result => result.json())
            .then(res => {
                var userContent = {
                    identifier: identifier,
                    user: `${res.username}#${res.discriminator}`,
                    videos: userFiles
                };
                mediaFiles.push(userContent);
            });
    });

    Promise.all(fetchPromises)
        .then(() => {
            res.send(mediaFiles);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch requests
            console.error(error);
            res.status(500).send("An error occurred");
        });
});

var uploadedFiles_dir = join(__dirname, "..", "..", "uploads")
var media_dir = join(__dirname, "..", "public", "assets", "videos", "mediashare")

function getUserHasFile(username) {
    var files_indexed = readdirSync(media_dir).filter(user => user === username)
    if (files_indexed > 0) return true
    else return false;
}

app.post("/upload", upload.array("files"), (req, res) => {
    console.log(req.body.user);
    if (req.body.user == "") return console.log("Cannot post anonymously")
    res.json({ message: "Successfully Uploaded Files." })
    if (!getUserHasFile(req.body.user)) mkdirSync(`${media_dir}/${req.body.user}`);
    req.files.forEach(file => {
        renameSync(`${uploadedFiles_dir}/${file.filename}`, `${media_dir}/${req.body.user}/${file.originalname}`)
    })
})

app.listen(port, () => {
    console.log(`App Listening to Port ${port}.`);
})