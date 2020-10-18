const musicModel = require("./model.music");

class MusicControllers {
  createMusic = async (req, res, next) => {
    try {
      const newMusic = await musicModel.create(req.body);
      res.status(201).send(newMusic);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new MusicControllers();
