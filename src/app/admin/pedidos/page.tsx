'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit2, Trash2, X, MessageSquare } from 'lucide-react';
import { Pedido } from '@/data/mockOrders';
import { mockMenuItems } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

export default function FilaPedidosPage() {
  const { pedidos, adicionarPedido, atualizarPedido, excluirPedido } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [cliente, setCliente] = useState('');
  const [local, setLocal] = useState('');
  const [pratoSelecionado, setPratoSelecionado] = useState('');
  const [itensSelecionados, setItensSelecionados] = useState<{ nome: string; quantidade: number }[]>([]);
  const [status, setStatus] = useState<Pedido['status']>('Recebido');
  const [valorTotal, setValorTotal] = useState('');
  const [observacoes, setObservacoes] = useState('');

  // Abrir modal para Criar
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setCliente('');
    setLocal('');
    setPratoSelecionado('');
    setItensSelecionados([]);
    setStatus('Recebido');
    setValorTotal('');
    setObservacoes('');
    setIsModalOpen(true);
  };

  // Abrir modal para Editar
  const handleOpenEditModal = (pedido: Pedido) => {
    setEditingId(pedido.id);
    setCliente(pedido.cliente);
    setLocal(pedido.local);
    setPratoSelecionado('');
    setItensSelecionados(pedido.itens);
    setStatus(pedido.status);
    setValorTotal(pedido.valorTotal.toString());
    setObservacoes(pedido.observacoes || '');
    setIsModalOpen(true);
  };

  const handleAddItem = () => {
    if (!pratoSelecionado) return;

    const pratoEncontrado = mockMenuItems.find((p) => p.name === pratoSelecionado);

    setItensSelecionados((prevItens) => {
      const itemExistenteIndex = prevItens.findIndex((item) => item.nome === pratoSelecionado);

      if (itemExistenteIndex > -1) {
        const novosItens = [...prevItens];
        novosItens[itemExistenteIndex] = {
          ...novosItens[itemExistenteIndex],
          quantidade: novosItens[itemExistenteIndex].quantidade + 1,
        };
        return novosItens;
      } else {
        return [...prevItens, { nome: pratoSelecionado, quantidade: 1 }];
      }
    });

    if (pratoEncontrado) {
      const valorAtual = parseFloat(valorTotal.replace(',', '.')) || 0;
      const novoTotal = valorAtual + pratoEncontrado.price;
      setValorTotal(novoTotal.toFixed(2).replace('.', ','));
    }

    setPratoSelecionado('');
  };

  const handleRemoveItem = (index: number) => {
    const itemParaRemover = itensSelecionados[index];
    const pratoEncontrado = mockMenuItems.find((p) => p.name === itemParaRemover.nome);

    setItensSelecionados((prevItens) => {
      if (itemParaRemover.quantidade > 1) {
        const novosItens = [...prevItens];
        novosItens[index] = {
          ...novosItens[index],
          quantidade: novosItens[index].quantidade - 1,
        };
        return novosItens;
      } else {
        return prevItens.filter((_, i) => i !== index);
      }
    });

    if (pratoEncontrado) {
      const valorAtual = parseFloat(valorTotal.replace(',', '.')) || 0;
      const novoTotal = Math.max(0, valorAtual - pratoEncontrado.price);
      setValorTotal(novoTotal.toFixed(2).replace('.', ','));
    }
  };

  // Salvar (Criar ou Editar via Contexto)
  const handleSavePedido = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente || !local || itensSelecionados.length === 0) {
      alert('Por favor, preencha o cliente, localização e adicione pelo menos um item.');
      return;
    }

    const valorParsed = parseFloat(valorTotal.replace(',', '.')) || 0;

    if (editingId) {
      const pedidoEditado: Pedido = {
        id: editingId,
        cliente,
        local,
        itens: itensSelecionados,
        status,
        valorTotal: valorParsed,
        observacoes: observacoes.trim() ? observacoes : undefined,
      };
      atualizarPedido(pedidoEditado);
    } else {
      const novoId = `#00${pedidos.length + 1}`;
      const novoPedido: Pedido = {
        id: novoId,
        cliente,
        local,
        itens: itensSelecionados,
        valorTotal: valorParsed,
        status,
        observacoes: observacoes.trim() ? observacoes : undefined,
      };
      adicionarPedido(novoPedido);
    }

    setIsModalOpen(false);
  };

  const handleExcluirPedido = (id: string) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o pedido ${id}?`);
    if (confirmacao) {
      excluirPedido(id);
    }
  };

  const getStatusBadge = (status: Pedido['status']) => {
    switch (status) {
      case 'Recebido':
        return 'bg-[#EAE8E1] text-[#324A38] border border-[#4A3728]/20';
      case 'Em preparo':
        return 'bg-[#C29B38]/87 text-[#324A38] border border-[#C29B38]/87';
      case 'Pronto':
        return 'bg-[#38A4C2]/70 text-[#324A38] border border-[#38A4C2]/70';
      case 'Entregue':
        return 'bg-[#85E697]/87 text-[#324A38] border border-[#85E697]/87';
      default:
        return 'bg-[#EAE8E1] text-[#324A38]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-cafe font-sans flex flex-col justify-between">
      
      {/* HEADER */}
      <header className="bg-verde text-[#F7F5F0] py-4 shadow-sm border-b border-verde">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl  font-serif font-bold tracking-wide text-dourado">
              LE PRESTIGE
            </h1>
           
          </div>

          <Link 
            href="/admin"
            className="font-sans w-full sm:w-auto text-center flex items-center justify-center gap-2 border-2 border-creme hover:bg-white/10 text-creme px-8 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar ao Painel</span>
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe mb-1">
              Fila de Pedidos
            </h2>
            <p className="text-xs sm:text-sm text-cafe">
              Cadastre novos pedidos ou edite os detalhes e status dos pedidos ativos.
            </p>
          </div>

          <button 
            onClick={handleOpenCreateModal}
            className="bg-verde hover:bg-cafe text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Novo Pedido</span>
          </button>
        </div>

        {/* Tabela de pedidos */}
        <div className="bg-white rounded-2xl border border-verde shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#CDD2D3]/62 text-cafe text-xs sm:text-sm font-bold border-b border-verde">
                  <th className="py-4 px-4 sm:px-6">Nº Pedido</th>
                  <th className="py-4 px-4">Cliente</th>
                  <th className="py-4 px-4">Itens Solicitados</th>
                  <th className="py-4 px-4 text-center">Quantidade</th>
                  <th className="py-4 px-4">Valor Total</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#324A38]/20 text-xs sm:text-sm">
                {pedidos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-cafe font-medium">
                      Nenhum pedido na fila no momento.
                    </td>
                  </tr>
                ) : (
                  pedidos.map((pedido) => (
                    <tr key={pedido.id} className="hover:bg-[#F7F5F0]/50 transition-colors">
                      <td className="py-5 px-4 sm:px-6 font-bold text-cafe align-middle">
                        {pedido.id}
                      </td>

                      <td className="py-5 px-4 align-middle">
                        <p className="font-bold text-cafe">{pedido.cliente}</p>
                        <p className="text-xs text-cafe">{pedido.local}</p>
                      </td>

                      <td className="py-5 px-4 align-middle">
                        {pedido.itens.map((item, index) => (
                          <p key={index} className="text-cafe font-medium">
                            {item.nome}
                          </p>
                        ))}
                        {/* Exibição da Observação na Tabela */}
                        {pedido.observacoes && (
                          <div className="mt-1.5 flex items-start gap-1 text-[11px] text-[#A84343] font-medium bg-[#A84343]/5 p-1.5 rounded-md border border-cafe">
                            <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{pedido.observacoes}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-5 px-4 text-center align-middle">
                        {pedido.itens.map((item, index) => (
                          <p key={index} className="text-cafe font-bold">
                            {item.quantidade}x
                          </p>
                        ))}
                      </td>

                      <td className="py-5 px-4 font-bold text-cafe align-middle">
                        R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}
                      </td>

                      <td className="py-5 px-4 text-center align-middle">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(pedido.status)}`}>
                          {pedido.status}
                        </span>
                      </td>

                      <td className="py-5 px-4 align-middle">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => handleOpenEditModal(pedido)}
                            title="Editar Pedido"
                            className="p-1.5 text-cafe hover:text-verde hover:bg-[#F7F5F0] rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleExcluirPedido(pedido.id)}
                            title="Excluir Pedido"
                            className="p-1.5 text-[#A84343] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-verde">
            
            <div className="bg-verde px-6 py-4 flex justify-between items-center">
              <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-dourado">
                Lançar/editar pedido
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#F7F5F0]/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePedido} className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cafe mb-1">Nome do Cliente</label>
                  <input 
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafefocus:outline-none focus:border-verde"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cafe mb-1">Mesa / Localização</label>
                  <input 
                    type="text"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    placeholder="Ex: Mesa 04..."
                    className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cafe mb-1">Itens do Pedido</label>
                <div className="flex gap-2">
                  <select 
                    value={pratoSelecionado}
                    onChange={(e) => setPratoSelecionado(e.target.value)}
                    className="flex-1 bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                  >
                    <option value="">Selecione um prato do cardápio...</option>
                    {mockMenuItems.map((prato) => (
                      <option key={prato.id || prato.name} value={prato.name}>
                        {prato.name} {prato.price ? `- R$ ${prato.price.toFixed(2).replace('.', ',')}` : ''}
                      </option>
                    ))}
                  </select>

                  <button 
                    type="button"
                    onClick={handleAddItem}
                    className="bg-cafe hover:bg-cafe text-dourado px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </div>

              <div className="border border-cafe rounded-lg p-3 min-h-[90px] space-y-2 bg-white">
                {itensSelecionados.length === 0 ? (
                  <p className="text-xs text-[#4A3728]/40 italic">Nenhum item adicionado ainda.</p>
                ) : (
                  itensSelecionados.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#EAE8E1]/80 border border-cafe rounded-lg px-3 py-1.5 text-xs text-cafe">
                      <span>
                        {item.nome} <strong className="ml-1 text-verde">({item.quantidade}x)</strong>
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-800 font-bold ml-2"
                        title="Diminuir quantidade ou remover"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cafe mb-1">Status do Pedido</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Pedido['status'])}
                    className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                  >
                    <option value="Recebido">Recebido</option>
                    <option value="Em preparo">Em preparo</option>
                    <option value="Pronto">Pronto</option>
                    <option value="Entregue">Entregue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-cafe mb-1">Valor Total Calculado</label>
                  <input 
                    type="text"
                    value={valorTotal}
                    onChange={(e) => setValorTotal(e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cafe mb-1">Observações da Cozinha / Atendimento</label>
                <textarea 
                  rows={2}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Ex: cliente alérgico a pimenta, sem gelo no suco..."
                  className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-verde rounded-lg text-sm font-semibold text-[#000000] hover:bg-verde transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-verde hover:bg-verde text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  Salvar Pedido
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-verde py-4 px-4 text-center text-xs text-cafe bg-[#FFFFFF]">
        Le Prestige Café e Bistrô &mdash; Painel Interno de Gestão | Desenvolvido por <strong className="text-cafe font-bold">byron.solutions</strong>
      </footer>

    </div>
  );
}