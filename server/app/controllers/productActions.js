const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const products = await tables.product.readAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const product = await tables.product.read(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { categoryId, title, description, price, stock, image } = req.body;

  if (!categoryId || !title || !price || !stock) {
    return res
      .status(400)
      .json({ error: "Les champs obligatoires sont manquants." });
  }

  try {
    const insertId = await tables.product.create({
      category_id: categoryId,
      title,
      description,
      price,
      stock,
      image: image || "stock_epuise.jpg",
    });
    return res.status(201).json({ insertId });
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  const { categoryId, title, description, price, stock, image } = req.body;
  const productId = req.params.id;

  try {
    const updated = await tables.product.update({
      id: productId,
      category_id: categoryId,
      title,
      description,
      price,
      stock,
      image,
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
    const deleted = await tables.product.delete(req.params.id);
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
