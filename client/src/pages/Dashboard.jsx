import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GetAllCertificate from "../components/Dashboard/GetAllCertificate";
import { AppContext } from "../context/store";
import "../components/Dashboard/dashboard-certificate.css";

const Dashboard = () => {
  const { isLoading, token, user } = useContext(AppContext);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    if (!user?.isAdmin) {
      return <Navigate to="/" />;
    }
  }

  return (
    <section className="dashboardContainer">
      <Container>
        <Row>
          <Col className="dashboard">
            <div className="dashboardLink">
              <h1>Admin Dashboard</h1>
              <div>
                <span>
                  <Link to={"/dashboard/generate-certificateId"}>
                    Generate Certificate Id
                  </Link>
                </span>
                <span style={{ marginLeft: "15px" }}>
                  <Link to={"/search-certificate"}>Search Certificate</Link>
                </span>
              </div>
            </div>
            <h4>All Certificate</h4>
            <GetAllCertificate />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
