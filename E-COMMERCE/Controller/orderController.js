const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    let total = 0;

    for (const item of products) {
      const product =
        await Product.findById(
          item.product
        );

      total +=
        product.price *
        item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount: total
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};