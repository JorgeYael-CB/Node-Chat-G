import { Schema, model } from "mongoose";


const MessageSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  server: {
    type: Schema.Types.ObjectId,
    ref: 'ChatServer'
  },

}, {
  timestamps: true,
});


export const MessageModel = model('Message', MessageSchema);
