import Categoria from '../models/Categoria.js';

const CategoriaController = {
  //Todas las categorias

  async todas_categorias(req, res) {
    try {
      const categorias = await Categoria.find();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // usa sola categoria

  async unica_categoria(req, res) {
    const categoria = await Categoria.findById(req.params.id);
    try {
      if (!categoria) {
        res.status(404).json({
          type: 'error',
          message: 'Categoría no existe',
        });
      } else {
        res.status(200).json(categoria);
      }
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // Nueva Categoria

  async nueva_categoria(req, res) {
    const newCategoria = new Categoria(req.body);
    try {
      const savedCategoria = await newCategoria.save();
      res.status(201).json({
        type: 'exito',
        message: 'Categoría creada exitosamente',
        savedCategoria,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // Actualizar categoria

  async actualizar_categoria(req, res) {
    const existing = await Categoria.findById(req.params.id);
    if (!existing) {
      res.status(404).json({
        type: 'error',
        message: 'Categoría no existe',
      });
    } else {
      try {
        const updateCategoria = await Categoria.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateCategoria);
      } catch (error) {
        res.status(500).json({
          type: 'error',
          message: 'Algo salió mal, intenta nuevamente desde put',
          error,
        });
      }
    }
  },

  // Borrar categoria

  async borrar_categoria(req, res) {
    const existing = await Categoria.findById(req.params.id);
    if (!existing) {
      res.status(404).json({
        type: 'error',
        message: 'Categoría no existe',
      });
    } else {
      try {
        await Categoria.findByIdAndDelete(req.params.id);
        res.status(200).json({
          type: 'Exitoso',
        });
      } catch (error) {
        res.status(500).json({
          type: 'error',
          message: 'Algo salió mal, intenta nuevamente',
          error,
        });
      }
    }
  },
};

export default CategoriaController;
