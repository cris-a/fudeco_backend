import Newsletter from '../models/Newsletter.js';

// Crear

const emailNuevo = async (req, res) => {
  const nuevoEmail = new Newsletter({ email: req.body.email });

  try {
    const emailGuardado = await nuevoEmail.save();
    res.status(201).json({
      type: 'exito',
      message: 'Email guardado exitosamente',
      emailGuardado,
    });
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Hubo un error',
      error,
    });
  }
};

// Buscar todos

const todosLosemail = async (req, res) => {
  const emailNuevo = req.query.new;
  const { page, limit } = req.query;
  const pageNumber = page || 1;
  const pageSize = limit || 5;

  try {
    let email;
    if (emailNuevo) {
      clientes = await Newsletter.find()
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1));
    } else {
      email = await Newsletter.find();
    }
    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

// buscar un solo email

const emailUnico = async (req, res) => {
  try {
    const email = await Newsletter.findById(req.params.id);
    if (!email) {
      res.status(404).json({
        type: 'error',
        message: 'Correo no existe',
      });
    } else {
      res.status(200).json(email);
    }
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal desde cliente, intenta nuevamente',
      error,
    });
  }
};

// editar correo

const editarEmail = async (req, res) => {
  const existe = await Newsletter.findById(req.params.id);
  if (!existe) {
    res.status(404).json({
      type: 'error',
      message: 'Correo no existe',
    });
  } else {
    try {
      const actualizar = await Newsletter.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(actualizar);
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente desde cliente',
        error,
      });
    }
  }
};

// borrar email

const borrarEmail = async (req, res) => {
  const existe = await Newsletter.findById(req.params.id);
  if (!existe) {
    res.status(404).json({
      type: 'error',
      message: 'Correo no existe',
    });
  } else {
    try {
      await Newsletter.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: 'Correo Eliminado',
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente desde newsletter',
        error,
      });
    }
  }
};

export { emailNuevo, todosLosemail, emailUnico, editarEmail, borrarEmail };
