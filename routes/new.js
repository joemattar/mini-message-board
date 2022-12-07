const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

/* GET new message page. */
router.get("/", messageController.message_create_get);

router.post("/", messageController.message_create_post);

module.exports = router;
