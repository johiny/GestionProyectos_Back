import { Schema, model } from "mongoose";
import { UserModel } from "./User";
import { ProjectModel } from "./Proyecto"


interface Avance {
    fecha: Date;
    descripcion: string;
    observaciones: string;
    creadoPor: Schema.Types.ObjectId;
    proyecto: Schema.Types.ObjectId;
}

const avanceSchema = new Schema<Avance>({
    
    fecha: {
        type: Date,
        required: true,
    },

    descripcion: {
        type: String,
        required: true,
    },

    observaciones: {
        type: String,
        required: true,
    },

    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
});

const AvanceModel = model ("Avance", avanceSchema);

export { AvanceModel };