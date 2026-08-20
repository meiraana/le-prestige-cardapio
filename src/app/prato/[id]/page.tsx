import { mockMenuItems } from "@/data/mockData";
import { parseStack } from "next/dist/server/lib/parse-stack";
import Link from "next/link";
import { notFound } from "next/navigation";


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
    <main className="min-h-screen p-8 bg-[#FDFBF7] flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Se o prato tiver imagem, renderizamos */}
        {prato.image && (
          <div className="w-full h-64 bg-gray-200">
            <img 
              src={prato.image} 
              alt={prato.name} 
              className={`w-full h-full object-cover ${!prato.available ? 'grayscale opacity-60' : ''}`}
            />
          </div>
        )}

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wide">
                {prato.category}
              </span>
              <h1 className="text-3xl font-bold text-[#2B4336]">{prato.name}</h1>
            </div>
            <span className="text-2xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              R$ {prato.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {prato.description}
          </p>

          {!prato.available && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg font-bold text-center mb-6">
              Este item está esgotado no momento.
            </div>
          )}

          <div className="border-t border-gray-100 pt-6">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#2B4336] text-white font-semibold rounded-lg hover:bg-[#1f3128] transition-colors"
            >
              Voltar para o Cardápio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}