import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateEventThunk } from "../redux/slices/eventsSlice";
import axios from "axios";

function UpdateRedux() {
    const [values, setValues] = useState({
        name: "",
        description: "",
        nbTickets: 0,
        price: 0,
        nbParticipants: 0,
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:3001/events/${id}`)
            .then((res) => {
                setValues(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateEventThunk({ id, ...values }))
            .then(() => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Event</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="eventName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Enter event name"
                    />
                </Form.Group>
                <Form.Group controlId="eventDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    />
                </Form.Group>
                <Form.Group controlId="eventNbTickets">
                    <Form.Label>Number of Tickets</Form.Label>
                    <Form.Control
                        type="number"
                        name="nbTickets"
                        value={values.nbTickets}
                        onChange={handleChange}
                        placeholder="Enter number of tickets"
                    />
                </Form.Group>
                <Form.Group controlId="eventPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </Form.Group>
                <Form.Group controlId="eventNbParticipants">
                    <Form.Label>Number of Participants</Form.Label>
                    <Form.Control
                        type="number"
                        name="nbParticipants"
                        value={values.nbParticipants}
                        onChange={handleChange}
                        placeholder="Enter number of participants"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdateRedux;
