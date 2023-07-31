import axios from 'axios';

let inventario;

const bsaleClientes = {
  async todosCliente(req, res) {
    const options = {
      method: 'GET',
      url: 'https://api.bsale.io/v1/clients.json',
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

  async unCliente(req, res) {
    const id = req.params.id;
    const options = {
      method: 'GET',
      url: `https://api.bsale.io/v1/clients/${id}.json`,
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

export default bsaleClientes;
