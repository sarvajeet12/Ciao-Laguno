const Mongoose = require("mongoose");

const certificateIdSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    certificateId: {
        type: String,
        required: true,
    }
});




// define the model or the collection name
const CertificateId = new Mongoose.model("CertificateId", certificateIdSchema);

module.exports = CertificateId;