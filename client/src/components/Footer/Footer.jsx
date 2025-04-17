import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import { logoImage } from "../../utils/products"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className='box'>
            <div className="logo">
              <img src={logoImage.logo} alt="" className="logoImage" />
              <i>Ciao Laguno</i>
            </div>
            <p>Meet Ciao Laguno, your ultimate shopping companion! <br /> Image having access to a world of products at your fingertips, with exclusive deals, effortless checkout, and hassle-free delivery. <br /> Ciao Laguno is more than just an ecommerce web app - it's personalized shopping experience designed to make your life easier and more enjoyable.</p>
          </Col>
          <Col md={3} sm={5} className='box'>
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col md={3} sm={5} className='box'>
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </Col>
          <Col md={3} sm={5} className='box'>
            <h2>Contact Us</h2>
            <ul>
              <li>Address: Ganga Nagar, N.T.P.C road, Kahalgaon, Bhagalpur </li>
              <li>Email: ciaolaguno@gmail.com</li>
              <li>Phone: +91 8853773496</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer >
  )
}

export default Footer
