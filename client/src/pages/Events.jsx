import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../services/EventsAPI';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getAllEvents();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>All Career Fair Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
