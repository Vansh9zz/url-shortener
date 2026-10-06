const express = require("express");

const router = express.Router();

const {

    handleCreateNewURL,
    handleGetAnalytics,
    handleDeleteURL,
    handleGetURLs,

} = require("../controllers/url")

router.post("/", handleCreateNewURL);

router.route("/:shortId")
    .get(handleGetURLs)
    .delete(handleDeleteURL);


router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;