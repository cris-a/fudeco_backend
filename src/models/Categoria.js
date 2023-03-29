import mongoose from 'mongoose';

const categoriaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
      set: (v) => v.toLowerCase().replace(/\W+/g, '-'),
    },
    descripcion: {
      type: String,
      required: false,
      trim: true,
    },
    nota: {
      type: String,
      required: false,
      unique: false,
    },
    imagen: {
      type: String,
    },
    destacado: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Categoria = mongoose.model('Categoria', categoriaSchema);
export default Categoria;
