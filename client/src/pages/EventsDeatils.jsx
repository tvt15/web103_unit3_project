import React, { useState, useEffect } from 'react';
import unitygrid from '../assets/unitygrid.jpg';
import { useParams } from 'react-router-dom';  // To get the location from the URL
import { getEventById } from '../services/EventsAPI'

const EventDetails = () => {
    const { locationId } = useParams();  // Get the locationId from the URL
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                console.log("here1",locationId)
                const eventsData = await getEventById(locationId);  // Fetch events for the location
                console.log("here",eventsData)
                setEvents(eventsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchEvents();
    }, [locationId]);  // Trigger whenever the locationId changes

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error fetching events: {error}</div>;

    return (
        <div className="events-container">
            <h1>Events at {locationId}</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((event, index) => (
                        <li key={event.location_id}>
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            {/* Add countdown timer logic here if needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events available at this location.</p>
            )}
        </div>
    );
};

export default EventDetails;
