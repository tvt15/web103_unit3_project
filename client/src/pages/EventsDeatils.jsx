import { getEventById } from "../services/EventsAPI";
import React, { useState, useEffect } from 'react';
import unitygrid from '../assets/unitygrid.jpg';
import { useParams } from 'react-router-dom';  // To get the location from the URL
import { getEventsByLocation } from "../services/EventsAPI";  // Import the API function

const EventDetails = () => {
    const { locationId } = useParams();  // Get the locationId from the URL
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getEventsByLocation(locationId);  // Fetch events for the location
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
                        <li key={index}>
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
