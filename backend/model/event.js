const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, insira o nome do evento!"],
  },
  description: {
    type: String,
    required: [true, "Por favor, insira a descrição do evento!"],
  },
  category: {
    type: String,
    required: [true, "Por favor, insira a categoria do evento!"],
  },
  start_Date: {
    type: Date,
    required: true,
  },
  finish_Date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Em Andamento",
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Por favor, insira o preço de desconto!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your event product stock!"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
