import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/api';
import type { Product } from '../types';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { Plus, Package, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

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

  const handleAddClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Products Dashboard
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Kelola semua produk Anda dengan mudah
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button
                onClick={handleAddClick}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Tambah Produk
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="text-sm text-slate-600 font-medium">Total Produk</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {loading ? '...' : products.length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                <div className="text-sm text-slate-600 font-medium">Status</div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">
                  {loading ? 'Loading...' : 'Active'}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                <div className="text-sm text-slate-600 font-medium">Last Update</div>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {new Date().toLocaleDateString('id-ID')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600 font-medium">Memuat produk...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Belum ada produk</h3>
              <p className="text-slate-500 mb-6">Mulai tambahkan produk pertama Anda</p>
              <button
                onClick={handleAddClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Tambah Produk Pertama
              </button>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
            <ProductForm
              onSuccess={() => {
                setShowForm(false);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;