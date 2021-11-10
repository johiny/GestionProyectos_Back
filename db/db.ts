import { connect } from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config({path:"./.env"})

const conectarBD = async () => {
  return await connect(
    process.env.STRING_CONNECTION
  )
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

export default conectarBD;
