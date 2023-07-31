import axios from 'axios';

let respuesta;
let inventario;

const bsaleStock = {
  async cargarStock(req, res) {
    const options = {
      method: 'POST',
      url: 'https://api.bsale.io/v1/stocks/receptions.json',
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

  async actualizarStock(req, res) {
    const dato = req.body;
    const { id, name } = dato;
    const data = name;
    const options = {
      method: 'PUT',
      url: id,
      data,
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

  async todosStock(req, res) {
    const options = {
      method: 'GET',
      url: 'https://api.bsale.io/v1/stocks.json',
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

  async unStock(req, res) {
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

  async cantidadStock(req, res) {
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

  async unStockTotal(req, res) {
    const data = req.body;
    const { officeid, varianteid } = data;
    const options = {
      method: 'GET',
      url: `https://api.bsale.io/v1/stocks.json?variantid=${varianteid}&officeid=${officeid}`,
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

  async descontarStock(req, res) {
    const data = req.body;
    const options = {
      method: 'POST',
      url: 'https://api.bsale.io/v1/stocks/consumptions.json',
      data,
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
};

export default bsaleStock;
