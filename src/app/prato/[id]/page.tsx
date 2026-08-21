import { mockMenuItems } from "@/data/mockData"; // Ajuste se seu caminho for diferente
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoAdicionarCarrinho from '@/app/BotaoAddCart';

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
    <main className="min-h-screen bg-creme font-sans p-6 sm:p-12 flex flex-col items-center">
      
      {/* Container limitador de largura */}
      <div className="max-w-3xl w-full">
        
        {/* BOTÃO VOLTAR (Flutuando fora do card) */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2 bg-gray-200/70 hover:bg-gray-300 text-cafe text-xs font-bold rounded-full transition-colors mb-6"
        >
          ← Voltar ao Cardápio
        </Link>

        {/* CARD PRINCIPAL */}
        <div className="w-full bg-branco rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          
          {/* HEADER DO CARD (Imagem) */}
          <div className="w-full h-64 sm:h-[340px] bg-cafe/5 relative">
            {prato.image && (
              <img 
                src={prato.image} 
                alt={prato.name} 
                className={`w-full h-full object-cover ${!prato.available ? 'grayscale opacity-80' : ''}`}
              />
            )}
            
            {/* TAG DE ESGOTADO (Estilo da foto com blur e bolinha vermelha) */}
            {!prato.available && (
              <div className="absolute top-4 right-4 bg-red-400/40 backdrop-blur-md text-cafe px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm border border-red-500/20">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                Esgotado
              </div>
            )}
          </div>

          {/* CORPO DO CARD */}
          <div className="p-8 sm:px-12 sm:py-10">
            
            {/* Títulos */}
            <span className="block text-dourado font-serif text-lg font-bold tracking-wide mb-1">
              {prato.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cafe mb-6">
              {prato.name}
            </h1>
            
            <hr className="border-t border-gray-100 mb-6" />

            {/* Descrição */}
            <p className="text-cafe/80 font-sans text-sm sm:text-base leading-relaxed mb-8">
              {prato.description}
            </p>

            <hr className="border-t border-gray-100 mb-6" />

            {/* Rodapé: Preço e Controle do Carrinho */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
            <div>
              <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                Valor individual
              </span>
              <span className="block text-3xl font-bold text-cafe">
                R$ {prato.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* A mágica acontece aqui! */}
            {prato.available ? (
              <BotaoAdicionarCarrinho prato={prato} />
            ) : (
              <button disabled className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold text-sm cursor-not-allowed">
                Indisponível
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
    </main>
  );
}