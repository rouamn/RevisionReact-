import { useEffect, useState } from "react";
import { getallEvents, deleteEvent } from "../service/api";
import { Link } from "react-router-dom";

function Events() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResult = await getallEvents();
        setEventList(eventsResult.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEventList(eventList.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <Link to="/add">
        <button>Add Event</button>
      </Link>
      <h1>List of Events</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Number of Tickets</th>
            <th>Number of Participants</th>
            <th>Action</th> {/* This is where the Action column is added */}
          </tr>
        </thead>
        <tbody>
          {eventList.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.nbTickets}</td>
              <td>{event.nbParticipants}</td>
              <td> {/* Action column */}
                <Link to={`/update/${event.id}`}>
                  <button>Update</button>
                </Link>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
