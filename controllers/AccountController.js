import Controller from  './Controller.js';
import AccountService from  "./../services/AccountService.js";
import Account from  "../models/admin/account/Account.js";
import Validator from '../config/validator.js';

const validator = new Validator;
const acc = new Account().initSchema('Account');
const accountService = new AccountService(acc);


class AccountController extends Controller {

  constructor(service) {
    super(service);
  }
   
    login(req, res){
        //Set language for this page.
        var lglink = '';
        var lg = '';
        if(!req.params.lg){
            req.i18n.locale = 'en';
            lglink = 'fr';
            lg = 'en';
        }else{
            req.i18n.locale = req.params.lg;
            lglink = (req.params.lg == 'fr')?'en':'fr';
            lg = req.params.lg;
        }
        
        if(req.method == "GET"){
            res.render('user/login',
            {
                homelink: req.i18n.__("Home"),
                signuplink: req.i18n.__("Signup"),
                loginlink: req.i18n.__("Login"),
                lglink: lglink,
                lgview:'login',
                lang: lg,
                forgot_password: req.i18n.__("Forgot your password?"),
                username: req.i18n.__("Your username"),
                password: req.i18n.__("Your password"),
                submit: req.i18n.__("Submit"),
                remember: req.i18n.__("Remember me"),
                having_account: req.i18n.__("Don't have an account?"),
                signup: req.i18n.__("Signup"),
                loginTitle: req.i18n.__("login"),
                password_length_error: req.i18n.__("Must be 5 characters or more?"),
                wrong_email_error: req.i18n.__("Wrong email format"),
                wrong_phone_error: req.i18n.__("Wrong phone format")
            });
        }else if(req.method == "POST"){    
            var validationError = validator.validateLogin(req.body);

            if(!validationError){
                accountService.verifyUser(req.body, function(match){           
                    if(match){
                        req.session.username = match.username;
                        req.session.userid = match._id;
                        req.session.email = match.email;
                        req.session.firstname = match.firstname;
                        req.session.lastname = match.lastname;  
                                        
                        res.redirect('/'+lg+'/admin/');
                    }else{
                        res.redirect('/'+lg+'/login');
                    }           
                });
            }else{
                res.send(validationError);
            }
        }
    }

    add(req, res){
        //Set language for this page.
        var lglink = '';
        var lg = '';
        if(!req.params.lg){
            req.i18n.locale = 'en';
            lglink = 'fr';
            lg = 'en';
        }else{
            req.i18n.locale = req.params.lg;
            lglink = (req.params.lg == 'fr')?'en':'fr';
            lg = req.params.lg;
        }

        var error = validator.validateNewUser(req.body);
        if(error){
            res.send(error);
        }else{
            accountService.addUser(req.body, function(isAdded){
                if(isAdded){
                    res.render('user/add', {lang: lg, lgview:"user/add", lglink: lglink });
                }else{
                    res.send('Failed to add user document');
                }
            });
            
        }
    }

    logout(req, res){
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

        req.session.destroy();
        res.redirect('/'+lg+'/login');
    }
}



export default new AccountController(accountService);
