import { useState, useEffect } from 'react'
import axios from "axios";

const EventGuest = () => {
    const [events, setEvents] = useState([]);


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const response = await axios.get('/api/events');
        setEvents(response.data);
    }

    return (
        <div className="column is-two-thirds ml-2 mr-2">
            <h1 className="title pt-3 mb-3">Events</h1>
            <table className="table is-striped is-fullwidth" id="table-events">
                <thead>
                    <tr>
                        <th>Beschreibung</th>
                        <th className="has-text-right">Start-Datum</th>
                        <th className="has-text-right">End-Datum</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.Description}>
                            <td>{event.Description}</td>
                            <td className="has-text-right">{event.StartDate.substring(8, 10) + event.StartDate.substring(4, 8) + event.StartDate.substring(0, 4)}</td>

                            <td className="has-text-right">{event.EndDate.substring(8, 10) + event.EndDate.substring(4, 8) + event.EndDate.substring(0, 4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EventGuest