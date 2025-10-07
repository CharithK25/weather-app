import React from "react";
import { Container } from "react-bootstrap";

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <small>© {new Date().getFullYear()} Insurwave — Powered by WeatherAPI</small>
      </Container>
    </footer>
  );
};
