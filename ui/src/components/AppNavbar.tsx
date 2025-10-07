import React from "react";
import { Navbar, Container } from "react-bootstrap";

export const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="#">
          Insurwave Weather Dashboard
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
