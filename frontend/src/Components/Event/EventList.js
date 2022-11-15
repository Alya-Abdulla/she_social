import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { Route , NavLink} from 'react-router-dom'
import axios from 'axios'
import './EventList.css'

function EventList() {
  <h1>sheSocial Events</h1>

    const [eventsList, setEventsList] = useState([])
    useEffect(()=> {
        event_findall_get()
    }, [])
    
    const event_findall_get = () => {
        axios.get('http://localhost:4000/events/')
        .then(res => setEventsList(res.data))
        .catch(err => console.log(err))
      }
 
    return (
    <div>
   {eventsList.length ? eventsList.map(event => 
          <div className='event-container' key={event._id}>
            <h2>{event.EventName}</h2>
            <br></br><p>Time : {event.Time}</p>
            <br></br><p>Date : {event.Date}</p>
            <br></br><p>Location : {event.Locate}</p>
            <br></br><p>Category : {event.Category}</p>
            <br></br><p>Description : {event.Description}</p>

                {/* <button>View</button> */}
            <NavLink to={`/events/${event._id}`} >View</NavLink>
          </div>
        ) : null}


    </div>
  )
}

export default EventList