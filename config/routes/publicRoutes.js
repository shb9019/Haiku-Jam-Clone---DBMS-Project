const publicRoutes = {
  'POST /register': 'UserController.register',
  'POST /login': 'UserController.login',
  'POST /checkUsername': 'UserController.checkUsername',
  'GET /getDetails': 'UserController.getUserDetails',
  'GET /isloggedin': 'UserController.isLoggedIn',
  'GET /logout': 'UserController.logout',

  'POST /createNewJam': 'JamController.createNewJam',
  'POST /addToJam': 'JamController.addToJam',
  'GET /getMyJams': 'JamController.getMyJams',
  'GET /getCompletedJams': 'JamController.getCompletedJams',
  'GET /getIncompleteJams': 'JamController.getIncompleteJams',

  'POST /addLike': 'LikesController.addLike',
  'POST /getLikes': 'LikesController.getLikes',

  'POST /addComment': 'CommentsController.addComment',
  'POST /getComments': 'CommentsController.getComments',
};

module.exports = publicRoutes;
