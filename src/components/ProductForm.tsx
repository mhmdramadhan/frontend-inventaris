import React, { useState } from 'react';
import { createProduct } from '../api/api'; // Adjust the import path as necessary

interface Props {
  onSuccess: () => void;
}

const ProductForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createProduct({ name, sku, quantity, price });
      setMessage('Product created successfully!');
      setName('');
      setSku('');
      setQuantity(0);
      setPrice(0);
      onSuccess();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded mt-6 max-w-md"
    >
      <h2 className="text-lg font-bold mb-4">Add Product</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        required
      />
      <input
        type="number"
        className="border p-2 mb-3 w-full rounded"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <input
        type="number"
        className="border p-2 mb-3 w-full rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Saving...' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
