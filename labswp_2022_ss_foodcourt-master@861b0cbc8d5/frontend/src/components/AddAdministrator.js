import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const AddAdministrator = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const saveAdministrator = async (e) => {
        e.preventDefault();
        try {
            await axiosJWT.post('/api/administrators', {
                username: username,
                password: password,
                confPassword: confPassword
            });
            navigate('/administrators');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">
            <form onSubmit={saveAdministrator}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                    <label className="label">Benutzername</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Benutzername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Passwort</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Passwort Bestätigung</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="******"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </div>

                <div className="field is-grouped">
                    <p className="control">
                        <button className="button is-primary is-light is-outlined is-rounded">Bestätigen</button>
                    </p>
                    <p className="control">
                        <Link to={`/administrators`} className="button is-danger is-light is-outlined is-rounded">Abbrechen</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AddAdministrator