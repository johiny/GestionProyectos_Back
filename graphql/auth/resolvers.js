import { UserModel } from "../../models/user/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/tokensUtils.js";

const resolversAutenticacion = {
    Mutation: {
        registro: async (parent,args) => {
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            
            const usuariocreado = await UserModel.create({
             nombre: args.nombre,
             apellido: args.apellido,
             identificacion: args.identificacion,
             correo: args.correo,
             rol: args.rol,
             password: hashedPassword   
            });
            console.log("usario creandose");
            return { 
                token: generateToken({
                   _id: usuariocreado._id,
                   nombre: usuariocreado.nombre,
                   apellido: usuariocreado.apellido,
                   identificacion: usuariocreado.identificacion,
                   correo: usuariocreado.correo,
                   rol: usuariocreado.rol
                })
            };
        },

        login: async (parent,args) => {
            const UsuarioEncontrado = await UserModel.findOne({correo: args.correo})
            if (await bcrypt.compare(args.password,UsuarioEncontrado.password))
            {
                return {token: generateToken({
                    _id: UsuarioEncontrado._id,
                    nombre: UsuarioEncontrado.nombre,
                    apellido: UsuarioEncontrado.apellido,
                    identificacion: UsuarioEncontrado.identificacion,
                    correo: UsuarioEncontrado.correo,
                    rol: UsuarioEncontrado.rol
                 })
            };
            }
        },

        refreshToken: async (parent,args,context) => {
            console.log("este es el contexto compartido por apollo entre el front y el back: ",context)
        }
    }
}

export {resolversAutenticacion}