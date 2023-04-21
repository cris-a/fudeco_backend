import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    nombreImagen: {
      type: String,
      unique: true,
    },
    path: {
      type: String,
    },
  },

  { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
