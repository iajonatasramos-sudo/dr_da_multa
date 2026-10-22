# Dr. Da Multa Telecom — site

Site estático de https://drdamultatelecom.com.br, publicado via **Git Version Control** do cPanel (DNSPRO).

## Estrutura

```
public/                                   ← tudo aqui vai para o servidor
├── index.html                            ← landing + wizard de diagnóstico
├── guia-do-consumidor-de-telecomunicacoes/index.html   ← leitor do ebook (paywall HeroSpark)
├── thanks/obrigado-ebook-guia-do-consumidor-de-telecomunicacoes/index.html  ← obrigado pela compra
├── assets/                               ← imagens e CSS
├── downloads/                            ← PDF do guia
├── .htaccess                             ← HTTPS, redirects das URLs antigas do WordPress, cache
├── robots.txt
└── sitemap.xml
.cpanel.yml                               ← tarefa de deploy do cPanel
```

## Integrações

- **Leads**: webhooks n8n em `n8n.thehubdoc.com` (`lead_dr_da_multa_diagnostico`, `lead_dr_da_solitacao_contato`, `dr_da_multa_contato_typebot01`).
- **Rastreamento**: Google Tag Manager `GTM-TNB5HRDV`, Google tag `GT-PJR5LPQ8`, Google Ads `AW-18052366694`. O Meta Pixel é carregado pelo GTM; a página dispara eventos `fbq('trackCustom', ...)`.
- **Venda do guia**: HeroSpark (`PAYMENT_URL` no topo do HTML do guia).

## Publicar uma alteração

1. Edite os arquivos em `public/`, faça commit e `git push`.
2. No cPanel → **Git Version Control** → *Manage* no repositório → aba **Pull or Deploy**.
3. **Update from Remote** e depois **Deploy HEAD Commit**.

O deploy copia `public/` por cima de `/home/elitedoc/drdamultatelecom.com.br/`. Ele não apaga arquivos: se remover um arquivo do repositório, apague-o também no servidor pelo Gerenciador de Arquivos.

Para testar localmente: `cd public && python3 -m http.server 8000` e abra http://localhost:8000.
