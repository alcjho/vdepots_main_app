import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Account {

  initSchema() {
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
          required: true
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
    
    schema.path('active').options.enum;
    schema.plugin(uniqueValidator);
    mongoose.model("Account", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Account");
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
