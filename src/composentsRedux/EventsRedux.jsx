
    import { useEffect } from "react";
    import EventRedux from "../composentsRedux/EventRedux";
    import { Link } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import { fetchEvents } from "../redux/slices/eventsSlice";
    function EventsRedux () {
        const dispatch = useDispatch();
        const event = useSelector((state) => state.events.events);

        useEffect(() => {   
        
            dispatch(fetchEvents());
        
            
        }, [dispatch]);


        return (
            <div>
            <Link to="/addR">
                <button>Add Event</button>
            </Link>
            <h1>List of Events </h1>
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
                {Array.isArray(event) && event.map((e, i) => (
                        <EventRedux
                            id={e.id}
                            img={e.img}
                            name={e.name}
                            description={e.description}
                            price={e.price}
                            key={i}
                            nbTickets={e.nbTickets}
                            nbParticipants={e.nbParticipants}
                        />
                    ))}
                </tbody>
            </table>
            </div>
        );
    }

    export default EventsRedux ;