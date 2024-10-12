const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const category = await tables.category.readAll();
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const category = await tables.category.readWithProduct(
      Number(req.params.id)
    );

    if (category != null) {
      res.status(200).json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { name, parentId } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Le nom de la catégorie est requis." });
  }

  try {
    const insertId = await tables.category.create({
      name,
      parentId: parentId || null,
    });
    return res.status(201).json({ insertId });
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  const { name, parentId } = req.body;
  const categoryId = req.params.id;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Le nom de la catégorie est requis." });
  }

  try {
    const updated = await tables.category.update({
      id: categoryId,
      name,
      parentId: parentId || null,
    });

    if (updated) {
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
};
