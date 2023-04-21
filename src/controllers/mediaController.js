import Media from '../models/Media.js';
import Imagenes from '../models/imagenes.js';
import uploads from '../middleware/multerMedia.js';
import multer from 'multer';
import { unlink } from 'node:fs';

const mediaController = {
  async index(req, res, next) {
    const { page, limit } = req.query;
    const pageNumber = page || 1;
    const pageSize = limit || 10;
    try {
      const result = await Media.countDocuments();
      const lista = await Media.find()
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize);
      res.status(200).json({ pageSize, pageNumber, lista, result });
    } catch (error) {
      return next(error);
    }
  },

  // async store(req, res) {
  //   upload(req, res, async (err) => {
  //     const body = req.body;

  //     try {
  //       const storedGallery = await Media.create(body);
  //       storedGallery.save();

  //       res.status(200).json({ msg: 'guardado con exito' });
  //     } catch (error) {
  //       res.status(409).json({ message: error.message });
  //     }
  //   });
  // },

  // async destroy(req, res, next) {
  //   try {
  //     await Media.findByIdAndDelete(req.params.id);
  //     res.status(200).json({
  //       msg: 'Producto Eliminado',
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       type: 'error',
  //       message: 'Algo salió mal, intenta nuevamente desde producto',
  //       error,
  //     });
  //   }
  // },

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

  async soloNombre(req, res) {
    uploads(req, res, async (err) => {
      try {
        res
          .status(200)
          .json({ type: 'exito', message: 'Archivo subido con exito' });
      } catch (error) {
        console.log(error);
      }
    });
  },

  async borrar(req, res) {
    let path = req.params;

    if (path) {
      unlink(
        `../../Test/frontend/public/data/${path.nombreImagen}`,
        async (err) => {
          if (err) {
            res.status(401).json({ type: 'error', message: 'Error de Fs' });
          } else {
            res
              .status(200)
              .json({ type: 'exito', message: 'Imagen Borrada Exitosamenet' });
            // await Media.findByIdAndDelete(req.params.id);
          }
        }
      );
    }
  },
};

export default mediaController;
