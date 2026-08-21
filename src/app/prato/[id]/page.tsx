import { mockMenuItems } from "@/data/mockData"; 
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from 'lucide-react';

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
    // Wrapper principal
    <div className="min-h-screen bg-creme text-cafe font-sans flex flex-col justify-between">
      
      {/* HEADER DA PÁGINA (Seguindo o estilo do Admin) */}
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

      {/* CONTEÚDO PRINCIPAL (O CARD DO PRATO) */}
      <main className="max-w-3xl mx-auto px-4 py-12 w-full flex-grow flex items-center justify-center">
        
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
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-verde">
                  {prato.name}
                </h2>
              </div>
              
              {/* TAG DE PREÇO */}
              <span className="text-2xl font-bold text-verde bg-verde/10 border border-verde/20 px-5 py-2 rounded-xl whitespace-nowrap">
                R$ {prato.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <p className="text-cafe leading-relaxed font-medium text-base mb-8">
              {prato.description}
            </p>

            {/* AVISO DE ESGOTADO (Usando as cores da marca em vez de vermelho) */}
            {!prato.available && (
              <div className="bg-[#4A3728]/15 border border-cafe text-cafe p-4 rounded-xl font-bold text-center mb-6">
                ⚠️ Este prato está esgotado no momento.
              </div>
            )}

            {/* BOTÃO DE VOLTAR */}
            <div className="border-t border-verde/30 pt-6">
              <Link 
                href="/" 
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-verde text-creme font-semibold rounded-xl hover:bg-cafe transition-colors border border-transparent hover:border-verde"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para o Menu Principal
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-verde py-4 px-4 text-center text-xs text-cafe bg-creme font-sans">
        Le Prestige Café e Bistrô &mdash; Cardápio | Desenvolvido por <strong className="text-cafe font-bold">byron.solutions</strong>
      </footer>

    </div>
  );
}