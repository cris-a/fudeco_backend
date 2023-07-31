import axios from 'axios';

let respuesta;
let inventario;

const bsaleFacturacion = {
  async cargarFactura(req, res) {
    const options = {
      method: 'POST',
      url: 'https://api.bsale.io/v1/documents.json',
      data: req.body,
      headers: {
        access_token: process.env.BSALE_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        respuesta = response.data;
        res.status(201).json(respuesta);
      })
      .catch(function (error) {
        res.status(400).json({
          type: 'error',
          message: error.response.data.error,
          error,
        });
      });
  },

  async todosFactura(req, res) {
    const options = {
      method: 'GET',
      url: 'https://api.bsale.io/v1/documents.json',
      headers: {
        access_token: process.env.BSALE_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        inventario = response.data;
        res.status(200).json(inventario);
      })
      .catch(function (error) {
        res.status(400).json({
          type: 'error',
          message: error.response.data.error,
          error,
        });
      });
  },

  async unFactura(req, res) {
    const id = req.params.id;
    const options = {
      method: 'GET',
      url: `https://api.bsale.io/v1/documents/${id}.json`,
      headers: {
        access_token: process.env.BSALE_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        inventario = response.data;
        res.status(200).json(inventario);
      })
      .catch(function (error) {
        res.status(400).json({
          type: 'error',
          message: error.response.data.error,
          error,
        });
      });
  },
};

export default bsaleFacturacion;
