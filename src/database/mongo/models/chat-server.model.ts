import { Schema, model } from "mongoose";

const ChatServerSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    }
  ],

  limitUsers: {
    type: Number,
    default: 20,
  },

  serverId: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  }


})


export const ChatServerModel = model('ChatServer', ChatServerSchema);