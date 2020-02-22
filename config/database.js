import mongoose from "mongoose";

class Connection {
  constructor() {
    const url = `mongodb://localhost:27017/vdepots`;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(url, function(err, db){
      if(err){
          console.log(err);
      }else{
          console.log("connected to mongodb main account successfully!")
      }
    })
  }


}

export default new Connection();