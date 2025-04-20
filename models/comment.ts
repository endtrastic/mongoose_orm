import mongoose from "mongoose";

const comment = new mongoose.Schema({
  date: {
      required: true,
      type: Date
  },
  content: {
      required: true,
      type: String
  },
  article: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Article'
  },
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref: 'Author'
  }
})

export default mongoose.model('Comment', comment);