import axios from 'axios';

let inventario;

const bsaleTipoDocumento = {
  async todosDoc(req, res) {
    const options = {
      method: 'GET',
      url: 'https://api.bsale.io/v1/document_types.json?limit=50&offset=0',
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

  async unDoc(req, res) {
    const id = req.params.id;
    const options = {
      method: 'GET',
      url: `https://api.bsale.io/v1/product_types/${id}.json`,
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

export default bsaleTipoDocumento;
