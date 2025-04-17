import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./dashboard-certificate.css"
import { apiConnector } from '../../service/api-connector'
import { certificate } from '../../service/apis'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

const GetAllCertificate = () => {

  const [certificates, setCertificates] = useState([])


  // --------------------------------- get all certificate ---------------------------- 
  const getAllCertificates = async () => {
    try {
      const response = await apiConnector("GET", certificate.GET_ALL_CERTIFICATES_API);

      if (!response.data.success) {
        alert(response.data.message)
      } else {
        setCertificates(response.data.response)
        // console.log("Certificates fetched successfully:", response.data.response);
      }


    } catch (error) {
      console.error("Error fetching certificates:", error);

    }
  }

  useEffect(() => {
    getAllCertificates()
  }, [])


  // ----------------------------- delete certificate -----------------------------
  const deleteCertificate = async (id) => {

    try {

      const response = await apiConnector("DELETE", `${certificate.DELETE_CERTIFICATE_API}/${id}`);

      if (!response.data.success) {
        alert(response.data.message)
      } else {
        toast.success("Certificate Deleted Successfully", {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        })
        getAllCertificates();
      }

    } catch (error) {
      console.error("Error deleting certificate:", error);

    }

  }


  return (
    <section className="getAllCertificateContainer">
      <Container >
        <div className="getAllCertificate">
          {
            certificates.length > 0 ?
              (<div className="cardBox">
                {
                  certificates.map((certificate, index) => {
                    return (
                      <div className="card" key={index}>
                        <img src={certificate.certificate} alt="" />
                        <p>Name: {certificate.name}</p>
                        <p>Email: {certificate.email}</p>
                        <div>
                          <Link to={`/certificate/${certificate._id}`}><button>View</button></Link>
                          <button onClick={() => deleteCertificate(certificate._id)}>Delete</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>)
              :
              (<h5>No Certificate Yet !</h5>)
          }
        </div>

      </Container>
    </section>
  )
}

export default GetAllCertificate