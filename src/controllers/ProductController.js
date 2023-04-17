import Producto from '../models/Producto.js';

const todosLosProductos = async (req, res) => {
  const { page } = req.query;
  const pageNumber = page || 1;
  const pageSize = 14;
  try {
    const total = await Producto.countDocuments();
    const lista = await Producto.find()
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);
    res
      .status(200)
      .json({ type: 'Exitoso', pageSize, pageNumber, lista, total });
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

const todosLosProductosCompleto = async (req, res) => {
  try {
    const lista = await Producto.find();

    res.status(200).json({ type: 'Exitoso', lista });
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

//buscar un solo producto

const productoSencillo = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({
        type: 'error',
        message: 'Producto no existe',
      });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

// Nuevo producto

const productoNuevo = async (req, res) => {
  const newProduct = new Producto(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      type: 'exito',
      message: 'Producto creado exitosamente',
      savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Producto existente',
      error,
    });
  }
};

// Actualizar Producto

const actualizarProducto = async (req, res) => {
  const existing = await Producto.findById(req.params.id);
  if (!existing) {
    res.status(404).json({
      type: 'error',
      message: 'Producto no existe',
    });
  } else {
    try {
      const updatedProduct = await Producto.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  }
};

// borrar producto

const borrarProducto = async (req, res) => {
  const existing = await Producto.findById(req.params.id);
  if (!existing) {
    res.status(404).json({
      type: 'error',
      message: 'Producto no existe',
    });
  } else {
    try {
      await Producto.findByIdAndDelete(req.params.id);
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
  }
};

export {
  todosLosProductos,
  todosLosProductosCompleto,
  productoSencillo,
  productoNuevo,
  actualizarProducto,
  borrarProducto,
};
