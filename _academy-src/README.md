# Telecom ADV Academy

Site da Telecom ADV Academy com dois funis:

1. **E-book gratuito "O Mar Azul da Advocacia"**: anúncio → `/` (formulário) → `/obrigado/` → **clique para entrar no grupo de WhatsApp** (a métrica principal).
2. **Imersão Telecom ADV** (workshop pago de 2 noites): `/imersao/` → checkout na Hotmart → `/imersao/obrigado/` → grupo dos inscritos.

Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, exportado como site estático (`output: "export"`) e servido por nginx.

| Rota | O que é |
|---|---|
| `/` | Landing do e-book com formulário |
| `/obrigado/` | Obrigado do e-book + botão do grupo (`noindex`) |
| `/imersao/` | Página de vendas da imersão |
| `/imersao/obrigado/` | Pós-compra: grupo dos inscritos, agenda, preparação (`noindex`) |
| `/imersao/imersao-telecom-adv.ics` | Os 2 dias para importar na agenda (gerado da config) |
| `/privacidade/` | Política de Privacidade (LGPD) |
| `/termos/` | Termos de Uso |

---

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # http://localhost:3000
```

Para testar o build de produção:

```bash
npm run build                # gera ./out
npx serve out                # http://localhost:3000
```

Requer Node 18.18+ (testado com 22 e 25).

---

## Variáveis de ambiente

Todas são `NEXT_PUBLIC_*`: entram no HTML/JS **na hora do build**. Mudou alguma, precisa de novo deploy.

| Variável | Obrigatória | Exemplo / observação |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | sim | `https://telecomadv.academy` (canonical, Open Graph, sitemap) |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | sim | Webhook do n8n que recebe o lead |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | sim | `https://chat.whatsapp.com/...` |
| `NEXT_PUBLIC_EBOOK_URL` | não | Padrão: `/ebook/o-mar-azul-da-advocacia.pdf` (já incluso em `public/ebook/`) |
| `NEXT_PUBLIC_SUPPORT_WHATSAPP` | não | Padrão: `5511973733366`. Usado no erro do formulário do e-book e no "Tenho outra dúvida" da imersão |
| `NEXT_PUBLIC_META_PIXEL_ID` | não | Sem ele, o Pixel não carrega |
| `NEXT_PUBLIC_GA4_ID` | não | `G-XXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | não | `AW-XXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | não | Rótulo da conversão de lead no Google Ads |
| `NEXT_PUBLIC_YOUTUBE_VIDEO_ID` | não | Vídeo do Jason na página de obrigado. Vazio = bloco não aparece |
| `NEXT_PUBLIC_HOTMART_CHECKOUT_URL` | sim (imersão) | Checkout do ingresso; o VIP entra como order bump |
| `NEXT_PUBLIC_HOTMART_CHECKOUT_VIP_URL` | não | Checkout com o VIP já selecionado. Vazio = "Quero o VIP" usa o checkout acima |
| `NEXT_PUBLIC_WHATSAPP_INSCRITOS_URL` | sim (imersão) | Grupo exclusivo dos inscritos |
| `NEXT_PUBLIC_WAITLIST_URL` | sim (imersão) | Lista de espera, exibida depois do encerramento das vendas |

---

## Deploy no Dokploy

1. **Create Application** → conecte o repositório do GitHub, branch `main`.
2. **Build Type:** `Dockerfile` (caminho `./Dockerfile`).
3. **Build-time Arguments** (não use a aba *Environment*; as variáveis precisam existir durante o build):
   ```
   NEXT_PUBLIC_SITE_URL=https://telecomadv.academy
   NEXT_PUBLIC_LEAD_WEBHOOK_URL=https://...
   NEXT_PUBLIC_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/...
   NEXT_PUBLIC_META_PIXEL_ID=...
   ...
   ```
4. **Domains:** `telecomadv.academy`, **container port `80`**, HTTPS com Let's Encrypt. Aponte o DNS (registro A) para o IP da VPS antes.
5. **Deploy.** A cada push na `main` (com auto deploy ligado) ou mudança de variável, faça *Redeploy*.

O `nginx.conf` já entrega gzip, cache de 1 ano para `/_next/static/`, 30 dias para imagens, HTML sempre revalidado e `try_files` para `/`, `/obrigado/` e as páginas legais.

### CORS no n8n

