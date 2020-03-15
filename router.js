const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
});
client.on('connect', () => {
    console.log('Redis client connected');
});

const express = require("express");
const router = express.Router();
const randomstring = require("randomstring");
const validUrl = require('valid-url');

const prefix = "localhost:4001/"

router.post("/shorten", async (req, res) => {
    console.log(req.body)
    const request_url = req.body.url;
    
    let stop = false;
    let count = 0;
    let length = 2;
    while (!stop && count < 3) {
        const newString = randomstring.generate(length);
        console.log(newString)
        const reply = await getAsync(newString);
        console.log(reply);
        if (!reply) {
            try {
                client.set(newString, request_url);
                res.json({
                    sucess: true,
                    data: prefix + newString,
                    msg: ""
                })
            } catch (err) {
                console.log(err);
                res.json({
                    sucess: false,
                    data: "",
                    msg: "Database problems."
                })
            }
            stop = true;
            
        }
        count += 1;
        if (count === 3) {
            count = 0;
            length += 1;
        }
    }

    
})

router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const shorten_url = req.params.id;
    const result = await getAsync(shorten_url);
    console.log("res: " + result);
    let re = new RegExp("^(http|https)://", "i");
    if (result) {
        if (re.test(result)) res.redirect(301, result);
        else res.redirect(301, 'http://' + result);
    } 
    else {
        res.json({
            success: false,
            data: "",
            msg: "The shorten_url doesn't exist."
        })
    }
})

module.exports = router;