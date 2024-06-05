import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import db from './config/database.js';
import administratorRoutes from './routes/administratorRoutes.js';
import dishRoutes from './routes/dishRoutes.js';
import beverageRoutes from './routes/beverageRoutes.js';
import restaurantownerRoutes from './routes/restaurantownerRoutes.js';
import dishtypeRoutes from './routes/dishtypeRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import beveragetypeRoutes from './routes/beveragetypeRoutes.js';
import drinksmenuRoutes from './routes/drinksmenuRoutes.js';
import dish_allergentypeRoutes from './routes/dish_allergentypeRoutes.js';
import allergentypeRoutes from './routes/allergentypeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { verifyToken } from './middleware/VerifyToken.js';

dotenv.config();

const port = process.env.PORT || 3010;
const app = express();

(async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Connection error:', error);
    }
})();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
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

// Öffentlicher Endpunkt
app.get('/', (req, res) => {
    res.send('Backend-Server läuft');
});

// Middleware für geschützte Routen
app.use('/api/administrators', verifyToken);

// Starten des Servers
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
