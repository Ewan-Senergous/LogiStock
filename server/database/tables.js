// Import the repository modules responsible for handling data operations on the tables
const ItemRepository = require("./models/ItemRepository");
const CategoryRepository = require("./models/CategoryRepository");
const CustomerRepository = require("./models/CustomerRepository");
const ProducRepository = require("./models/ProductRepository");
const OrdersRepository = require("./models/OrdersRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.item = new ItemRepository();
tables.category = new CategoryRepository();
tables.customer = new CustomerRepository();
tables.product = new ProducRepository();
tables.orders = new OrdersRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
