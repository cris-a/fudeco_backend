import Producto from '../models/Producto.js';

//Busqueda de productos por nombre

const productoSencillo = async (req, res) => {
  let q = req.query.q;
  try {
    const producto = await Producto.find(
      {
        nombre: {
          $regex: new RegExp(q),
          $options: 'i',
        },
      },
      {
        _id: 1,
        nombre: 1,
        imagen: 1,
        precio: 1,
        variantId: 1,
      }
    );
    res.status(200).json({
      producto,
    });
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

export { productoSencillo };
