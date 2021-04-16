const express = require('express');

const MainController = require('./controllers/MainController');
const UserController = require('./controllers/UserController');
const FollowController = require('./controllers/FollowController');
const RepositoryController = require('./controllers/RepositoryController');
const Repo_starController = require('./controllers/Repo_starController');
const TokenController = require('./controllers/TokenController');

const routes = express.Router();


routes.get('/api/:username', MainController.show);
routes.get('/api/repositories/:username', RepositoryController.show);
routes.get('/api/followers/:username', FollowController.showFollower);
routes.get('/api/followings/:username', FollowController.showFollowing);


routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/follows', FollowController.list);
routes.get('/follows/:id', FollowController.show);
routes.post('/follows', FollowController.create);
routes.put('/follows/:id', FollowController.update);
routes.delete('/follows/:id', FollowController.delete);

routes.get('/repositories', RepositoryController.list);
routes.post('/repositories', RepositoryController.create);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.delete);

routes.get('/repo_stars', Repo_starController.list);
routes.get('/repo_stars/:id', Repo_starController.show);
routes.post('/repo_stars', Repo_starController.create);
routes.put('/repo_stars/:id', Repo_starController.update);
routes.delete('/repo_stars/:id', Repo_starController.delete);

routes.get('/tokens', TokenController.list);

module.exports = routes;