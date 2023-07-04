import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    esAdmin: {
      type: Boolean,
      default: false,
    },
    cargo: {
      type: String,
    },
    direccion: { type: String },
    direccionAlter: { type: String },
    telefono: { type: Number },
    rut: { type: String },
  },
  { timestamps: true }
);

// asi se hashea el password
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
