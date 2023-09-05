import React from "react";
import { createContext, useContext, useState } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";

type Page =
  | "Home"
  | "Trips"
  | "TripDetails"
  | "UpdateTrip"
  | "UserLogin"
  | "NewTripForm";

export default function Home() {
  const context = useContext(UsePageContext);
  if (!context) return null;
  const { currentPage, setCurrentPage } = context;




  return (
    <div className="home">
        <img src="https://files.geektime.co.il/wp-content/uploads/2023/02/ar79n-scaled.jpg" alt="Background" className="background-image" />
      <button onClick={() => setCurrentPage("Trips")}>
        מעבר לכל הטיולים
      </button>
      <button onClick={() => setCurrentPage("NewTripForm")}>
        מעבר לרישום
      </button>
      <button onClick={() => setCurrentPage("UserLogin")}>מעבר להתחברות</button>
    </div>
  );
}
