import { useState, useEffect } from 'react'
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const EditEvent = () => {
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const updateEvent = async (e) => {
        e.preventDefault();
        await axiosJWT.patch(`/api/events/${id}`, {
            Description: description,
            StartDate: startDate,
            EndDate: endDate
        });

        navigate('/events/administration');
    }

    useEffect(() => {
        getEventById();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getEventById = async () => {
        const response = await axios.get(`/api/events/${id}`);
        setDescription(response.data.Description);

        setStartDate(response.data.StartDate);
        setEndDate(response.data.EndDate);


    }



    return (
        <div className="column is-two-fifths ml-2">
            <form onSubmit={updateEvent}>
                <div className="field">
                    <label className="label">Beschreibung</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Beschreibung"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Event Anfang</label>
                    <input
                        className="input"
                        type="date"
                        placeholder="Event Anfang"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Event Ende</label>
                    <input
                        className="input"
                        type="date"
                        placeholder="Event Ende"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="field is-grouped">
                    <p className="control"><button className="button is-primary is-light is-rounded is-outlined">Bestätigen</button></p>
                    <p className="control"><Link to={`/events/administration`} className="button is-danger is-light is-rounded is-outlined">Abbrechen</Link></p>
                </div>
            </form>
        </div>
    )
}

export default EditEvent
