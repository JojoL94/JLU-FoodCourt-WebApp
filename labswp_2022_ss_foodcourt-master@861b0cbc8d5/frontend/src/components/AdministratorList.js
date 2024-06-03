import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import AxiosJWT from './AxiosJWT';

const AdministratorList = () => {
    const [administrators, setAdministrators] = useState([]);

    useEffect(() => {
        getAdministrators();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const axiosJWT = AxiosJWT();

    const getAdministrators = async () => {
        const response = await axiosJWT.get('/api/administrators')
        setAdministrators(response.data);
    }

    const deleteAdministrator = async (username) => {
        await axiosJWT.delete(`/api/administrators/${username}`);
        getAdministrators();
    }

    return (
        <div className="column is-narrow ml-2 mr-2">
            <h1 className="title pt-3 mb-2">Administratoren</h1>
            <Link to="/administrators/add" className="button is-primary is-light is-rounded is-outlined is-small mb-2">Hinzufügen</Link>
            <table className="table is-striped is-fullwidth" id="table-administrators">
                <thead>
                    <tr>
                        <th>Benutzername</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {administrators.map((administrator, index) => (
                        <tr key={administrator.username}>
                            <td>{administrator.username}</td>
                            <td>
                                <Link to={`/administrators/edit/${administrator.username}`} className="button is-small is-info is-light is-outlined is-rounded mb-2 mr-2">Ändern</Link>
                                <button onClick={() => deleteAdministrator(administrator.username)} className="button is-small is-danger is-light is-outlined is-rounded">Löschen</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default AdministratorList