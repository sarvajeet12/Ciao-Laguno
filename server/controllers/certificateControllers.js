const certificateModel = require("../models/certificateModels");
const cloudinary = require("../utils/upload");
const certificateIdModel = require("../models/certificateIdModel");


// ------------------------------------------ Create Certificate -------------------------------------
const createCertificate = async (req, resp) => {
    try {

        const { certificate } = req.files;

        if (certificate.mimetype !== 'image/jpeg') {
            return resp.status(400).json({ success: false, message: "Invalid file formate" });
        }

        const { name, issuedDate, email } = req.body;

        const result = await certificateModel.findOne({ email: email });

        if (result) {
            return resp.status(400).json({ success: false, message: "Certificate already exists" });
        } else {

            // image save in Cloudinary
            const image = await cloudinary(
                certificate,
                process.env.FOLDER_NAME,
                1000,
                1000
            )

            const certificateData = await certificateModel.create({
                certificate: image.secure_url,
                name: name,
                issuedDate: issuedDate,
                email: email
            })

            return resp.status(200).json({
                success: true,
                message: "Certificate Created Successfully",
                response: certificateData
            })
        }


    } catch (error) {

        console.error("Error creating certificate:", error);
        resp.status(500).json({ success: false, message: error.message });


    }
}

// ------------------------------------- get all certificate -----------------------------------
const getAllCertificate = async (req, resp) => {
    try {
        const certificateData = await certificateModel.find({});
        return resp.status(200).json({
            success: true,
            message: "All Certificate",
            response: certificateData
        })
    } catch (error) {
        console.error("Error fetching certificates:", error);
        resp.status(500).json({ success: false, message: error.message });
    }
}


// ------------------------------------------ get certificate by id -------------------------------------
const getCertificateById = async (req, resp) => {
    try {
        const { id } = req.params;

        const certificate = await certificateModel.findById(id);

        if (!certificate) {
            return resp.status(404).json({ success: false, message: "Certificate not found" });
        }

        return resp.status(200).json({
            success: true,
            message: "Certificate fetched successfully",
            response: certificate
        });
    } catch (error) {
        console.error("Error fetching certificate by ID:", error);
        resp.status(500).json({ success: false, message: error.message });
    }
};

// ------------------------------------------------ delete certificate ----------------------------------
const deleteCertificate = async (req, resp) => {
    try {
        const { id } = req.params;

        const certificate = await certificateModel.findById(id);

        const gettingEmail = certificate.email;
        const certificateIdDetails = await certificateIdModel.findOne({ email: gettingEmail });

        const gettingId = certificateIdDetails.id;

        await certificateModel.findByIdAndDelete(id);
        await certificateIdModel.findByIdAndDelete(gettingId)

        return resp.status(200).json({
            success: true,
            message: "Certificate deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting certificate:", error);
        resp.status(500).json({ success: false, message: error.message });
    }
};





module.exports = { createCertificate, getAllCertificate, deleteCertificate, getCertificateById };
