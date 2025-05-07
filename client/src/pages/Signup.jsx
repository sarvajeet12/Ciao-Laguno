import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../components/wrapper/style.css"
import { Link, useNavigate } from 'react-router-dom'
import { apiConnector } from '../service/api-connector'
import { auth } from '../service/apis'
import { toast } from "react-toastify";

const Signup = () => {

    const [userSignupData, setUserSignupData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserSignupData({
            ...userSignupData,
            [name]: value,
        });
    };

    const handleUserSignupFormData = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Loading...");

        //console.log("signup data : ", userSignupData);

        try {
            const response = await apiConnector("POST", auth.SIGNUP_API, {
                email: userSignupData.email,
                password: userSignupData.password
            });

            if (!response.data.success) {
                alert(response.data.message);
            } else {
                setUserSignupData({
                    email: "",
                    password: "",
                });
                navigate("/login")
                toast.update(loadingToastId, {
                    render: "Signup Successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                  });

                // console.log("user Signup successfully", response);
            }

        } catch (error) {
            //console.log(error);
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
        <section className='authContainer'>
            <Container>
                <Row>
                    <Col className='auth'>
                        <h1>Signup</h1>
                        <form action="" onSubmit={(e) => handleUserSignupFormData(e)}>
                            <input type="email" name="email" id="" placeholder='Enter your email' value={userSignupData.email}
                                onChange={(e) => handleInput(e)} required />
                            <input type="password" name="password" id="" placeholder='Enter your password' value={userSignupData.password}
                                onChange={(e) => handleInput(e)} required />
                            <input type="submit" value="Signup" />
                        </form>
                        <p>Not registered? <Link to={"/login"}>Login</Link> </p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Signup