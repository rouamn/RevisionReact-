import { combineReducers } from 'redux'




 import events from './slices/eventsSlice' ; 

const reducers = combineReducers({

  events,

})

export default reducers;

