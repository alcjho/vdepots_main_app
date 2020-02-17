import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class User {

  initSchema() {
    const schema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: false,
      },
      lastname: {
        type: String,
        required: false,
      }
    }, { timestamps: true });
    schema.pre(
      "save",
      function(next) {
        let user = this;
        if (!UserController.isModified("title")) {
          return next();
        }
        return next();
      },
      function(err) {
        next(err);
      }
    );
    schema.plugin(uniqueValidator);
    mongoose.model("User", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("User");
  }
}

export default User;
