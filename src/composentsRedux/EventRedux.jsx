import React from 'react';
import Button from 'react-bootstrap/Button';
import { deleteEventThunk } from "../redux/slices/eventsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEventThunk } from '../redux/slices/eventsSlice';

function EventRedux(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteEvent = async () => {
        dispatch(deleteEventThunk(props.id))
            .then(() => {
                console.log(`${props.id} deleted`);
                navigate('/EventsR');
            });
    };

    return (
        <tr>
               <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.price}</td>
            <td>{props.nbTickets}</td>
            <td>{props.nbParticipants}</td>
            <td>
                <Button variant="success">
                    <Link
                        to={`/updateR/${props.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        Update
                    </Link>
                </Button>
                <Button variant="danger" onClick={handleDeleteEvent}>
                    Delete Event Redux
                </Button>
            </td>
        </tr>
    );
}

export default EventRedux;
