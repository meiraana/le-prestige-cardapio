import Link from 'next/link';
import { BookOpen, ClipboardList, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-creme text-cafe font-serif flex flex-col justify-between">
      
      {/*HEADER */}
      <header className="bg-verde text-creme py-4 shadow-sm border-b border-verde">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-dourado">
              LE PRESTIGE
            </h1>
            <span className="bg-[#ECE7DE]/19 text-dourado text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
              Painel Gestão
            </span>
          </div>

          <Link 
            href="/"
            className="w-full sm:w-auto text-center flex items-center justify-center gap-2 border border-creme hover:bg-white/10 text-creme px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar ao Cardápio</span>
          </Link>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-grow flex flex-col items-center justify-center">
        
        <div className="text-center max-w-2xl mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cafe mb-4">
            Central de Gerenciamento
          </h2>
          <p className="text-sm sm:text-base text-cafe leading-relaxed font-normal">
            Selecione uma das áreas administrativas abaixo para atualizar os pratos do menu ou acompanhar os pedidos dos clientes em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* CARD 1: GESTÃO DO CARDÁPIO (CRUD 1) */}
          <Link 
            href="/admin/cardapio"
            className="group bg-white rounded-2xl p-8 border border-verde shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-cafe/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-10 rounded-xl bg-[#4A3728]/15 text-cafe flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>

              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-verde tracking-wide mb-3">
                Gestão do Cardápio
              </h3>
              <p className="text-xs sm:text-sm text-verde leading-relaxed mb-6 font-medium">
                Cadastre novos pratos, atualize descrições e valores, altere o status para <strong className="text-verde font-bold">Esgotado</strong> ou remova itens do menu.
              </p>
            </div>

            <div className="pt-4 border-t border-verde flex items-center justify-between text-xs sm:text-sm font-semibold text-verde group-hover:text-verde transition-colors">
              <span>Acessar Painel de Pratos</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/*CARD 2: FILA DE PEDIDOS (CRUD 2)*/}
          <Link 
            href="/admin/pedidos"
            className="group bg-white rounded-2xl p-8 border border-verde shadow-sm hover:shadow-xl transition-all duration-300  hover:bg-verde/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-10 rounded-xl bg-verde/15 text-verde flex items-center justify-center mb-6">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-xl font-bold text-verde tracking-wide mb-3">
                Fila de Pedidos
              </h3>
              <p className="text-xs sm:text-sm text-verde leading-relaxed mb-6 font-medium">
                Acompanhe os pedidos simulados vindos do carrinho, visualize detalhes do cliente e atualize os status em tempo real (Recebido &rarr; Em preparo &rarr; Pronto &rarr; Entregue).
              </p>
            </div>

            <div className="pt-4 border-t border-verde flex items-center justify-between text-xs sm:text-sm font-semibold text-verde group-hover:text-verde transition-colors">
              <span>Acessar Painel de Pedidos</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </main>

      {/* FOOTER DA PÁGINA */}
      <footer className="border-t border-verde py-4 px-4 text-center text-xs text-cafe bg-creme">
        Le Prestige Café e Bistrô &mdash; Painel Interno de Gestão | Desenvolvido por <strong className="text-cafe font-bold">byron.solutions</strong>
      </footer>

    </div>
  );
}