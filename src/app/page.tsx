'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './searchBar';
import { CATEGORIES, mockMenuItems, MenuItem } from '@/data/mockData';

export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('TODOS');

  const pratosFiltrados = categoriaAtiva === 'TODOS'
    ? mockMenuItems
    : mockMenuItems.filter((p) => p.category.toUpperCase() === categoriaAtiva.toUpperCase());

  return (
    <main className="min-h-screen w-full p-4 sm:p-8 bg-creme font-sans flex flex-col items-center">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-6">

        <div className="w-full border-b border-cafe/20 pb-2">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-cafe">
            Cardápio Completo
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-stretch">
          <div className="md:col-span-7 w-full flex [&>div]:w-full [&>form]:w-full [&_input]:w-full [&_input]:h-full">
            <SearchBar />
          </div>
          <div className="md:col-span-5 w-full flex">
            <Link
              href="/carrinho"
              className="w-full h-full min-h-[48px] flex items-center justify-center py-3 px-4 bg-verde hover:opacity-90 text-branco font-serif text-center rounded-lg transition-all text-sm font-semibold shadow-sm"
            >
              Ver Carrinho de Pedidos
            </Link>
          </div>
        </div>

        <div className="w-full flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          <button 
            type="button"
            onClick={() => setCategoriaAtiva('TODOS')}
            className={`px-6 py-2.5 rounded-full text-xs font-serif font-bold transition-all uppercase whitespace-nowrap tracking-wider ${
              categoriaAtiva === 'TODOS'
                ? 'bg-verde text-branco'
                : 'bg-cafe/10 text-cafe hover:bg-cafe/20'
            }`}
          > 
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaAtiva(cat.toUpperCase())}
              className={`px-6 py-2.5 rounded-full text-xs font-serif font-bold transition-all uppercase whitespace-nowrap tracking-wider ${
                categoriaAtiva === cat.toUpperCase()
                  ? 'bg-verde text-branco'
                  : 'bg-cafe/10 text-cafe hover:bg-cafe/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {pratosFiltrados.length === 0 ? (
          <div className="bg-branco rounded-xl border border-verde p-12 text-center text-cafe w-full">
            Nenhum prato encontrado nesta categoria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
            {pratosFiltrados.map((prato: MenuItem) => (
              <div
                key={prato.id}
                className="bg-branco rounded-2xl border border-verde overflow-hidden shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div className="relative h-44 w-full bg-creme">
                  {prato.image ? (
                    <Image 
                      src={prato.image} 
                      alt={prato.name} 
                      fill 
                      unoptimized 
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-cafe/40">
                      Sem Foto
                    </div>
                  )}

                  <span
                    className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-sm ${
                      prato.available
                        ? 'bg-[#A3D9A5]/90 text-[#1B4D20]'
                        : 'bg-[#EFA8A8]/90 text-[#6B1D1D]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      prato.available ? 'bg-emerald-700' : 'bg-red-700'
                    }`} />
                    {prato.available ? 'Disponível' : 'Esgotado'}
                  </span>
                </div>

                <div className="p-4 flex flex-col justify-between grow gap-4">
                  <h3 className="font-serif font-bold text-cafe text-base line-clamp-1">
                    {prato.name}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-cafe text-sm font-sans">
                      R$ {prato.price.toFixed(2).replace('.', ',')}
                    </span>
                    
                    <Link
                      href={`/prato/${prato.id}`}
                      className="bg-verde hover:opacity-90 text-branco text-xs font-serif font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>Ver Prato</span>
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}