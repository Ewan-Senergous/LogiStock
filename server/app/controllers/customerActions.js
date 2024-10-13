const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const customers = await tables.customer.readAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const customer = await tables.customer.read(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { username, fullname, email, password, phoneNumber, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Les champs obligatoires sont manquants." });
  }

  try {
    const insertId = await tables.customer.create({
      username,
      fullname,
      email,
      password,
      phoneNumber,
      role,
    });
    return res.status(201).json({ insertId });
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  const { username, fullname, email, phoneNumber, role } = req.body;
  const customerId = req.params.id;

  try {
    const updated = await tables.customer.update({
      id: customerId,
      username,
      fullname,
      email,
      phoneNumber,
      role,
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
    const deleted = await tables.customer.delete(req.params.id);
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
