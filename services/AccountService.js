
import Service from './Service.js';
import Account from '../models/admin/account/Account.js';
import bcrypt from 'bcrypt';

class AccountService extends Service {
  constructor(account) {
    super(account);
  }


  async addUser(data, callback){
    const usrmodel = this.model;
    
    exists = this.user_exists(data.email, function(exists){
      if(exists){
        callback(false);
       
      }else{
        usrmodel(data).save(function (err) {
          if (err){ 
            callback(false); 
            throw err;
          }
          
          callback(true);
          console.log('User Document has been saved successfully!');
        });        
      }
    });
   

  }


  async verifyUser(data, callback){
    // fetch user and test password verification
    this.model.findOne({ username: data.username }, function(err, user) {
      if(err){
        console.log(err);
      }else{
        if(user){
          bcrypt.compare(data.password, user.password, function(err, isMatched) {
            if(isMatched){   
              callback(user);  
            }else{
              callback(false);
            } 
          })
        }else{
          console.log("Invalid login");
          callback(false);
        }
      }
    })
  }

  user_exists(email, callback){
    this.model.findOne({email: email}, function(err, user) {
      if(err){
        console.log(err);
      }else{
        if(user){
          console.log(user);
          callback(true);
        }else{
          callback(false);
        }
      }   
    });
  }

  addUserOld(req, res, next){
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


export default AccountService;