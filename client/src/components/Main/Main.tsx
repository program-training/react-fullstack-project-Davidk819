import { createContext, useContext, useState } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";
import Trips from "../Trips/Trips";
import { TripIDContext } from '../ContextDetailsId/ContextDetailsId';
import TripDetails from "../TripDetail/TripDetail";
import Home from "../Home/Home";
import NewTripForm from "../NewTripForm/NewTripForm";




type Page =
  | "Home"
  | "Trips"
  | "TripDetails"
  | "UpdateTrip"
  | "UserLogin"
  | "NewTripForm"
  | Details;

interface Details {
  id: string;
}

export default function Main() {
  const context = useContext(UsePageContext);
  if (!context) return null;
  const contextID = useContext(TripIDContext)
  if(!contextID) return null;
  const { currentPage, setCurrentPage } = context;
  const { currentID, setCurrentTripID } = contextID;
  console.log(currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home />;
      case "TripDetails":
        return (<TripDetails tripId={currentID}/>) 
      case "Trips":
        return <Trips></Trips>;  
      case "NewTripForm":
        return <NewTripForm></NewTripForm>  

      default:
        return <Home/> 
   

    }
  }

  return (
    <div className="main">
        {renderPage()}
    </div>
  )

}


