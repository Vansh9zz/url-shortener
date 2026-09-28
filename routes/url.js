const express = require("express");

const router = express.Router();

const {

    handleCreateNewURL,
    handleGetURL,
    handleGetAnalytics,

} = require("../controllers/url")

router.post("/", handleCreateNewURL);

router.get("/:shortID", handleGetURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;