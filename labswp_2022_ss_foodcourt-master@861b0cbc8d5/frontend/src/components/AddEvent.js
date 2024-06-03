import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const AddEvent = () => {
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const saveEvent = async (e) => {
        e.preventDefault();
        await axiosJWT.post('/api/events', {
            Description: description,
            StartDate: startDate,
            EndDate: endDate,
        });
        navigate('/events/administration');
    }

    return (
        <div className="column is-two-fifths ml-2">
            <form onSubmit={saveEvent}>
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
                    <p className="control">
                        <button className="button is-primary is-light is-outlined is-rounded">Bestätigen</button>
                    </p>
                    <p className="control">
                        <Link to={`/events/administration`} className="button is-danger is-light is-outlined is-rounded">Abbrechen</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AddEvent
