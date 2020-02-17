import Controller from  './Controller.js';

class HomeController extends Controller {

  constructor(service) {
    super(service);
  }

  async index(req, res) {
    res.render('home/index', {locals: {title: 'Welcome!'}});
  }
  
}

export default new HomeController(HomeController);
