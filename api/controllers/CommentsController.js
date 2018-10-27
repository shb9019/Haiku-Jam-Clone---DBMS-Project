const Comments = require('../models/Comments');

const CommentsController = () => {
  const addComment = async (req, res) => {
    const { body } = req;

    try {
      Comments.create({
        jam_id: body.jam_id,
        user_id: req.session.user_id,
        comment: body.comment,
      });

      return res.status(200).json({ msg: 'Commented' });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getComments = async (req, res) => {
    const { body } = req;

    try {
      const comments = await Comments.findAll({
        where: {
          jam_id: body.jam_id,
        },
      });

      return res.status(200).json({ comments, msg: '' });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  return {
    addComment,
    getComments,
  };
};

module.exports = CommentsController;
