import React from "react";
import { AppNavbar } from "./components/AppNavbar";
import { AppFooter } from "./components/AppFooter";
import { WeatherSearch } from "./components/WeatherSearch";

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />

      <main
        className="flex-grow-1 d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        }}
      >
        <WeatherSearch />
      </main>

      <AppFooter />
    </div>
  );
};

export default App;
