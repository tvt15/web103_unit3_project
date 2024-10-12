import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import { getLocationById } from '../services/LocationsAPI'
import { getEventById } from '../services/EventsAPI'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const res = await getLocationById(index);
                setLocation(res)

                // setVenueNames({venue1: locationsData[0].name, venue2: locationsData[1].name, venue3: locationsData[2].name, venue4: locationsData[3].name})
                // setListeners()
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await getEventById(index);  // Fetch events for the location
                setEvents(events);
                
            } catch (error) {
                console.log(error.message);
                
            }
        };
        fetchEvents();
    }, []);
    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.location_id}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents