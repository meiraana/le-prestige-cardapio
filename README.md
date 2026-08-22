
# ☕ Le Prestige Café e Bistrô — Cardápio Digital 
##  Sobre o Projeto

Este projeto consiste no desenvolvimento de uma solução web de **Cardápio Digital e Painel de Gestão Operacional** para o estabelecimento **Le Prestige Café e Bistrô**, fundado em 2016 e especializado em culinária tradicional brasileira sob a premissa: *"Comida feita com carinho, sabor e ingredientes frescos."*

A aplicação soluciona a necessidade de digitalização do menu do restaurante, oferecendo uma **Landing Page e Cardápio Interativo** dinâmico e moderno para os clientes finais, além de uma **Área Administrativa Centralizada** (com dois sistemas CRUD) para o gerenciamento em tempo real do catálogo de produtos e dos pedidos online e presenciais.

> **Projeto Final do Processo de Capacitação / Trainee**:  
> Desenvolvido pela equipe de desenvolvedores da **byron.solutions** — Empresa Júnior de Consultoria em TI vinculada à **Universidade Federal de Itajubá (UNIFEI)**.

---

## Identidade Visual e Design

A interface foi projetada no **Figma** priorizando a usabilidade, acessibilidade e a essência acolhedora da cultura brasileira:
- **Estilo Visual**: Design moderno, limpo, fluido e responsivo (suporte a dispositivos de 320px até 4K).
- **Paleta de Cores**:
  - `Café / Marrom`: Primária institucional e de contraste (`#675241`, etc.).
  - `Verde`: Secundária para destaques, badges e ações ativas.
  - `Creme / Branco Off-white`: Fundo suave e acolhedor (`#F8F6F0`).
  - `Dourado / Amarelo`: Detalhes refinados e destaques de categoria.

 **[Acessar Protótipo Interativo no Figma](https://www.figma.com/design/SU9mdRqplFpkWqY9bzOzbu/Untitled?node-id=0-1&t=Ud315Phr5XG4ogxu-0)**

---

## Funcionalidades Principais

### Área do Cliente (Público)

1. **Landing Page Institucional (`/`)**:
   - **Cabeçalho (Navbar)**: Identidade visual com atalho rápido para a área administrativa.
   - **Seção Hero**: Apresentação da marca e slogan oficial.
   - **Seção Destaques**: Cards com pratos selecionados (Bolinho de Feijoada, Escondidinho de Carne-Seca, Dadinho de Tapioca, Romeu e Julieta Moderno).
   - **Seção Sobre Nós**: História do restaurante e foto do ambiente do bistrô.
   - **Cardápio Interativo**:
     - Busca rápida por nome do prato (campo aberto).
     - Filtro dinâmico por categoria (Entradas, Pratos Principais, Sobremesas, Bebidas).
     - Cards detalhados indicando preço, foto, descrição e tag de status (*Disponível* ou *Esgotado*).
   - **Footer Institucional**: Horários de funcionamento (Seg-Sex: 11h-22h | Sáb: 9h-23h | Dom: 9h-18h), endereço completo em Itajubá-MG e créditos de desenvolvimento.

2. **Simulação de Consumo e Pedido (`/carrinho`)**:
   - Adição e remoção de itens diretamente pelo cardápio.
   - Ajuste de quantidade por prato.
   - Cálculo automático do valor total em tempo real.
   - Envio e simulação do pedido direto para a fila de gestão do restaurante.

---

### Área Administrativa & Gestão (CRUDs)

3. **Hub de Direcionamento da Gestão (`/admin`)**:
   - Painel central restrito para escolha de navegação entre a **Gestão do Cardápio** ou a **Fila de Pedidos**.

4. **Painel de Gestão de Pratos (CRUD 1 - `/admin/cardapio`)**:
   - **Cadastrar novos pratos**: Formulário modal com validação de campos (Nome, Descrição, Preço Decimal, Categoria, Status e URL da Imagem).
   - **Listagem completa**: Tabela/grid dos pratos cadastrados.
   - **Edição e Exclusão**: Atualização de dados dos pratos em tempo real.
   - **Alternância de Status**: Alteração rápida entre *Disponível* e *Esgotado*.

5. **Painel de Gestão de Pedidos (CRUD 2 - `/admin/pedidos`)**:
   - **Acompanhamento de Pedidos**: Visualização unificada de pedidos feitos via **Online** (cliente pelo site) ou **Presencial** (lançados pelo garçom/atendente).
   - **Lançamento Manual**: Formulário para cadastro imediato de pedidos presenciais em mesa.
   - **Gestão do Fluxo Operacional**: Atualização sequencial do status do pedido:  
     `Recebido` ➔ `Em Preparo` ➔ `Pronto` ➔ `Entregue`.

---

## Tecnologias Utilizadas

- **Framework Front-end**: [Next.js](https://nextjs.org/) (React 18 + App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes de Imagem**: `next/image` (Otimização automática de assets)
- **Ícones**: [Lucide React](https://lucide.dev/) / React Icons
- **Prototipagem**: [Figma](https://www.figma.com/)
- **Controle de Versão**: Git & GitHub

---

## Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- Gerenciador de pacote `npm`

### Passo a Passo

1. **Clonar o repositório**:

   git clone : 



2. **Instalar as dependências**:

npm install

3. **Executar o servidor de desenvolvimento**:
   
npm run dev

5. **Acessar a aplicação**:
Abra o seu navegador e acesse [http://localhost:3000](http://localhost:3000).

---

## Equipe de Desenvolvimento (byron.solutions)

Projeto desenvolvido com excelência pelos trainees e membros da **byron.solutions**:

| Desenvolvedor(a) | Função | GitHub |
| --- | --- | --- |
| **Ana Cristina Meira**  | [github](https://github.com/anacmeira) |
| ** Heitor Moura** |  [github](https://github.com/HeitorSrm) |
| **Jose Luiz Ferreira** | [github](https://github.com/Jose-Luiz-Ferreira) |
| **Matheus Ferrari** | [github](https://github.com/matheusferrari-mar) |

---

## Licença & Disposições Finais

Desenvolvido em **Agosto de 2026** para a **Projeto Final da Capacitação Trainee** e para o cliente **Le Prestige Café e Bistrô**.

© **byron.solutions** — Todos os direitos reservados.
