/***
 *                                                                                                                                                                     
 *    ______  ______      _____                _____   ______   _______    _______     _______       _____        ___________       ____________               _____   
 *    \     \|\     \   /      |_         _____\    \_|\     \  \      \  /      /|   |\      \    /      |_      \          \      \           \         _____\    \  
 *     |     |\|     | /         \       /     /|     |\\     \  |     /|/      / |   | \      \  /         \      \    /\    \      \           \       /    / \    | 
 *     |     |/____ / |     /\    \     /     / /____/| \|     |/     //|      /  |___|  \      ||     /\    \      |   \_\    |      |    /\     |     |    |  /___/| 
 *     |     |\     \ |    |  |    \   |     | |____|/   |     |_____// |      |  |   |  |      ||    |  |    \     |      ___/       |   |  |    |  ____\    \ |   || 
 *     |     | |     ||     \/      \  |     |  _____    |     |\     \ |       \ \   / /       ||     \/      \    |      \  ____    |    \/     | /    /\    \|___|/ 
 *     |     | |     ||\      /\     \ |\     \|\    \  /     /|\|     ||      |\\/   \//|      ||\      /\     \  /     /\ \/    \  /           /||    |/ \    \      
 *    /_____/|/_____/|| \_____\ \_____\| \_____\|    | /_____/ |/_____/||\_____\|\_____/|/_____/|| \_____\ \_____\/_____/ |\______| /___________/ ||\____\ /____/|     
 *    |    |||     | || |     | |     || |     /____/||     | / |    | || |     | |   | |     | || |     | |     ||     | | |     ||           | / | |   ||    | |     
 *    |____|/|_____|/  \|_____|\|_____| \|_____|    |||_____|/  |____|/  \|_____|\|___|/|_____|/  \|_____|\|_____||_____|/ \|_____||___________|/   \|___||____|/      
 *                                             |____|/                                                                                                                 
 */
// Coded by Backwards (BackwardsUser)
// MIT License

/* Imports */
require("dotenv").config();
var express = require("express");
var { join } = require("node:path");
var { readdirSync, renameSync, mkdirSync, rmSync } = require("node:fs");
var { exec } = require('node:child_process')
var multer = require("multer");

/* Package Initialization */
var upload = multer({ dest: "uploads/" });
var app = express();

/* Variables */
var port = "2000"
var viewsDir = join(__dirname, "..", "public", "view");
var uploadSize = '200mb';

/* Express Initialization */
app.use(express.json({ limit: uploadSize }));
app.use(express.urlencoded({ limit: uploadSize, extended: true }));
app.use('/', express.static(join(__dirname, "..", "public")));

/* Pages */
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

app.get("/downloads", (req, res) => {
    res.sendFile(`${viewsDir}/downloads.html`)
})

/* API Stuff */
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
    console.log("Upload Request Submitted");
    if (req.body.user == "") return console.log("Cannot post anonymously");
    if (!getUserHasFile(req.body.user)) mkdirSync(`${media_dir}/${req.body.user}`);
    console.log("User has directory");
    req.files.forEach(file => {
        renameSync(`${uploadedFiles_dir}/${file.filename}`, `${media_dir}/${req.body.user}/${file.originalname}`)
        console.log("Moving and Renaming Source File");
        const newFile = file.originalname.split(".");
        const fileName = newFile.shift();
        console.log("Checking if submitted file is MP4");
        if (newFile[0] === "mp4") return res.json({ message: "Upload Successful"});
        console.log("File not MP4, converting to MP4");
        const command = `ffmpeg -i "${media_dir}/${req.body.user}/${file.originalname}" "${media_dir}/${req.body.user}/${fileName}.mp4"`
        exec(command, { stdio: 'ignore' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`FFmpeg error: ${error.message}`);
                return;
            }
            console.log("File converted.")
            rmSync(`${media_dir}/${req.body.user}/${file.originalname}`);
            console.log("Removed Original File.")
            res.json({ message: "Upload Successful"});
        });
    })
})

/* App Listener */
app.listen(port, () => {
    console.log(`App Listening to Port ${port}.`);
})