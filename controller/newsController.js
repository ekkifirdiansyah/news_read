const News = require("../models/News");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  addNews: async (req, res) => {
    // console.log(req.body);
    const { title, subTitle, description, date } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Image Not Found",
      });
    }

    try {
      const news = new News({
        title,
        subTitle,
        description,
        date,
        imageUrl: `images/${req.file.filename}`,
      });
      await bank.save();
      res.status(200).json(bank);
    } catch (err) {
      await fs.unlink(path.join(`public/images/${req.file.filename}`));
      res.status(500).json({ message: err.message });
    }
  },

  updateNews: async (req, res) => {
    // console.log(req.body);
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "subTitle", "description", "date"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(403).json({
        message: "Wrong Key Parameter",
      });
    }

    try {
      const news = await News.findById(req.params.id);
      if (req.file == undefined) {
        updates.forEach((update) => {
          news[update] = req.body[update];
        });
        await news.save();
        res.status(200).json(news);
      } else {
        await fs.unlink(path.join(`public/${news.imageUrl}`));
        updates.forEach((update) => {
          news[update] = req.body[update];
        });
        news.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        res.status(201).json(news);
      }
    } catch (err) {
      if (req.file) {
        await fs.unlink(path.join(`public/images/${req.file.filename}`));
      }
      res.status(500).json({
        message: err.message,
      });
    }
  },

  viewNews: async (req, res) => {
    try {
      const news = await News.find();
      news.length === 0
        ? res.status(404).json({
            message: "No Data Found",
          })
        : res.status(500).json(news);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  deleteNews: async (req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id);

      if (!news) {
        return res.status(404).json({
          message: "News Not Found",
        });
      } else {
        await news
          .remove()
          .then(() => fs.unlink(path.join(`public/${news.imageUrl}`)));
        res.status(200).json({
          message: "News Deleted",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};
