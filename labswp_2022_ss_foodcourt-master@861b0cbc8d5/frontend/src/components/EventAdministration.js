import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import AxiosJWT from './AxiosJWT';

const EventAdministration = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, []);

    const axiosJWT = AxiosJWT();

    const getEvents = async () => {
        const response = await axios.get('/api/events');
        setEvents(response.data);
    }


    const deleteEvent = async (id) => {
        await axiosJWT.delete(`/api/events/${id}`);
        getEvents();
    }

    return (
        <div className="column is-narrow ml-2 mr-2">
            <h1 className="title pt-3 mb-2">Events</h1>
            <Link to="/events/add" className="button is-primary is-light is-outlined is-rounded is-small mb-2">Hinzufügen</Link>
            <table className="table is-striped is-fullwidth" id="table-events-verwaltung">
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Beschreibung</th>
                        <th>Start</th>
                        <th>Ende</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.Description}>
                            <td>{event.ID}</td>
                            <td>{event.Description}</td>
                            <td>{event.StartDate.substring(8, 10) + event.StartDate.substring(4, 8) + event.StartDate.substring(0, 4)}</td>
                            <td>{event.EndDate.substring(8, 10) + event.EndDate.substring(4, 8) + event.EndDate.substring(0, 4)}</td>
                            <td>
                                <Link to={`/events/edit/${event.ID}`} className="button is-small is-info is-light is-outlined is-rounded mb-2 mr-2">Ändern</Link>
                                <button onClick={() => deleteEvent(event.ID)} className="button is-small is-danger is-light is-outlined is-rounded">Löschen</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default EventAdministration
