'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CarrinhoPage() {
  const router = useRouter();
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, excluirDoCarrinho, limparCarrinho, adicionarPedido } = useCart();

  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const subtotal = carrinho.reduce((acc, item) => acc + item.price * item.quantidade, 0);
  const taxaAtendimento = subtotal * 0.10;
  const valorTotal = subtotal + taxaAtendimento;

  const handleEnviarPedido = (e: React.FormEvent) => {
    e.preventDefault();

    if (carrinho.length === 0) return;

    if (!nome.trim() || !localizacao.trim()) {
      alert('Por favor, preencha o seu nome completo e a mesa/localização.');
      return;
    }

    const novoPedido = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      cliente: nome,
      local: localizacao,
      itens: carrinho.map((item) => ({
        nome: item.name,
        quantidade: item.quantidade,
      })),
      valorTotal,
      status: 'Recebido' as const,
      observacoes,
    };

    adicionarPedido(novoPedido);

    console.log('Pedido enviado:', novoPedido);
    alert('Pedido enviado para a cozinha com sucesso!');
    
    limparCarrinho();
    router.push('/admin/pedidos');
  };

  return (
    <div className="min-h-screen bg-creme text-cafe font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/*HEADER*/}
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

      <main className="max-w-6xl mx-auto px-3 sm:px-8 py-4 sm:py-10 w-full flex-grow">
        
        {/* Cabeçalho do Carrinho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-4xl font-bold text-cafe">
              Seu Carrinho de Compras
            </h2>
            <p className="font-sans text-xs sm:text-sm text-cafe mt-0.5 sm:mt-1">
              Confira seus itens antes de enviar o pedido para a cozinha.
            </p>
          </div>

          <div className="bg-[#D3C7BC] text-cafe font-bold text-[10px] sm:text-xs uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-full tracking-wider self-start sm:self-auto shrink-0">
            {totalItens} {totalItens === 1 ? 'ITEM SELECIONADO' : 'ITENS SELECIONADOS'}
          </div>
        </div>

        <div className="border-b border-cafe/20 w-full mb-6 sm:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/*Lista com os pratos que foram (serão) adiconados no carrinho */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {carrinho.length === 0 ? (
              <div className="bg-branco border border-verde rounded-2xl p-6 sm:p-10 text-center">
                <h3 className="font-sans text-base sm:text-xl font-bold text-verde mb-2">
                  Seu carrinho está vazio
                </h3>
                <p className="text-xs sm:text-sm text-verde mb-6">
                  Você ainda não escolheu nenhum prato do nosso cardápio.
                </p>
                <Link 
                  href="/" 
                  className="inline-block bg-verde text-branco text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-verde/90 transition-all"
                >
                  Explorar Cardápio
                </Link>
              </div>
            ) : (
              carrinho.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-branco border border-verde rounded-2xl p-3 sm:p-4 shadow-sm flex items-center gap-2.5 sm:gap-4"
                >
                  {/* Imagem do Item */}
                  <div className="relative w-16 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-stone-200">
                    <Image 
                      src={item.image || '/placeholder-food.jpg'} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Informações do Prato */}
                  <div className="flex-grow min-w-0 pr-1 sm:pr-2">
                    <h4 className="font-serif text-xs sm:text-base font-bold text-cafe truncate">
                      {item.name}
                    </h4>
                    <p className="font-sans text-[10px] sm:text-xs text-verde/60 line-clamp-2 my-0.5">
                      {item.description}
                    </p>
                    <span className="font-sans text-xs sm:text-sm text-cafe block mt-0.5 font-semibold">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Controles da Direita */}
                  <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5">
                    <button 
                      onClick={() => excluirDoCarrinho(item.id)}
                      title="Excluir item"
                      className="text-[#C86A6A] hover:text-red-700 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 sm:gap-2 bg-[#DCD6CD] border border-verde rounded-full px-2 py-0.5 sm:px-2.5">
                      <button 
                        onClick={() => removerDoCarrinho(item.id)}
                        className="w-3.5 h-3.5 flex items-center justify-center text-cafe hover:opacity-75"
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <span className="font-bold text-[11px] sm:text-xs text-cafe">
                        {item.quantidade}
                      </span>
                      <button 
                        onClick={() => adicionarAoCarrinho(item)}
                        className="w-3.5 h-3.5 flex items-center justify-center text-cafe hover:opacity-75"
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="bg-[#ECE7DE] border border-verde rounded-2xl p-3 font-sans text-[10px] sm:text-xs text-verde text-center leading-relaxed">
              Você pode adicionar observações especiais sobre restrições alimentares ou ponto da carne no momento da entrega do pedido na mesa.
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-5 lg:sticky lg:top-6 w-full">
            <div className="bg-branco border border-verde rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="font-serif text-base sm:text-lg font-bold text-verde border-b border-cafe/20 pb-3 mb-4 uppercase tracking-wide">
                RESUMO DO PEDIDO
              </h3>

              <form onSubmit={handleEnviarPedido} className="space-y-4">
                <div>
                  <label className="block text-sm sm:text-lg font-sans text-cafe mb-1">
                    Seu nome completo:
                  </label>
                  <input 
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Maria Oliveira"
                    className="w-full bg-[#ECE7DE] border border-verde rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 font-sans text-sm sm:text-lg text-cafe placeholder-cafe/40 focus:outline-none focus:border-cafe transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-lg font-sans text-cafe mb-1">
                    Mesa / Localização:
                  </label>
                  <input 
                    type="text"
                    required
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    placeholder="Ex: Mesa 05 / Rua Ariovaldo Mendonça 35"
                    className="w-full bg-[#ECE7DE] border border-verde rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 font-sans text-sm sm:text-lg text-cafe placeholder-cafe/40 focus:outline-none focus:border-cafe transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-lg font-sans text-cafe mb-1">
                    Observações do Pedido (Opcional)
                  </label>
                  <textarea 
                    rows={3}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Ex: Carne ao ponto para mal passada, sem gelo no suco..."
                    className="w-full bg-[#ECE7DE] border border-verde rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 font-sans text-sm sm:text-lg text-cafe placeholder-cafe/40 focus:outline-none focus:border-cafe resize-none transition-colors"
                  />
                </div>

                <div className=" border-t border-cafe/20 pt-2 space-y-2 text-sm sm:text-lg text-verde">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({totalItens} itens):</span>
                    <span className="font-sans">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Taxa de Atendimento (10%):</span>
                    <span className="font-sans">R$ {taxaAtendimento.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <div className="border-t border-cafe/20 pt-3 mt-3 flex justify-between items-center">
                    <span className="font-semibold text-base sm:text-xl uppercase tracking-wider text-cafe">VALOR TOTAL</span>
                    <span className="font-bold text-lg sm:text-xl text-cafe">
                      R$ {valorTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={carrinho.length === 0}
                  className="w-full bg-verde hover:bg-verde/90 disabled:bg-stone-300 disabled:cursor-not-allowed text-creme font-sans font-bold text-xs sm:text-sm py-3.5 rounded-full transition-all shadow-sm mt-4 active:scale-[0.99]"
                >
                  Confirmar e Enviar Pedido
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cafe text-creme/80 py-4 px-4 text-center text-[10px] sm:text-xs">
        Le Prestige Café e Bistrô &mdash; Painel Interno Cardápio | Desenvolvido por <strong className="text-dourado font-semibold">byron.solutions</strong>
      </footer>

    </div>
  );
}