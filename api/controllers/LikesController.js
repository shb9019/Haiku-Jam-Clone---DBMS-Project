const Likes = require('../models/Likes');

const LikesController = () => {
  const addLike = async (req, res) => {
    const { body } = req;

    try {
      const like = await Likes.find({
        where: {
          jam_id: body.jam_id,
          user_id: req.session.user_id,
        },
      });

      if (like) {
        return res.status(400).json({ msg: 'You have already liked.' });
      }

      Likes.create({
        jam_id: body.jam_id,
        user_id: req.session.user_id,
      });

      return res.status(200).json({ msg: 'Liked' });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getLikes = async (req, res) => {
    const { body } = req;

    try {
      const likes = await Likes.findAll({
        where: {
          jam_id: body.jam_id,
        },
      });

      return res.status(200).json({ likes, msg: '' });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  return {
    addLike,
    getLikes,
  };
};

module.exports = LikesController;
