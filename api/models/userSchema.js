import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: [true, 'name is required...']
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    required: [true, 'email is required...']
  },

  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'username is required...']
  },

  password: {
    type: String,
    required: [true, 'password is required...']
  },

  date: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Users', userSchema);