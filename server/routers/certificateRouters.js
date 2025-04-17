const express = require("express");
const router = express.Router();

const certificate = require("../controllers/certificateControllers")

// middleware
// const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddlewares");



// create certificate
router
    .route("/create-certificate")
    .post(certificate.createCertificate);


// get all certificate
router
    .route("/get-all-certificate")
    .get(certificate.getAllCertificate);


// get single certificate
router
    .route("/:id")
    .get(certificate.getCertificateById);


// delete certificate
router
    .route("/delete-certificate/:id")
    .delete(certificate.deleteCertificate);




module.exports = router; 
