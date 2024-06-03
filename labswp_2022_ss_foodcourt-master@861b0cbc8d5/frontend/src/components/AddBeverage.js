import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AxiosJWT from './AxiosJWT';

const AddBeverage = () => {
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Alkoholisch');
    const [beverageTypes, setBeverageTypes] = useState([]);
    const [menu, setMenu] = useState('Ausschank');
    const [drinksmenus, setDrinksmenus] = useState([]);
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getBeverageTypes();
        getDrinksmenus();
    }, []);

    const axiosJWT = AxiosJWT();

    const getBeverageTypes = async () => {
        const response = await axios.get('/api/beveragetypes');
        setBeverageTypes(response.data);
    }

    const getDrinksmenus = async () => {
        const response = await axios.get('/api/drinksmenus');
        setDrinksmenus(response.data);
    }

    const saveBeverage = async (e) => {
        e.preventDefault();
        await axiosJWT.post('/api/beverages', {
            Description: description,
            BeverageTypeEnumType: type,
            DrinksMenuTitle: menu,
            Price: price,
            Available: available,
        });
        navigate('/menu/administration');
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">
            <form onSubmit={saveBeverage}>
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
                    <label className="label">Typ</label>
                    <div className="select is-fullwidth">
                        <select onChange={(e) => setType(e.target.value)}>
                            {beverageTypes.map((beverageType) => {
                                return <option key={beverageType.EnumType} value={beverageType.EnumType}>
                                    {beverageType.EnumType}
                                </option>
                            })
                            }
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Getränkekarte</label>
                    <div className="select is-fullwidth">
                        <select onChange={(e) => setMenu(e.target.value)}>
                            {drinksmenus.map((drinksmenu) => {
                                return <option key={drinksmenu.Title} value={drinksmenu.Title}>
                                    {drinksmenu.Title}
                                </option>
                            })
                            }
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Preis</label>
                    <input
                        className="input"
                        type="number"
                        placeholder="Preis"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Verfügbar</label>
                    <input
                        className="checkbox"
                        type="checkbox"
                        value={available}
                        onClick={(e) => setAvailable(!available)}
                    />
                </div>

                <div className="field is-grouped">
                    <p className="control">
                        <button className="button is-primary is-light is-rounded is-outlined">Bestätigen</button>
                    </p>
                    <p className="control">
                        <Link to={`/menu/administration`} className="button is-danger is-light is-rounded is-outlined">Abbrechen</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AddBeverage