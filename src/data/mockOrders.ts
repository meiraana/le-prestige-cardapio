export interface ItemPedido {
  nome: string;
  quantidade: number;
}

export interface Pedido {
  id: string;
  cliente: string;
  local: string; 
  itens: ItemPedido[];
  valorTotal: number;
  status: 'Recebido' | 'Em preparo' | 'Pronto' | 'Entregue';
}

export const mockPedidosIniciais: Pedido[] = [
  {
    id: '#001',
    cliente: 'João Silva',
    local: 'Mesa 04',
    itens: [
      { nome: 'Bolinho de Feijoada', quantidade: 1 },
      { nome: 'Suco Natural de Laranja', quantidade: 1 },
    ],
    valorTotal: 29.80,
    status: 'Em preparo',
  },
  {
    id: '#002',
    cliente: 'Maria Oliveira',
    local: 'Rua dos Ariovaldo, 35',
    itens: [
      { nome: 'Picadinho da Casa', quantidade: 1 },
      { nome: 'Pudim de Leite', quantidade: 1 },
    ],
    valorTotal: 52.80,
    status: 'Pronto',
  },
  {
    id: '#003',
    cliente: 'Carlos Eduardo',
    local: 'Balcão/Retirada',
    itens: [
      { nome: 'Café Expresso', quantidade: 2 },
      { nome: 'Dadinho de Tapioca', quantidade: 1 },
    ],
    valorTotal: 30.90,
    status: 'Entregue',
  },
];