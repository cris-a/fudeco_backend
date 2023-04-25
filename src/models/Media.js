import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    imagen: {
      type: String,
    },
    nombre: {
      type: String,
    },
  },

  { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
