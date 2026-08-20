// components/SearchBar.tsx
'use client';
import { MenuItem } from "@/data/mockData"; 
import Link from 'next/link';

interface SearchBarProps {
  busca: string;
  setBusca: (valor: string) => void;
  placeholder?: string; 
  resultados: MenuItem[];
}

export default function SearchBar({ busca, setBusca, placeholder = "Pesquisar...",resultados }: SearchBarProps) {
  return (
    // O "relative" aqui é crucial! Ele diz pro dropdown flutuante não sair debaixo da barra.
    <div className="w-full max-w-xl mx-auto mb-10 relative">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setBusca(e.target.value)}
        value={busca}
        className="w-full p-4 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      />

      {/* A LÓGICA DO DROPDOWN */}
      {/* Só mostra a caixinha se o usuário tiver digitado alguma coisa */}
      {busca.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          
          {resultados.length > 0 ? (
            resultados.map((item) => (
              <Link 
                href={`/prato/${item.id}`}
                key={item.id} 
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