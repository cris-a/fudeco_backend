import axios from 'axios';

let respuesta;
let inventario;

const bsaleVariantes = {
  async cargarVariante(req, res) {
    const options = {
      method: 'POST',
      url: 'https://api.bsale.io/v1/variants.json',
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

  async todosVariante(req, res) {
    const options = {
      method: 'GET',
      url: 'https://api.bsale.io/v1/variants.json',
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

  async unVariante(req, res) {
    const data = req.body;
    const { id } = data;
    const options = {
      method: 'GET',
      url: id,
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

  async editarVariante(req, res) {
    const dato = req.body;
    const id = dato.name.id;
    const data = dato.name;
    const options = {
      method: 'PUT',
      url: `https://api.bsale.io/v1/variants/${id}.json`,
      data,
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

export default bsaleVariantes;
