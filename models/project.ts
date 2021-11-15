import { Schema, model, SchemaTypes } from 'mongoose';
import { Enum_EstadoProyecto, Enum_FaseProyecto, Enum_EstadoAprobado} from './enums';
import { ObjectiveModel } from './objective';
import { UserModel } from './user';

interface Proyecto {
  nombre: string;
  presupuesto: number;
  fechaInicio: Date;
  fechaFin: Date;
  aprobado: Enum_EstadoAprobado;
  estado: Enum_EstadoProyecto;
  fase: Enum_FaseProyecto;
  lider: Schema.Types.ObjectId;
  objetivos:[Schema.Types.ObjectId];
 
}

const projectSchema = new Schema<Proyecto>({
  nombre: {
    type: String,
    required: true,
  },
  presupuesto: {
    type: Number,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },

  aprobado:{
    type:String,
    enum:Enum_EstadoAprobado,
    default: Enum_EstadoAprobado.nula,
  },
  estado: {
    type: String,
    enum: Enum_EstadoProyecto,
    default: Enum_EstadoProyecto.inactivo,
  },
  fase: {
    type: String,
    enum: Enum_FaseProyecto,
    default: Enum_FaseProyecto.nula,
  },
  lider: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: UserModel,
  },
  // objetivos:[{
  //   type:Schema.Types.ObjectId,
  //   ref: ObjectiveModel,
  // }]
  
});

const ProjectModel = model('Proyecto', projectSchema);

export { ProjectModel };
