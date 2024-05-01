require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Midjourney } = require("midjourney");

const app = express();
const port = 3000; // You can change this to any port you prefer

// Middleware to parse JSON body
app.use(bodyParser.json());

// Initialize Midjourney client
const client = new Midjourney({
    ServerId: process.env.SERVER_ID,
    ChannelId: process.env.CHANNEL_ID,
    SalaiToken: process.env.SALAI_TOKEN,
    Debug: false,
    Ws: true,
    SessionId: process.env.SALAI_TOKEN || "8bb7f5b79c7a49f7d0824ab4b8773a81",
});
client.Connect();

// POST route to describe an image
app.post("/describe-image", async (req, res) => {
    try {
        console.log(req.body)
        const { imageUrl }  = req.body;
        console.log("Image URL: " + imageUrl)
        console.log(imageUrl);
        const Describe = await client.Describe(imageUrl);
        if (!Describe) {
            return res.status(500).json({ message: "Failed to describe image" });
        }
        return res.status(200).json({ description: Describe });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/", async (req, res) => {
    return res.status(200).json({message: "OK" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
