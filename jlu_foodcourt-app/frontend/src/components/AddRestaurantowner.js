import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const AddRestaurantonwer = () => {
    const [foodstand, setFoodstand] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const saveRestaurantowner = async (e) => {
        e.preventDefault();
        await axiosJWT.post('/api/restaurantowners', {
            FoodStand: foodstand,
            Firstname: firstname,
            Lastname: lastname,
        });
        navigate('/restaurantowners');
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">
            <form onSubmit={saveRestaurantowner}>
                <div className="field">
                    <label className="label">Stand</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Stand"
                        value={foodstand}
                        onChange={(e) => setFoodstand(e.target.value)}
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
                    <p className="control">
                        <button className="button is-primary is-light is-rounded is-outlined">Bestätigen</button>
                    </p>
                    <p className="control">
                        <Link to={`/restaurantowners`} className="button is-danger is-light is-rounded is-outlined">Abbrechen</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurantonwer