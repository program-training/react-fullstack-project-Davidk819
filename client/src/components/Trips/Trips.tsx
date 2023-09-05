import { useContext, useState, useEffect } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";
import { TripIDContext } from '../ContextDetailsId/ContextDetailsId';
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
  const context = useContext(UsePageContext);
  if (!context) return null;
  const contextID = useContext(TripIDContext)
  if(!contextID) return null;
  const { setCurrentTripID } = contextID;
  const { currentPage, setCurrentPage } = context;
  const [trips, setTrips] = useState<Trip[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/trips")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  const handleDelete = (tripId: string) => {
    fetch(`http://localhost:3000/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'test-token'
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



  return (
    <div className="trips">
      <h1>Trips</h1>
      <div className="pageMovButtons">
        <button onClick={() => setCurrentPage('Home')}>Home</button>
        <button onClick={() => setCurrentPage('NewTripForm')}>NewTripForm</button>
        
      </div>
      <div>
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card" >
            <h3>{trip.name}</h3>
            <div> {trip.price} $</div>
            <img src={trip.image} alt={trip.name} />
            <button onClick={() => handleDelete(trip.id)}>delete</button>
            <button onClick={() => handleShowDetails(trip.id)}>Tripdata</button>
          </div>
        ))}
      </div>
    </div>
  );
}
