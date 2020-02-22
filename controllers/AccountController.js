import Controller from  './Controller.js';
import AccountService from  "./../services/AccountService.js";
import Account from  "../models/admin/account/Account.js";
import validationResult from 'express-validator';

const acc = new Account().initSchema('Account');
const accountService = new AccountService(acc);


class AccountController extends Controller {

  constructor(service) {
    super(service);
  }

  index(req, res) {
       res.render('user/index', {users: '', lang: req.params.lg, lglink: '', lgview:''});
    //    accountService.addUser({
    //         firstname:"Jhonny",
    //         lastname: "Alcius",
    //         company_name: "Soumission renovation",
    //         company_desc: "Juste un test, juste un test",
    //         promoCode: "",
    //         activeDate: "",
    //         license_name: "123345",
    //         license_id: '10999834',
    //         current_balance: 20,
    //         last_balance: 23, 
    //         last_try: "",
    //         nbr_try: 1,             
    //         username: "ajhonny",
    //         password: "Passwords01"
    //         }
    //     )
  }
  
  //main validation method for users form
  validate(method) {
    switch(method){
        case 'add':{
            return [
                check('password', "Must be 5 characters or more").isLength({ min:5 }),
                check('firstname', "a firstname is required").exists(),
                check('lastname', "a lastname is required").exists(),
                check('location', "Your current location is required").exists(),
                check('email')
                    .exists().withMessage("An email is required")
                    .isEmail().withMessage("Wrong email format"),
                check('phone')
                    .optional()
                    .isMobilePhone().withMessage("wrong phone format")
            ]
        }
        break;
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
    res.redirect('/'+lg+'/users/login');
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
            lgview:'user/login',
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

       accountService.verifyUser(req.body, function(match){
           
            if(match){
                req.session.username = match.username;
                req.session.userid = match._id;
                req.session.email = match.email;
                req.session.firstname = match.firstname;
                req.session.lastname = match.lastname;  
                console.log(req.session);                 
                res.redirect('/'+lg+'/admin/');
            }else{
                res.redirect('/'+lg+'/login');
            }           
       });
    }

  }






  add(req, res, next){
    //get user exists promisE
    exists = user_exists(req.body.email);
    
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send({response:errors.array()});   
            return;
        }

        exists.then(result => {
            if(Object.keys(result).length == 0){
                let {firstname, lastname, phone, company, location, email, password_b, utype} = req.body;
                switch(req.body.utype) {
                    case 'vendor':
                        bcrypt.hash(req.body.password, 10, function(err, hash){
                            Model.User.create({
                                firstname, lastname, email, username: email, password:hash, company, phone1 : phone, address: location, type : utype
                            })
                            .then(user => {
                                res.send({response: user.id + ' - A new vendor has been created'});
                            })
                            .catch(err => console.log(err));
                        });
            
                    break;

                    case 'buyer':
                        res.send({response: 'Buyer form'});
                    break;
                    case 'provider':
                            Model.User.create({
                                firstname, lastname, email, username: email, password, company, phone1 : phone, address: location, type : utype
                            })
                            .then(user => {
                                res.send({response: user.id + ' - A new vendor has been created'});
                            })
                            .catch(err => console.log(err));
                    break;          
                    default:
                        res.send({response: 'No request found'});
                }
            }else{
                res.send({response: {"errors":[{"location":"body","param":"password","value":"","msg":"User already exists"}]}});
            }
        })
    
    }catch(err){
      return next(err)
    }
  };

  edit(req, res){
    res.render('users');
  };

  search(req, res){
    res.render('users/search/:id');
  };
}



export default new AccountController(accountService);
