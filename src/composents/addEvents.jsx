import  { useState } from "react";
import { addEvent } from "../service/api";
import { useNavigate } from "react-router-dom";
function AddEvents() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addEvent({
        name: eventName,
        description: eventDescription,
        // Add other properties as needed
      });
      console.log("Event added successfully!");
      // Clear form fields after successful submission
      setEventName("");
      setEventDescription("");
      navigate("/"); 
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div>
      <h1>Add Events</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEvents;
