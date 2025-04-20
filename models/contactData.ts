import mongoose from "mongoose";

const contactData = new mongoose.Schema({
    address: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    }
})

export default mongoose.model('ContactData', contactData);