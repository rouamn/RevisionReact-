import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEventThunk } from '../redux/slices/eventsSlice';

function AddRedux() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        isLiked: false,
        nbParticipants: 0,
        nbTickets: 0,
        img: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        // Perform initialization or fetch data
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(addEventThunk(newEvent))
            .then(() => {
                navigate('/EventsR');
            })
            .catch(() => {
                setErrorMessage('Failed to add the event. Please try again.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="eventName">
                <Form.Label>Event Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={newEvent.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter event name"
                />
            </Form.Group>
            <Form.Group controlId="eventDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    required
                    placeholder="Enter event description"
                />
            </Form.Group>
            <Form.Group controlId="eventNbTickets">
                <Form.Label>Number of Tickets:</Form.Label>
                <Form.Control
                    type="number"
                    name="nbTickets"
                    value={newEvent.nbTickets}
                    onChange={handleChange}
                    required
                    placeholder="Enter number of tickets"
                />
            </Form.Group>
            <Form.Group controlId="eventNbParticipants">
                <Form.Label>Number of Participants:</Form.Label>
                <Form.Control
                    type="number"
                    name="nbParticipants"
                    value={newEvent.nbParticipants}
                    onChange={handleChange}
                    required
                    placeholder="Enter number of participants"
                />
            </Form.Group>
            <Form.Group controlId="eventDate">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="eventTime">
                <Form.Label>Time:</Form.Label>
                <Form.Control
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            {/* Include other fields like date, time, etc., similar to the above */}
            <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Event'}
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Form>
    );
}

export default AddRedux;
