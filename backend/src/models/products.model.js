const connection = require('./connection');

const findAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findByIdProducts = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return product;
};

const createProductByName = async (name) => {
  try {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO products (name) VALUES (?);',
      [name],
    );
    return { id: insertId, name };
  } catch (error) {
    console.error('Creating product error: ', error);
    throw error;
  }
};

const updateProducts = async (id, name) => {
  try {
    await connection.execute(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
      [name, id],
    );
    return { id, name };
  } catch (error) {
    console.error('Product error updating: ', error);
    throw error;
  }
};

module.exports = {
  findAllProducts,
  findByIdProducts,
  createProductByName,
  updateProducts,
};