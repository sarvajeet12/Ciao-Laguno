import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import "./dashboard-certificate.css"
import { apiConnector } from '../../service/api-connector';
import { generateCertificateId } from '../../service/apis';
import { jsPDF } from 'jspdf';
import { toast } from "react-toastify";

const SearchCertificate = () => {


    const certificateAuthenticity = `This certificate verifies the authenticity and completion of whatsoever program form Ciao Laguno by any particular student.`

    const [certificateId, setCertificateId] = useState("");
    const [certificateInfo, setCertificateInfo] = useState(null);

    const handleCertificateId = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", generateCertificateId.SEARCH_CERTIFICATE_ID_API,
                { certificateId: certificateId }
            )

            if (!response.data.success) {
                alert("Certificate not found")
            } else {
                //console.log(response.data.response)
                setCertificateInfo(response.data.response)
                setCertificateId("");
                toast.update(loadingToastId, {
                    render: "Certificate fetched successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                });
            }

        } catch (error) {
            //console.log(error)
            toast.update(loadingToastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            })
        }
    }

    return (
        <section className="searchCertificate">
            <Container >
                <h3>Find and verify your certificate</h3>
                <form action="" onSubmit={(e) => handleCertificateId(e)}>
                    <input
                        type="text"
                        name="searchCertificate"
                        placeholder='Enter Certificate Id'
                        onChange={(e) => setCertificateId(e.target.value)}
                        value={certificateId}
                    />
                    <input type="submit" value="Search" />
                </form>
                <div className='getCertificateContainer'>
                    {
                        certificateInfo !== null ?
                            <div className="certificateCard">
                                <div>
                                    <img src={certificateInfo.certificate} alt="" />
                                    <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
                                        <sup>*</sup>{certificateAuthenticity}
                                    </p>
                                </div>
                                <div>
                                    <h5>Recipient:</h5>
                                    <p>Name : {certificateInfo.name}</p>
                                    <p>Issued Date : {certificateInfo.issuedDate}</p>
                                    <div>
                                        <p>Share</p>
                                        <span>
                                            <a href={"https://www.linkedin.com/"} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                            <a href={"https://x.com/?lang=en"} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href={"https://www.facebook.com/"} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                        </span>
                                    </div>

                                    <div>

                                        <button
                                            onClick={() => {
                                                const cloudinaryImageUrl = certificateInfo.certificate;
                                                const pdf = new jsPDF();
                                                const image = new Image();

                                                image.src = cloudinaryImageUrl;
                                                image.onload = () => {
                                                    pdf.addImage(image, 'JPEG', 10, 10, 180, 160); // Adjust dimensions as needed
                                                    pdf.save('certificate.pdf');
                                                };
                                            }}
                                        >
                                            Download as PDF
                                        </button>
                                    </div>
                                </div>

                            </div>
                            :
                            <h2 style={{ textAlign: "center" }}>No result</h2>

                    }
                </div>
            </Container>
        </section>
    )
}

export default SearchCertificate