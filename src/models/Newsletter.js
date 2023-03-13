import mongoose from 'mongoose';

const newsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },

  { timestamps: true }
);

const Newsletter = mongoose.model('Newsletter', newsLetterSchema);
export default Newsletter;
