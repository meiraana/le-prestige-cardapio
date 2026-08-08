export interface MenuItem {
  id: number;
  name: string;
  category: 'Entradas' | 'Pratos principais' | 'Lanches' | 'Bebidas' | 'Cafés' | 'Sobremesas';
  price: number;
  description: string;
  image?: string;
  available: boolean;
}

// Lista com todas as categorias disponíveis
export const CATEGORIES = [
  'Entradas',
  'Pratos principais',
  'Lanches',
  'Bebidas',
  'Cafés',
  'Sobremesas',
] as const;

export const mockMenuItems: MenuItem[] = [
  // --- ENTRADAS ---
  {
    id: 1,
    name: 'Dadinho de Tapioca',
    category: 'Entradas',
    price: 18.90,
    description: 'Cubos de tapioca com queijo coalho, servidos com geleia de pimenta.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0LfECSGLxupNkR17ZxGLXwCskjJBSTk-2AVGKA9OEw&s=10',
    available: true,
  },
  {
    id: 2,
    name: 'Bolinho de Feijoada',
    category: 'Entradas',
    price: 19.90,
    description: 'Bolinhos crocantes de feijoada acompanhados de molho de laranja e pimenta.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQednKmfZ-EzIkCo_MiqNKrj3hCigRCpjGKnoyceD0E9g&s=10',
    available: true,
  },

  // --- PRATOS PRINCIPAIS ---
  {
    id: 3,
    name: 'Parmegiana Brasileira',
    category: 'Pratos principais',
    price: 34.90,
    description: 'Filé de frango empanado, molho de tomate artesanal, queijo, arroz branco e batatas rústicas.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLCfjujq_CvlHh4ES-kbZLyCbUKutu16Ae4mu4fQmLg&s=10',
    available: true,
  },
  {
    id: 4,
    name: 'Picadinho da Casa',
    category: 'Pratos principais',
    price: 36.90,
    description: 'Carne em cubos ao molho, acompanhada de arroz, feijão, farofa crocante e banana grelhada.',
    image: 'https://lucanacozinha.com.br/wp-content/uploads/2019/01/picadinho-capa.jpg',
    available: true,
  },
  {
    id: 5,
    name: 'Frango com Creme de Milho',
    category: 'Pratos principais',
    price: 31.90,
    description: 'Frango grelhado servido com creme de milho, arroz e legumes.',
    image: 'https://www.seara.com.br/wp-content/uploads/2025/09/file-de-frango-com-creme-de-milho-portal-minha-receita-2.jpg',
    available: true,
  },
  {
    id: 6,
    name: 'Escondidinho de Carne-Seca',
    category: 'Pratos principais',
    price: 35.90,
    description: 'Carne-seca desfiada coberta com purê de mandioca e queijo gratinado.',
    image: 'https://receitinhasdemae.com.br/wp-content/uploads/2024/08/454240946_1040001027698497_1106177248696721551_n.jpg',
    available: true,
  },

  // --- LANCHES ---
  {
    id: 7,
    name: 'Sanduíche Le Prestige',
    category: 'Lanches',
    price: 26.90,
    description: 'Pão artesanal, hambúrguer, queijo coalho, tomate, folhas e molho especial da casa.',
    image: 'https://manualdohomemmoderno.com.br/files/2020/05/como-fazer-o-melhor-hamburguer-caseiro-como-escolher-as-carnes-e-2-receitas-simples-e-praticas-como-fazer-o-melhor-hamburguer-caseiro-como-escolher-as-carnes-e-2-receitas-simples-e-praticas-4.jpg',
    available: true,
  },
  {
    id: 8,
    name: 'Pão de Queijo Recheado',
    category: 'Lanches',
    price: 16.90,
    description: 'Pão de queijo grande recheado com carne desfiada e queijo.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPB3jLZ_eyeN1BbuYcoMBN6inom-0pvUA5h8B358RfVQ&s=10',
    available: true,
  },

  // --- BEBIDAS ---
  {
    id: 9,
    name: 'Suco Natural',
    category: 'Bebidas',
    price: 9.90,
    description: 'Sabores disponíveis conforme as frutas do dia.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCUniXcz6fltuZ25oqFYH4eT0vMH8c5rixkoD77D1zA&s=10',
    available: true,
  },
  {
    id: 10,
    name: 'Refrigerante',
    category: 'Bebidas',
    price: 7.00,
    description: 'Lata 350ml (Consulte opções de sabores disponíveis).',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wy-Xg3gWI2oVtWLlbz61ZRhi3pSbjjU-JhIC6f6aCw&s=10',
    available: true,
  },
  {
    id: 11,
    name: 'Água',
    category: 'Bebidas',
    price: 5.00,
    description: 'Garrafa 500ml (Com gás ou Sem gás).',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkBcyhQGyQINOz3Fnbfds6S9iG87oVCCRRBCTjVlchg&s=10',
    available: true,
  },

  // --- CAFÉS ---
  {
    id: 12,
    name: 'Café Expresso',
    category: 'Cafés',
    price: 6.00,
    description: 'Café moído na hora, encorpado e com crema aveludada.',
    image: 'https://blog.bicafebrasil.com.br/wp-content/uploads/2023/09/Capsulda-de-cafe-expresso.jpg',
    available: true,
  },
  {
    id: 13,
    name: 'Café Coado',
    category: 'Cafés',
    price: 7.00,
    description: 'Café especial preparado no filtro de papel, sabor suave e aromático.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_OsC_Wf9YPTqtkj71EAw0ekTAAu_OA3WMie5hDMXSg&s=10',
    available: true,
  },
  {
    id: 14,
    name: 'Cappuccino Brasileiro',
    category: 'Cafés',
    price: 11.90,
    description: 'Café, leite cremoso, canela e um toque de doce de leite.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQohu56rBsQai_ynNJjzTnnG9IOLyqjyIeWv7T9ef5TURIC5l6DbOF_s2xQ&s=10',
    available: true,
  },

  // --- SOBREMESAS ---
  {
    id: 15,
    name: 'Pudim de Leite',
    category: 'Sobremesas',
    price: 15.90,
    description: 'Pudim tradicional servido com calda de caramelo.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeuNx2olY7HKvKdzB8D_N3h2rU5e5v6ADR6v7bv2oiw&s=10',
    available: true,
  },
  {
    id: 16,
    name: 'Romeu e Julieta Moderno',
    category: 'Sobremesas',
    price: 18.90,
    description: 'Creme de queijo com goiabada e crocante de castanhas.',
    image: 'https://receitinhasdadani.com.br/wp-content/uploads/2025/01/Romeu-e-Julieta-na-travessa--1140x720.jpeg',
    available: true,
  },
];