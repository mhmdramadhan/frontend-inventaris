import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../api/api';
import {
  X,
  Package,
  Tag,
  Hash,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { Product } from '../types';

interface Props {
  initialData?: Product | null;
  onSuccess: () => void;
  onClose: () => void;
}

const ProductForm: React.FC<Props> = ({ onSuccess, onClose, initialData }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSku(initialData.sku);
      setQuantity(initialData.quantity);
      setPrice(initialData.price);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (isEditMode) {
        await updateProduct(initialData.id, { name, sku, quantity, price });
      } else {
        await createProduct({ name, sku, quantity, price });
      }
      setMessage({ type: 'success', text: 'Produk berhasil ditambahkan!' });
      setName('');
      setSku('');
      setQuantity(0);
      setPrice(0);

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Gagal menambahkan produk',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Tambah Produk Baru
              </h2>
              <p className="text-blue-100 text-sm mt-0.5">
                Lengkapi informasi produk di bawah ini
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-5">
        {/* Message Alert */}
        {message && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm font-medium ${
                message.type === 'success' ? 'text-emerald-800' : 'text-red-800'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* Name Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Package className="w-4 h-4 text-slate-500" />
            Nama Produk
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
            placeholder="Masukkan nama produk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* SKU Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Tag className="w-4 h-4 text-slate-500" />
            SKU (Kode Produk)
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
            placeholder="Contoh: PRD-001"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Quantity and Price Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Quantity Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Hash className="w-4 h-4 text-slate-500" />
              Jumlah Stok
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <DollarSign className="w-4 h-4 text-slate-500" />
              Harga (Rp)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              disabled={loading}
            />
          </div>
        </div>

        {/* Price Preview */}
        {price > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-medium">
                Total Nilai Stok:
              </span>
              <span className="text-lg font-bold text-slate-900">
                Rp {(price * quantity).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !name || !sku}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Tambah Produk
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
