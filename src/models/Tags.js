import mongoose from 'mongoose';

const tagSchema = new Schema(
  {
    titulo: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      set: (v) => v.toLowerCase().replace(/\W+/g, '-'),
    },
    descripcion: { type: String },
    estatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tags = mongoose.model('Tags', tagSchema);
export default Tags;
