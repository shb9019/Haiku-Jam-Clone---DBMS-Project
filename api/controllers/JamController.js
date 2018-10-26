const Jam = require('../models/Jam');

const JamController = () => {
  const createNewJam = async (req, res) => {
    const { body } = req;

    try {
      Jam.create({
        verse_1: body.verse,
        user_id_1: req.session.user_id,
        is_complete: false,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const addToJam = async (req, res) => {
    const { body } = req;

    try {
      const jam = Jam.find({
        where: {
          jam_id: body.jam_id,
        },
      });

      if (!jam || jam.is_complete) {
        return res.status(400).json({ msg: 'Jam not found' });
      }

      if (!jam.user_id_2) {
        Jam.update({
          user_id_2: req.session.user_id,
          verse_2: body.verse,
        });
      } else {
        Jam.update({
          user_id_3: req.session.user_id,
          verse_3: body.verse,
          is_complete: true,
        });
      }

      return res.status(200).json({ msg: 'Verse Added', complete: jam.user_id_3 });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getMyJams = async (req, res) => {
    try {
      const jams = Jam.findAll({
        $or: [
          {
            user_id_1: {
              $eq: req.session.user_id,
            },
          },
          {
            user_id_2: {
              $eq: req.session.user_id,
            },
          },
          {
            user_id_3: {
              $eq: req.session.user_id,
            },
          },
        ],
      });

      return res.json(200).json({ jams });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getCompletedJams = async (req, res) => {
    try {
      const jams = Jam.findAll({
        where: {
          is_complete: true,
        },
      });

      return res.status(200).json({ jams });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getIncompleteJams = async (req, res) => {
    try {
      const jams = Jam.findAll({
        where: {
          is_complete: false,
          user_id_1: {
            ne: req.session.user_id,
          },
          user_id_2: {
            ne: req.session.user_id,
          },
        },
      });

      return res.status(200).json({ jams });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  return {
    createNewJam,
    addToJam,
    getMyJams,
    getCompletedJams,
    getIncompleteJams,
  };
};

module.exports = JamController;
