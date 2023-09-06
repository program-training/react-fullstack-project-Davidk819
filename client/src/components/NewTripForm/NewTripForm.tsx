import { createContext, useContext, useState } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";

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

export default function NewTripForm() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/trips`, {
      method: "POST",
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
    console.log(value);
    console.log();
  }
  function handleInputChangeActivities(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.split(" ") });
  }

  return (
    <div>
      <button onClick={() => setCurrentPage("Trips")}>מעבר לכל הטיולים</button>
      <h1>Create a New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Trip Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            name="startDate"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="text"
            name="endDate"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            required
          />
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
          <input
            type="text"
            name="image"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Activities:</label>
          <input
            type="text"
            name="activities"
            onChange={handleInputChangeActivities}
            required
          />
        </div>
        <div>
          <button type="submit">Create Trip</button>
        </div>
      </form>
    </div>
  );
}
