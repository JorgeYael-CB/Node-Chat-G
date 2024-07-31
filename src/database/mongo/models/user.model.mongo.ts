import { Schema, SchemaTypeOptions, model } from "mongoose";


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
  },

  active: { // su cuenta esta activa o fue bloqueada
    type: Boolean,
    default: true,
  },

  country: {
    type: String,
    default: 'International',
  },

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      default: [],
    }
  ],

  lastChatsServer: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ChatServer',
    }
  ],

  currentServerChat: {
    type: Schema.Types.ObjectId,
    ref: 'ChatServer',
  },

}, {
  timestamps: true,
});


export const UserModel = model('User', UserSchema);

