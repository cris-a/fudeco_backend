import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
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
      required: true,
      trim: true,
    },
    categoria: {
      type: String,

      required: true,
    },
    imagen: {
      type: String,
    },
    precio: {
      type: Number,
      default: 0,
      trim: true,
    },
    sku: {
      type: String,
      required: false,
      trim: true,
    },
    cantidad: {
      type: Number,
      default: 1,
      trim: true,
    },
    unidad: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model('Producto', productSchema);
export default Producto;
