const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Coupon = require("../model/coupon");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/create-coupon-code",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponExist = await Coupon.findOne({ name: req.body.name });

      if (isCouponExist.length !== 0) {
        return next(new ErrorHandler("Código de cupom já existe!", 400));
      }

      const couponCode = await Coupon.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
