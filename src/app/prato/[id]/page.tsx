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
    <div className="min-h-screen bg-creme text-cafe font-sans flex flex-col justify-between">
      
      <header className="bg-verde text-creme py-4 shadow-sm border-b border-verde">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-dourado">
              LE PRESTIGE
            </h1>
            <span className="bg-[#ECE7DE]/19 text-dourado text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
              Cardápio
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 w-full flex-grow flex flex-col justify-center">
        
        <div className="mb-4 self-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-cafe/10 hover:bg-cafe/20 text-cafe font-medium text-xs rounded-full transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Cardápio
          </Link>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-verde">
          
          {/* IMAGEM DO PRATO */}
          {prato.image && (
            <div className="w-full h-72 bg-cafe/10 border-b border-verde relative">
              <img 
                src={prato.image} 
                alt={prato.name} 
                className={`w-full h-full object-cover ${!prato.available ? 'grayscale opacity-60' : ''}`}
              />
            </div>
          )}

          {/* DETALHES DO PRATO */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <span className="inline-block bg-cafe/10 text-cafe text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-3">
                  {prato.category}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-cafe">
                  {prato.name}
                </h2>
              </div>
              
              {/* TAG DE PREÇO */}
              <span className="text-2xl font-bold text-verde bg-verde/10 border border-verde/20 px-5 py-2 rounded-xl whitespace-nowrap">
                R$ {prato.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <p className="text-verde leading-relaxed font-medium text-base mb-8">
              {prato.description}
            </p>

            {!prato.available && (
              <div className="bg-[#4A3728]/15 border border-cafe text-cafe p-4 rounded-xl font-bold text-center mb-6">
                ⚠️ Este prato está esgotado no momento.
              </div>
            )}

            <div className="border-t border-verde/30 pt-6">
              <button 
                type="button"
                onClick={handleAdicionarAoCarrinho}
                disabled={!prato.available}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-verde text-creme font-semibold rounded-xl hover:bg-cafe transition-colors border border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                + Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
        <Link
        href="/"
        className="font-sans flex items-center gap-1 sm:gap-2 border-2 border-creme hover:bg-branco/10 text-creme px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0"
        >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Retornar ao Cardápio</span>
        <span className="sm:hidden text-xs">Cardápio</span>
        </Link>
        </div>
        </header>   
    <div className="min-h-screen bg-creme font-sans py-12 px-4 flex flex-col items-center">
      
      {/* Botão de Voltar Externo */}
      <div className="max-w-3xl w-full mb-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300/40 text-cafe rounded-full text-sm font-bold hover:bg-gray-300/60 transition-colors"
        >
          &larr; Voltar ao Cardápio
        </Link>
      </div>

      {/* Renderiza o novo componente isolado, passando as informações do prato */}
      <CardDetalhesPrato prato={prato} />

    </div>
    </>
  );
}