import Orden from '../models/Orden.js';
import WebpayPlus from 'transbank-sdk';

const OrdenController = {
  //Todas las ordenes(administrador)
  async todas_ordenes(req, res) {
    const { page, perPage } = req.query;

    const pageNumber = page || 1;
    const pageSize = perPage || 10;

    try {
      const total = await Orden.countDocuments();
      const ordenes = await Orden.find()
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

  // Obtener ingresos mensuales (modo administrador)

  async obtener_ingresos(req, res) {
    const date = new Date();
    const lastMonth = new Date(
      date.setMonth().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const ingreso = await Orden.aggregate([
        {
          $match: {
            createdAt: {
              $gte: previousMonth,
            },
          },
        },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ]);
      res.status(200).json({
        type: 'Exitoso',
        ingreso,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // obtener las ordenes del usuario

  async obtener_orden(req, res) {
    try {
      const ordenes = await Orden.findById(req.params.id);
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
    const nuevaOrden = new Orden(req.body);
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
      const updatedOrden = await Orden.findByIdAndUpdate(
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

  async borrar_orden(req, res) {
    try {
      await Orden.findOneAndDelete(req.params.id);
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

  async pagoEstatus(req, res, next) {
    const { token } = req.params;

    try {
      const resultado = await new WebpayPlus.Transaction().status(token);
      console.log('pago efectuado', resultado);
      return res.status(200).json({ message: 'check', resultado });
    } catch (error) {
      return next(
        res.status(500).json({
          type: 'error',
          message: 'Algo salió mal, intenta nuevamente desde pagoEstatus',
          error,
        })
      );
    }
  },
};

export default OrdenController;
