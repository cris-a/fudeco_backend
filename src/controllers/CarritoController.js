import Carrito from '../models/Carrito.js';

const CarritoController = {
  // Todos los carritos

  async todos_carritos(req, res) {
    try {
      const carritos = await Carrito.find();
      res.status(200).json({
        type: 'Exitoso',
        carritos,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  //Obtener usuario del carrito

  async unico_carrito(req, res) {
    const carrito = await Carrito.findById(req.params.id);
    try {
      if (!carrito) {
        res.status(404).json({
          type: 'error',
          message: 'Usuario no existe',
        });
      } else {
        res.status(200).json({
          type: 'Exitoso',
          carrito,
        });
      }
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // Añadir producto al carrito

  async crear_carrito(req, res) {
    const nuevoCarrito = new Carrito({
      total: req.body.total,
      cantidad: req.body.cantidad,
      usuarioId: req.body.identificador,
    });
    try {
      const savedCarrito = await nuevoCarrito.save();
      res.status(201).json(savedCarrito);
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // actualizar carrito

  async actualizar_carrito(req, res) {
    try {
      const updatedCarrito = await Carrito.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        type: 'Exitoso',
        updatedCarrito,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // eliminar carrito

  async borrar_carrito(req, res) {
    try {
      await Carrito.findByIdAndDelete(req.params.id);
      res.status(200).json({
        type: 'Exitoso',
        message: 'Producto borrado exitosamente',
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },
};

export default CarritoController;
