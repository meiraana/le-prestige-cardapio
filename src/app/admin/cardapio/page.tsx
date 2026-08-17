'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

export default function GestãoCardapioPage() {
    return (
        <div className="min-h-screen bg-[#F7F5F0] text-cafe font-sans flex flex-col justify-between">
            {/* Header */}
            <header className="bg-verde text-[#F7F5F0] py-4 shadow-sm border-b border-verde">
                <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex itens-center gap-3">
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold trancking-wide text-dourado">
                            LE PRESTIGE
                        </h1>
                    </div>

                    <Link href="/admin" className="font-sans w=full sm:w-auto text-center flex items-center justify-center gap-2 border-2 border-creme hover:bg-white/10 text-creme px-8 py-2 rounded-lg text-sm font-medium transition-all">
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

                    <button type="button" className="bg-verde hover:bg-cafe text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm">
                        <Plus className="w-4 h-4"/>
                        <span>Cadastrar Novo Prato</span>
                    </button>
                </div>

                {/* Espaço para os filtros e os cards */}
            </main>

            {/* Footer */}
            <footer className="border-t border-verde py-4 px-4 text-center text-xs text-cafe bg-[#FFFFFF]">
                Le Prestige Café e Bistrô &mdash; Painel Interno de Gestão | Desenvolvido por{' '}
                <strong className="text-cafe font-bold">byron.solutions</strong>
            </footer>
        </div>
    );
}