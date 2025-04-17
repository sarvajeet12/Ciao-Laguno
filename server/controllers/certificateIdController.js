const certificateIdModel = require("../models/certificateIdModel")
const certificateModel = require("../models/certificateModels");

const generateCertificateId = async (req, resp) => {
    try {

        const { email, certificateId } = req.body;

        const certificateEmailExist = await certificateIdModel.findOne({ email: email })
        const certificateIdExist = await certificateIdModel.findOne({ certificateId: certificateId });


        if (!certificateEmailExist) {
            if (certificateIdExist) {
                return resp.status(409).json({
                    success: false,
                    message: "Certificate already exists with this certificate id"
                })
            } else {

                const result = await certificateIdModel.create({
                    email: email,
                    certificateId: certificateId
                })

                resp.status(200).json({
                    success: true,
                    response: result
                })
            }
        } else {
            return resp.status(409).json({
                success: false,
                message: "Certificate already exists with this email id."
            })
        }

    } catch (error) {

        console.log("Error occur while generating certificate id", error)
        resp.status(500).json({ success: false, message: error.message });
    }
}


// ------------------------------- search by certificate id ----------------------------------

const searchCertificateByCertificateId = async (req, resp) => {
    try {

        const { certificateId } = req.body;

        const certificateExists = await certificateIdModel.findOne({ certificateId: certificateId });



        if (!certificateExists) {
            return resp.status(404).json({
                success: false,
                message: "Certificate id not found"
            })
        } else {

            const gettingEmail = certificateExists.email;

            const userDetails = await certificateModel.findOne({ email: gettingEmail });
            console.log("user deatails", userDetails)

            resp.status(200).json({
                success: true,
                response: userDetails
            })
        }

    } catch (error) {
        console.log("Error occur search certificate by certificate id", error)
        resp.status(500).json({ success: false, message: error.message });
    }
}




module.exports = { generateCertificateId, searchCertificateByCertificateId };