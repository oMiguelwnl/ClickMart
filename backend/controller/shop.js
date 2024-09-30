const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
require("dotenv").config();

router.post(
  "/create-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;

      const sellerEmail = await Shop.findOne({ email });

      if (sellerEmail) {
        return new ErrorHandler("Este email já está cadastrado", 400)();
      }

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
      });

      const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };

      const activationToken = createActivationToken(seller);

      const activationUrl = `${process.env.ACTIVATION_URL}/seller/activation/${activationToken}`;

      try {
        await sendMail({
          email: seller.email,
          subject: "Ative sua Loja",
          message: `Olá ${seller.name}, por favor clique no link para ativar sua loja: ${activationUrl}`,
        });

        res.status(201).json({
          success: true,
          message: `Por favor, verifique seu email: ${seller.email} para ativar sua loja!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "10m",
  });
};

module.exports = router;
