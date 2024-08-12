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
    default: 'https://th.bing.com/th/id/R.bc975bd7b61feebe790209655e985da0?rik=mjPXaG9RV7M6cg&pid=ImgRaw&r=0'
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

