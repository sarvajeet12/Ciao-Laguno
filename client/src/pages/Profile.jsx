import React, { useContext } from 'react'
import { AppContext } from '../context/store'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../components/wrapper/style.css"

const Profile = () => {

    const { user } = useContext(AppContext)

    return (
        <section className='profileContainer'>
            <Container>
                <h1>Profile</h1>
                <h4>Email : {user?.email}</h4>
                <Link to={"/search-certificate"}>Find your certificate</Link>
            </Container>
        </section>
    )
}

export default Profile