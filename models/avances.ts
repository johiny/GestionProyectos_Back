import { Schema, model } from 'mongoose';
import { Enum_FaseProyecto } from './enums';
import { ProjectModel } from './project';
import { UserModel } from './user';

interface Avance {
  fecha: Date;
  descripcion: string;
  observaciones: [string];
  fase:Enum_FaseProyecto;
  proyecto: Schema.Types.ObjectId;
  creadoPor: Schema.Types.ObjectId;
}

const advancementSchema = new Schema<Avance>({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
    {
      type: String,
    },
  ],

  fase: {
    type: String,
    enum: Enum_FaseProyecto,
    required:true,
  },
  

  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

const AdvancementModel = model('Avance', advancementSchema);

export { AdvancementModel };
