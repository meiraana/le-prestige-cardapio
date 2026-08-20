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
        className="w-full p-4 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      />

      
      {busca.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          
          {itensFiltrados.length > 0 ? (
            itensFiltrados.map((item: MenuItem) => (
              <Link 
                href={`/prato/${item.id}`}
                key={item.id}
                // TRUQUE DE MESTRE: Zera a busca ao clicar, para fechar o dropdown na tela nova!
                onClick={() => setBusca('')} 
                className="block p-4 border-b border-gray-100 hover:bg-orange-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-gray-800">{item.name}</div>
                    <div className="text-xs text-orange-600 font-semibold">{item.category}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-gray-500 text-center">
              Nenhum prato encontrado para "{busca}".
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}