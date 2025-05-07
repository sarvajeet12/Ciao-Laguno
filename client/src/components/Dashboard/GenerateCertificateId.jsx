import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap';
import "./dashboard-certificate.css"
import { Navigate, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/store';
import { apiConnector } from '../../service/api-connector';
import { generateCertificateId } from '../../service/apis';
import { toast } from "react-toastify";

const GenerateCertificateId = () => {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const { gettingValueCodeAndEmail } = useContext(AppContext)

    const { isLoading,user  } = useContext(AppContext)
    
        // -------------------------- if user is not logged in and user is not admin -----------------------------------
    
    
        if (isLoading) {
            return <h1>Loading...</h1>
        } else {
            if (!user?.isAdmin) {
                return <Navigate to="/" />
            }
        }
    

    // Function to generate a 6-digit alphanumeric code
    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        setCode(result);
    };


    // handle form
    const handleCertificateId = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Loading...");
        try {

            const response = await apiConnector("POST", generateCertificateId.GENERATE_CERTIFICATE_ID_API, {
                certificateId: code,
                email: email
            })

            if (!response.data.success) {
                alert(response.data.message)
            } else {
                gettingValueCodeAndEmail(code, email);
                navigate("/dashboard/generate-certificate")
                toast.update(loadingToastId, {
                    render: "Certificate Id generated successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                });
            }


        } catch (error) {
            //console.log("Error occur while generating certificate id:", error);
            toast.update(loadingToastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }



    }

    return (
        <section className='generateCertificateIdContainer'>
            <Container >
                <h3>Generate Certificate Id: </h3>
                <form action="" onSubmit={(e) => handleCertificateId(e)}>
                    <input type="email" name="email" value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} required/>
                    <div>
                        <input
                            type="text"
                            readOnly={true}
                            value={code}
                            name='certificateId'
                            placeholder='Enter button to generate certificate id'
                            required />
                        <button type="button" onClick={generateCode}>
                            Generate Code
                        </button>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </Container>
        </section>
    )
}

export default GenerateCertificateId