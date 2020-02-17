'use strict';

import PostController from '../controllers/PostController.js';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';
import server from '../server.js';

export default (app) => {


  //POST ROUTES
  app.get('/', HomeController.index);
  
  // app.get(`/api/post`, PostController.getAll);
  // app.get(`/api/post/:params`, PostController.get);
  // app.post(`/api/post`, PostController.insert)
  // app.put(`/api/post/:id`, PostController.update);
  // app.delete(`/api/post/:id`, PostController.delete);

}