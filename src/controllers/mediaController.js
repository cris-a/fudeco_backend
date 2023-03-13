import Media from '../models/Media.js';
import upload from '../middleware/multerMedia.js';

const mediaController = {
  async index(req, res, next) {
    try {
      const result = await Media.find();
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },

  async store(req, res) {
    upload(req, res, async (err) => {
      const body = req.body;

      try {
        const storedGallery = await Media.create(body);
        storedGallery.save();

        res.status(200).json({ msg: 'guardado con exito' });
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    });
  },

  async destroy(req, res, next) {
    try {
      await Media.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: 'Producto Eliminado',
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente desde producto',
        error,
      });
    }
  },

  async unaImagen(req, res) {
    try {
      const resultado = await Media.findById(req.params.id);

      res.status(200).json(resultado.image);
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente desde producto',
        error,
      });
    }
  },
};

export default mediaController;
