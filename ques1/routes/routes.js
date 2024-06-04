import express from "express";
import {
  fetchProducts,
  generateProductId,
  API_ENDPOINTS,
} from "../utils/utils.js";

const router = express.Router();

router.get("/categories/:category/products", async (req, res) => {
  const { category } = req.params;
  const {
    n = 10,
    page = 1,
    company,
    minPrice,
    maxPrice,
    minRating,
  } = req.query;

  try {
    const productsPromises = Object.keys(API_ENDPOINTS).map(
      async (companyKey) => {
        const companyProducts = await fetchProducts(companyKey, category);
        return companyProducts.map((product) => ({
          id: generateProductId(companyKey, product),
          name: product.name,
          price: product.price,
          rating: product.rating,
          company: companyKey,
        }));
      }
    );

    const allProducts = (await Promise.all(productsPromises)).flat();

    let filteredProducts = allProducts.filter((product) => {
      if (company && product.company !== company) return false;
      if (minPrice && product.price < minPrice) return false;
      if (maxPrice && product.price > maxPrice) return false;
      if (minRating && product.rating < minRating) return false;
      return true;
    });

    const startIndex = (page - 1) * n;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + parseInt(n)
    );

    res.json(paginatedProducts);
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
