import Cliente from '../models/Clientes.js';
import bcrypt from 'bcrypt';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import {
  emailRegistroCliente,
  emailOlvidePasswordCliente,
} from '../helpers/emails.js';

// ingresar cliente nuevo

const clienteNuevo = async (req, res) => {
  const existeCliente = await Cliente.findOne({ email: req.body.email });
  const nuevoCliente = new Cliente({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    rut: req.body.rut,
    telefono: req.body.telefono,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  if (existeCliente) {
    res.status(400).json({
      type: 'error',
      message: 'Usuario ya registrado',
    });
  }
  try {
    const usuario = await nuevoCliente.save();
    usuario.token = generarId();

    emailRegistroCliente({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.status(201).json({
      type: 'exito',
      message:
        'Usuario creado exitosamente, revisa tu correo para confirmar la cuenta',
      usuario,
    });
  } catch (error) {
    console.log(error);
  }
};

// Confirmar Cliente

const confirmar = async (req, res) => {
  const { token } = req.params;
  const clienteConfirmar = await Cliente.findOne({ token });
  if (!clienteConfirmar) {
    const error = new Error('Token no válido');
    return res.status(403).json({ message: error.message });
  }
  try {
    clienteConfirmar.confirmado = true;
    clienteConfirmar.token = '';
    await clienteConfirmar.save();
    res.json({ msg: 'Cliente Confirmado' });
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Error, revisa los datos nuevamente' });
  }
};

// Olvide password

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const cliente = await Cliente.findOne({ email });
  if (!cliente) {
    const error = new Error('El cliente no existe');
    return res.status(404).json({ message: error.message });
  }

  try {
    cliente.token = generarId();
    await cliente.save();
    // enviar el email
    emailOlvidePasswordCliente({
      email: cliente.email,
      nombre: cliente.nombre,
      token: cliente.token,
    });
    res.json({ msg: 'Se ha enviado un correo con las instrucciones' });
  } catch (error) {
    res
      .status(403)
      .json({ msg: 'Cliente no existe, revisa el correo nuevamente' });
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Cliente.findOne({ token });

  if (tokenValido) {
    res.json({ msg: 'Token valido, cliente existe' });
  } else {
    const error = new Error('Token no válido');
    return res.status(404).json({ message: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const cliente = await Cliente.findOne({ token });

  if (cliente) {
    cliente.password = password;
    cliente.token = '';
    try {
      await cliente.save();
      res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Token no válido');
    return res.status(404).json({ message: error.message });
  }
};

// Autenticar o Loggear

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const cliente = await Cliente.findOne({ email });
  if (!cliente) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ message: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!cliente.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ message: error.message });
  }

  //Comprobar password
  if (await cliente.comprobarPassword(password)) {
    res.json({
      _id: cliente._id,
      nombre: cliente.nombre,
      email: cliente.email,
      //Json web token
      token: generarJWT(cliente._id),
    });
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({ message: error.message });
  }
};

// Perfil

const perfil = async (req, res) => {
  const { cliente } = req;
  res.json(cliente);
};
// Buscar todos los clientes

const todosLosClientes = async (req, res) => {
  const clienteNuevo = req.query.new;
  const { page, limit } = req.query;
  const pageNumber = page || 1;
  const pageSize = limit || 5;

  try {
    let clientes;
    if (clienteNuevo) {
      clientes = await Cliente.find()
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1));
    } else {
      clientes = await Cliente.find();
    }
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente',
      error,
    });
  }
};

// editar cliente

const editarCliente = async (req, res) => {
  const existe = await Cliente.findById(req.params.id);
  if (!existe) {
    res.status(404).json({
      type: 'error',
      message: 'Cliente no existe',
    });
  } else {
    try {
      const actualizar = await Cliente.findByIdAndUpdate(
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

// Borrar Cliente

const borrarCliente = async (req, res) => {
  const existe = await Cliente.findById(req.params.id);
  if (!existe) {
    res.status(404).json({
      type: 'error',
      message: 'Cliente no existe',
    });
  } else {
    try {
      await Cliente.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: 'Cliente Eliminado',
      });
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente desde cliente',
        error,
      });
    }
  }
};

const clienteSencillo = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      res.status(404).json({
        type: 'error',
        message: 'Cliente no existe',
      });
    } else {
      res.status(200).json(cliente);
    }
  } catch (error) {
    res.status(500).json({
      type: 'error',
      message: 'Algo salió mal, intenta nuevamente desde ClienteSencillo',
      error,
    });
  }
};

export {
  todosLosClientes,
  confirmar,
  clienteNuevo,
  editarCliente,
  borrarCliente,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  autenticar,
  perfil,
  clienteSencillo,
};