O formulário faz o `POST` direto do navegador. No nó **Webhook** do n8n:
- *HTTP Method:* `POST`
- *Options → Allowed Origins (CORS):* `https://telecomadv.academy`
- *Respond:* imediatamente, com status 200. Qualquer status fora de 2xx é tratado como erro.

O site espera até 10 s pela resposta e tenta mais uma vez (12 s) antes de mostrar o erro.

---

## JSON enviado ao webhook

`POST` com `Content-Type: application/json`:

```json
{
  "event_id": "19a3985b-3d17-48ea-9b18-9d588362e4d0",
  "event_name": "Lead",
  "timestamp": "2026-10-22T22:52:00.677Z",
  "lead": {
    "name": "Maria da Silva",
    "first_name": "Maria",
    "email": "maria@exemplo.com",
    "whatsapp": "+5511987654321",
    "role": "Advogado(a)",
    "state": "SP",
    "consent": true,
    "consent_text": "Concordo em receber o e-book e comunicações da Telecom ADV Academy por e-mail e WhatsApp, conforme a Política de Privacidade."
  },
  "attribution": {
    "utm_source": "meta",
    "utm_medium": "paid",
    "utm_campaign": "mar-azul",
    "utm_content": "video1",
    "utm_term": "",
    "fbclid": "ABC123",
    "gclid": "",
    "fbp": "fb.1.1700000000000.123456789",
    "fbc": "fb.1.1792709520677.ABC123"
  },
  "context": {
    "page_url": "https://telecomadv.academy/",
    "landing_url": "https://telecomadv.academy/?utm_source=meta&utm_medium=paid&utm_campaign=mar-azul&utm_content=video1&fbclid=ABC123",
    "referrer": "https://l.instagram.com/",
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) ..."
  },
  "offer": "ebook-mar-azul-da-advocacia"
}
```

Detalhes:
- `lead.email` vem em minúsculas e sem espaços; `lead.whatsapp` em E.164 (`+55` + DDD + 9 dígitos).
- `lead.state` é `null` quando não informado.
- `lead.role` é um destes: `Advogado(a)`, `Bacharel em Direito`, `Estudante de Direito`, `Profissional de telecomunicações`, `Outro`.
- Campos de `attribution` vazios vêm como `""`. As UTMs ficam guardadas no `sessionStorage`, então valem mesmo se a pessoa navegar antes de se cadastrar.
- `fbc` vem do cookie `_fbc`; se ele ainda não existir e houver `fbclid`, é montado no formato do Meta (`fb.1.<timestamp>.<fbclid>`).
- `landing_url` e `referrer` são os da **primeira** página da sessão.

### Deduplicação Pixel × API de Conversões

O `event_id` do JSON é o mesmo `eventID` enviado no evento `Lead` do Pixel. No n8n, ao chamar a API de Conversões do Meta, use:
`event_name: "Lead"`, `event_id: {{event_id}}`, `event_time` a partir de `timestamp`, `action_source: "website"`, `event_source_url: {{context.page_url}}`, e em `user_data`: `em`/`ph` (SHA-256 de `lead.email` e de `lead.whatsapp` sem o `+`), `fbp`, `fbc`, `client_user_agent`.

---

## Rastreamento

| Onde | Meta Pixel | GA4 | Google Ads |
|---|---|---|---|
| Toda página | `PageView` | `page_view` (automático) | |
| Envio do formulário (sucesso) | `Lead` com `eventID` | `generate_lead` | `conversion` (`send_to: ADS_ID/LABEL`, `transaction_id: event_id`) |
| `/obrigado/` | `ViewContent` | | |
| Clique no grupo | `JoinGroupClick` (custom) | `join_group_click` | |

Os scripts carregam depois da hidratação (`next/script` `afterInteractive`), sem bloquear a renderização.

### Banner de cookies (escolha documentada)

Modelo **opt-out**: o Pixel e o gtag carregam normalmente na primeira visita, e o banner informa e oferece **Aceitar** ou **Recusar**.
- **Recusar** grava a escolha no `localStorage`, chama `fbq('consent','revoke')` e atualiza o Consent Mode do Google para `denied`. Nas visitas seguintes os scripts já sobem revogados.
- Por que não bloquear até aceitar: no tráfego de anúncio, a maioria das pessoas ignora o banner. Bloquear o Pixel até o clique derruba a mensuração de `PageView`/`Lead` e piora a otimização das campanhas, que foi o requisito do briefing.
- Risco: a LGPD não exige consentimento prévio para todo cookie de medição, mas a ANPD recomenda opt-in para cookies não essenciais de publicidade. Se quiser o modelo opt-in, troque o valor padrão em `src/components/Tracking.tsx` (`deniedExpr` passa a tratar "sem escolha" como recusado).

