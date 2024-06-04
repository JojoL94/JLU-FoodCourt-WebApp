import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import AxiosJWT from './AxiosJWT';

const RestaurantonwerList = () => {
    const [restaurantowners, setRestaurantowners] = useState([]);

    useEffect(() => {
        getRestaurantowners();
        //eslint-disable-next-line
    }, []);

    const axiosJWT = AxiosJWT();

    const getRestaurantowners = async () => {
        const response = await axiosJWT.get('/api/restaurantowners');
        setRestaurantowners(response.data);
    }

    const deleteRestaurantowner = async (foodstand) => {
        await axiosJWT.delete(`/api/restaurantowners/${foodstand}`);
        getRestaurantowners();
    }

    return (
        <div className="column is-narrow ml-2 mr-2">
            <h1 className="title pt-3 mb-2">Restaurantbetreiber</h1>
            <Link to="/restaurantowners/add" className="button is-primary is-light is-rounded is-outlined is-small mb-2">Hinzufügen</Link>
            <table className="table is-striped is-fullwidth" id="table-restaurantowners">
                <thead>
                    <tr>
                        <th>Stand</th>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantowners.map((restaurantowner, index) => (
                        <tr key={restaurantowner.FoodStand}>
                            <td>{restaurantowner.FoodStand}</td>
                            <td>{restaurantowner.Firstname}</td>
                            <td>{restaurantowner.Lastname}</td>
                            <td>
                                <Link to={`/restaurantowners/edit/${restaurantowner.FoodStand}`} className="button is-small is-info is-light is-outlined is-rounded mb-2 mr-2">Ändern</Link>
                                <button onClick={() => deleteRestaurantowner(restaurantowner.FoodStand)} className="button is-small is-danger is-light is-rounded is-outlined">Löschen</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantonwerList