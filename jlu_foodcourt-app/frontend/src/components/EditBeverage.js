import { useState, useEffect } from 'react'
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';

const EditBeverage = () => {
    const [type, setType] = useState('');
    const [beverageTypes, setBeverageTypes] = useState([]);
    const [menu, setMenu] = useState('');
    const [drinksmenus, setDrinksmenus] = useState([]);
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState();
    const { description } = useParams();
    const [desc, setDesc] = useState(description);
    const navigate = useNavigate();

    const axiosJWT = AxiosJWT();

    const updateBeverage = async (e) => {
        e.preventDefault();
        await axiosJWT.patch(`/api/beverages/${description}`, {
            Description: desc,
            BeverageTypeEnumType: type,
            DrinksMenuTitle: menu,
            Price: price,
            Available: available,
        });
        navigate('/menu/administration');
    }

    useEffect(() => {
        getBeverageByDescription();
        getBeverageTypes();
        getDrinksmenus();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getBeverageByDescription = async () => {
        const response = await axios.get(`/api/beverages/${description}`);
        setType(response.data.BeverageTypeEnumType)
        setMenu(response.data.DrinksMenuTitle)
        setPrice(response.data.Price)
        setAvailable(response.data.Available)
    }

    const getBeverageTypes = async () => {
        const response = await axios.get('/api/beveragetypes');
        setBeverageTypes(response.data);
    }

    const getDrinksmenus = async () => {
        const response = await axios.get('/api/drinksmenus');
        setDrinksmenus(response.data);
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">
            <form onSubmit={updateBeverage}>
                <div className="field">
                    <label className="label">Beschreibung</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Beschreibung"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="label">Typ</label>
                    <div className="select is-fullwidth">
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            {beverageTypes.map((beverageType) => {
                                return <option key={beverageType.EnumType} value={beverageType.EnumType} >
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
                        <select value={menu} onChange={(e) => setMenu(e.target.value)}>
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
                        defaultChecked={available}
                        onClick={(e) => setAvailable(!available)}
                    />
                </div>

                <div className="field is-grouped">
                    <p className="control"><button className="button is-primary is-light is-rounded is-outlined">Bestätigen</button></p>
                    <p className="control"><Link to={`/menu/administration`} className="button is-danger is-light is-rounded is-outlined">Abbrechen</Link></p>
                </div>
            </form>
        </div>
    )
}

export default EditBeverage