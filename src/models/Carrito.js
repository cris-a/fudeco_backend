import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: String,
      required: false,
    },

    cantidad: {
      type: Number,
      default: 1,
      required: false,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Carrito = mongoose.model('Carrito', carritoSchema);
export default Carrito;
