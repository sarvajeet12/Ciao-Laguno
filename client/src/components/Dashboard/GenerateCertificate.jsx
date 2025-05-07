import React, { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./dashboard-certificate.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { apiConnector } from '../../service/api-connector'
import { certificate } from '../../service/apis'
import { AppContext } from '../../context/store'
import { toast } from "react-toastify";

const GenerateCertificate = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        certificate: "",
        issuedDate: "",
    });

    const navigate = useNavigate();

    const { isLoading, token, user, codeEmail } = useContext(AppContext)

    // -------------------------- if user is not logged in and user is not admin -----------------------------------


    if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        if (!user?.isAdmin) {
            return <Navigate to="/" />
        }
    }

    // ------------------------------------------------- handle input form --------------------------------------------------
    const handleInputForm = (e) => {
        const { name, value, files } = e.target;
        if (name === "certificate") {
            setFormData({
                ...formData,
                certificate: files[0],

            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // -------------------------------------------- handle generate certificate form submit --------------------------------------------
    const handleGenerateCertificateForm = async (e) => {
        e.preventDefault();

        const loadingToastId = toast.loading("Loading...");
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await apiConnector(
                "POST",
                certificate.CREATE_CERTIFICATE_API,
                formDataToSend,
            );

            if (!response.data.success) {
                alert(response.data.message);
            } else {
                navigate("/dashboard");
                toast.update(loadingToastId, {
                    render: "Certificate generated successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                });
            }
        } catch (error) {
            //console.log("generate certificate : ", error);
            toast.update(loadingToastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }
    }

    // ------------------------------- generate alphanumeric number




    return (
        <section className='generateCertificateContainer'>
            <Container>
                <Row>
                    <Col className="generateCertificate">
                        <Link to={"/dashboard"}><h1>Admin Dashboard</h1></Link>
                        <h4>Generate Certificate</h4>

                        <h5 style={{marginTop:"50px"}}>Certificate Id: {codeEmail.code} And Email: {codeEmail.email}</h5>

                        <form action="" onSubmit={(e) => handleGenerateCertificateForm(e)} encType="multipart/form-data">
                            <div>
                                <label htmlFor="certificate">Upload Certificate</label>
                                <input type="file" name='certificate' placeholder='Upload Certificate' required onChange={(e) => handleInputForm(e)} />
                                <p style={{ color: "red", fontSize: "12px" }}>Image should be in .jpeg/.jpg formate</p>
                            </div>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input type="text" name='name' placeholder='Enter name' required onChange={(e) => handleInputForm(e)}
                                    value={formData.name} />
                            </div>
                            <div>
                                <label htmlFor="email">Email: </label>
                                <input type="email" name='email' placeholder='Enter email' required onChange={(e) => handleInputForm(e)}
                                    value={formData.email} />
                            </div>
                            <div>
                                <label htmlFor="date">Issue Date :</label>
                                <input type="date" name='issuedDate' placeholder='Enter Issue date' required onChange={(e) => handleInputForm(e)}
                                />
                            </div>
                            <div>
                                <input type="submit" value="Generate Certificate" />
                            </div>
                        </form>

                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default GenerateCertificate