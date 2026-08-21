'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockMenuItems, CATEGORIES, type MenuItem } from '@/data/mockData';

export default function HomePage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('TODOS');
  const [busca, setBusca] = useState('');

  const categorias = ['TODOS', ...CATEGORIES.map((cat) => cat.toUpperCase())];

  const pratosPorCategoria = mockMenuItems.filter((prato) => {
    if (categoriaAtiva === 'TODOS') return true;
    return prato.category.toUpperCase() === categoriaAtiva.toUpperCase();
  });

  const resultadosDropdown = mockMenuItems.filter((item) => {
    const textoBusca = busca.toLowerCase();
    return (
      item.name.toLowerCase().includes(textoBusca) || 
      item.category.toLowerCase().includes(textoBusca)
    );
  });

  return (
    <div className="bg-[#F5F1E8] text-[#2b2118] min-h-screen font-sans flex flex-col justify-between">
      <div>
        {/* HEADER*/}
        <header className="bg-[#3E2A1E] text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-2">
            <div className="flex items-center gap-3">
              <div className="w-20 h-14 shrink-0 flex items-center justify-center">
                <img
                  src="/img/logo leprestige.png"
                  alt="Logo Le Prestige"
                  className="w-[140px] h-[80px] max-w-none object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-xl md:text-2xl tracking-wide leading-tight">LE PRESTIGE</h1>
                <p
                  className="text-[#C29B38]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 'normal',
                    fontStyle: 'italic',
                    fontSize: '16px',
                    lineHeight: '100%',
                  }}
                >
                  Café e Bistrô
                </p>
              </div>
            </div>

            <Link href="/admin">
              <button className="px-5 py-2 bg-[#6B5543] hover:bg-[#584536] text-[#C29B38] font-display text-sm md:text-base font-semibold leading-none rounded-full transition-colors">
                ADMINISTRADOR
              </button>
            </Link>
          </div>
        </header>

        <section className="text-center py-6 md:py-8 px-4">
          <p
            className="text-lg md:text-2xl text-[#3E2A1E]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              lineHeight: '30px',
              textAlign: 'center',
            }}
          >
            "Comida feita com carinho, sabor e ingredientes frescos."
          </p>
        </section>

        {/* SOBRE NÓS */}
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <div className="bg-white rounded-2xl border border-[#324A38] shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2
                className="mb-3 text-[#3E2A1E]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '28px',
                  lineHeight: '100%',
                }}
              >
                Sobre nós
              </h2>
              <p
                className="text-[#5b5044] text-xs sm:text-sm md:text-base leading-relaxed"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                O Le Prestige Café e Bistrô foi criado em 2016 com o objetivo de oferecer comidas tradicionais brasileiras em
                um ambiente agradável e acolhedor. Servimos pratos caseiros, cafés, lanches e sobremesas preparados com
                cuidado e ingredientes selecionados.
              </p>
            </div>
            <div className="flex-1 w-full">
              <img
                src="/img/foto do restaurante.png"
                alt="Ambiente do restaurante"
                className="rounded-xl w-full h-48 md:h-56 object-cover"
              />
            </div>
          </div>
        </section>

        {/* PRATOS CHEFES DA CASA */}
        <section className="featured-dishes max-w-5xl mx-auto px-4 pb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3E2A1E] mb-4 border-b border-[#ECE7DE] pb-2">
            Pratos Chefes da Casa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#324A38] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <img src="/img/bolinho de feijoada.png" className="w-full h-36 object-cover" alt="Bolinho de Feijoada" />
              <div className="p-4 flex flex-col justify-between grow font-serif">
                <div>
                  <h3 className="font-bold text-[#2b2118] text-base mb-1 line-clamp-1">Bolinho de Feijoada</h3>
                  <p className="text-[#5b5044] text-xs font-sans line-clamp-2 mb-3">
                    Bolinhos crocantes acompanhados de molho de laranja.
                  </p>
                </div>
                <p className="font-bold text-[#3E2A1E] text-sm">R$ 19,90</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#324A38] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <img src="/img/escondidinho.png" className="w-full h-36 object-cover" alt="Escondidinho" />
              <div className="p-4 flex flex-col justify-between grow font-serif">
                <div>
                  <h3 className="font-bold text-[#2b2118] text-base mb-1 line-clamp-1">Escondidinho</h3>
                  <p className="text-[#5b5044] text-xs font-sans line-clamp-2 mb-3">
                    Carne-seca desfiada coberta com purê de mandioca.
                  </p>
                </div>
                <p className="font-bold text-[#3E2A1E] text-sm">R$ 35,90</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#324A38] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <img src="/img/dadinho de tapioca.png" className="w-full h-36 object-cover" alt="Dadinho de Tapioca" />
              <div className="p-4 flex flex-col justify-between grow font-serif">
                <div>
                  <h3 className="font-bold text-[#2b2118] text-base mb-1 line-clamp-1">Dadinho de Tapioca</h3>
                  <p className="text-[#5b5044] text-xs font-sans line-clamp-2 mb-3">
                    Cubos de tapioca com queijo coalho e geleia.
                  </p>
                </div>
                <p className="font-bold text-[#3E2A1E] text-sm">R$ 18,90</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#324A38] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <img src="/img/romeu e julieta.png" className="w-full h-36 object-cover" alt="Romeu e Julieta" />
              <div className="p-4 flex flex-col justify-between grow font-serif">
                <div>
                  <h3 className="font-bold text-[#2b2118] text-base mb-1 line-clamp-1">Romeu e Julieta</h3>
                  <p className="text-[#5b5044] text-xs font-sans line-clamp-2 mb-3">
                    Creme de queijo com goiabada e crocante.
                  </p>
                </div>
                <p className="font-bold text-[#3E2A1E] text-sm">R$ 18,90</p>
              </div>
            </div>
          </div>
        </section>

        {/* CARDÁPIO COMPLETO */}
        <section id="cardapio" className="full-menu max-w-5xl mx-auto px-4 pb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3E2A1E] mb-4 border-b border-[#ECE7DE] pb-3">
            Cardápio Completo
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative z-50">
              <div className="flex items-center gap-2 bg-white border border-[#324A38]/30 rounded-xl px-4 py-2">
                <span className="text-[#a89c89]">🔍</span>
                <input
                  type="text"
                  placeholder="Pesquisar por prato ou categoria..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="flex-1 outline-none placeholder:text-[#a89c89] bg-transparent text-sm font-sans text-[#2b2118]"
                />
              </div>

              {busca.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#324A38]/20 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                  {resultadosDropdown.length > 0 ? (
                    resultadosDropdown.map((item: MenuItem) => (
                      <Link
                        href={`/prato/${item.id}`}
                        key={item.id}
                        onClick={() => setBusca('')}
                        className="block p-3.5 border-b border-gray-100 last:border-none hover:bg-[#F5F1E8] transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-left flex flex-col items-start">
                            <div className="font-bold text-[#3E2A1E] text-sm">{item.name}</div>
                            <div className="text-xs text-[#C29B38] font-semibold mt-0.5">{item.category}</div>
                          </div>
                          <div className="text-sm font-semibold text-[#324A38] whitespace-nowrap">
                            R$ {item.price.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-[#5b5044] text-center text-sm">
                      Nenhum prato encontrado para "{busca}".
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/carrinho">
              <button className="w-full sm:w-auto bg-[#324A38] hover:bg-[#3D2C24] text-white px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors shadow-sm">
                Ver Carrinho de Pedidos
              </button>
            </Link>
          </div>

          {/* FILTROS DE CATEGORIA */}
          <div className="font-serif flex items-center gap-2 overflow-x-auto mb-6 pb-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase whitespace-nowrap ${
                  categoriaAtiva === cat
                    ? 'bg-[#324A38] text-white'
                    : 'bg-[#EAE8E1] text-[#3D2C24] hover:bg-[#dedbd2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GRID DE CARDS POR CATEGORIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pratosPorCategoria.length > 0 ? (
              pratosPorCategoria.map((prato) => (
                <div
                  key={prato.id}
                  className="bg-white rounded-xl border border-[#324A38] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="relative h-36 w-full bg-[#EAE8E1]">
                    <img
                      src={prato.image || prato.image || '/img/placeholder.png'}
                      className="w-full h-full object-cover"
                      alt={prato.name}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between grow font-serif">
                    <h3 className="font-bold text-[#2b2118] text-base mb-3 line-clamp-1">
                      {prato.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-[#324A38]/10 mt-auto">
                      <span className="font-bold text-[#3D2C24] text-sm">
                        R$ {prato.price.toFixed(2).replace('.', ',')}
                      </span>
                      <Link href={`/prato/${prato.id}`}>
                        <button className="bg-[#324A38] hover:bg-[#3D2C24] text-white text-xs font-sans font-medium px-3 py-1.5 rounded-lg transition-colors">
                          Ver Prato &rarr;
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[#5b5044]">
                Nenhum item encontrado nesta categoria.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* FOOTER*/}
      <footer className="bg-[#3E2A1E] text-white pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          <div>
            <h3 className="font-display text-[32px] mb-1">LE PRESTIGE</h3>
            <p className="text-[#C9A15A] italic text-[24px] mb-4">Café e Bistrô</p>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '1.6px',
              }}
            >
              Comida feita com carinho, sabor e ingredientes frescos em um ambiente acolhedor.
            </p>
          </div>
          <div>
            <h4 className="font-display text-[#C9A15A] text-[24px] mb-3">Horário</h4>
            <p
              className="text-white mb-2"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '1.6px',
              }}
            >
              <span style={{ fontWeight: 700 }}>Segunda a Sexta:</span> 11h às 22h
            </p>
            <p
              className="text-white mb-2"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '1.6px',
              }}
            >
              <span style={{ fontWeight: 700 }}>Sábado:</span> 9h às 23h
            </p>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '1.6px',
              }}
            >
              <span style={{ fontWeight: 700 }}>Domingo:</span> 9h às 18h
            </p>
          </div>
          <div>
            <h4 className="font-display text-[#C9A15A] text-[24px] mb-3">Contato &amp; Local</h4>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '1.6px',
              }}
            >
              Avenida BPS, nº 1303<br />
              Bairro Pinheirinho, Itajubá – MG<br />
              CEP: 37500-903<br />
              Tel: (35) 3722-4587
            </p>
          </div>
        </div>
        <div className="border-t-[3px] border-[#ECE7DE] max-w-7xl mx-auto px-6 pt-5 flex flex-col md:flex-row justify-between gap-2">
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', lineHeight: '30px' }}>
            © 2026 Le Prestige Café e Bistrô. Todos os direitos
          </p>
        </div>
      </footer>
    </div>
  );
}