---

## Imersão Telecom ADV

### Configuração da turma: `src/config/imersao.ts`

Datas, preços, lote, encerramento, selo do VIP, parcelamento e dias de garantia ficam nesse arquivo, comentado campo a campo. O layout lê tudo dali. Depois de alterar, faça commit e redeploy.

Todas as datas usam o fuso de Brasília (`-03:00`) e são **exibidas** sempre em horário de Brasília. As contagens comparam instantes absolutos, então ficam certas para quem acessa de qualquer fuso.

**Ativar o lote promocional**
1. Em `earlyBird`, ponha `enabled: true` e ajuste `price` e `until`.
2. Na Hotmart, crie a oferta com o preço do lote (ou um cupom) e use o link dela em `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`.
3. Na virada (`until`), a página volta sozinha para `ticketPrice`, **mas a Hotmart não**: troque a oferta/link na Hotmart e faça redeploy com o link do preço cheio.

**Encerrar as vendas**
Ajuste `salesClose`. A partir desse horário, cada visitante vê "Inscrições encerradas" e o botão da lista de espera, e os botões de compra e o botão fixo do celular somem. Isso acontece sozinho, no navegador, sem novo deploy. Encerre também o produto na Hotmart, porque o link do checkout continua válido para quem já o tiver.

**Parcelamento**
`installments: { count: 12, value: 9.74 }` mostra "ou em até 12x de R$ 9,74 no cartão" abaixo do preço cheio. Use exatamente o que o checkout da Hotmart mostra. `null` esconde.

**Selo "O valor do ingresso vira desconto no curso"**
`ticketCreditOnCourse: true`.

> Antes da hidratação (os primeiros milissegundos) a página mostra o estado do build: vendas abertas e o lote conforme a config. Por isso, depois do encerramento definitivo, vale um redeploy para o HTML já sair encerrado.

### Configuração na Hotmart

1. **Produto**: "Imersão Telecom ADV", preço = `ticketPrice` (ou o do lote).
2. **Order bump do VIP**: em *Ferramentas → Order Bump*, crie um produto "Ingresso VIP" de R$ 47 (`vipPrice`) e associe ao checkout do ingresso.
3. **Link com o VIP pré-selecionado** (opcional): se a sua conta permitir uma oferta com o bump já marcado (ou um produto combo de R$ 144), coloque esse link em `NEXT_PUBLIC_HOTMART_CHECKOUT_VIP_URL`. Sem isso, "Quero o VIP" abre o mesmo checkout e a pessoa marca o bump lá.
4. **Página de obrigado**: nas configurações do produto, na opção de página de obrigado / redirecionamento após a compra (o nome do menu muda entre versões da Hotmart), use `https://telecomadv.academy/imersao/obrigado/` para compras aprovadas. Para boleto e Pix pendentes, prefira a página padrão da Hotmart, que explica o pagamento pendente.
5. **Pixel**: em *Ferramentas → Pixel de rastreamento*, cadastre o mesmo `NEXT_PUBLIC_META_PIXEL_ID` (e o GA4, se quiser). O **`Purchase` é disparado pela Hotmart**; o site não dispara `Purchase`, para não duplicar.
6. **Origem da venda**: o site repassa ao checkout `src` e as UTMs da visita (guardadas na sessão). O `src` é o que chegou na URL ou, na falta, `utm_source_utm_campaign` (ex.: `meta_imersao-dez`); sem nada, `site-imersao`. No relatório de vendas da Hotmart, filtre por **Origem (src)**.

Exemplo de link de anúncio: `https://telecomadv.academy/imersao/?utm_source=meta&utm_medium=paid&utm_campaign=imersao-dez&utm_content=reels1`

### Rastreamento da imersão

