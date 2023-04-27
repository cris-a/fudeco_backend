import SubCategoria from '../models/SubCategoria.js';

const nuevaSubCategoria = async (req, res) => {
  const nuevaCategoria = new SubCategoria(req.body);

  try {
    const savedSubCategoria = await nuevaCategoria.save();
    res.status(200).json({
      msg: 'Sub Categoría creada exitosamente',
      savedSubCategoria,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const mostrarSubCategorias = async (req, res) => {
  try {
    const subCategorias = await SubCategoria.find({
      categoria_id: req.params.id,
    });
    res.status(200).json(subCategorias);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const unasubCategoria = async (req, res) => {
  try {
    const subCategorias = await SubCategoria.findOne({
      _id: req.params.id,
    });
    res.status(200).json(subCategorias);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const actualizarSubCategoria = async (req, res) => {
  const buscarSubcat = await SubCategoria.findById(req.params.id);
  if (!buscarSubcat) {
    res.status(400).json({ message: 'SubCategoría no existe' });
  } else {
    try {
      const actualizar = await SubCategoria.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        message: 'Categoría modificada exitosamente',
        actualizar,
      });
    } catch (error) {
      res.status(401).json({
        type: error,
        message: error.message,
      });
    }
  }
};

const borrarSubcategoria = async (req, res) => {
  const buscarSubcat = await SubCategoria.findById(req.params.id);
  if (!buscarSubcat) {
    res.status(400).json({ message: 'SubCategoría no existe', type: error });
  } else {
    try {
      await SubCategoria.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: 'SubCategoria borrada exitosamente' });
    } catch (error) {
      res.status(401).json({
        type: error,
        message: error.message,
      });
    }
  }
};

const todasSubCategorias = async (req, res) => {
  // const { page } = req.query;
  // const pageNumber = page || 1;
  // const pageSize = 14;
  try {
    // const total = await SubCategoria.countDocuments();
    const lista = await SubCategoria.find();
    // .skip(pageSize * (pageNumber - 1))
    // .limit(pageSize);
    res.status(200).json({ type: 'Exitoso', lista });
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

export {
  nuevaSubCategoria,
  mostrarSubCategorias,
  borrarSubcategoria,
  actualizarSubCategoria,
  todasSubCategorias,
  unasubCategoria,
};
