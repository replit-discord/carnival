import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  discoId: process.env.discoId,
  discoSecret: process.env.discoSecret,
  jwtKey: process.env.jwtKey
};
