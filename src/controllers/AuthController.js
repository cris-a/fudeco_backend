import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';

const create_user = async (req, res) => {
  const existeUsuario = await Usuario.findOne({ email: req.body.email });
  const newUser = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  if (existeUsuario) {
    res.status(400).json({
      type: 'error',
      message: 'Usuario ya registrado',
    });
  }
  try {
    const usuario = await newUser.save();
    usuario.token = generarId();

    // enviar email de registro

    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.status(201).json({
      type: 'exito',
      message:
        'Usuario creado exitosamente, revisa tu email para confirmar cuenta',
      usuario,
    });
  } catch (error) {
    console.log(error);
  }
};

// confirmar usuario

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error('Token no válido');
    return res.status(403).json({ message: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = '';
    await usuarioConfirmar.save();
    res.json({ msg: 'Usuario Confirmado' });
  } catch (error) {
    console.log(error);
  }
};

// olvide password

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ message: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    // enviar el email
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    res.json({ msg: 'Se ha enviado un correo con las instrucciones' });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: 'Token valido, usuario existe' });
  } else {
    const error = new Error('Token no válido');
    return res.status(404).json({ message: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = '';
    try {
      await usuario.save();
      res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Token no válido');
    return res.status(404).json({ message: error.message });
  }
};

// Loggear usuario existente
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ message: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ message: error.message });
  }

  //Comprobar password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      //Json web token
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({ message: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

export {
  create_user,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
