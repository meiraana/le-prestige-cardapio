'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { mockMenuItems } from "@/data/mockData";
import { useCart } from '@/context/CartContext';

export default function DetalhesDoPrato({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();
  
  const parametrosResolvidos = params instanceof Promise ? use(params) : params;
  const pratoId = parametrosResolvidos.id;

  const prato = mockMenuItems.find((item) => item.id === Number(pratoId));

  if (!prato) {
    return notFound();
  }

  const handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho({
      ...prato,
      id: String(prato.id),
    });
    router.push('/carrinho');
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#2b2118] font-sans flex flex-col justify-between">
      
      {/* HEADER */}
      <header className="bg-[#3E2A1E] text-white py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#C29B38]">
              LE PRESTIGE
            </h1>
            <span className="bg-[#ECE7DE]/20 text-[#C29B38] text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
              Cardápio
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#ECE7DE]/40 hover:bg-white/10 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar ao Cardápio</span>
            <span className="sm:hidden">Voltar</span>
          </Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-3xl mx-auto px-4 py-8 w-full flex-grow flex flex-col justify-center">
        
        <div className="mb-4 self-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E2A1E]/10 hover:bg-[#3E2A1E]/20 text-[#3E2A1E] font-medium text-xs rounded-full transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Cardápio
          </Link>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#324A38]">
          
          {/* IMAGEM DO PRATO */}
          {(prato.image || prato.image) && (
            <div className="w-full h-72 bg-[#EAE8E1] border-b border-[#324A38]/20 relative">
              <img 
                src={prato.image || prato.image} 
                alt={prato.name} 
                className={`w-full h-full object-cover ${!prato.available ? 'grayscale opacity-60' : ''}`}
              />
            </div>
          )}

          {/* DETALHES DO PRATO */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <span className="inline-block bg-[#3E2A1E]/10 text-[#3E2A1E] text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-3">
                  {prato.category}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3E2A1E]">
                  {prato.name}
                </h2>
              </div>
              
              {/* TAG DE PREÇO */}
              <span className="text-2xl font-bold text-[#324A38] bg-[#324A38]/10 border border-[#324A38]/20 px-5 py-2 rounded-xl whitespace-nowrap">
                R$ {prato.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <p className="text-[#5b5044] leading-relaxed font-medium text-base mb-8">
              {prato.description}
            </p>

            {!prato.available && (
              <div className="bg-[#4A3728]/15 border border-[#3E2A1E] text-[#3E2A1E] p-4 rounded-xl font-bold text-center mb-6">
                ⚠️ Este prato está esgotado no momento.
              </div>
            )}

            <div className="border-t border-[#324A38]/20 pt-6">
              <button 
                type="button"
                onClick={handleAdicionarAoCarrinho}
                disabled={!prato.available}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#324A38] text-white font-semibold rounded-xl hover:bg-[#3E2A1E] transition-colors border border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                + Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#3E2A1E] text-white py-6 text-center text-xs border-t border-[#ECE7DE]/20">
        © 2026 Le Prestige Café e Bistrô. Todos os direitos reservados.
      </footer>
    </div>
  );
}