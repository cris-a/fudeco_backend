import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    productos: [],
    monto: {
      type: Number,
      required: true,
    },

    costo_envio: { type: Number, default: 0 },
    direccion: { type: String, require: true },
    telefono: { type: Number, require: true },
    metodo_pago: {
      type: String,
      required: true,
    },
    pago_token: {
      type: String,
      required: false,
    },
    nota: { type: String },

    statusWebpay: { type: String },
    codigoAutorizacion: { type: String },
    ordenCompra: { type: String },
    idSession: { type: String },
    cuotas: { type: Number },
    fechaPago: { type: String },
    estado: { type: String, default: 'Nueva Orden' },
  },
  { timestamps: true }
);

const Orden = mongoose.model('Orden', ordenSchema);
export default Orden;
