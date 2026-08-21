// components/CardDetalhesPrato.tsx
import BotaoAdicionarCarrinho from '@/components/BotaoAddCart';
// Opcional: import { MenuItem } from '@/data/mockData'; se quiser tipar direitinho

export default function CardDetalhesPrato({ prato }: { prato: any }) {
  return (
    <div className="max-w-3xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Container da Imagem */}
      <div className="w-full h-64 sm:h-80 relative bg-gray-100">
        {prato.image && (
          <img 
            src={prato.image} 
            alt={prato.name} 
            className={`w-full h-full object-cover ${!prato.available ? 'opacity-90' : ''}`}
          />
        )}
        
        {/* Tag Esgotado Flutuante */}
        {!prato.available && (
          <div className="absolute top-4 right-4 bg-[#C87373]/80 backdrop-blur-sm text-cafe px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-sm"></span>
            Esgotado
          </div>
        )}
      </div>

      {/* Corpo do Card */}
      <div className="p-6 sm:p-8">
        
        <div className="mb-6">
          <span className="block text-dourado font-serif font-bold text-lg mb-1 tracking-wide">
            {prato.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cafe">
            {prato.name}
          </h1>
        </div>

        <hr className="border-t border-gray-100 mb-6" />

        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
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

          {/* Chamando o botão que você isolou no passo anterior */}
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
  );
}