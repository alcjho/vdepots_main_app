import Controller from  './Controller.js';

class HomeController extends Controller {

  constructor(service) {
    super(service);
  }

  index(req, res) {
     var lglink = '';
     var lg = '';
    //switch language;
     if(!req.params.lg){
      req.i18n.locale = 'en';
      lglink = 'fr';
      lg = 'en';
  }else{
      req.i18n.locale = req.params.lg;
      lglink = (req.params.lg == 'fr')?'en':'fr';
      lg = req.params.lg;
  }

  res.render('home/index', 
      {
          lglink: lglink,
          lgview:'',
          lang:lg            
      }
  );
  }
  
}

export default new HomeController
