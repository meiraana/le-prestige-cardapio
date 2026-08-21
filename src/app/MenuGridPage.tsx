import { mockMenuItems } from '@/data/mockData';
import CardListagem from '@/app/CardPratoLista';

export default function MenuGridPage() {
  return (
    <main className="min-h-screen bg-creme p-8">
      {/* Grid responsivo: 1 coluna no celular, 2 no tablet, 3 ou 4 no PC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {mockMenuItems.map((prato) => (
          <CardListagem key={prato.id} prato={prato} />
        ))}

      </div>
    </main>
  );
}