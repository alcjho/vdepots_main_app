
import Service from './Service.js';
import subscription from '../models/admin/account/Subscription.js';
import bcrypt from 'bcrypt';

class SubscriptionService extends Service {
  constructor(account) {
    super(account);
  }


  async addUser(data, callback){
    this.model(data).save(function (err) {
      if (err){ 
        callback(false); 
        throw err;
      }
      
      callback(true);
      console.log('Document saved successfully!');
    });
  }


async verifyUser(data, callback){
    // fetch user and test password verification
 
      this.model.findOne({ username: data.username }, function(err, user) {
        
        if(err){
          console.log(err);
        }else{

          bcrypt.compare(data.password, user.password, function(err, isMatched) {
            if(isMatched){   
              callback(user);  
            }else{
              callback(false);
            } 
          })

        }

      })

  }

  user_exists(username, callback){
    return this.model.findOne({username: username}, function(err, user) {
      if(err){
        console.log(err);
      }else{
        if(user){
          callback(true);
        }else{
          callback(false);
        }
      }   
    });
  }

}




export default SubscriptionService;