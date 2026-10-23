# Dr. Da Multa Telecom — site

Site estático de https://drdamultatelecom.com.br. O repositório é clonado pelo **Git Version Control** do cPanel (DNSPRO) **direto na pasta do site** (`/home/elitedoc/drdamultatelecom.com.br`): o que está na `main` é o que está no ar.

## Estrutura

```
.htaccess                                 ← HTTPS, redirects das URLs antigas do WordPress, cache,
                                            e bloqueio de .git / README (o repositório fica na pasta pública)
index.html                                ← landing + wizard de diagnóstico
guia-do-consumidor-de-telecomunicacoes/   ← leitor do ebook (paywall HeroSpark)
thanks/obrigado-ebook-guia-do-consumidor-de-telecomunicacoes/  ← obrigado pela compra
assets/                                   ← imagens e CSS
downloads/                                ← PDF do guia
robots.txt, sitemap.xml
```

## Integrações

- **Leads**: webhooks n8n em `n8n.thehubdoc.com` (`lead_dr_da_multa_diagnostico`, `lead_dr_da_solitacao_contato`, `dr_da_multa_contato_typebot01`).
- **Rastreamento**: Google Tag Manager `GTM-TNB5HRDV`, Google tag `GT-PJR5LPQ8`, Google Ads `AW-18052366694`. O Meta Pixel é carregado pelo GTM; a página dispara eventos `fbq('trackCustom', ...)`.
- **Venda do guia**: HeroSpark (`PAYMENT_URL` no topo do HTML do guia).

## Primeira instalação no cPanel

Em **Git Version Control → Create**, com a pasta `drdamultatelecom.com.br` vazia:
- Clone URL: `https://github.com/iajonatasramos-sudo/dr_da_multa.git`
- Repository Path: `drdamultatelecom.com.br`
- Repository Name: `dr_da_multa`

## Publicar uma alteração

1. Edite, faça commit e `git push` para a `main`.
2. No cPanel → **Git Version Control** → *Manage* → aba **Pull or Deploy** → **Update from Remote**.

Não há etapa de deploy: o pull já atualiza os arquivos que estão no ar.

Para testar localmente: `python3 -m http.server 8000` nesta pasta e abra http://localhost:8000.
