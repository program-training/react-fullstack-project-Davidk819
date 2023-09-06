import { useEffect, useContext, useState } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";
import { TripIDContext } from "../ContextDetailsId/ContextDetailsId";

type Trip = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: string;
  image: string;
  activities: string[];
};

interface TripProps {
  tripId: string;
}

export default function EditTripForm(props: TripProps) {
  const context = useContext(UsePageContext);
  if (!context) return null;
  const { currentPage, setCurrentPage } = context;

  const [formData, setFormData] = useState<Trip>({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    price: "",
    image: "",
    activities: [],
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/trips/${props.tripId}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    tripId: string
  ) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/trips/${tripId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        authorization: "test-token",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("yes");
      })
      .catch((error) => console.error("Error updating new trip:", error));
  };
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
    
  }
  function handleInputChangeActivities(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.split(" ") });
  }

  return (
    <div>
      <button onClick={() => setCurrentPage("Trips")}>מעבר לכל הטיולים</button>
      <h1>Create a New Trip</h1>
      <form onSubmit={(e) => handleSubmit(e, props.tripId)}>
        <div>
          <label>Trip Name:</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
        <div>
          <label>Destination:</label>
          <input type="text" name="destination" onChange={handleInputChange} />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="text" name="startDate" onChange={handleInputChange} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="text" name="endDate" onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" onChange={handleInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" onChange={handleInputChange} />
        </div>
        <div>
          <label>Activities:</label>
          <input
            type="text"
            name="activities"
            onChange={handleInputChangeActivities}
          />
        </div>
        <div>
          <button type="submit">Create Trip</button>
        </div>
      </form>
    </div>
  );
}
