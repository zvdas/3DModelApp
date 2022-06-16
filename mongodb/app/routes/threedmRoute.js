const threedmController = require("../controllers/threedmController");

const multerConfig = require("../config/multerconfig");

const express = require("express");

const router = express.Router();

router.get("/", threedmController.getAll);

router.post("/", multerConfig.upload.single('modelstring'), threedmController.sendOne);

module.exports = router;