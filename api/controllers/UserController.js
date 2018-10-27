const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;

    try {
      body.password = bcryptService().password(body);
      const user = User.create({
        username: body.username,
        password: body.password,
        name: body.name,
        bio: body.bio,
      });

      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const checkUsername = async (req, res) => {
    const { body } = req;

    try {
      const user = await User.find({
        where: {
          username: body.username,
        },
      });

      if (user) {
        return res.status(400).json({ msg: 'Username already exists' });
      }

      return res.status(200).json({ msg: 'OK' });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const user = await User.findOne({
          where: {
            username,
          },
        });

        if (!user) {
          return res.status(400).json({ msg: 'User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          req.session.username = username;
          req.session.isloggedin = true;
          req.session.user_id = user.user_id;
          return res.status(200).json({ user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const isLoggedIn = async (req, res) => {
    try {
      return res.status(200).json({ isloggedin: req.session.isloggedin });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getUserDetails = async (req, res) => {
    try {
      const userDetails = await User.find({
        user_id: req.session.user_id,
      });
      return res.status(200).json({ userDetails });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const logout = async (req, res) => {
    try {
      req.session.isloggedin = false;
      return res.status(200).json({});
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    register,
    login,
    validate,
    checkUsername,
    getAll,
    isLoggedIn,
    getUserDetails,
    logout,
  };
};

module.exports = UserController;
