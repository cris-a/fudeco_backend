import axios from 'axios';

let inventario;

const bsaleSucursal = {
  async todosSucursal(req, res) {
    const options = {
      method: 'GET',
      url: 'https://api.bsale.io/v1/offices.json',
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

  async unSucursal(req, res) {
    const id = req.params.id;
    const options = {
      method: 'GET',
      url: `https://api.bsale.io/v1/offices/${id}.json`,
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

export default bsaleSucursal;
