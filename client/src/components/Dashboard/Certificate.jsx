import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { apiConnector } from '../../service/api-connector';
import { certificate } from '../../service/apis';
import "./dashboard-certificate.css"
import { Col, Container, Row } from 'react-bootstrap'
import { jsPDF } from 'jspdf';
import { AppContext } from '../../context/store';



const Certificate = () => {
    const { id } = useParams();
    const [singleCertificate, setSingleCertificate] = useState({})
    const [loading, setLoading] = useState(true)
    const { isLoading, token, user } = useContext(AppContext)

    const certificateAuthenticity = `This certificate verifies the authenticity and completion of whatsoever program form Ciao Laguno by any particular student.`


    // ------------------------------ get certificate -------------------------------
    const getCertificate = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET", `${certificate.CERTIFICATE_API}/${id}`);

            if (!response.data.success) {
                alert(response.data.message)
                setLoading(false)
            } else {
                setSingleCertificate(response.data.response)
                console.log("Certificate fetched successfully:", response.data.response);
                setLoading(false)
            }

        } catch (error) {
            console.error("Error fetching certificate:", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getCertificate()
    }, [])


    // -------------------------- if user is not logged in and user is not admin -----------------------------------

    if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        if (!user?.isAdmin) {
            return <Navigate to="/" />
        }
    }

    return (
        <section className="getCertificateContainer">
            <Container>
                <div>
                    {
                        loading ? <h4>Loading...</h4> :
                            <div className="certificateCard">
                                <div>
                                    <img src={singleCertificate.certificate} alt="" />
                                    <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
                                        <sup>*</sup>{certificateAuthenticity}
                                    </p>
                                </div>
                                <div>
                                    <h5>Recipient:</h5>
                                    <p>Name : {singleCertificate.name}</p>
                                    <p>Issued Date : {singleCertificate.issuedDate}</p>

                                    <div>

                                        <button
                                            onClick={() => {
                                                const cloudinaryImageUrl = singleCertificate.certificate;
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
                    }
                </div>
            </Container>
        </section>
    )
}

export default Certificate                                                                     