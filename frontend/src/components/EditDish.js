import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';
import AxiosJWT from './AxiosJWT';
import ImageUploading from "react-images-uploading";
import { BACKEND_URL, BACKEND_PORT} from './Config'

const EditDish = () => {
    const [type, setType] = useState('');
    const [dishTypes, setDishTypes] = useState([]);
    const [menu, setMenu] = useState('');
    const [menus, setMenus] = useState([]);
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState();
    const { description } = useParams();
    const [desc, setDesc] = useState(description);
    const navigate = useNavigate();
    const [image, setImage] = React.useState([]);
    const maxNumber = 2;

    const axiosJWT = AxiosJWT();

    const updateDish = async (e) => {
        e.preventDefault();

        //Create array for image to send
        var image2Upload = {}
        if (image[0]) {
            image2Upload = { data_url: image[0].data_url, type: image[0].file.type };

            await axiosJWT.patch(`/api/dishes/${description}`, {
                Description: desc,
                DishTypeEnumType: type,
                MenuTitle: menu,
                Price: price,
                Available: available,
                Image: image2Upload
            });
        } else {

            await axiosJWT.patch(`/api/dishes/${description}`, {
                Description: desc,
                DishTypeEnumType: type,
                MenuTitle: menu,
                Price: price,
                Available: available
            });
        }

        navigate('/menu/administration');
    }

    useEffect(() => {
        getDishByDescription();
        getDishTypes();
        getMenus();


    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    const getDishByDescription = async () => {
        const response = await axios.get(`/api/dishes/${description}`);
        setType(response.data.DishTypeEnumType)
        setMenu(response.data.MenuTitle)
        setPrice(response.data.Price)
        setAvailable(response.data.Available)

        let fileName = response.data.Image;
        if(fileName){
            let fileExt = fileName.split('.').pop();
            let fileType = "image/" + fileExt;
            const imageUrl =  BACKEND_URL+':'+BACKEND_PORT+'/'+fileName;
            try {
                // statt localhost se-server global definieren
                let responseImageFromServer = await fetch(imageUrl);
                let data = await responseImageFromServer.blob();
                let metadata = {
                    type: fileType
                };
                let file = new File([data], fileName, metadata);

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    let listOfImages = {"data_url":reader.result,"file":file };
                    setImage([listOfImages]);
                };
                reader.onerror = function (error) {

                };
            }
            catch(err) {
                console.log("EditDish.js: " +err);
            }
        }
    }

    const getDishTypes = async () => {
        const response = await axios.get('/api/dishtypes');
        setDishTypes(response.data);
    }

    const getMenus = async () => {
        const response = await axios.get('/api/menus');
        setMenus(response.data);
    }

    return (
        <div className="column is-two-fifths ml-2 mr-2">
                <div className="field">
                    <label className="label">Beschreibung</label>

                    <input
                        disabled
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
                            {dishTypes.map((dishType) => {
                                return <option key={dishType.EnumType} value={dishType.EnumType} >
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
                        <select value={menu} onChange={(e) => setMenu(e.target.value)}>
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

                <div className="card mb-5">
                    <div className="card-content">
                        <div className="content">
                            <label className="label">Aktuelles Bild (max. 2MB)</label>
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
                                                        onClick={onImageUpload}>Neues Bild hinzufügen
                                                </button>
                                            </div>
                                        }

                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image['data_url']}  alt="" width="200" />
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

                <div className="field is-grouped">
                    <p className="control"><button onClick={updateDish} className="button is-primary is-light is-outlined is-rounded">Bestätigen</button></p>
                    <p className="control"><Link to={`/menu/administration`} className="button is-danger is-light is-outlined is-rounded">Abbrechen</Link></p>
                </div>

        </div>
    )
}

export default EditDish