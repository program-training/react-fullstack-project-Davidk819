import { useContext, useState, useEffect } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";
import "./TripDetails.css";
import {TokenContext} from '../ContextToken/ContextToken';

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
}

interface TripDetailsProps {
  tripId: string;
}

export default function TripDetails(props: TripDetailsProps) {
  const contextToken = useContext(TokenContext);
  if(!contextToken) return null;
  const [trip, setTrip] = useState<Trip | null>();
  const context = useContext(UsePageContext);
  if (!context) return null;
  const { currentPage, setCurrentPage } = context;
  const { token } = contextToken

  useEffect(() => {
    fetch(`http://localhost:3000/api/trips/${props.tripId}`)
      .then((response) => response.json())
      .then((data) => setTrip(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  if (!trip) {
    return <div>Loading...</div>;
  }

  const hendleEditPage = () => {
    if(token === null) { 
      alert("you are not a registered user")
      return
    }
    setCurrentPage("EditTripForm");
  }

  return (
    <div className="card-details">
      <button onClick={() => setCurrentPage("Home")}>Home</button>
      <h1>{trip.name}</h1>
      <img src={trip.image} alt={trip.name} />
      <p>יעד: {trip.destination}</p>
      <p>תאריך התחלה: {trip.startDate}</p>
      <p>תאריך סיום: {trip.endDate}</p>
      <p>מחיר: ${trip.price}</p>
      <p>תיאור: {trip.description}</p>
      <h2>פעילויות:</h2>

      <ul>
        {trip.activities &&
          trip.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}

      </ul>
      <button onClick={() => setCurrentPage("Trips")}>מעבר לכל הטיולים</button>
      <button onClick={hendleEditPage}>Edit trip</button>
    </div>
  );
}
