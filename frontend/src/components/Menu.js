import { useState, useEffect } from 'react'
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import '../styles.css'
import { BACKEND_URL, BACKEND_PORT } from './Config';

const PUBLIC_IMAGE_URL = BACKEND_URL + ':' + BACKEND_PORT + '/';

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [menus, setMenus] = useState([]);
    const [drinksMenu, setDrinksMenu] = useState([]);
    const [filteredBeverages, setFilteredBeverages] = useState([]);
    const [beverageTypes] = useState([]);
    const [dish_AllergenTypes, setDish_AllergenTypes] = useState([]);
    const [uniqueDish_AllergenTypes, setUniqueDish_AllergenTypes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [dishTypes] = useState([]);
    const [selectedAllergen, setSelectedAllergene] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    /* eslint-disable no-unused-vars */
    const [state, setState] = useState(0);
    /* eslint-enable no-unused-vars */
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 1000;

    useEffect(() => {
        getMenus();
        getDrinksMenu();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (selectedAllergen !== undefined) {
            handleFilter();
        }
        //eslint-disable-next-line
    }, [selectedAllergen]);

    const getDishes = async () => {

        const response = await axios.get('/api/dishes');
        const dishArray = response.data;

        setDishes(dishArray);
        setFilteredDishes(dishArray);
        for (let i = 0; i < dishArray.length; i++) {
            const dish = dishArray[i];
            if (dish.DishTypeEnumType) {
                const foundTypDish = dishTypes.find(c => c.DishTypeEnumType === dish.DishTypeEnumType);
                if (!foundTypDish) {
                    dishTypes.push(dish);
                }
            }
        }
        getDrinksMenu();
    }

    const getBeverages = async () => {
        const response = await axios.get('/api/beverages');
        const beverageArray = response.data;

        setBeverages(beverageArray);
        setFilteredBeverages(beverageArray);
        for (let i = 0; i < beverageArray.length; i++) {
            const beverage = beverageArray[i];
            if (beverage.BeverageTypeEnumType) {
                const foundTypBeverage = beverageTypes.find(c => c.BeverageTypeEnumType === beverage.BeverageTypeEnumType);
                if (!foundTypBeverage) {
                    beverageTypes.push(beverage);
                }
            }
        }
    }

    const getMenus = async () => {
        const response = await axios.get('/api/menus');

        setMenus(response.data);
        getDish_AllergenTypes();
    }

    const getDrinksMenu = async () => {
        const response = await axios.get('/api/drinksmenus');

        setDrinksMenu(response.data);
        getBeverages();
    }

    const getDish_AllergenTypes = async () => {
        const response = await axios.get('/api/dish_allergentypes');
        let uniqueDish_AllergenTypes = [];

        response.data.forEach((allergen) => {
            if (!uniqueDish_AllergenTypes.includes(allergen.AllergenTypeEnumType)) {
                uniqueDish_AllergenTypes.push(allergen.AllergenTypeEnumType);
            }
        })
        setDish_AllergenTypes(response.data);
        setUniqueDish_AllergenTypes(uniqueDish_AllergenTypes);
        getDishes();
    }

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    const handleFilter = () => {
        const selectStand = document.getElementById('menu_dish_stand_select').value;
        const selectTyp = document.getElementById('menu_dish_typ_select').value;

        setFilteredDishes(dishes);
        var unfiltered = dishes;
        if ((selectTyp === 'Standard' || selectTyp === 'Empty') && selectStand === 'All') {
            unfiltered = dishes;
        } else if ((selectTyp === 'Standard' || selectTyp === 'Empty')) {                               //Keine Filterung von Typ
            const filteredMenu = menus.find(c => c.RestaurantOwnerFoodStand === selectStand);
            const title = filteredMenu.Title;
            unfiltered = dishes.filter(c => c.MenuTitle === title);
        } else if (selectStand === 'All') {                                                            //Keine Filterung von Stand
            if (selectTyp === 'Vegetarisch') {                                                       //Filterung beinhaltet Vegetarisch und Vegan
                unfiltered = dishes.filter(c => c.DishTypeEnumType === 'Vegetarisch' || c.DishTypeEnumType === 'Vegan');
            } else {
                unfiltered = dishes.filter(c => c.DishTypeEnumType === selectTyp);
            }
        } else if (selectTyp === 'Vegetarisch') {                                                       //Filterung beinhaltet Vegetarisch und Vegan
            const filteredMenu = menus.find(c => c.RestaurantOwnerFoodStand === selectStand);
            const title = filteredMenu.Title;
            unfiltered = dishes.filter(c => c.MenuTitle === title && (c.DishTypeEnumType === 'Vegetarisch' || c.DishTypeEnumType === 'Vegan'));
        } else {                                                                                        //Vollständige Filterung
            const filteredMenu = menus.find(c => c.RestaurantOwnerFoodStand === selectStand);
            const title = filteredMenu.Title;
            unfiltered = dishes.filter(c => c.MenuTitle === title && c.DishTypeEnumType === selectTyp);
        }
        let allergenDishes = dish_AllergenTypes.map((allergen) => {
            if (selectedAllergen.includes(allergen.AllergenTypeEnumType)) {
                return allergen.DishDescription;
            }
            return undefined;
        });
        allergenDishes = allergenDishes.filter(Boolean);
        const filtered = unfiltered.filter(dish => {
            return !allergenDishes.includes(dish.Description);
        });
        setFilteredDishes(filtered);
    };

    const handleFilterBeverage = () => {
        const selectStand = document.getElementById('menu_beverage_stand_select').value;
        const selectTyp = document.getElementById('menu_beverage_typ_select').value;

        setFilteredBeverages(beverages);
        var unfiltered = beverages;
        if ((selectTyp === 'AllBevT') && selectStand === 'AllBevS') {
            unfiltered = beverages;
        } else if (selectTyp === 'AllBevT') {                               //Keine Filterung von Typ
            const filteredDrinksMenu = drinksMenu.find(c => c.RestaurantOwnerFoodStand === selectStand);
            const title = filteredDrinksMenu.Title;
            unfiltered = beverages.filter(c => c.DrinksMenuTitle === title);
        } else if (selectStand === 'AllBevS') {                                                            //Keine Filterung von Stand
            unfiltered = beverages.filter(c => c.BeverageTypeEnumType === selectTyp);
        } else {                                                                                        //Vollständige Filterung
            const filteredDrinksMenu = drinksMenu.find(c => c.RestaurantOwnerFoodStand === selectStand);
            const title = filteredDrinksMenu.Title;
            unfiltered = beverages.filter(c => c.DrinksMenuTitle === title && c.BeverageTypeEnumType === selectTyp);
        }
        const filtered = unfiltered;
        setFilteredBeverages(filtered);
    };

    const handleFilterAllergen = (selectedList) => {
        const tempSelectedList = [...selectedList];
        setSelectedAllergene(tempSelectedList);
    };

    const handleToggle = () => {
        setCollapsed(!collapsed);
    }

    const handleClickDishes = (index) => {
        if (filteredDishes[index].Other) {
            delete filteredDishes[index].Other;
        } else {
            filteredDishes[index].Other = {
                Other: "true"
            };
        }
        setState((pre) => {
            return pre + 1;
        });
    }

    const handleClickBeverages = (index) => {
        if (filteredBeverages[index].Other) {
            delete filteredBeverages[index].Other;
        } else {
            filteredBeverages[index].Other = {
                Other: "true"
            };
        }
        setState((pre) => {
            return pre + 1;
        });
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
        <div className="column ml-2 mr-2">
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
                            <div className={"dropdown" + (collapsed ? "" : " is-active")} tabIndex="0" >
                                <div className="dropdown-trigger">
                                    <button className="button button-filter is-rounded mb-3" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleToggle()}>
                                        <span>Filter</span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <div className="dropdown-item">
                                            <p className="is-size-7 mb-1 mt-2 has-text-weight-bold">TYP</p>
                                            <div className="select is-light mb-1 is-size-7">
                                                <select id="menu_dish_typ_select" onChange={() => handleFilter()}>
                                                    <option id="menu_dish_stand_select_empty" key="Empty" value='Empty'>-- Nach Ernährungsform filtern --</option>
                                                    {dishTypes.map((dish, index) => (
                                                        <option id={dish.DishTypeEnumType} key={dish.DishTypeEnumType} value={dish.DishTypeEnumType}>{dish.DishTypeEnumType}</option>
                                                    )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="dropdown-item">
                                            <p className="is-size-7 mb-1 mt-2 has-text-weight-bold">STAND</p>
                                            <div className="select is-light mb-1 is-size-7">
                                                <select id="menu_dish_stand_select" onChange={() => handleFilter()}>
                                                    <option id="menu_dish_stand_select_all" key="All" value='All'>Alle</option>
                                                    {menus.map((menu, index) => (
                                                        <option id={menu.RestaurantOwnerFoodStand} key={menu.RestaurantOwnerFoodStand} value={menu.RestaurantOwnerFoodStand}>{menu.RestaurantOwnerFoodStand}</option>
                                                    )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="dropdown-item">
                                            <p className="is-size-7 mb-1 mt-2 has-text-weight-bold">ALLERGENE AUSCHLIESSEN</p>
                                            <div className="select is-light mb-1 is-size-7">
                                                <Multiselect
                                                    options={uniqueDish_AllergenTypes} // Options to display in the dropdown
                                                    onSelect={handleFilterAllergen} // Function will trigger on select event
                                                    onRemove={handleFilterAllergen} // Function will trigger on remove event
                                                    displayValue="name" // Property name to display in the dropdown options
                                                    placeholder="Keine"
                                                    hidePlaceholder
                                                    isObject={false}
                                                    closeIcon="cancel"
                                                    emptyRecordMsg='Keine weitere Auswahl'
                                                    avoidHighlightFirstOption
                                                    style={{
                                                        chips: {
                                                            background: '#3ABB81'
                                                        },
                                                        multiselectContainer: { // To change search box element look
                                                            width: '12rem',
                                                            color: 'black'
                                                        },
                                                        searchBox: {
                                                            border: 'none',
                                                            borderRadius: '0px'
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table is-striped is-fullwidth" id="table-speisekarte">
                                <thead>
                                    <tr>
                                        <th>Beschreibung</th>
                                        <th>Bild</th>
                                        <th>Typ</th>
                                        <th>Allergene</th>
                                        <th>Stand</th>
                                        <th className="has-text-right">Verfügbarkeit</th>
                                        <th className="has-text-right">Preis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDishes.map((dish, index) => (
                                        <tr key={dish.Description} onClick={() => isMobile ? handleClickDishes(index) : ""}>
                                            <td >{dish.Description}</td>
                                            <td>
                                                {dish.Image ?
                                                    <img alt={dish.Image} src={`${PUBLIC_IMAGE_URL}${dish.Image}`} width="70px" /> : <span>-</span>}
                                            </td>
                                            <td className="hiddenMobile">{dish.DishTypeEnumType}</td>
                                            <td className="hiddenMobile">
                                                {!(dish_AllergenTypes.find(c => c.DishDescription === dish.Description)) ? (
                                                    <span>-</span>
                                                ) : (
                                                    (dish_AllergenTypes.filter(c => c.DishDescription === dish.Description)).map(
                                                        (allergen, index) => (
                                                            <span key={index}>{allergen.AllergenTypeEnumType}<br /></span>
                                                        ))
                                                )}
                                            </td>
                                            <td className="hiddenMobile">{(menus.find(c => c.Title === dish.MenuTitle)).RestaurantOwnerFoodStand}</td>
                                            {!dish.Available ? (
                                                <td className="has-text-right has-text-danger hiddenMobile">
                                                    Ausverkauft
                                                </td>
                                            ) : (
                                                <td className="has-text-right has-text-success hiddenMobile">
                                                    Verfügbar
                                                </td>
                                            )}
                                            <td className="has-text-right">{((dish.Price).toFixed(2)).replace(".", ",").concat("€")}</td>
                                            {dish.Other ? (
                                                <>
                                                    {!dish.Available ? (
                                                        <td className="has-text-right has-text-danger">
                                                            Ausverkauft
                                                        </td>
                                                    ) : (
                                                        <td className="has-text-right has-text-success">
                                                            Verfügbar
                                                        </td>
                                                    )}
                                                    <td>{dish.DishTypeEnumType}</td>
                                                    <td>{!(dish_AllergenTypes.find(c => c.DishDescription === dish.Description)) ? (
                                                        <span>-</span>
                                                    ) : (
                                                        (dish_AllergenTypes.filter(c => c.DishDescription === dish.Description)).map(
                                                            (allergen, index) => (
                                                                <span key={index}>{allergen.AllergenTypeEnumType}<br /></span>
                                                            ))
                                                    )}</td>
                                                    <td>{(menus.find(c => c.Title === dish.MenuTitle)).RestaurantOwnerFoodStand}</td>
                                                </>

                                            ) : null
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id='getraenkekarte-tab-inhalt' className='is-hidden'>
                    <div className="columns">
                        <div className="column">
                            <div className={"dropdown" + (collapsed ? "" : " is-active")} tabIndex="0" >
                                <div className="dropdown-trigger">
                                    <button className="button button-filter is-rounded mb-3" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleToggle()}>
                                        <span>Filter</span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <div className="dropdown-item">
                                            <p className="is-size-7 mb-1 mt-2 has-text-weight-bold">TYP</p>
                                            <div className="select is-light mb-1 is-size-7">
                                                <select id="menu_beverage_typ_select" onChange={() => handleFilterBeverage()}>
                                                    <option id="menu_beverage_typ_select_allBevT" value='AllBevT'>-- Nach Kategorien filtern --</option>
                                                    <option id="menu_beverage_typ_select_allBevT" value='AllBevT'>Alle</option>
                                                    {beverageTypes.map((beverage, index) => (
                                                        <option id={beverage.BeverageTypeEnumType} key={beverage.BeverageTypeEnumType} value={beverage.BeverageTypeEnumType}>{beverage.BeverageTypeEnumType}</option>
                                                    )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="dropdown-item">
                                            <p className="is-size-7 mb-1 mt-2 has-text-weight-bold">STAND</p>
                                            <div className="select is-light mb-1 is-size-7">
                                                <select id="menu_beverage_stand_select" onChange={() => handleFilterBeverage()}>
                                                    <option id="menu_beverage_stand_select_allBevS" key="AllBevS" value='AllBevS'>Alle</option>
                                                    {drinksMenu.map((drinksMenu, index) => (
                                                        <option id={drinksMenu.RestaurantOwnerFoodStand} key={drinksMenu.RestaurantOwnerFoodStand} value={drinksMenu.RestaurantOwnerFoodStand}>{drinksMenu.RestaurantOwnerFoodStand}</option>
                                                    )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table is-striped is-fullwidth" id="table-getränkekarte">
                                <thead>
                                    <tr>
                                        <th>Beschreibung</th>
                                        <th>Typ</th>
                                        <th>Stand</th>
                                        <th className="has-text-right">Verfügbarkeit</th>
                                        <th className="has-text-right">Preis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBeverages.map((beverage, index) => (
                                        <tr key={beverage.Description} onClick={() => isMobile ? handleClickBeverages(index) : ""}>
                                            <td>{beverage.Description}</td>
                                            <td className="hiddenMobile">{beverage.BeverageTypeEnumType}</td>
                                            <td className="hiddenMobile">{(drinksMenu.find(c => c.Title === beverage.DrinksMenuTitle)).RestaurantOwnerFoodStand}</td>
                                            {
                                                !beverage.Available ? (
                                                    <td className="has-text-right has-text-danger hiddenMobile">
                                                        Ausverkauft
                                                    </td>
                                                ) : (
                                                    <td className="has-text-right has-text-success hiddenMobile">
                                                        Verfügbar
                                                    </td>
                                                )
                                            }
                                            <td className="has-text-right">{((beverage.Price).toFixed(2)).replace(".", ",").concat("€")}</td>
                                            {beverage.Other ? (
                                                <>
                                                    {
                                                        !beverage.Available ? (
                                                            <td className="has-text-right has-text-danger">
                                                                Ausverkauft
                                                            </td>
                                                        ) : (
                                                            <td className="has-text-right has-text-success">
                                                                Verfügbar
                                                            </td>
                                                        )
                                                    }
                                                    <td>{beverage.BeverageTypeEnumType}</td>
                                                    <td>{(drinksMenu.find(c => c.Title === beverage.DrinksMenuTitle)).RestaurantOwnerFoodStand}</td>
                                                </>

                                            ) : null
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
export default Menu

