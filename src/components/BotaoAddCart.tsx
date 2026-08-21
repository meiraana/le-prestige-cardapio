'use client'; // Aqui nós habilitamos os hooks!

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
// Importe a tipagem MenuItem se você tiver, ou declare o formato básico aqui:
// import { type MenuItem } from '@/data/menu'; 

export default function BotaoAdicionarCarrinho({ prato }: { prato: any }) {
  const { adicionarAoCarrinho } = useCart();
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(1);
  const [foiAdicionado, setFoiAdicionado] = useState(false);

  // Controles locais (antes de ir pro carrinho)
  const incrementar = () => setQuantidadeDesejada(prev => prev + 1);
  const decrementar = () => {
    if (quantidadeDesejada > 1) {
      setQuantidadeDesejada(prev => prev - 1);
    }
  };

  const handleAdicionar = () => {
    // Adiciona ao contexto X vezes (dependendo do que foi selecionado)
    for (let i = 0; i < quantidadeDesejada; i++) {
      adicionarAoCarrinho(prato);
    }
    
    // Mostra um feedback visual temporário
    setFoiAdicionado(true);
    setTimeout(() => {
      setFoiAdicionado(false);
      setQuantidadeDesejada(1); // Reseta o contador
    }, 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      
      {/* Seletor de Quantidade Local */}
      <div className="flex items-center gap-3 bg-[#ECE7DE] border border-verde rounded-full px-4 py-2">
        <button 
          onClick={decrementar} 
          disabled={quantidadeDesejada === 1}
          className="text-cafe hover:opacity-70 disabled:opacity-30 transition-opacity p-1"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-bold text-sm text-cafe min-w-[20px] text-center">
          {quantidadeDesejada}
        </span>
        <button 
          onClick={incrementar}
          className="text-cafe hover:opacity-70 transition-opacity p-1"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Botão de Ação Principal */}
      <button 
        onClick={handleAdicionar}
        className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
          foiAdicionado 
            ? 'bg-dourado text-cafe border border-dourado shadow-sm' 
            : 'bg-verde text-creme hover:bg-[#25382a] shadow-sm'
        }`}
      >
        <ShoppingBag className="w-4 h-4" />
        {foiAdicionado ? 'Adicionado!' : 'Adicionar ao Pedido'}
      </button>

    </div>
  );
}