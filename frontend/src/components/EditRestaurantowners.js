import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const EditRestaurantowner = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const { foodstand } = useParams();
    const [fs, setFs] = useState(foodstand);
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const updateRestaurantowner = async (e) => {
        e.preventDefault();
        await axiosJWT.patch(`/api/restaurantowners/${foodstand}`, {
            FoodStand: fs,
            Firstname: firstname,
            Lastname: lastname
        });
        navigate('/restaurantowners');
    }

    useEffect(() => {
        getRestaurantownerByFoodstand();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getRestaurantownerByFoodstand = async () => {
        const response = await axiosJWT.get(`/api/restaurantowners/${foodstand}`);
        setFirstname(response.data.Firstname);
        setLastname(response.data.Lastname);
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">
            <form onSubmit={updateRestaurantowner}>
                <div className="field">
                    <label className="label">Stand</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Stand"
                        value={fs}
                        onChange={(e) => { setFs(e.target.value) }}
                    />
                </div>

                <div className="field">
                    <label className="label">Vorname</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Vorname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Nachname</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Nachname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div className="field is-grouped">
                    <p className="control"><button className="button is-primary is-light is-rounded is-outlined">Bestätigen</button></p>
                    <p className="control"><Link to={`/restaurantowners`} className="button is-danger is-light is-rounded is-outlined">Abbrechen</Link></p>
                </div>
            </form>
        </div>
    )
}

export default EditRestaurantowner