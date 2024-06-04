import Dish from "../models/dishModel.js";
import Dish_AllergenType from "../models/dish_allergentypeModel.js";
import fs from "fs";

export const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll();
        res.json(dishes);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getDishByDescription = async (req, res) => {
    try {
        const dish = await Dish.findAll({
            where: {
                description: req.params.description
            }
        });
        res.json(dish[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Needed for unique image names
function generateRandomID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

export const createDish = async (req, res) => {
    try {
        //Get image and properties
        var image = req.body.Image;
        var imageReadyToWrite = false;
        if(image){
            var type = image['type'];
            var filename;
            var data;
            if(type && type.indexOf('/')>-1){
                var afterDot = type.substr(type.indexOf('/')+1);
                filename = generateRandomID()+"." + afterDot;
                data = image['data_url'].replace(/^data:image\/\w+;base64,/, '');
                if(data){
                    imageReadyToWrite = true;
                    req.body.Image = filename;
                }
            }
        }

        await Dish.create(req.body);

        //save image
        //Wait first for db insert
        if(imageReadyToWrite){
            fs.writeFile('public/'+filename, data, {encoding: 'base64'}, function(res){});
        }

        let DishDescription = req.body.Description;

        for (let i in req.body.Allergen) {
            let allergenItem = req.body.Allergen[i];
            let AllergenTypeEnumType = allergenItem.EnumType;
            let arrayElement = {
                "DishDescription": DishDescription,
                "AllergenTypeEnumType": AllergenTypeEnumType
            }
            Dish_AllergenType.create(arrayElement);
        }//end of for

        res.json({
            "message": "Dish Created"
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateDish = async (req, res) => {

    // Delete old image for dish first
    const dish = await Dish.findAll({
        where: {
            description: req.params.description
        }
    });
    const nameOfImage = dish[0].Image;
    if(nameOfImage){
        if(nameOfImage!='default.png'){
            try{
                fs.unlinkSync('public/'+nameOfImage);
            }catch (e){
                console.log("Dishes.js: Image not found.");
            }

        }

    }


    //Get image and properties
    var image = req.body.Image;

    var imageReadyToWrite = false;
    if(image){
        var type = image['type'];
        var filename;
        var data;
        if(type && type.indexOf('/')>-1){
            var afterDot = type.substr(type.indexOf('/')+1);
            filename = generateRandomID()+"." + afterDot;
            data = image['data_url'].replace(/^data:image\/\w+;base64,/, '');
            if(data){
                imageReadyToWrite = true;
                req.body.Image = filename;
            }
        }
    }else{
        req.body.Image = 'default.png';
    }

   // console.log(req.params.description);

    //save image
    //Wait first for db insert
    if(imageReadyToWrite){
        fs.writeFile('public/'+filename, data, {encoding: 'base64'}, function(res){});
    }

    try {

        await Dish.update(req.body, {
            where: {
                Description: req.params.description
            }
        });



        res.json({
            "message": "Dish Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteDish = async (req, res) => {
    try {
        // Delete image for dish first
        const dish = await Dish.findAll({
            where: {
                description: req.params.description
            }
        });

        const nameOfImage = dish[0].Image;
        if(nameOfImage){
            //default.png nie löschen damit bei eine update mit eine leeren image etwas gefunden werden kann. (Kosmetik)
            if(nameOfImage!='default.png'){
                try{
                    fs.unlinkSync('public/'+nameOfImage);
                }catch (e){
                    console.log("Dishes.js: Image not found.");
                }
            }


        }

        // Delete dish from dish_allergentype
        await Dish_AllergenType.destroy({
            where: {
                DishDescription: req.params.description
            }
        });

        // Delete dish
        await Dish.destroy({
            where: {
                description: req.params.description
            }
        });

        res.json({
            "message": "Dish Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

