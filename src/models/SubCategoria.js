import mongoose from 'mongoose';

const subCategoriaSchema = mongoose.Schema({
  categoria_id: {
    type: String,
  },
  subCategoria: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true,
    set: (v) => v.toLowerCase().replace(/\W+/g, '-'),
  },
  imagen: {
    type: String,
  },
});

const SubCategoria = mongoose.model('SubCategoria', subCategoriaSchema);
export default SubCategoria;
