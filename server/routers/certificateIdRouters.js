const express = require("express");
const router = express.Router();

const certificateId = require("../controllers/certificateIdController")


// generate certificate id
router
    .route("/generate-certificateId")
    .post(certificateId.generateCertificateId);



// get single certificate
router
    .route("/search/certificate")
    .post(certificateId.searchCertificateByCertificateId);



module.exports = router; 
