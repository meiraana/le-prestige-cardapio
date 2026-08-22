'use client';

import { use } from 'react';
import Link from 'next/link';
import CardDetalhesPrato from "@/components/CardDetalhesPrato";
import { useCart } from "@/context/CartContext";

export default function DetalhesDoPrato({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const parametrosResolvidos = use(params);
  const pratoId = parametrosResolvidos.id;

  const { menuItems } = useCart();
  const prato = menuItems.find((item) => Number(item.id) === Number(pratoId));

  if (!prato) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] text-[#2b2118] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-serif font-bold text-[#3E2A1E] mb-2">Prato não encontrado</h1>
        <p className="text-sm text-[#5b5044] mb-6">Este prato pode ter sido removido do cardápio.</p>
        <Link 
          href="/#cardapio"
          className="px-5 py-2.5 bg-[#324A38] text-white rounded-full font-sans text-sm font-semibold hover:bg-[#3D2C24] transition-colors"
        >
          &larr; Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#2b2118] font-sans flex flex-col justify-between">
      
      {/* HEADER */}
      <header className="bg-[#3E2A1E] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-2">
          <div className="flex items-center gap-3">
            <div className="w-20 h-14 shrink-0 flex items-center justify-center">
              <img
                src="/img/logo leprestige.png"
                alt="Logo Le Prestige"
                className="w-[140px] h-[80px] max-w-none object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif text-xl md:text-2xl tracking-wide leading-tight">LE PRESTIGE</h1>
              <p
                className="text-[#C29B38]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 'normal',
                  fontStyle: 'italic',
                  fontSize: '16px',
                  lineHeight: '100%',
                }}
              >
                Café e Bistrô
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-3xl w-full mx-auto py-8 px-4 flex-grow flex flex-col items-center">
        <div className="w-full mb-6">
          <Link 
            href="/#cardapio"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E2A1E]/10 hover:bg-[#3E2A1E]/20 text-[#3E2A1E] rounded-full text-sm font-bold transition-colors"
          >
            &larr; Voltar ao Cardápio
          </Link>
        </div>

        <CardDetalhesPrato prato={prato} />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#3E2A1E] text-[#F5F1E8]/80 py-4 px-4 text-center text-[10px] sm:text-xs">
        Le Prestige Café e Bistrô &mdash; Painel Interno Cardápio | Desenvolvido por <strong className="text-[#C29B38] font-semibold">byron.solutions</strong>
      </footer>

    </div>
  );
}