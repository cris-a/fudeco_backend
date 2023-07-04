import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './database.js';
import multer from 'multer';
import {
  auth_route,
  carrito_route,
  categoria_route,
  orden_route,
  producto_route,
  usuario_route,
  media_route,
  cliente_route,
  newsletter_route,
  webpay_route,
  subCategoria_router,
  cloudinary_router,
  busqueda_router,
  pedido_router,
} from './routes/index.js';

const app = express();
app.use('/', express.json({ limit: '5mb' }));

dotenv.config();
conectarDB();

const whitelist = [process.env.FONTEND_URL, process.env.WEBPAY_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      //No puede acceder

      callback(new Error('Error de CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.set('port', process.env.PORT || 3000);

app.use('/api/v1/auth', auth_route);
app.use('/api/v1/carrito', carrito_route);
app.use('/api/v1/categoria', categoria_route);
app.use('/api/v1/orden', orden_route);
app.use('/api/v1/producto', producto_route);
app.use('/api/v1/usuario', usuario_route);
app.use('/api/v1/upload', media_route);
app.use('/api/v1/clientes', cliente_route);
app.use('/api/v1/newsletter', newsletter_route);
app.use('/api/v1/portal-pago', webpay_route);
app.use('/api/v1/subcategoria', subCategoria_router);
app.use('/api/v1/cloudinary', cloudinary_router);
app.use('/api/v1/busqueda', busqueda_router);
app.use('/api/v1/pedido', pedido_router);

const servidor = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')} `);
});
