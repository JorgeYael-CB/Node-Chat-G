import { Schema, model } from "mongoose";


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default: 'https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png'
  },

  roles: {
    type: [String],
    default: ['USER'],
    enum: ['USER', 'ADMIN', 'SUPER_USER', 'DEVELOPER'],
  }


}, {
  timestamps: true,
});


export const UserModel = model('User', UserSchema);

