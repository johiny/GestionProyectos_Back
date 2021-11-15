import { connect } from 'mongoose';
// const { connect } = require('mongoose');

const conectarBD = async () => {
  return await connect(
    'mongodb+srv://HectorDB:H3ct0r_DB@gsussurvivors.5aqj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
   
  )
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

export default conectarBD;
