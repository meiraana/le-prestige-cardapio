'use client'

import SearchBar from "./searchBar"
import {useState} from 'react'
import {mockMenuItems, MenuItem} from "@/data/mockData"

export default function Home() {

  const [busca, setBusca] = useState('');

  const itensFiltrados = mockMenuItems.filter((item) => {
    const textoBusca = busca.toLowerCase();
    return (
      item.name.toLowerCase().includes(textoBusca) || 
      item.category.toLowerCase().includes(textoBusca)
    );
  });

  return (
    <main className="min-h-screen p-8 bg-[#FDFBF7]">
      <SearchBar
        busca={busca} 
        setBusca={setBusca}
        resultados={itensFiltrados} // 
        placeholder="Pesquisar por prato ou categoria..."
      />
      <h1 className="text-3xl font-bold text-[#2B4336]">
        Le Prestige Café e Bistrô
      </h1>
      <p className="text-gray-600">
        Projeto inicial carregado com sucesso.
      </p>
    </main>
  );
}