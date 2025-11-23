import React from 'react';
import type { Product } from '../types';

interface Props {
  products: Product[];
  token: string | null;                   
  onEdit: (product: Product) => void;     
}

const ProductList: React.FC<Props> = ({ products, token, onEdit}) => {

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.sku}</td>
              <td className="border p-2">{p.quantity}</td>
              <td className="border p-2">{p.price}</td>
              <td className="p-2 border text-center">
                {/* TOMBOL EDIT */}
                {token ? (
                  <button
                    onClick={() => onEdit(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                ) : (
                  <a href="/login" className="text-blue-600 underline">
                    Login untuk Edit
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