| Onde | Meta Pixel | GA4 |
|---|---|---|
| `/imersao/` | `PageView`, `ViewContent` (value = preço vigente, BRL) | `page_view`, `view_item` |
| Botão de compra | `InitiateCheckout` (`content_name` "Ingresso" ou "VIP", value 97 ou 144, BRL) | `begin_checkout` (mesmo value) |
| Compra aprovada | `Purchase` **pela Hotmart** | (pela Hotmart, se configurado) |
| Grupo dos inscritos | `JoinGroupClick` (custom) | `join_group_click` |

O botão de compra espera o GA4 confirmar o evento (no máximo 800 ms) antes de ir para a Hotmart.

---

## Imagens

Os originais ficam em `assets-src/` (fora do build): capa do e-book, foto do Jason e a arte do hero da landing (`hero-desktop.png` 16:9 e `hero-mobile.png` 9:16, com o Jason à direita e espaço livre à esquerda/no alto para o texto). Depois de trocar alguma:

```bash
npm run images        # gera AVIF/WebP em public/img/ e o apple-icon
```

As imagens de compartilhamento (1200×630) são geradas a partir dos modelos HTML em `scripts/` (requer `npx playwright install chromium`):
- `node scripts/og.mjs` → `public/img/og.png` (e-book)
- `node scripts/og.mjs imersao` → `public/img/og-imersao.png` (as datas estão escritas em `scripts/og-imersao.html`; atualize se mudar a turma)

---

## Qualidade (medida em 22/10/2026)

Lighthouse mobile com gzip e cache como no nginx, e com Pixel + GA4 ativos:

| Página | Performance | Acessibilidade | SEO |
|---|---|---|---|
| `/` | 94–95 | 100 | 100 |
| `/obrigado/` | — | 100 | (noindex, proposital) |
| `/imersao/` | 92 | 100 | 100 |
| `/imersao/obrigado/` | 98 | 100 | (noindex, proposital) |

CLS 0 em todas. Testado em 375, 768 e 1440 px, sem rolagem horizontal.

---

## Placeholders para substituir

| O quê | Onde |
|---|---|
| Foto do Jason (hoje: foto de terno bege do site do escritório; o briefing previa um recorte `jason.png`) | `assets-src/jason.png` → `npm run images` |
| Razão social e CNPJ | `src/components/Closing.tsx`, `src/app/privacidade/page.tsx`, `src/app/termos/page.tsx` |
| E-mail de contato (LGPD) | `src/app/privacidade/page.tsx`, `src/app/termos/page.tsx` (`[EMAIL-DE-CONTATO]`) |
| Data de atualização das páginas legais | `[DD/MM/AAAA]` nas mesmas páginas |
| Link do grupo | `NEXT_PUBLIC_WHATSAPP_GROUP_URL` |
| Webhook do n8n | `NEXT_PUBLIC_LEAD_WEBHOOK_URL` |
| Meta Pixel / GA4 / Google Ads | `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` |
| Vídeo do Jason (30–60 s) | `NEXT_PUBLIC_YOUTUBE_VIDEO_ID` |
| Dia e horário das lives ("quintas, 20h") | `src/app/obrigado/page.tsx` |
| Revisão jurídica do texto das páginas de Privacidade e Termos | as duas páginas |
| **Imersão:** checkout da Hotmart (e o do VIP, se houver) | `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`, `NEXT_PUBLIC_HOTMART_CHECKOUT_VIP_URL` |
| **Imersão:** grupo dos inscritos e lista de espera | `NEXT_PUBLIC_WHATSAPP_INSCRITOS_URL`, `NEXT_PUBLIC_WAITLIST_URL` |
| **Imersão:** número de suporte (hoje o do escritório) | `NEXT_PUBLIC_SUPPORT_WHATSAPP` |
| **Imersão:** foto do Jonatas (hoje: monograma "JR") | gere `public/img/jonatas-*.webp` e troque o monograma em `src/components/imersao/Sections.tsx` (`Hosts`) |
| **Imersão:** foto recortada do Jason sobre o oceano (`jason.png` com fundo transparente) | hoje usa a foto de escritório com o oceano em degradê por cima |
| **Imersão:** selo do VIP "Mais escolhido" | `vipBadge` em `src/config/imersao.ts`. Na primeira turma ainda não há dado que sustente a frase; "Recomendado" é mais seguro |
| **Imersão:** datas da imagem de compartilhamento | `scripts/og-imersao.html` → `node scripts/og.mjs imersao` |
