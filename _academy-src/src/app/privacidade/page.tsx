import { BASE_PATH } from "@/lib/site";
import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade · Telecom ADV Academy",
  alternates: { canonical: `${BASE_PATH}/privacidade/` },
};

export default function Privacidade() {
  return (
    <LegalPage title="Política de Privacidade" updated="[DD/MM/AAAA]">
      <p>
        Esta política explica como a <strong>[RAZÃO SOCIAL]</strong>, inscrita no CNPJ{" "}
        <strong>[XX.XXX.XXX/0001-XX]</strong>, responsável pela Telecom ADV Academy, trata os seus dados pessoais, em
        conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>Quais dados coletamos</h2>
      <ul>
        <li>Dados que você informa no formulário: nome, e-mail, WhatsApp, perfil profissional e estado.</li>
        <li>
          Dados de navegação: origem da visita (parâmetros UTM e identificadores de clique de anúncios), páginas
          acessadas, tipo de navegador e cookies de medição.
        </li>
      </ul>

      <h2>Para que usamos</h2>
      <ul>
        <li>Enviar o e-book solicitado por e-mail e WhatsApp.</li>
        <li>Enviar comunicações da Telecom ADV Academy, como avisos de lives, conteúdos e convites para cursos.</li>
        <li>Medir o desempenho dos nossos anúncios e melhorar o site.</li>
      </ul>
      <p>
        A base legal é o seu consentimento (art. 7º, I, da LGPD), dado ao marcar a caixa no formulário, e o legítimo
        interesse para a medição de anúncios (art. 7º, IX).
      </p>

      <h2>Com quem compartilhamos</h2>
      <p>
        Com fornecedores que operam o serviço em nosso nome: hospedagem, automação de envio de mensagens e e-mails, e
        plataformas de anúncios e análise (Meta e Google). Não vendemos seus dados.
      </p>

      <h2>Cookies</h2>
      <p>
        Usamos cookies do Meta Pixel e do Google para medir o resultado dos anúncios. Você pode recusá-los no aviso
        exibido na primeira visita ou apagá-los nas configurações do seu navegador.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>Enquanto você quiser receber nossas comunicações, ou até você pedir a exclusão.</p>

      <h2>Seus direitos</h2>
      <p>
        Você pode pedir acesso, correção, exclusão dos seus dados ou cancelar o consentimento a qualquer momento,
        escrevendo para <a href="mailto:[EMAIL-DE-CONTATO]">[EMAIL-DE-CONTATO]</a>. Para parar de receber mensagens no
        WhatsApp, basta responder “SAIR”.
      </p>
    </LegalPage>
  );
}
