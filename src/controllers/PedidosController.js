import Pedido from '../models/Pedidos.js';

const PedidoController = {
  //Todas las ordenes(administrador)
  async todas_ordenes(req, res) {
    const { page, perPage } = req.query;

    const pageNumber = page || 1;
    const pageSize = perPage || 10;

    try {
      const total = await Pedido.countDocuments();
      const ordenes = await Pedido.find()
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize);
      res.status(200).json({
        type: 'Exitoso',
        pageNumber,
        pageSize,
        ordenes,
        total,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  async obtener_orden(req, res) {
    try {
      const ordenes = await Pedido.findById(req.params.id);
      if (!ordenes) {
        res.status(404).json({
          type: 'error',
          message: 'Usuario no existe',
        });
      } else {
        res.status(200).json(ordenes);
      }
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // añadir orden

  async agregar_orden(req, res) {
    const nuevaOrden = new Pedido(req.body);
    try {
      const savedOrden = await nuevaOrden.save();
      res.status(201).json({
        type: 'Exitoso',
        message: 'Orden creada exitosamente',
        savedOrden,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // actualizar orden
  async actualizar_orden(req, res) {
    try {
      const updatedOrden = await Pedido.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        type: 'Exitoso',
        updatedOrden,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // borrar orden

  async borrar_pedido(req, res) {
    try {
      await Pedido.findOneAndDelete(req.params._id);
      res.status(200).json({
        type: 'Exitoso',
        message: 'Orden borrada exitosamente',
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

export default PedidoController;
