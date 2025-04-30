import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../components/wrapper/style.css"
import { Link, useNavigate } from 'react-router-dom'
import { apiConnector } from '../service/api-connector'
import { auth } from '../service/apis'
import { AppContext } from '../context/store'
import { toast } from "react-toastify";

const Login = () => {

    const { storeTokenInLS, reloadPage } = useContext(AppContext)

    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserLoginData({
            ...userLoginData,
            [name]: value,
        });
    };

    const handleUserLoginFormData = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", auth.LOGIN_API, {
                email: userLoginData.email,
                password: userLoginData.password
            });

            if (!response.data.success) {
                alert(response.data.message);
            } else {
                storeTokenInLS(response.data.token);
                setUserLoginData({
                    email: "",
                    password: "",
                });
                navigate("/")
                toast.update(loadingToastId, {
                    render: "Login Successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                });
                // console.log("user login successfully", response);
            }

        } catch (error) {
            console.log(error);
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
                        <h1>Login</h1>
                        <form action="" onSubmit={(e) => handleUserLoginFormData(e)}>
                            <input type="email" name="email" id="" placeholder='Enter your email' value={userLoginData.email}
                                onChange={(e) => handleInput(e)} required />
                            <input type="password" name="password" id="" placeholder='Enter your password' value={userLoginData.password}
                                onChange={(e) => handleInput(e)} required />
                            <input type="submit" value="Login" />
                        </form>
                        <p>Not registered? <Link to={"/singup"}>Signup</Link> </p>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default Login