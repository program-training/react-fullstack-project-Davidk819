import { useContext, useState, useEffect } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";
import { TripIDContext } from '../ContextDetailsId/ContextDetailsId';
import {TokenContext} from '../ContextToken/ContextToken';
import './Trips.css'


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
  

export default function Trips() {
  const contextToken = useContext(TokenContext);
  if(!contextToken) return null;
  const context = useContext(UsePageContext);
  if (!context) return null;
  const contextID = useContext(TripIDContext)
  if(!contextID) return null;
  const { setCurrentTripID } = contextID;
  const { setCurrentPage } = context;
  const { token } = contextToken
  const [trips, setTrips] = useState<Trip[]>([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  const handleDelete = (tripId: string) => {
    if(token === null) { 
      alert("you are not a registered user")
      return
    }
    fetch(`http://localhost:3000/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      })
      .then(() => {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      })
      .catch((error) => console.error('Error deleting trip:', error));
      
  };

  const handleShowDetails = (tripId: string) => {
    setCurrentPage("TripDetails");
    setCurrentTripID(tripId);
  };
  const hendleManagerStuff = () => {
    if(token === null) { 
      alert("you are not a registered user")
      return
    }
    setCurrentPage('NewTripForm')
  }


  return (
    <div className="trips">
      <h1>Trips</h1>
      <div className="pageMovButtons">
        <button onClick={() => setCurrentPage('Home')}>Home</button>
        <button onClick={hendleManagerStuff }>NewTripForm</button>
        
      </div>
      <div>
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card" >
            <h3>{trip.name}</h3>
            
            <img src={trip.image} alt={trip.name} />
            <button onClick={() => handleDelete(trip.id)}>delete</button>
            <button onClick={() => handleShowDetails(trip.id)}>Tripdata</button>
          </div>
        ))}
      </div>
    </div>
  );
}
