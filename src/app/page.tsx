import Link from "next/link";
import SearchBar from "./searchBar";
import MenuGridPage from "./MenuGridPage";

export default function Home() {

  

  return (
    <main className="min-h-screen p-8 bg-[#FDFBF7] flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2B4336]">
          Le Prestige Café e Bistrô
        </h1>
        <p className="text-gray-600 mt-1">
          Atalhos de navegação para desenvolvimento e testes:
        </p>
        <SearchBar/>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="px-4 py-2 bg-[#2B4336] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Painel Admin (/admin)
        </Link>

        <Link
          href="/admin/pedidos"
          className="px-4 py-2 bg-[#2B4336] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Fila de Pedidos (/admin/pedidos)
        </Link>

        <Link
          href="/carrinho"
          className="px-4 py-2 bg-[#2B4336] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Carrinho (/carrinho)
        </Link>

        <Link
          href="/admin/cardapio"
          className="px-4 py-2 bg-amber-700 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Gestão do Cardápio (/admin/cardapio)
        </Link>
      </div>
      <MenuGridPage/>
    </main>
  );
}