import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
// import { type MenuItem } from '@/data/mockData';

export default function CardListagem({ prato }: { prato: any }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      
      {/* 1. Área da Imagem (Metade superior) */}
      <div className="relative h-40 w-full bg-gray-100 shrink-0">
        {prato.image && (
          <img 
            src={prato.image} 
            alt={prato.name} 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Tag de Status Flutuante (Disponível/Esgotado) */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
          prato.available 
            ? 'bg-green-100/80 text-green-800' 
            : 'bg-red-100/80 text-red-800'
        }`}>
          <span className={`w-2 h-2 rounded-full shadow-sm ${
            prato.available ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          {prato.available ? 'Disponível' : 'Esgotado'}
        </div>
      </div>

      {/* 2. Área de Conteúdo (Metade inferior) */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-4">
        
        {/* Título */}
        <h3 className="font-serif text-lg font-bold text-cafe leading-tight line-clamp-2">
          {prato.name}
        </h3>

        {/* Rodapé: Preço e Botão */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-sm text-cafe">
            R$ {prato.price.toFixed(2).replace('.', ',')}
          </span>

          <Link 
            href={`/prato/${prato.id}`}
            className="flex items-center gap-1 bg-verde text-creme px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#25382a] transition-colors"
          >
            Ver Prato
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}