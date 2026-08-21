'use client';

import Link from 'next/link';
import SearchBar from './searchBar';

export default function Home() {
  return (
    <main className="min-h-screen w-full p-6 sm:p-10 bg-creme font-sans flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-cafe">
            Le Prestige Café e Bistrô
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Atalhos de navegação para desenvolvimento e testes:
          </p>
        </div>

        {/* Atalhos de Desenvolvedor */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          <Link
            href="/admin"
            className="px-4 py-2 bg-verde text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Painel Admin (/admin)
          </Link>

          <Link
            href="/admin/pedidos"
            className="px-4 py-2 bg-verde text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Fila de Pedidos (/admin/pedidos)
          </Link>

          <Link
            href="/carrinho"
            className="px-4 py-2 bg-verde text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Carrinho (/carrinho)
          </Link>

          <Link
            href="/admin/cardapio"
            className="px-4 py-2 bg-dourado text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Gestão do Cardápio (/admin/cardapio)
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-2">
          <div className="grow w-full max-w-md">
            <SearchBar />
          </div>
          <Link
            href="/carrinho"
            className="w-full sm:w-auto px-8 py-3 bg-verde hover:opacity-90 text-white font-serif font-semibold text-center rounded-xl transition-all shadow-sm whitespace-nowrap text-sm"
          >
            Ver Carrinho de Pedidos
          </Link>
        </div>
      </div>
    </main>
  );
}