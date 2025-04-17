const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        //select: false,  // it means when  we get data from database it will not show the password
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});




// define the model or the collection name
const User = new Mongoose.model("User", userSchema);

module.exports = User;