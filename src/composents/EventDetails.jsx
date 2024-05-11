import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getallEvents } from "../service/api"; // Assuming the function is named getEvent
import { useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => { // Removed the parameter since id is now accessed from useParams
      try {
        const eventResult = await getallEvents(id); // Pass the id parameter to getEvent
        setEventDetails(eventResult.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]); // Include id in the dependency array to re-run effect when id changes

  if (!eventDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={`/images/${eventDetails.img}`} // Use eventDetails instead of eventItem
            alt="Event Img"
            height="300"
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <h1>{eventDetails.name}</h1> {/* Use eventDetails.name */}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Description</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: "50px" }}>{eventDetails.description}</p> {/* Use eventDetails.description */}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Price</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: "50px" }}>{eventDetails.price} DT</p> {/* Use eventDetails.price */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetails;
