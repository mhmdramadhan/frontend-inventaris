import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import type { Product } from '../types';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      
      setProducts(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <ProductList products={products} />}
      {localStorage.getItem('token') && (
        <ProductForm onSuccess={fetchProducts} />
      )}
    </div>
  );
};

export default Dashboard;
