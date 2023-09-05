import React, { useState } from 'react';


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

export default function NewTripForm() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        destination: '',
        startDate: '',
        endDate: '',
        description: '',
        price: '',
        image: '',
        activitiesP: ''  ,
        activities:[] ,
      });
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({ ...formData, activities: formData.activitiesP.split(' ') });
        console.log(formData)
        
    }
    function handleInputChange(event:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(value)
        console.log()
      }

    return (
        <div>
          <h1>Create a New Trip</h1>
          <form  onSubmit={handleSubmit}>
            <div>
              <label>ID:</label>
              <input
                type="text"
                name="id"
                onChange={handleInputChange}

                required
              />
            </div>
            {/* <div>
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
            </div> */}
            <div>
              <label>Activities:</label>
              <input
                type="text"
                name="activitiesP"
                onChange={handleInputChange}
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
    