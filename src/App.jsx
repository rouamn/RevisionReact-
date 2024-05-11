import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route from react-router-dom
import Events from "../src/composents/Events"; // Adjusted the path
import AddEvents from "./composents/addEvents";
import EventDetails from "./composents/EventDetails"
import UpdateEvent from "./composents/updateEvent"
import  EventsRedux from "./composentsRedux/EventsRedux"
import  AddRedux from "./composentsRedux/addRedux"
import  UpdateRedux from "./composentsRedux/updateRedux"
import React from "react";
import { Suspense } from "react";
function App() {

  const NotFound = React.lazy(() => import("./composentsRedux/NotFound"));
  return (
    <Suspense fallback={<p>Loading ....</p>}>
      
    <Router>
      <Routes>
        <Route path="/" element={<Events />} /> 


        <Route path=":id" element={<EventDetails />} /> 
        <Route path="/add" element={<AddEvents />} /> 
        <Route path="/update/:id" element={<UpdateEvent />} /> 
        <Route path="/EventsR" element={<EventsRedux />} /> 
        <Route path="/addR" element={<AddRedux />} /> 
        
        <Route path="/updateR/:id" element={<UpdateRedux />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;
