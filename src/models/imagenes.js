import mongoose from 'mongoose';

const imagenesSchema = new mongoose.Schema(
  {
    nombreImagen: {
      type: String,
      unique: true,
    },
  },

  { timestamps: true }
);

const Imagenes = mongoose.model('Imagenes', imagenesSchema);

export default Imagenes;
