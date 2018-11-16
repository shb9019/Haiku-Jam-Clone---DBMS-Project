const Sequelize = require('sequelize');
const Jam = require('../models/Jam');
const User = require('../models/User');
const ReadJam = require('../models/ReadJam');
const Likes = require('../models/Likes');

const JamController = () => {
  const createNewJam = async (req, res) => {
    const { body } = req;

    try {
      Jam.create({
        title: body.title,
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
      const jam = await Jam.find({
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
        }, {
          where: {
            jam_id: body.jam_id,
          },
        });
      } else {
        Jam.update({
          user_id_3: req.session.user_id,
          verse_3: body.verse,
          is_complete: true,
        }, {
          where: {
            jam_id: body.jam_id,
          },
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
      const jams = await Jam.findAll({
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

      return res.status(200).json({ jams });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getCompletedJams = async (req, res) => {
    try {
      const jams = await Jam.findAll({
        where: {
          is_complete: true,
        },
      });

      const like = await Likes.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });

      const likes = [];
      if (like) {
        like.forEach((likeData) => {
          likes.push(likeData.dataValues.jam_id);
        });
      }
      console.log(likes);
      if (jams) {
        jams.forEach((jam, index) => {
          if (likes && likes.includes(jam.dataValues.jam_id)) {
            jams[index].dataValues.liked = true;
          } else {
            jams[index].dataValues.liked = false;
          }
        });
      }
      console.log(jams);
      console.log(jams.dataValues);
      return res.status(200).json({ jams });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getIncompleteJams = async (req, res) => {
    try {
      const jams = await Jam.findAll({
        where: {
          is_complete: false,
        },
      });

      const userId = req.session.user_id;

      const finalJams = [];
      jams.forEach((element) => {
        if (element.user_id_1 !== userId && element.user_id_2 !== userId) {
          finalJams.push(element);
        }
      });

      return res.status(200).json({ jams: finalJams });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  const getNextJam = async (req, res) => {
    try {
      let readJams = await ReadJam.findAll({ attributes: ['jam_id'] }, {
        where: {
          user_id: req.session.user_id,
        },
      });

      const readJamIds = [];
      readJams.forEach((data) => {
        readJamIds.push(data.dataValues.jam_id);
      });
      console.log(readJamIds);

      let jams = await Jam.findAll({
        where: {
          is_complete: false,
          jam_id: {
            [Sequelize.Op.notIn]: readJamIds,
          },
        },
      });

      const userId = req.session.user_id;
      const finalJams = [];
      jams.forEach((element) => {
        if (element.user_id_1 !== userId && element.user_id_2 !== userId) {
          finalJams.push(element);
        }
      });

      if (finalJams.length === 0) {
        ReadJam.destroy({
          where: {
            user_id: req.session.user_id,
          },
        });

        readJams = await ReadJam.findAll({ attributes: ['jam_id'] }, {
          where: {
            user_id: req.session.user_id,
          },
        });

        jams = await Jam.findAll({
          where: {
            is_complete: false,
            jam_id: {
              [Sequelize.Op.notIn]: readJams,
            },
          },
        });

        jams.forEach((element) => {
          if (element.user_id_1 !== userId && element.user_id_2 !== userId) {
            finalJams.push(element);
          }
        });
      }

      if (finalJams && finalJams.length > 0) {
        const jam = finalJams[0].dataValues;
        await ReadJam.create({
          user_id: req.session.user_id,
          jam_id: finalJams[0].jam_id,
        });
        if (jam.user_id_1 != null) {
          const userName1 = await User.find({
            where: {
              user_id: jam.user_id_1,
            },
          });
          jam.user_name_1 = userName1.username;
          console.log(jam);
        }

        if (jam.user_id_2 != null) {
          const userName2 = await User.find({
            where: {
              user_id: jam.user_id_2,
            },
          });
          jam.user_name_2 = userName2.username;
        }
        return res.status(200).json({ jam });
      }

      return res.status(200).json({ jam: null });
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
    getNextJam,
  };
};

module.exports = JamController;
