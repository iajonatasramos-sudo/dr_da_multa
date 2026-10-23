import { BASE_PATH } from "@/lib/site";
import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso · Telecom ADV Academy",
  alternates: { canonical: `${BASE_PATH}/termos/` },
};

export default function Termos() {
  return (
    <LegalPage title="Termos de Uso" updated="[DD/MM/AAAA]">
      <p>
        Estes termos regem o uso do site e dos materiais da Telecom ADV Academy, mantida por{" "}
        <strong>[RAZÃO SOCIAL]</strong>, CNPJ <strong>[XX.XXX.XXX/0001-XX]</strong>.
      </p>

      <h2>Natureza do conteúdo</h2>
      <p>
        O e-book, as lives e os demais conteúdos têm caráter educativo e são destinados a profissionais e estudantes
        de Direito. Não constituem consultoria jurídica nem promessa de resultado.
      </p>

      <h2>Direitos autorais</h2>
      <p>
        O e-book é de uso pessoal. Não é permitido revendê-lo, alterá-lo ou distribuí-lo publicamente sem autorização
        por escrito.
      </p>

      <h2>Grupo de WhatsApp</h2>
      <p>
        A participação no grupo Telecom ADV é gratuita e voluntária. Mensagens com propaganda, ofensas ou conteúdo
        alheio ao tema podem levar à remoção. Você pode sair do grupo quando quiser.
      </p>

      <h2>Contato</h2>
      <p>
        Dúvidas sobre estes termos: <a href="mailto:[EMAIL-DE-CONTATO]">[EMAIL-DE-CONTATO]</a>.
      </p>
    </LegalPage>
  );
}
