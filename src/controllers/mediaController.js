import Imagenes from '../models/imagenes.js';
import { v2 as cloudinary } from 'cloudinary';

const mediaController = {
  async index(req, res, next) {
    const { page, limit } = req.query;
    const pageNumber = page || 1;
    const pageSize = limit || 24;

    try {
      const result = await Imagenes.countDocuments();
      const lista = await Imagenes.find()

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
    const { image } = req.body;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_APY_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(image, options);
    const newProduct = new Imagenes({
      image: result.secure_url,
      identificador: result.public_id,
    });
    try {
      const imagenGuardada = await newProduct.save();
      res.status(201).json({
        type: 'exito',
        message: 'Producto creado exitosamente',
        imagenGuardada,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Producto existente',
        error,
      });
    }

    // const { image } = await req.body;
    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_APY_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    //   secure: true,
    // });
    // const result = await cloudinary.uploader.upload(image);
    // const nuevaImagen = new Imagenes({
    //   image: result.secure_url,
    // });
    // try {
    //   const imagenGuardada = await nuevaImagen.save();
    //   res.status(200).json({
    //     type: 'exito',
    //     imagenGuardada,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  },

  // async soloNombre(req, res) {
  //   uploads(req, res, async (err) => {
  //     try {
  //       res
  //         .status(200)
  //         .json({ type: 'exito', message: 'Archivo subido con exito' });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // },

  async borrar(req, res) {
    const dato = req.params.id;
    const existe = await Imagenes.findOne({ identificador: dato });
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_APY_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    if (existe) {
      try {
        const erase = cloudinary.uploader.destroy(dato);
        const borrado = await Imagenes.findOneAndDelete({
          identificador: dato,
        });
        res.status(200).json({
          type: 'exito',
          message: 'Imagen borrada con exito',
          borrado,
        });
      } catch (error) {
        res.status(403).json({
          type: 'error',
          message: 'Hubo error al borrar',
          error,
        });
      }
    } else {
      console.log('imagen no existe');
    }
  },
};

export default mediaController;
