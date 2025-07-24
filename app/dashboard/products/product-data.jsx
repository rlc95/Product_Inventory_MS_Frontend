"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductTable from "./product-table";

export default function ProductData() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get("http://127.0.0.1:8000/api/products");
      setProducts(resp.data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refinedProduct = products.map((product) => ({
    id: product.id,
    name: product.name,
    desc: product.desc,
    price: product.price,
    quanty: product.quanty,
    category_id: product.category_id,
    category_name: product.category_name,
  }));

  return <ProductTable movies={refinedProduct} onRefresh={fetchProducts} />;
}
