import mongoose from "mongoose";
// schema
const author = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    personalCode: {
      required: true,
      type: String
    },
    contactData: {
      required: true,
      type: mongoose.Schema.Types.ObjectId, ref: 'ContactData'
    }
})

export default mongoose.model('Author', author);
