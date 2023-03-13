import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema(
  {
    authorization_code: {
      type: String,
    },
    numero_orden: {
      type: String,
    },
    amount: {
      type: Number,
    },
    buy_order: {
      type: String,
    },
    payment_type_code: {
      type: String,
    },
    session_id: {
      type: String,
    },
    status: {
      type: String,
    },
    transaction_date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Webpay = mongoose.model('Webpay', ordenSchema);
export default Webpay;
