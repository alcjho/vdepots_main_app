import Controller from  './Controller.js';
import PostService from  "./../services/PostService.js";
import Post from  "./../models/Post.js";
const postService = new PostService(
  new Post().getInstance()
);

class PostController extends Controller {

  constructor(service) {
    super(service);
  }
  
}

export default new PostController(postService);
