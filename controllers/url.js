const { nanoid } = require("nanoid");

const { URL } = require("../models/url");


async function handleCreateNewURL(req, res){

    const body = req.body;

    if (!body.url){
        return res.status(400).json({ "error": "URL is required" })
    }

    const shortId = nanoid(8);

    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : [],
    })

    return res.status(201).json({ "id": shortId });

}

async function handleGetURL(req, res){

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push:
        { 
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });

}

async function handleGetAnalytics(req, res){

    const shortId = req.params.shortId;

    const entry = await URL.findOne({
        shortId: shortId,
    });

    if (!entry){
        return res.status(404).json({"error": "URL not found"});
    } 
        
    return res.status(200).json({
                "redirectURL": entry.redirectURL,
                "visitHistory": entry.visitHistory,
            });

}


module.exports = {

    handleCreateNewURL,
    handleGetURL,
    handleGetAnalytics,

}