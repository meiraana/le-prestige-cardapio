'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pedido, mockPedidosIniciais } from '@/data/mockOrders';

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
  // Fila de Pedidos em Memória
  pedidos: Pedido[];
  adicionarPedido: (novoPedidoData: Omit<Pedido, 'id'>) => void;
  atualizarPedido: (pedidoEditado: Pedido) => void;
  excluirPedido: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidosIniciais);

  const adicionarAoCarrinho = (item: { id: string; name: string; price: number; description?: string; image?: string }) => {
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

  // Adiciona o pedido gerando o código ID incremental (#004, #005...)
  const adicionarPedido = (novoPedidoData: Omit<Pedido, 'id'>) => {
    const proximoNumero = pedidos.length + 1;
    const novoId = `#${String(proximoNumero).padStart(3, '0')}`;

    const novoPedido: Pedido = {
      ...novoPedidoData,
      id: novoId,
    };

    setPedidos((prev) => [novoPedido, ...prev]);
  };

  const atualizarPedido = (pedidoEditado: Pedido) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoEditado.id ? pedidoEditado : p))
    );
  };

  const excluirPedido = (id: string) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
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