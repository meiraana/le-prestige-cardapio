// app/prato/[id]/page.tsx
import { mockMenuItems } from "@/data/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";
import CardDetalhesPrato from "@/app/CardDetalhesPrato";

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
  );
}