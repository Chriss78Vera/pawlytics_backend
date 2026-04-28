const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    intensidad: {
      type: String,
      required: true,
      enum: ["baja", "media", "alta"]
    },
    duracion: {
      type: String,
      required: true
    },
    frecuencia: {
      type: String,
      required: true
    }
  },
  {
    _id: false
  }
);

const HealthDataSchema = new mongoose.Schema(
  {
    peso: {
      type: Number,
      required: false
    },
    temperatura: {
      type: Number,
      required: false
    },
    frecuencia_cardiaca: {
      type: Number,
      required: false
    },
    frecuencia_respiratoria: {
      type: Number,
      required: false
    }
  },
  {
    _id: false
  }
);

const FeedingSchema = new mongoose.Schema(
  {
    come_normal: {
      type: Boolean,
      required: true
    },
    descripcion: {
      type: String,
      required: false,
      trim: true
    }
  },
  {
    _id: false
  }
);

const BehaviorSchema = new mongoose.Schema(
  {
    estado_animo: {
      type: String,
      required: false,
      trim: true
    },
    nivel_actividad: {
      type: String,
      required: false,
      enum: ["bajo", "medio", "alto"]
    }
  },
  {
    _id: false
  }
);

const ClinicalHistorySchema = new mongoose.Schema(
  {
    id_mascota: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Pet"
    },
    fecha_registro: {
      type: Date,
      required: true,
      default: Date.now
    },
    tipo_registro: {
      type: String,
      required: true,
      enum: ["sintomas", "consulta", "vacuna", "tratamiento", "control", "otro"]
    },
    sintomas: {
      type: [SymptomSchema],
      default: []
    },
    datos_salud: {
      type: HealthDataSchema,
      required: false
    },
    alimentacion: {
      type: FeedingSchema,
      required: false
    },
    comportamiento: {
      type: BehaviorSchema,
      required: false
    },
    observaciones: {
      type: String,
      required: false,
      trim: true
    },
    estado: {
      type: String,
      required: true,
      enum: ["registrado", "revisado", "archivado"],
      default: "registrado"
    }
  },
  {
    collection: "clinical_history",
    timestamps: true
  }
);

module.exports = mongoose.model("ClinicalHistory", ClinicalHistorySchema);
