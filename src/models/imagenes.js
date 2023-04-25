import mongoose from 'mongoose';

const imagenesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    identificador: {
      type: String,
    },
  },

  { timestamps: true }
);

const Imagenes = mongoose.model('Imagenes', imagenesSchema);

export default Imagenes;
