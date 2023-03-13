import Usuario from '../models/Usuario.js';

const UserController = {
  // Todos los usuarios

  async usuarios_todos(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json({
        type: 'Exitoso',
        message: 'Sesión Iniciada con éxito',
        usuarios,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  //buscar usuario unico

  async usuario_unico(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      const { password, ...data } = usuario.doc;
      res.status(200).json({
        type: 'Exitoso',
        message: 'Sesión Iniciada con éxito',
        data,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente desde usuario',
        error,
      });
    }
  },

  //Informacion del usuario

  async datos_usuario(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      const data = await Usuario.aggregate([
        {
          $match: {
            createdAt: { $gte: lastYear },
          },
        },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({
        type: 'Exitoso',
        message: 'Sesión Iniciada con éxito',
        data,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // actualizar usuario

  async actualizar_usuario(req, res) {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
      const usuario_actualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        type: 'Exitoso',
        usuario_actualizado,
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
    }
  },

  // Borrar usuario

  async borrar_usuario(req, res) {
    try {
      await Usuario.findByIdAndDelete(req.params.id);
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
  },
};

export default UserController;
