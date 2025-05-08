// Require the Cloudinary library
const Cloudinary = require('cloudinary').v2


// Upload image to Cloudinary
const uploadToCloudinary = async (file, folder, height, quality) => {

    const options = { folder };

    if (height) {
        options.height = height;
    }

    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await Cloudinary.uploader.upload(file.tempFilePath, options);
}


// Delete image from Cloudinary
const deleteMediaFromCloudinary = async (publicId) => {
    try {
        const deleteImage = await Cloudinary.uploader.destroy(publicId);
        //console.log("delete image : ", deleteImage)
    } catch (error) {
        console.log("Error occur while deleting image: ", error);
    }
};

module.exports = { uploadToCloudinary, deleteMediaFromCloudinary }