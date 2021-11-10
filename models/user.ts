import { Schema, model } from 'mongoose';
import { Enum_Rol, Enum_Estado_Usuario } from './enums';

interface User {
  correo: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  rol: Enum_Rol;
  estado : Enum_Estado_Usuario;
  proyectos: string []; //cambiar por array de proyectos
  inscripciones: string []; //cambiar por array de inscripciones
  avances: string []; //cambiar por array de avances
}

const userSchema = new Schema<User>({
  correo: {
    type: String,
    required: true,
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: Enum_Rol,
  },
  estado: {
    type: String,
    enum: Enum_Estado_Usuario,
    default : Enum_Estado_Usuario.pendiente,
  },
  proyectos: [
    {
      type: String,  //cambiar a array de proyectos
    }
  ],
  inscripciones: [
    {
      type: String, // cambiar a array de Incripciones
    }
  ],
  avances : [
    {
      type: String, // cambiar a array de avances
    }
  ]
});

const UserModel = model('User', userSchema);

export { UserModel };
