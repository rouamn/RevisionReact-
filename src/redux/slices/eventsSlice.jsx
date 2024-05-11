import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getallEvents,deleteEvent,addEvent,editEvent} from "../../service/api";
let initialState = {
    events: [],
    selectedEvent: {},
    errors: "",
  };


  const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
      populateEvents(state, action) {
        state.events = action.payload;
      },
      selectEvent(state, action) {
        state.selectedEvent = action.payload;
      },
      unselectEvent(state) {
        state.selectedEvent = null;
      },
      deleteEventReducer: (state, action) => {
        const payload = action.payload;
        state.events = state.events.filter(
            (eventItem) => eventItem.id !== payload
        );
      },
      updateEventReducer: (state, action) => {
        const payload = action.payload;
        const index = state.events.findIndex((item) =>
            item.id === payload.id);
        if (index !== -1) {
          state.events[index] = payload;
        }
      },
      addEventReducer: (state, action) => {
        const payload = action.payload;
        state.events.push(payload);
      },
      setErrors(state, action) {
        state.errors = action.payload;
      },
    },
  });


  export const fetchEvents = () => async (dispatch) =>
    {
      try {
        const eventsResult = await getallEvents();
        dispatch(populateEvents(eventsResult.data));
        dispatch(setErrors(null));
      } catch (error) {
        dispatch(setErrors(error));
      }
    };

    export const deleteEventThunk = createAsyncThunk(
        'events/deleteEvent',
        async (eventId, { rejectWithValue }) => {
          try {
            // Replace this with the actual API call to delete the event
            await deleteEvent(eventId);
            return eventId; // Return the deleted event's ID on success
          } catch (error) {
            return rejectWithValue(error.response.data);
          }
        }
    );


    export const addEventThunk = createAsyncThunk(
        'events/addEvent',
        async (eventData, { dispatch, rejectWithValue }) => {
          try {
            const response = await addEvent(eventData); // Your API call to add an event
            dispatch(addEventReducer(response.data));
          } catch (error) {
            return rejectWithValue(error.response.data);
          }
        }
    );


    
    export const updateEventThunk = createAsyncThunk(
        'events/updateEvent',
        async (eventData, { dispatch, rejectWithValue }) => {
          try {
            const response = await editEvent(eventData); // Your API call to add an event
            dispatch(updateEventReducer(response.data));
          } catch (error) {
            return rejectWithValue(error.response.data);
          }
        }
    );
    export const {
        populateEvents,
        selectEvent,
        unselectEvent,
        setErrors,
        deleteEventReducer,
        addEventReducer, 
        updateEventReducer,
      } = eventsSlice.actions;
      export default eventsSlice.reducer;