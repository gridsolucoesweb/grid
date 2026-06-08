# Grid Soluções Web

Site institucional, landing pages, funis de venda e checkout da **Grid Soluções Web** — Estratégia, Sites & SDRs Digitais para WhatsApp.

---

## Estrutura do Projeto

```
/
├── assets/                    # Materiais visuais compartilhados
│   ├── logo/                  # Variações da logo (SVG, PNG, dark, light)
│   ├── backgrounds/           # Backgrounds de seção
│   ├── patterns/              # Padrões SVG decorativos
│   ├── photos/                # Fotos de pessoas, ambientes, clínicas
│   └── icons/                 # Ícones personalizados
│
├── shared/                    # Código compartilhado
│   ├── css/
│   │   ├── reset.css          # Reset CSS
│   │   ├── tokens.css         # Design tokens (cores, tipografia, espaçamento)
│   │   └── components.css     # Componentes reutilizáveis (nav, botões, forms, footer)
│   └── js/
│       └── utils.js           # Scroll animations, nav effects, form helpers
│
├── site-institucional/        # Site principal da Grid
│   └── index.html
│
├── landing-pages/             # Landing pages de campanhas
│   ├── dara-clinicas/         # LP do produto Dara para clínicas
│   └── diagnostico-gratuito/  # LP de captação de leads
│
├── obrigado/                  # Páginas de thank you
│   ├── diagnostico/
│   └── contrato/
│
├── funis/                     # Funis de venda completos
│   └── dara-estetica/
│
├── checkout/                  # (Fase 2) Checkout Stripe
│
├── index.html                 # Redirect → site-institucional/
├── vercel.json                # Configuração Vercel (rotas, cache, segurança)
└── README.md
```

---

## Deploy

O projeto é deployado automaticamente na **Vercel** a cada push no branch `main` via integração com GitHub.

**Repositório:** https://github.com/gridsolucoesweb/grid

---

## Como adicionar uma nova página

1. Crie uma nova pasta com o nome da página
2. Adicione `index.html` dentro dela
3. Linke os arquivos compartilhados com caminho relativo:
   ```html
   <link rel="stylesheet" href="../shared/css/reset.css">
   <link rel="stylesheet" href="../shared/css/tokens.css">
   <link rel="stylesheet" href="../shared/css/components.css">
   <script src="../shared/js/utils.js"></script>
   ```
4. Faça `git add`, `git commit` e `git push` — o deploy acontece automaticamente.

---

## Fase 2 — Checkout

Integração com **Stripe** para:
- Pagamento do setup (one-time fee)
- Assinatura mensal recorrente (subscription)

A pasta `/checkout/` está reservada para esta fase.

---

## Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--terracota` | `#8B3A1A` | Cor primária |
| `--champagne` | `#D4A96A` | Destaque dourado |
| `--cream` | `#F5EDD8` | Backgrounds claros |
| `--brown-dark` | `#2C1810` | Texto principal |
| `--teal` | `#2E7D6E` | Sucesso / confirmação |

---

## Tipografia

- **Display:** Playfair Display (títulos e headings)
- **Corpo:** DM Sans (textos e UI)
- **Elegante:** Cormorant Garamond (descrições e subtítulos)
