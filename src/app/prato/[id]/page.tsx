// app/prato/[id]/page.tsx
import { mockMenuItems } from "@/data/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";
import CardDetalhesPrato from "@/components/CardDetalhesPrato";

export default async function DetalhesDoPrato({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const parametrosResolvidos = await params;
  const pratoId = parametrosResolvidos.id;

  const prato = mockMenuItems.find((item) => item.id === Number(pratoId));

  if (!prato) {
    return notFound();
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