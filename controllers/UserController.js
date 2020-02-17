import Controller from  './Controller.js';
import UserService from  "./../services/UserService.js";
import User from  "./../models/User.js";
const userService = new UserService(
    new User().getInstance()
);

class UserController extends Controller {

  constructor(service) {
    super(service);
  }

  async index(req, res) {
    let a = "User login page";
    return res.status(200).send(a);
  }

  async login(req, res) {
    let a = "User login page";
    return res.status(200).send(a);
  }  
  
}

export default new UserController(userService);
