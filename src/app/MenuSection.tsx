'use client';

import { useState } from 'react';
import { mockMenuItems, CATEGORIES } from '@/data/mockData';
import CardListagem from '@/app/CardListagem';

export default function MenuSection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('TODOS');
  const abas = ['TODOS', ...CATEGORIES];

  const pratosFiltrados = mockMenuItems.filter((prato) => {
    if (categoriaAtiva === 'TODOS') return true;
    return prato.category.toUpperCase() === categoriaAtiva.toUpperCase();
  });

  return (
    // 1. Trocamos <main> por <section>
    // 2. Removemos o min-h-screen e colocamos py-12 (padding vertical) para dar um respiro legal
    <section className="w-full bg-creme py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO DA SEÇÃO (Opcional, mas fica legal pra página principal) */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe mb-2">
            Nosso Cardápio
          </h2>
          <p className="font-sans text-cafe/70 text-sm sm:text-base">
            Explore nossas opções e escolha o seu prato favorito.
          </p>
        </div>

        {/* BARRA DE FILTROS */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {abas.map((aba) => (
            <button
              key={aba}
              onClick={() => setCategoriaAtiva(aba)}
              className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all max-w-[110px] sm:max-w-none truncate ${
                categoriaAtiva === aba
                  ? 'bg-verde text-creme shadow-sm'
                  : 'bg-[#E5E0D8] text-cafe/60 hover:bg-[#D8D2C9] hover:text-cafe'
              }`}
              title={aba}
            >
              {aba}
            </button>
          ))}
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pratosFiltrados.map((prato) => (
            <CardListagem key={prato.id} prato={prato} />
          ))}
        </div>

        {/* MENSAGEM DE LISTA VAZIA */}
        {pratosFiltrados.length === 0 && (
          <div className="text-center text-cafe/60 py-12 font-medium">
            Nenhum item disponível nesta categoria no momento.
          </div>
        )}

      </div>
    </section>
  );
}