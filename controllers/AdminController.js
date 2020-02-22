import Controller from  './Controller.js';
import AccountService from  "./../services/AccountService.js";
import SubscriptionService from  "./../services/SubscriptionService.js";

class AdminController extends Controller {

    index = function(req, res){
    //switch language;
    var lglink = ""; 
    var lg = "";    
    if(!req.params.lg){
            req.i18n.locale = 'en';
            lglink = 'fr';
            lg = 'en';
        }else{
            req.i18n.locale = req.params.lg;
            lglink = (req.params.lg == 'fr')?'en':'fr';
            lg = req.params.lg;
        }    
        req.session.username;
        if(req.session.username){
            
            res.render('admin/index', 
                {
                    layout:'layouts/admin', 
                    admin: 'admin', 
                    lang: lg, 
                    lglink: lglink, 
                    lgview:'admin', 
                    userid: req.session.userid,
                    dispname: req.session.firstname
                }
            );

        }else{
            res.redirect('/'+lg+'/login');
        }
    }
}

export default new AdminController();