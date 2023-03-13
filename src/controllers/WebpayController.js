import axios from 'axios';
import Webpay from '../models/Webpay.js';
import Orden from '../models/Orden.js';
import Carrito from '../models/Carrito.js';

let webpay_peticion;
let pagar;
let token_respuesta;
let buy_order = 'O-' + Math.floor(Math.random() * 10000) + 1;
let session_id = 'S-' + Math.floor(Math.random() * 10000) + 1;
let monto;
const webpay = {
  async valorWebpay(req, res) {
    const valor = await Carrito.findById(req.params.id);
    monto = valor.total;

    try {
      if (!valor) {
        res.status(404).json({
          type: 'error',
          message: 'Usuario no existe',
        });
      } else {
        res.status(200).json({
          type: 'Exitoso',
          valor,
        });
      }
    } catch (error) {
      res.status(500).json({
        type: 'error',
        message: 'Algo salió mal, intenta nuevamente',
        error,
      });
      console.log(error);
    }
  },

  async webpay_pagar(req, res) {
    const options = {
      method: 'POST',
      url: process.env.WEBPAY_URL,
      data: {
        buy_order,
        session_id,
        amount: monto,
        return_url: process.env.WEBPAY_RETURN_URL,
      },
      headers: {
        'Tbk-Api-Key-Id': process.env.WEBPAY_ID,
        'Tbk-Api-Key-Secret': process.env.WEBPAY_KEY,
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        webpay_peticion = response.data.token;
        pagar = response.data.url;
        res.status(200).json({ webpay_peticion, pagar });
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  async webpay_respuesta(req, res) {
    const { token_ws } = req.query;
    const options = {
      method: 'PUT',
      url: process.env.WEBPAY_URL,
      data: {},
      headers: {
        'Tbk-Api-Key-Id': process.env.WEBPAY_ID,
        'Tbk-Api-Key-Secret': process.env.WEBPAY_KEY,
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(process.env.WEBPAY_URL + '/' + token_ws, options)
      .then(function (response) {
        token_respuesta = response.data;

        if (token_respuesta.status !== '') {
          const nuevaOrdenWebpay = new Webpay({
            buy_order: token_respuesta.buy_order,
            authorization_code: token_respuesta.authorization_code,
            status: token_respuesta.status,
            transaction_date: token_respuesta.transaction_date,
            session_id: token_respuesta.session_id,
          });
          const ordenGuardada = nuevaOrdenWebpay.save({
            buy_order,
            authorization_code: token_respuesta.authorization_code,
            status: token_respuesta.status,
            transaction_date: token_respuesta.transaction_date,
            session_id: token_respuesta.session_id,
          });
          res.status(200).json(token_respuesta);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  async actualizarWebpay(req, res) {
    const existing = await Orden.findById(req.params.id);
    if (!existing) {
      res.status(404).json({
        type: 'error',
        message: 'Orden no existe',
      });
    } else {
      try {
        const updatedOrdenWebpay = await Orden.findByIdAndUpdate(
          req.params.id,
          {
            statusWebpay: req.body.statusWebpay,
            codigoAutorizacion: req.body.codigoAutorizacion,
            ordenCompra: req.body.ordenCompra,
            idSession: req.body.idSession,
            cuotas: req.body.cuotas,
            fechaPago: req.body.fechaPago,
          },
          { new: true }
        );
        res.status(200).json(updatedOrdenWebpay);
      } catch (error) {
        res.status(500).json({
          type: 'error',
          message: 'Algo salió mal, intenta nuevamente desde webpay',
          error,
        });
      }
    }
  },
};

export default webpay;
