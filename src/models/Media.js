import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    image: String,
  },

  { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
