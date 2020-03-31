import dotenv from 'dotenv';

dotenv.config();
let discoId = process.env.discoId;
let discoSecret = process.env.discoSecret;
let jwtKey = process.env.jwtKey;

export { discoId, discoSecret, jwtKey };
