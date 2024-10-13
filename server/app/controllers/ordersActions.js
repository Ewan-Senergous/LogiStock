const tables = require("../../database/tables");

const formatDateForMySQL = (date) =>
  new Date(date).toISOString().slice(0, 19).replace("T", " ");

const browse = async (req, res, next) => {
  try {
    const orders = await tables.orders.readAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const order = await tables.orders.read(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { customerId, paymentId, deliveryId, totalPrice, purchaseDate } =
    req.body;

  if (!customerId || !paymentId || !deliveryId || !totalPrice) {
    return res
      .status(400)
      .json({ error: "Les champs obligatoires sont manquants." });
  }

  try {
    const formattedDate = purchaseDate
      ? formatDateForMySQL(purchaseDate)
      : new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertId = await tables.orders.create({
      customer_id: customerId,
      payment_id: paymentId,
      delivery_id: deliveryId,
      total_price: totalPrice,
      purchase_date: formattedDate,
    });

    return res.status(201).json({ insertId });
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  const { customerId, totalPrice, purchaseDate } = req.body;
  const orderId = req.params.id;

  try {
    const updated = await tables.orders.update({
      id: orderId,
      customer_id: customerId,
      total_price: totalPrice,
      purchase_date: purchaseDate,
    });

    if (updated) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await tables.orders.delete(req.params.id);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  remove,
};
