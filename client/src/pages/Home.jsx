import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom"; // Assurez-vous d'importer useLoaderData ici
import axios from "axios";
import "../styles/home.css";

export default function Home() {
  const allProducts = useLoaderData();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [notification, setNotification] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editProductData, setEditProductData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  // Nouveau produit
  const [newProductData, setNewProductData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image_url: "",
  });

  // État pour gérer l'affichage du formulaire d'ajout de produit
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Fonction pour gérer la suppression d'un produit avec confirmation
  const confirmDeleteProduct = (productId) => {
    setProductToDelete(productId);
  };

  // Fonction pour réellement supprimer le produit
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/${productToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productToDelete)
        );
        setNotification({
          type: "success",
          message: "Produit supprimé avec succès",
        });
      } else {
        setNotification({
          type: "error",
          message: "Échec de la suppression du produit",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      setNotification({
        type: "error",
        message: "Une erreur est survenue lors de la suppression",
      });
    } finally {
      setProductToDelete(null);
    }
  };

  // Fonction pour gérer la modification d'un produit
  const confirmEditProduct = (product) => {
    setProductToEdit(product.id);
    setEditProductData({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.category_id || "",
    });
    setSelectedCategory(product.category_id);
  };

  // Fonction pour mettre à jour un produit via la route PUT
  const handleEditProduct = async () => {
    try {
      console.info("Données envoyées pour la modification:", {
        ...editProductData,
        categoryId: editProductData.categoryId || selectedCategory,
      });

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/product/${productToEdit}`,
        {
          title: editProductData.title,
          description: editProductData.description,
          price: parseFloat(editProductData.price),
          stock: parseInt(editProductData.stock, 10),
          categoryId: editProductData.categoryId || selectedCategory,
          image_url: editProductData.image_url || "stock_epuise.jpg",
        }
      );

      console.info("Statut de la réponse:", response.status);
      if (response.status === 204) {
        setFilteredProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productToEdit
              ? { ...product, ...editProductData }
              : product
          )
        );
        setNotification({
          type: "success",
          message: "Produit modifié avec succès",
        });
      } else {
        console.error("Erreur du serveur:", await response.json());
        setNotification({
          type: "error",
          message: "Échec de la modification du produit",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la modification du produit :", error);
      setNotification({
        type: "error",
        message: "Une erreur est survenue lors de la modification",
      });
    } finally {
      setProductToEdit(null);
    }
  };

  // Fonction pour ajouter un nouveau produit
  const handleAddProduct = async () => {
    try {
      console.info("Données envoyées pour l'ajout:", newProductData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product`,
        {
          title: newProductData.title,
          description: newProductData.description,
          price: parseFloat(newProductData.price),
          stock: parseInt(newProductData.stock, 10),
          categoryId: newProductData.categoryId,
          image_url: newProductData.image_url || "stock_epuise.jpg",
        }
      );

      console.info("Statut de la réponse:", response.status);
      if (response.status === 201) {
        setFilteredProducts((prevProducts) => [
          ...prevProducts,
          { ...newProductData, id: response.data.insertId },
        ]);
        setNotification({
          type: "success",
          message: "Produit ajouté avec succès",
        });
      } else {
        console.error("Erreur du serveur:", await response.json());
        setNotification({
          type: "error",
          message: "Échec de l'ajout du produit",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setNotification({
        type: "error",
        message: "Une erreur est survenue lors de l'ajout",
      });
    } finally {
      // Réinitialisez les champs du nouveau produit après ajout
      setNewProductData({
        title: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        image_url: "",
      });
      setShowAddProductModal(false); // Fermer la modale après l'ajout
    }
  };

  // Gérer le changement dans les champs d'édition du produit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer le changement dans les champs du nouveau produit
  const handleNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des catégories :", error)
      );
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category_id === parseInt(selectedCategory, 10)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  return (
    <div>
      <h1>Products</h1>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {productToDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <button onClick={handleDeleteProduct} type="button">
              Confirmer
            </button>
            <button onClick={() => setProductToDelete(null)} type="button">
              Annuler
            </button>
          </div>
        </div>
      )}

      {productToEdit && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modifier le produit</h3>
            <label>
              Titre:
              <input
                type="text"
                name="title"
                value={editProductData.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editProductData.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Prix:
              <input
                type="number"
                name="price"
                value={editProductData.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={editProductData.stock}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Catégorie:
              <select
                name="categoryId"
                value={editProductData.categoryId}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleEditProduct} type="button">
              Confirmer
            </button>
            <button onClick={() => setProductToEdit(null)} type="button">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Formulaire pour ajouter un nouveau produit */}
      {showAddProductModal && ( // Vérifiez si la modale doit être affichée
        <div className="modal">
          <div className="modal-content">
            <h3>Ajouter un nouveau produit</h3>
            <label>
              Titre:
              <input
                type="text"
                name="title"
                value={newProductData.title}
                onChange={handleNewProductInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newProductData.description}
                onChange={handleNewProductInputChange}
              />
            </label>
            <label>
              Prix:
              <input
                type="number"
                name="price"
                value={newProductData.price}
                onChange={handleNewProductInputChange}
              />
            </label>
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={newProductData.stock}
                onChange={handleNewProductInputChange}
              />
            </label>
            <label>
              Catégorie:
              <select
                name="categoryId"
                value={newProductData.categoryId}
                onChange={handleNewProductInputChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={handleAddProduct}
              type="button"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Ajouter un produit
            </button>
            <button onClick={() => setShowAddProductModal(false)} type="button">
              Annuler
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setShowAddProductModal(true)} // Afficher la modale d'ajout
        style={{ backgroundColor: "green", color: "white" }}
        type="button"
      >
        Ajouter un produit
      </button>

      <div className="category-filter">
        <label htmlFor="category">Filtrer par catégorie :</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-grid">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${product.image_url}`}
                  alt={product.title}
                  className="product-image"
                />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> {product.price}€
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
              </Link>
              <button
                className="delete-button"
                onClick={() => confirmDeleteProduct(product.id)}
                type="button"
              >
                Supprimer
              </button>
              <button
                className="edit-button"
                onClick={() => confirmEditProduct(product)}
                type="button"
              >
                Modifier
              </button>
            </div>
          ))
        ) : (
          <p>Aucun produit disponible</p>
        )}
      </div>
    </div>
  );
}
