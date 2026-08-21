'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockMenuItems, type MenuItem } from '@/data/mockData';

export default function SearchBar() {
  const [busca, setBusca] = useState('');

  const itensFiltrados = mockMenuItems.filter((item) => {
    const textoBusca = busca.toLowerCase();
    return (
      item.name.toLowerCase().includes(textoBusca) || 
      item.category.toLowerCase().includes(textoBusca)
    );
  });

  return (
    <div className="w-full max-w-xl mx-auto relative z-50">
      <input
        type="text"
        placeholder="Pesquisar por prato ou categoria..."
        onChange={(e) => setBusca(e.target.value)}
        value={busca}
        className="w-full p-4 rounded-lg bg-white border border-verde shadow-sm focus:outline-none focus:ring-2 focus:ring-cafe transition-all text-cafe"
      />

      {busca.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {itensFiltrados.length > 0 ? (
            itensFiltrados.map((item: MenuItem) => (
              <Link 
                href={`/prato/${item.id}`}
                key={item.id}
                onClick={() => setBusca('')} 
                className="block p-4 border-b border-gray-100 hover:bg-[#F7F5F0] cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left flex flex-col items-start">
                    <div className="font-bold text-cafe">{item.name}</div>
                    <div className="text-xs text-dourado font-semibold mt-0.5">{item.category}</div>
                  </div>
                  <div className="text-sm font-semibold text-cafe whitespace-nowrap">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-cafe text-center">
              Nenhum prato encontrado para "{busca}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}