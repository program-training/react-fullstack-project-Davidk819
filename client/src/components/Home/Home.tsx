import {  useContext } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";




export default function Home() {
  const context = useContext(UsePageContext);
  if (!context) return null;
  const { setCurrentPage } = context;




  return (
    <div className="home">


      <button onClick={() => setCurrentPage("Trips")}>
        מעבר לכל הטיולים
      </button>
      <button onClick={() => setCurrentPage("UserRegistration")}>
        מעבר לרישום
      </button>
      <button onClick={() => setCurrentPage("UserLogin")}>מעבר להתחברות</button>
    </div>
  );
}
