const API_PORT = process.env.PORT || 4001;

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = require("./router");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
//app.use(express.static(path.join(__dirname, "/client/build")));
app.listen(API_PORT, () => console.log(`SERVER LISTENING ON PORT ${API_PORT}`));
/*
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
})
*/
