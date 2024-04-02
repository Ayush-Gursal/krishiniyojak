import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './styles.css';

function Footer(props) {
  return (
    <footer>
      <Container>
        <Row>
          <Col className=" main name text-center py-3">Copyright &copy; ONE ABOVE ALL </Col>
        </Row>
        <Row>
          <Col className=" subname text-center pb-3">
            Created by{" "}
            <a className="text-decoration-none" target="_blank" href="https://github.com/Quaxguy">ONE ABOVE ALL</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
