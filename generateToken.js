import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const user = { username: 'testUser' };
const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

console.log(accessToken);
