'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit2, Trash2, X } from 'lucide-react';
import { MenuItem, CATEGORIES, mockMenuItems } from '@/data/mockData'
import Image from 'next/image';
import { isPageStatic } from 'next/dist/build/utils';
import { SegmentPrefixRSCPathnameNormalizer } from 'next/dist/server/normalizers/request/segment-prefix-rsc';

export default function GestaoCardapioPage() {
    const [pratos, setPratos] = useState<MenuItem[]>(mockMenuItems);
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('TODOS');
    const pratosFiltrados = categoriaAtiva === 'TODOS'
        ? pratos
        : pratos.filter((p) => p.category.toUpperCase() === categoriaAtiva.toUpperCase());
    
    const handleToggleStatus = (id: number) => {
        setPratos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
        );
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState<MenuItem['category']>("Entradas");
    const [disponivel, setDisponivel] = useState(true);
    const [imagem, setImagem] = useState('');

    const handleOpenCreateModal = () => {
        setEditingId(null);
        setNome('');
        setDescricao('');
        setPreco('');
        setCategoria('Entradas');
        setDisponivel(true);
        setImagem('');
        setIsModalOpen(true);
    };
    const handleOpenEditModal = (prato: MenuItem) => {
        setEditingId(prato.id);
        setNome(prato.name);
        setDescricao(prato.description);
        setPreco(prato.price.toFixed(2).replace('.', ','));
        setCategoria(prato.category);
        setDisponivel(prato.available);
        setImagem(prato.image || '');
        setIsModalOpen(true);
    };
    const handleSavePrato = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome.trim() || !preco.trim()) {
            alert('Preencha ao menos o nome e o preço do prato.');
            return;
        }

        const precoFormatado = parseFloat(preco.replace(',', '.')) || 0;

        if (editingId !== null) {
            setPratos((prev) =>
                prev.map((p) =>
                    p.id === editingId
                        ? {
                            ...p,
                            name: nome,
                            description: descricao,
                            price: precoFormatado,
                            category: categoria,
                            available: disponivel,
                            image: imagem || p.image,
                        }
                    : p
                )
            );
        } else {
            const novoPrato: MenuItem = {
                id: pratos.length > 0 ? Math.max(...pratos.map((p) => p.id)) + 1 : 1,
                name: nome,
                description: descricao,
                price: precoFormatado,
                category: categoria,
                available: disponivel,
                image: imagem.trim() ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
            };
            setPratos((prev) => [novoPrato, ...prev]);
         }

        setIsModalOpen(false);
        };

    return (
        <div className="min-h-screen bg-[#F7F5F0] text-cafe font-sans flex flex-col justify-between">
            {/* Header */}
            <header className="bg-verde text-[#F7F5F0] py-4 shadow-sm border-b border-verde">
                <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-dourado">
                            LE PRESTIGE
                        </h1>
                    </div>

                    <Link href="/admin" className="font-sans w-full sm:w-auto text-center flex items-center justify-center gap-2 border-2 border-creme hover:bg-white/10 text-creme px-8 py-2 rounded-lg text-sm font-medium transition-all">
                        <ArrowLeft className="w-4 h-4"/>
                        <span>Retornar ao Painel</span>
                    </Link>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-5xl mx-auto px-4 py-4 sm:py-12 w-full grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe mb-1">
                            Gestão do Cardápio
                        </h2>
                        <p className="text-xs sm:text-sm text-cafe">
                            Cadastre, edite a disponibilidade ou remova pratos do menu.
                        </p>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleOpenCreateModal}
                        className="bg-verde hover:bg-cafe text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                        <Plus className="w-4 h-4"/>
                        <span>Cadastrar Novo Prato</span>
                    </button>
                </div>

                {/* Espaço para os filtros e os cards */}
                { /* FILTROS DE CATEGORIA */}
                <div className="font-serif flex items-center gap-2 overflow-x-auto justify-between mb-6 pb-4 py-4">
                    <button 
                        onClick={() => setCategoriaAtiva('TODOS')}
                        className={`px-4 py-1.5 w-full rounded-full text-xs font-bold transition-all uppercase whitespace-nowrap ${
                            categoriaAtiva === 'TODOS'
                                ? 'bg-verde text-white'
                                : 'bg-[#EAE8E1] text-cafe hover:bg-[#dedbd2]'
                        }`}
                    > 
                        Todos
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaAtiva(cat.toUpperCase())}
                            className={`px-4 py-1.5 w-full rounded-full text-xs font-bold transition-all uppercase whitespace-nowrap ${
                                categoriaAtiva === cat.toUpperCase()
                                    ? 'bg-verde text-white'
                                    : 'bg-[#EAE8E1] text-cafe hover:bg-[#dedbd2]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* GRID DE CARDS DOS PRATOS */}
                {pratosFiltrados.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-verde p-12 text-center text-cafe">
                        Nenhum prato encontrado nesta categoria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {pratosFiltrados.map((prato) => (
                            <div
                                key={prato.id}
                                className="bg-white rounded-2xl border border-verde overflow-hidden shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
                            >
                                {/* Imagem e Badge de Status */}
                                <div className="relative h-44 w-full bg-[#EAE8E1]">
                                    {prato.image ? (
                                        <Image src={prato.image} alt={prato.name} fill unoptimized className="object-cover"/>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-cafe/40">
                                            Sem Foto
                                        </div>
                                    )}

                                    {/* Botão de Status Ágil */}
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(prato.id)}
                                        title="Clique para alterar disponibilidade"
                                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm transition-all ${
                                            prato.available
                                                ? 'bg-[#85E697]/90 text-[#1B4D2E] hover:bg-[#85E697]'
                                                : 'bg-[#F28B82]/90 text-[#5C1D1D] hover:bg-[#F28B82]'
                                        }`}
                                    >
                                        <span className={`w-3 h-3 rounded-full ${
                                            prato.available ? 'bg-emerald-600' : 'bg-red-600'
                                        }`}
                                    />
                                    {prato.available ? 'Disponível' : 'Esgotado'}
                                    </button>
                                </div>

                                {/* Informações e Ações */}
                                <div className="font-serif p-4 flex flex-col justify-between grow">
                                    <h3 className="font-bold text-cafe text-base mb-2 line-clamp-1">
                                        {prato.name}
                                    </h3>

                                    <div className="flex items-center justify-between pt-2 border-t border-verde/10 mt-auto">
                                        <span className="font-bold text-cafe text-sm">
                                            R$ {prato.price.toFixed(2).replace('.', ',')}
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenEditModal(prato)}
                                                title='Editar Prato'
                                                className="p-1.5 text-cafe hover:text-verde hover:bg-creme rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4"/>
                                            </button>
                                            <button
                                                type="button"
                                                title='Excluir Prato'
                                                className="p-1.5 text-[#A84343] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>

            {/* POP-UP / MODAL DE CADASTRO OU EDIÇÃO */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-verde">
                        <div className="bg-verde px-6 py-4 flex justify-between items-center">
                            <h3 className="font-serif text-xl font-bold text-dourado">
                                {editingId !== null ? 'Editar Prato' : 'Cadastrar Novo Prato'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-creme/80 hover:text-white"
                            >
                                <X className='w-5 h-5'/>
                            </button>
                        </div>

                        {/* Formulário dos Campos */}
                        <form onSubmit={(handleSavePrato)} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-cafe mb-1">
                                        Nome do Prato
                                    </label>
                                    <input
                                        type='text'
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Ex: Risotto de Cogumelos Trufado"
                                        className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                                    ></input>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-cafe mb-1">
                                        Categoria
                                    </label>
                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value as MenuItem['category'])}
                                        className='w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde'
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-cafe mb-1">
                                        Preço Unitário (R$)
                                    </label>
                                    <input
                                        type='text'
                                        value={preco}
                                        onChange={(e) => setPreco(e.target.value)}
                                        placeholder="Ex: 34,90"
                                        className="w=full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-nome focus:border-verde"
                                    ></input>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-cafe mb-1">
                                        Status no Cardápio
                                    </label>
                                    <select
                                        value={disponivel ? 'true' : 'false'}
                                        onChange={(e) => setDisponivel(e.target.value === 'true')}
                                        className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                                    >
                                        <option value="true">Disponível</option>
                                        <option value="false">Esgotado</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-cafe mb-1">
                                    URL da Imagem / Foto do Prato
                                </label>
                                <input
                                    type="text"
                                    value={imagem}
                                    onChange={(e) => setImagem(e.target.value)}
                                    placeholder="https://exemplo.com/imagem-do-prato.jpg"
                                    className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-cafe mb-1">
                                    Descrição e Ingredientes
                                </label>
                                <textarea
                                    rows={3}
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Descreva os ingredientes, acompanhamentos e modo de preparo..."
                                    className="w-full bg-[#EAE8E1]/60 border border-verde rounded-lg px-3 py-2 text-sm text-cafe focus:outline-none focus:border-verde resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 border border-verde rounded-lg text-sm font-semibold text-cafe hover:bg-[#EAE8E1] transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-verde hover:bg-cafe text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                                >
                                    Salvar Prato
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="border-t border-verde py-4 px-4 text-center text-xs text-cafe bg-[#FFFFFF]">
                Le Prestige Café e Bistrô &mdash; Painel Interno de Gestão | Desenvolvido por{' '}
                <strong className="text-cafe font-bold">byron.solutions</strong>
            </footer>
        </div>
    );
}