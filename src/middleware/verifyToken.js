import jwt from 'jsonwebtoken';

// Verificacion Token JWT

const authenticationVerifier = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split('')[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, usuario) => {
      if (error) res.status(401).json('Token invalido');
      req.usuario = usuario;
      next;
    });
  } else {
    return res.status(401).json('No estás autenticado');
  }
};

// chequear si es usuario

const accessLevelVerifier = (req, res, next) => {
  authenticationVerifier(req, res, () => {
    if (req.usuario.id === req.params.id || req.usuario.esAdmin) {
      next();
    } else {
      res.status(403).json('No tienes permiso para realizar esta acción');
    }
  });
};

// Verificacion de nivel de usuario

const isAdminVerifier = (req, res, next) => {
  authenticationVerifier =
    (req,
    res,
    () => {
      if (req.usuario.esAdmin) {
        next();
      } else {
        res.status(403).json('No tienes permiso para realizar esta acción');
      }
    });
};

export { authenticationVerifier, accessLevelVerifier, isAdminVerifier };
