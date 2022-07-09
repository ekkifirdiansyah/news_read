const express = require("express");
const newsController = require("../controller/newsController");
const { uploadSingle } = require("../middleware/multer");
const router = express.Router();

router.post("/create", uploadSingle, newsController.addNews);
router.get("/read", newsController.viewNews);
router.patch("/update/:id", uploadSingle, newsController.updateNews);
router.delete("/delete/:id", newsController.deleteNews);

module.exports = router;
