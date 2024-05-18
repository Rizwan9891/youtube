const express = require("express");
const fs = require("fs");
const ytdl = require('ytdl-core');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post('/download', async (req, res) => {
    try {
        let url = req.body.url
        let n = Math.floor(Math.random() * 10000);
        let videID = ytdl.getURLVideoID(url);
        await ytdl.getInfo(videID).then((info) => {
            res.header("Content-Disposition", 'attachment; filename="Video.mp4');
            let video = ytdl(url, { format: 'mp4' }).pipe(res);
            // let formats = ytdl.filterFormats(info.formats, 'audioandvideo')
            // res.status(200).json([{ videoLink: formats, }, { thumbnail: info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails }]);
            let data = ""
            video.on("data", d => data += d);
            video.on("end", () => res.send(data));
            return
        })
    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});