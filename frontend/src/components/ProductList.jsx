import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import CardSkeleton from "./CardSkeleton";
import ProductCard from "./ProductCard";

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const { fetchData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  let [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchData(setProducts, "product/all");
      setLoading(false);
    };

    fetchProducts();
  }, []);

 
  const filteredProducts = selectedCategory
    ? products.filter((item) => {
        console.log("Item Category:", item.category); 
        const categoryName = item.category?.name.trim().toLowerCase();
        const selectedCategoryName = selectedCategory.name.trim().toLowerCase();

        return categoryName === selectedCategoryName;
    })
    : products;

    const paginatedProducts = filteredProducts.slice(
        page * limit,
        (page + 1) * limit
      );

  useEffect(() => {
    console.log("Filtered Products:", filteredProducts);
    setTotal(filteredProducts.length);

  }, [filteredProducts]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array(6).fill(0).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
            paginatedProducts.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn btn-sm  btn-outline text-base-100 "
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            «
          </button>
          <button className="join-item btn btn-sm btn-outline text-base-100 ">
            Page {page+1}
          </button>
          <button
            className="join-item text-base-100  btn btn-sm btn-outline"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(total / limit) - 1}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
