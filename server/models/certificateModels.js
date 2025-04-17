const Mongoose = require("mongoose");

const certificateSchema = new Mongoose.Schema({
    certificate: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    issuedDate: {
        type: String,
        required: true
    },
});




// define the model or the collection name
const Certificate = new Mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;