import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const EditAdministrator = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confNewPassword, setConfNewPassword] = useState('');
    const [msg, setMsg] = useState('');
    const { username } = useParams();
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const updateAdministrator = async (e) => {
        e.preventDefault();
        try {
            await axiosJWT.patch(`/api/administrators/${username}`, {
                currentPassword: currentPassword,
                newPassword: newPassword,
                confNewPassword: confNewPassword
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
            <form onSubmit={updateAdministrator}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                    <label className="label">Aktuelles Passwort</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="******"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Neues Passwort</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="******"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Neues Passwort Bestätigung</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="******"
                        value={confNewPassword}
                        onChange={(e) => setConfNewPassword(e.target.value)}
                    />
                </div>

                <div className="field is-grouped">
                    <p className="control"><button className="button is-primary is-light is-rounded is-outlined">Bestätigen</button></p>
                    <p className="control"><Link to={`/administrators`} className="button is-danger is-light is-rounded is-outlined">Abbrechen</Link></p>
                </div>
            </form>
        </div>
    )
}

export default EditAdministrator