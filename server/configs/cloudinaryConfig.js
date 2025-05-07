const cloudinary = require("cloudinary").v2;

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET_KEY,
        });
    } catch (error) {
        console.log("Error occur while cloudinary connect", error);
    }
};


module.exports = cloudinaryConnect;