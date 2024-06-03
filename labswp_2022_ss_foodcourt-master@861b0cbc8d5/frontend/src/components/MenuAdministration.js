import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import AxiosJWT from './AxiosJWT';
import { BACKEND_URL, BACKEND_PORT } from './Config';

const PUBLIC_IMAGE_URL = BACKEND_URL + ':' + BACKEND_PORT + '/';

const MenuAdministration = () => {
    const [dishes, setDishes] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [dish_allergentypes, setDish_AllergenTypes] = useState([]);

    //Load dishes and beverage dishes
    useEffect(() => {
        getDishes();
        getBeverages();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const axiosJWT = AxiosJWT();

    const getDishes = async () => {
        const response = await axios.get('/api/dishes');
        setDishes(response.data);
        getDish_AllergenTypes();
    }

    const getDish_AllergenTypes = async () => {
        const response = await axios.get('/api/dish_allergentypes');
        setDish_AllergenTypes(response.data);

    }

    const getBeverages = async () => {
        const response = await axios.get('/api/beverages');
        setBeverages(response.data);
    }

    const deleteDish = async (description) => {
        await axiosJWT.delete(`/api/dishes/${description}`);
        getDishes();
    }

    const deleteBeverage = async (description) => {
        await axiosJWT.delete(`/api/beverages/${description}`);
        getBeverages();
    }

    const changeTab = (target, tabName) => {
        const tabs = document.querySelectorAll('.tabs li');
        const tabContentBoxes = document.querySelectorAll('#tab-content > div');

        tabs.forEach(tab => {
            if (tab.getAttribute('id') === tabName) {
                tab.classList.add('is-active')
            } else {
                tab.classList.remove('is-active')
            }
            tabContentBoxes.forEach(box => {
                if (box.getAttribute('id') === target) {
                    box.classList.remove('is-hidden')
                } else {
                    box.classList.add('is-hidden')
                }
            })
        })
    }
    return (
        <div className="column is-narrow ml-2 mr-2">
            <div className="tabs is-toggle is-fullwidth is-large mb-3">
                <ul>
                    <li id='speisekarte-tab' className="is-active">
                        <a href={() => false} onClick={() => changeTab("speisekarte-tab-inhalt", "speisekarte-tab")}>
                            Speisekarte
                        </a>
                    </li>
                    <li id='getraenkekarte-tab' >
                        <a href={() => false} onClick={() => changeTab("getraenkekarte-tab-inhalt", "getraenkekarte-tab")}>
                            Getränkekarte
                        </a>
                    </li>
                </ul>
            </div>
            <div className="px-2" id="tab-content">
                <div id='speisekarte-tab-inhalt'>
                    <div className="columns">
                        <div className="column">
                            <Link to="/dishes/add" className="button is-primary is-light is-outlined is-rounded is-small mb-2">Hinzufügen</Link>
                            <table className="table is-striped is-fullwidth" id="table-speisekarte-verwaltung">
                                <thead>
                                    <tr>
                                        <th>Beschreibung</th>
                                        <th>Bild</th>
                                        <th>Typ</th>
                                        <th>Allergene</th>
                                        <th>Speisekarte</th>
                                        <th>Preis</th>
                                        <th>Verfügbarkeit</th>
                                        <th>Aktionen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dishes.map((dish, index) => (
                                        <tr key={dish.Description}>
                                            <td>{dish.Description}</td>
                                            <td>
                                                {dish.Image ? <img alt={dish.Image} src={`${PUBLIC_IMAGE_URL}${dish.Image}`} width="70px" /> : <span>-</span>}
                                            </td>
                                            <td>{dish.DishTypeEnumType}</td>
                                            <td>
                                                {
                                                    !(dish_allergentypes.find(c => c.DishDescription === dish.Description)) ? (
                                                        <span>-</span>
                                                    ) : (
                                                        (dish_allergentypes.filter(c => c.DishDescription === dish.Description)).map(
                                                            (allergen, index) => (
                                                                <span key={index}>{allergen.AllergenTypeEnumType}<br /></span>
                                                            ))
                                                    )
                                                }
                                            </td>
                                            <td>{dish.MenuTitle}</td>
                                            <td>{((dish.Price).toFixed(2)).replace(".", ",").concat("€")}</td>
                                            {/* Checks for availability for dish */}
                                            {
                                                !dish.Available ? (
                                                    <td className="has-text-danger">
                                                        Ausverkauft
                                                    </td>
                                                ) : (
                                                    <td className="has-text-success">
                                                        Verfügbar
                                                    </td>
                                                )
                                            }
                                            <td>
                                                <Link to={`/dishes/edit/${dish.Description}`} className="button is-small is-info is-light is-outlined is-rounded mb-2 mr-2">Ändern</Link>
                                                <button onClick={() => deleteDish(dish.Description)} className="button is-small is-danger is-light is-outlined is-rounded">Löschen</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id='getraenkekarte-tab-inhalt' className='is-hidden'>
                    <Link to="/beverages/add" className="button is-primary is-light is-outlined is-small is-rounded mb-2">Hinzufügen</Link>
                    <table className="table is-striped is-fullwidth" id="table-getränkekarte-verwaltung">
                        <thead>
                            <tr>
                                <th>Beschreibung</th>
                                <th>Typ</th>
                                <th>Getränkekarte</th>
                                <th>Preis</th>
                                <th>Verfügbarkeit</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beverages.map((beverage, index) => (
                                <tr key={beverage.Description}>
                                    <td>{beverage.Description}</td>
                                    <td>{beverage.BeverageTypeEnumType}</td>
                                    <td>{beverage.DrinksMenuTitle}</td>
                                    <td>{((beverage.Price).toFixed(2)).replace(".", ",").concat("€")}</td>
                                    {/* Checks for availability for beverage */}
                                    {
                                        !beverage.Available ? (
                                            <td className="has-text-danger">
                                                Ausverkauft
                                            </td>
                                        ) : (
                                            <td className="has-text-success">
                                                Verfügbar
                                            </td>
                                        )
                                    }

                                    <td>
                                        <Link to={`/beverages/edit/${beverage.Description}`} className="button is-small is-info is-light is-outlined is-rounded mb-2 mr-2">Ändern</Link>
                                        <button onClick={() => deleteBeverage(beverage.Description)} className="button is-small is-danger is-light is-outlined is-rounded">Löschen</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    )
}

export default MenuAdministration