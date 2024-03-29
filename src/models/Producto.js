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
    imagenDos: {
      type: String,
    },
    imagenTres: {
      type: String,
    },
    precio: {
      type: Number,
      default: 0,
      trim: true,
    },
    mayorista: {
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
    minimoMayorista: {
      type: Number,
      default: 1,
      trim: true,
    },
    unidad: {
      type: String,
      required: false,
      trim: true,
    },
    subcategoria: {
      type: String,
      required: false,
    },
    descripcionCorta: {
      type: String,
    },
    hrefProductoBsale: {
      type: String,
    },
    idBsale: {
      type: Number,
    },
    idStock: {
      type: String,
    },
    idVariante: {
      type: String,
    },
    variantId: {
      type: Number,
    },
    stockQty: {
      type: String,
    },
    officeid: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model('Producto', productSchema);
export default Producto;
