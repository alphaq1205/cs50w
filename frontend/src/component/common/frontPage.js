import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default class FrontPage extends React.Component {
  render() {
    return (
      <Container className="text-center">
        <Row>
          <Col>
            <h1 className="display-1 mb-2 my-sm-5">Iot Dashboard</h1>
            <Link to="/login" className="btn btn-primary btn-md mx-2">
              Login
            </Link>
            <Link to="/registration" className="btn btn-danger btn-md mx-2">
              Register
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
