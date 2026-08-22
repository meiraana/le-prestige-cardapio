'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pedido, mockPedidosIniciais } from '@/data/mockOrders';
import { MenuItem, mockMenuItems } from '@/data/mockData'; 

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  quantidade: number;
}

interface CartContextType {
  carrinho: CartItem[];
  adicionarAoCarrinho: (item: { id: string; name: string; price: number; description?: string; image?: string }) => void;
  removerDoCarrinho: (id: string) => void;
  excluirDoCarrinho: (id: string) => void;
  limparCarrinho: () => void;
  // Fila de Pedidos
  pedidos: Pedido[];
  adicionarPedido: (novoPedidoData: Omit<Pedido, 'id'>) => void;
  atualizarPedido: (pedidoEditado: Pedido) => void;
  excluirPedido: (id: string) => void;
  // Gestão do Cardápio
  menuItems: MenuItem[];
  adicionarPrato: (novoPrato: Omit<MenuItem, 'id'>) => void;
  atualizarPrato: (pratoEditado: MenuItem) => void;
  excluirPrato: (id: number) => void;
  alternarDisponibilidade: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidosIniciais);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);

  const adicionarAoCarrinho = (item: { id: string; name: string; price: number; description?: string; image?: string }) => {
    // Valida se o item está disponível no menu
    const prato = menuItems.find((p) => String(p.id) === String(item.id));
    if (prato && !prato.available) {
      alert('Este prato está esgotado!');
      return;
    }

    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item))
        .filter((item) => item.quantidade > 0)
    );
  };

  const excluirDoCarrinho = (id: string) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => setCarrinho([]);

  const adicionarPedido = (novoPedidoData: Omit<Pedido, 'id'>) => {
    const proximoNumero = pedidos.length + 1;
    const novoId = `#${String(proximoNumero).padStart(3, '0')}`;
    setPedidos((prev) => [{ ...novoPedidoData, id: novoId }, ...prev]);
  };

  const atualizarPedido = (pedidoEditado: Pedido) => {
    setPedidos((prev) => prev.map((p) => (p.id === pedidoEditado.id ? pedidoEditado : p)));
  };

  const excluirPedido = (id: string) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  // Funções do Cardápio
  const adicionarPrato = (novoPratoData: Omit<MenuItem, 'id'>) => {
    const novoId = menuItems.length > 0 ? Math.max(...menuItems.map((m) => m.id)) + 1 : 1;
    setMenuItems((prev) => [...prev, { ...novoPratoData, id: novoId }]);
  };

  const atualizarPrato = (pratoEditado: MenuItem) => {
    setMenuItems((prev) => prev.map((p) => (p.id === pratoEditado.id ? pratoEditado : p)));
  };

  const excluirPrato = (id: number) => {
    setMenuItems((prev) => prev.filter((p) => p.id !== id));
    excluirDoCarrinho(String(id));
  };

  const alternarDisponibilidade = (id: number) => {
    setMenuItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        excluirDoCarrinho,
        limparCarrinho,
        pedidos,
        adicionarPedido,
        atualizarPedido,
        excluirPedido,
        menuItems,
        adicionarPrato,
        atualizarPrato,
        excluirPrato,
        alternarDisponibilidade,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}