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
  const { categoryId, title, description, price, stock, filename } = req.body;

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
      image_url: filename || "stock_epuise.jpg",
    });
    return res.status(201).json({ insertId });
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  const { categoryId, title, description, price, stock, filename } = req.body; // Assurez-vous que categoryId est bien pris ici
  const productId = req.params.id;

  // Vérification que tous les champs obligatoires sont présents
  if (!categoryId || !title || !description || !price || !stock) {
    return res
      .status(400)
      .json({ error: "Les champs obligatoires sont manquants." });
  }

  try {
    const existingProduct = await tables.product.read(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    // Mise à jour du produit avec les nouvelles valeurs
    const updated = await tables.product.update({
      id: productId,
      category_id: categoryId, // Assurez-vous que category_id est bien défini
      title,
      description,
      price,
      stock,
      image_url: filename || existingProduct.image_url || "stock_epuise.jpg", // Gérer l'image
    });

    if (updated) {
      return res.sendStatus(204); // Succès sans contenu
    }
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du produit." });
  } catch (err) {
    return next(err); // Gestion des erreurs
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
