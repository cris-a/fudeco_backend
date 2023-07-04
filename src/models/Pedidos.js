import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
    },
    productos: [],
    monto: {
      type: Number,
    },
    estado: {
      type: String,
      default: 'Nuevo',
    },

    direccion: { type: String, require: true },
    direccionAlter: { type: String, require: false },
    telefono: { type: Number, require: true },
    //   metodo_pago: {
    //     type: String,
    //     required: true,
    //   },
    pagado: {
      type: Boolean,
    },
    nota: { type: String },
  },
  { timestamps: true }
);

const Pedido = mongoose.model('Pedido', pedidoSchema);
export default Pedido;
