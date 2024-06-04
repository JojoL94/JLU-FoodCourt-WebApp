import express from "express";
import db from "./config/database.js"
import administratorRoutes from "./routes/administratorRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import beverageRoutes from "./routes/beverageRoutes.js";
import restaurantownerRoutes from "./routes/restaurantownerRoutes.js";
import dishtypeRoutes from "./routes/dishtypeRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import beveragetypeRoutes from "./routes/beveragetypeRoutes.js";
import drinksmenuRoutes from "./routes/drinksmenuRoutes.js";
import dish_allergentypeRoutes from "./routes/dish_allergentypeRoutes.js";
import allergentypeRoutes from "./routes/allergentypeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import * as https from 'https';
import * as fs from 'fs';
const port = process.env.PORT || 3010;
const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/administrators', administratorRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/beverages', beverageRoutes);
app.use('/api/restaurantowners', restaurantownerRoutes);
app.use('/api/dishtypes', dishtypeRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/beveragetypes', beveragetypeRoutes);
app.use('/api/drinksmenus', drinksmenuRoutes);
app.use('/api/dish_allergentypes', dish_allergentypeRoutes);
app.use('/api/allergen', allergentypeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(port, () => {
        console.log(`Server running on ${port}`)
    });