const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  email : {type:String},
  wishList: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
  
}, { collection: 'User' });

const User = mongoose.model('User', userSchema);

module.exports = User;
