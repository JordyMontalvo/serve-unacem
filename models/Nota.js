import mongoose, { Schema } from 'mongoose';

const NotaSchema = new Schema(
  {
    note_id: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nota: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Nota || mongoose.model('Nota', NotaSchema);
