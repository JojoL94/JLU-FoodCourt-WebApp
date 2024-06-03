import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AxiosJWT from './AxiosJWT';
import ImageUploading from 'react-images-uploading';
import React from 'react';

const AddDish = () => {
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Standard');
    const [dishTypes, setDishTypes] = useState([]);
    const [menu, setMenu] = useState('Eiscafe');
    const [menus, setMenus] = useState([]);
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState(false);
    const navigate = useNavigate();
    const [allergen, setAllergen] = useState([]);
    const [selectedAllergen] = useState([]);
    const [image, setImage] = React.useState([]);
    const maxNumber = 2;

    useEffect(() => {
        getDishTypes();
        getMenus();
        getAllergen();
    }, []);

    const axiosJWT = AxiosJWT();

    const onChange = (imageList, addUpdateIndex) => {
        if (!imageList[0]) {
            document.getElementById("imguploadmessage").innerHTML = ""
            document.getElementById("imguploadmessage").className += "is-hidden";
            setImage(imageList);
        } else {
            //Check size
            if (imageList[0].file.size < 2000000) {
                //Size < 2MB
                setImage(imageList);
                document.getElementById("imguploadmessage").className = "is-hidden";
            } else {
                //Size >2MB
                document.getElementById("imguploadmessage").className = '';
                document.getElementById("imguploadmessage").className += "tag is-danger";
                document.getElementById("imguploadmessage").innerHTML = "Bildgröße muss kleiner sein als 2MB.";
            }
        }
    };

    const getAllergen = async () => {
        const response = await axios.get('/api/allergen');
        setAllergen(response.data);
    }

    const getDishTypes = async () => {
        const response = await axios.get('/api/dishtypes');
        setDishTypes(response.data);
    }

    const getMenus = async () => {
        const response = await axios.get('/api/menus');
        setMenus(response.data);
    }

    const saveDish = async (e) => {
        e.preventDefault();

        //Create array for image to send
        var image2Upload = {}
        if (image[0]) {
            image2Upload = { data_url: image[0].data_url, type: image[0].file.type };
            await axiosJWT.post('/api/dishes', {
                Description: description,
                DishTypeEnumType: type,
                MenuTitle: menu,
                Price: price,
                Available: available,
                Allergen: selectedAllergen,
                Image: image2Upload
            });
        } else {
            await axiosJWT.post('/api/dishes', {
                Description: description,
                DishTypeEnumType: type,
                MenuTitle: menu,
                Price: price,
                Available: available,
                Allergen: selectedAllergen
            });
        }

        navigate('/menu/administration');
    }

    const selectAllergen = function (param) {
        if (!selectedAllergen.find(c => c === param)) {
            selectedAllergen.push(param);
        } else {
            const index = selectedAllergen.indexOf(param);
            if (index >= 0) {
                selectedAllergen.splice(index, 1);
            }
        }
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">

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
                        {dishTypes.map((dishType) => {
                            return <option key={dishType.EnumType} value={dishType.EnumType}>
                                {dishType.EnumType}
                            </option>
                        })
                        }
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">Speisekarte</label>
                <div className="select is-fullwidth">
                    <select onChange={(e) => setMenu(e.target.value)}>
                        {menus.map((menu) => {
                            return <option key={menu.Title} value={menu.Title}>
                                {menu.Title}
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

            <label className="label pt-3">Allergene</label>
            {allergen.map((allergenItem, index) => (
                <div key={index}>
                    <input type="checkbox"
                        key={allergenItem}
                        onChange={(e) => selectAllergen(allergenItem)}
                    /> {allergenItem.EnumType}
                </div>
            ))
            }

            <label className="label pt-5">Verfügbarkeit</label>
            <div className="field">
                <input
                    className="checkbox"
                    type="checkbox"
                    value={available}
                    onClick={(e) => setAvailable(!available)}
                /> Ja
            </div>

            <div className="card">
                <div className="card-content">
                    <div className="content">

                        <label className="label">Bild hinzufügen (max. 2MB)</label>
                        <ImageUploading
                            single
                            value={image}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url">
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                // write your building UI

                                <div className="upload__image-wrapper">
                                    {imageList.length ? <p></p> :
                                        <div>
                                            <button className="button is-primary is-light is-outlined is-rounded mt-5"
                                                onClick={onImageUpload}>Bild hinzufügen
                                            </button>
                                        </div>
                                    }

                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image['data_url']} alt="" width="200" />
                                            <div className="image-item__btn-wrapper mt-5">
                                                <button className="button is-danger is-light is-outlined is-rounded"
                                                    onClick={() => onImageRemove(index)}> Bild entfernen
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>
                        <span className="tag is-danger is-hidden mt-5" id="imguploadmessage"></span>
                    </div>
                </div>
            </div>

            <div className="field is-grouped mt-6">
                <p className="control">
                    <button onClick={saveDish}
                        className="button is-primary is-light is-outlined is-rounded">Bestätigen
                    </button>
                </p>
                <p className="control">
                    <Link to={`/menu/administration`}
                        className="button is-danger is-light is-outlined is-rounded">Abbrechen</Link>
                </p>
            </div>
        </div>
    )
}

export default AddDish