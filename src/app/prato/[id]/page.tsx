// app/prato/[id]/page.tsx
import { mockMenuItems } from "@/data/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";
import CardDetalhesPrato from "@/app/CardDetalhesPrato";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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
    <>
    <header className="bg-cafe text-creme py-3 px-3 sm:px-8 shadow-sm relative z-10">
        <div className="max-w-6xl mx-auto px-3 sm:px-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <div className="h-10 w-10 sm:h-14 sm:w-14 shrink-0 flex items-center justify-center relative overflow-visible">
        <Image
        src="/image/Logo.png"
        alt="Logo Le Prestige"
        width={80}
        height={80}
        className="object-contain transform scale-[1.3] sm:scale-[2.0] transition-transform"
        />
        </div>
        <div className="flex flex-col justify-center min-w-0">
        <h1 className="font-serif text-sm sm:text-2xl font-bold tracking-wider text-branco leading-none truncate">
        LE PRESTIGE
        </h1>
        <span className="font-sans text-[9px] sm:text-sm text-dourado italic font-serif mt-0.5 truncate">
        Café e Bistrô
        </span>
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