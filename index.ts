import conectarBD from './db/db';
import { UserModel } from './models/user';
import { Enum_Estado_Usuario, Enum_Rol } from './models/enums';

const main = async () => {
  await conectarBD();

  // CREAR UN USUARIO
  await UserModel.create({
    apellido: 'castillo',
    correo: 'johan@cc.com',
    identificacion: '4360340',
    nombre: 'johan',
    rol: Enum_Rol.administrador,
    avances: ["creacion de espacio de traabajo para experimentos","se descubrio una extraña bacteria"],
    inscripciones: ["laura fuentes 2/05/2021","carlos castillo 31/10/2020"],
    proyectos: ["agua pura", "descontaminacion del rio aguas claras"]
  })
    .then((u) => {
      console.log('usuario creado', u);
    })
    .catch((e) => {
      console.error('Error creando el usuario', e);
    });

  // OBTENER LOS USUARIOS
  // await UserModel.find()
  //   .then((u) => {
  //     console.log('usuarios', u);
  //   })
  //   .catch((e) => {
  //     console.error('error obteniendo los usuarios', e);
  //   });
};

main();
