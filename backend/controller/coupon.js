const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Coupon = require("../model/coupon");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponExist = await Coupon.find({
        name: req.body.name,
      });

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

router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await Coupon.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await Coupon.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Cupom não existe!", 404));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
