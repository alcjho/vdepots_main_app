import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from 'bcrypt';

class Account {

  initSchema(objName) {
    
    switch(objName){
      case 'Account':
        const schema = this.accountSchema();
        mongoose.model(objName, schema);
        const model = mongoose.model(objName);
        return {schema, model};
    }

  }

  accountSchema(){
    const SALT_WORK_FACTOR = 10;
    const schema = new mongoose.Schema(
      {
        firstname:String,
        lastname:String,
        company_name: String,
        company_desc: String,
        promoCode: String,
        activeDate: Date,
        license_name: String,
        license_id: String,
        current_balance: Number,
        last_balance: Number, 
        last_try: Number,
        nbr_try: Number,             
        username: {
          type: String,
          required: true,
          index: { unique: true }
        },
        password: {
          type: String,
          required: true
        },
  
        addresses: [
          {
            street: String,
            street_no: Number,
            city: String,
            state: String,
            zip: String
          }
        ],
        active: {
          type: String,
          enum: ['yes', 'no']
        },
        change_pwd: {
          Type: String,
          enum:['yes', 'no']
        },                   
      }, 
      { 
        timestamps: true 
      }
    );

    //Before saving the user data into the database
    schema.pre('save', function(next) 
    { 
      var user = this;
    
      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);
      
          // hash the password along with our new salt
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);
      
              // override the cleartext password with the hashed one
              user.password = hash;
              next();
          });
      });
    });
    
    schema.methods.comparePassword = function(password, cb) {
      bcrypt.compare(password, this.password, function(err, isMatch) {
          if (err) return cb(err);
          cb(null, isMatch);
      });
    }
    
    schema.path('active').options.enum;
    schema.plugin(uniqueValidator);

    return schema;
  }


  /**
   * 
   * @param {} data
   * @return json
   */
  createAcc(data){

  }

  /**
   * 
   * @param {*} data
   * @return json
   */
  updateAcc(data){

  }
  
  /**
   * 
   * @param {*} uid_account 
   * @return boolean
   */
  deactivateAcc(uid_account){

  }

  /**
   * 
   * @param {*} uid_account 
   * @return boolean
   */
  activateAcc(uid_account){

  }
}

export default Account;
