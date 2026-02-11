import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ACBAC4] to-[#30364F] flex items-center justify-center p-8">
      <div
        className="text-center max-w-2xl w-full"
        style={{ display: "flex", flexDirection: "column", gap: "64px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <h1 className="text-7xl font-bold text-white drop-shadow-lg">
            VIKO Lectures
          </h1>
          <p className="text-2xl text-[#E1D9BC]">
            Please login or register to continue
          </p>
        </div>

        <div style={{ display: "flex", gap: "48px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/login")}
            className="px-28 py-7 bg-[#30364F] text-white rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ minWidth: "220px", minHeight: "65px" }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-28 py-7 bg-white text-[#30364F] border-[#30364F] rounded-xl font-semibold text-lg hover:bg-[#E1D9BC] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ minWidth: "220px", minHeight: "65px", borderWidth: "3px" }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
