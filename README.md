# Documentação Técnica e Institucional - CIEBP Site Protótipo

**Arquitetura, propósito, expansão, divulgação e implementação de projetos no CIEBP**

**Data de registro:** 03/06/2026

## 1. Visão geral do projeto

Este documento registra a proposta técnica e institucional do projeto CIEBP Site Protótipo, hospedado no GitHub e publicado na Vercel. O objetivo do arquivo é servir como documentação de referência para manutenção, evolução, apresentação pública e expansão do projeto dentro do contexto do CIEBP - Centro de Inovação da Educação Básica Paulista.

O projeto tem como finalidade organizar, divulgar e apoiar a implementação de projetos pedagógicos, tecnológicos e institucionais desenvolvidos no CIEBP. A documentação também registra a arquitetura atual observável no repositório, as camadas técnicas envolvidas, os cuidados de segurança web e os caminhos recomendados para crescimento futuro.

## 2. Propósito institucional

O propósito central do projeto é construir uma base digital para fortalecer a presença institucional do CIEBP e ampliar a divulgação de suas ações. O site funciona como um protótipo de plataforma informativa e operacional, capaz de reunir páginas institucionais, projetos, tutoriais, informações locais, tabelas, transmissões ao vivo, dashboard e possíveis integrações com banco de dados.

A ideia de expansão deve ser compreendida em três sentidos:

1. Expansão institucional: aumentar a visibilidade do CIEBP, seus espaços, suas ações e seus resultados.
2. Expansão pedagógica: registrar e compartilhar projetos desenvolvidos por professores, estudantes, escolas parceiras e equipes técnicas.
3. Expansão tecnológica: preparar uma estrutura web que possa crescer com novas páginas, integrações, dados dinâmicos, formulários, dashboards e serviços externos.

Dessa forma, o projeto não é apenas um site estático. Ele pode evoluir para uma plataforma de divulgação, documentação e acompanhamento de iniciativas educacionais.

## 3. Estrutura observável do repositório

A análise pública do repositório mostra que o projeto está organizado como um protótipo de site, com pastas e arquivos voltados para front-end, documentação, imagens, JavaScript, Supabase e páginas HTML. O repositório público apresenta a descrição “Desenvolvimento do protótipo do site” e possui deploy associado na Vercel.

Estrutura observada no repositório:

- .agents/skills/supabase-postgres-best-practices: indica preocupação com práticas relacionadas ao Supabase/PostgreSQL.
- css: camada de estilos da aplicação.
- docs: documentação complementar.
- imagem: imagens e recursos visuais.
- js: scripts responsáveis por comportamento, interatividade e integrações.
- supabase: arquivos relacionados ao banco de dados e integrações.
- templates: modelos reutilizáveis.
- aovivo.html: página voltada para transmissão ou acompanhamento ao vivo.
- ciebp.html: página institucional do CIEBP.
- dashboard.html: página de painel administrativo ou visualização de dados.
- equipes.html: página de equipes.
- index.html: página inicial.
- local.html: página de localização ou informações do espaço físico.
- projeto.html: página de apresentação de projetos.
- tabela.html: página de tabela, possivelmente relacionada a torneios, eventos ou dados dinâmicos.
- tutoriais.html: página para materiais de orientação.
- package.json e package-lock.json: arquivos de dependências e scripts do ambiente Node/Vite.

As linguagens predominantes exibidas pelo GitHub são HTML, CSS, JavaScript, Go Template e PLpgSQL, indicando combinação entre front-end, templates e banco de dados.

## 4. Arquitetura geral proposta

A arquitetura proposta pode ser compreendida como uma arquitetura front-end modular com suporte a integração de dados.

Fluxo geral:

Usuário
  ↓
Navegador
  ↓
Vercel / Edge Network
  ↓
Páginas HTML + CSS + JavaScript
  ↓
Módulos JS e recursos visuais
  ↓
Supabase / PostgreSQL quando houver dados dinâmicos

Camadas principais:

1. Camada de apresentação:
   Responsável pelo que o usuário vê. Inclui os arquivos HTML, CSS, imagens, componentes visuais, menus, seções informativas e páginas públicas.

2. Camada de comportamento:
   Responsável pela interatividade do site. Inclui JavaScript para menus, carregamento de informações, formulários, filtros, tabelas e chamadas a serviços externos.

3. Camada de dados:
   Responsável pela persistência e consulta de informações. Pode envolver Supabase/PostgreSQL, arquivos SQL, tabelas, APIs e scripts de integração.

4. Camada de infraestrutura:
   Responsável pelo deploy, hospedagem, HTTPS, headers de segurança, rotas, rewrites, cache e publicação. No projeto, essa camada está relacionada principalmente à Vercel.

5. Camada de documentação:
   Responsável por registrar decisões técnicas, objetivos do projeto, tutoriais, fluxos de implantação, regras de segurança e orientações para manutenção.

## 5. Organização das páginas

As páginas HTML devem ser entendidas como módulos de experiência do usuário:

- index.html: porta de entrada do projeto. Deve apresentar identidade, objetivo, chamadas principais e navegação.
- ciebp.html: página institucional. Deve explicar o que é o CIEBP, sua função, sua missão e sua relevância educacional.
- projeto.html: área para divulgar projetos, protótipos, ações pedagógicas e iniciativas tecnológicas.
- tutoriais.html: espaço para materiais de formação, guias, orientações e documentos de apoio.
- local.html: página de localização, contato, estrutura física ou informações do espaço.
- equipes.html: área para apresentar equipes, estudantes, professores, colaboradores e participantes.
- tabela.html: página para exibição de dados estruturados, tabelas, competições, agendas ou classificações.
- aovivo.html: página para transmissões, eventos em andamento ou acompanhamento em tempo real.
- dashboard.html: espaço de visualização administrativa ou analítica, podendo se conectar a dados do Supabase.

Essa divisão facilita a expansão porque cada página pode evoluir de forma relativamente independente, mantendo identidade visual e padrões de navegação compartilhados.

## 6. Integração com dados e Supabase

O projeto apresenta indícios de integração com Supabase/PostgreSQL. Essa camada é importante porque permite transformar o site de uma página informativa para uma aplicação com dados dinâmicos.

Possíveis usos do Supabase no CIEBP:

- cadastro de projetos;
- cadastro de equipes;
- exibição de tabelas e classificações;
- registros de eventos;
- dashboard com dados atualizados;
- consulta de materiais e tutoriais;
- armazenamento de informações institucionais.

Fluxo possível de dados:

Usuário acessa tabela.html
  ↓
JavaScript solicita dados
  ↓
Supabase recebe a requisição
  ↓
PostgreSQL retorna os registros
  ↓
JavaScript renderiza os dados na página

Essa separação é importante porque o HTML não deve armazenar manualmente todos os dados. O ideal é que o banco seja a fonte de verdade quando houver informações que mudam com frequência.

## 7. Segurança web e políticas do navegador

O projeto deve manter uma camada de segurança web configurada na Vercel e no código. Os principais pontos são:

- HTTPS e SSL/TLS: garantem conexão segura entre usuário e servidor.
- Strict-Transport-Security: força o navegador a usar HTTPS.
- Content-Security-Policy: controla quais scripts, imagens, estilos, fontes, iframes e APIs podem ser carregados.
- X-Content-Type-Options: impede que o navegador tente interpretar arquivos de forma incorreta.
- X-Frame-Options ou frame-ancestors: reduzem risco de clickjacking.
- Referrer-Policy: reduz vazamento de URLs e parâmetros para sites externos.
- Permissions-Policy: limita recursos sensíveis do navegador, como câmera, microfone e localização.

Atenção especial deve ser dada à CSP. Se o site usar Google Fonts, Analytics, Supabase, mapas, YouTube, CDNs ou outros serviços externos, os domínios precisam ser liberados explicitamente na política. Caso contrário, o navegador pode bloquear recursos legítimos.

## 8. Publicação e infraestrutura na Vercel

A Vercel atua como camada de publicação e entrega do projeto. Em termos práticos, ela recebe a requisição do usuário, aplica as regras de configuração e entrega os arquivos do site.

Funções importantes:

- Deploy: publicação do projeto em ambiente web.
- HTTPS automático: geração e gerenciamento de certificados para o domínio válido.
- Headers: envio de regras de segurança para o navegador.
- Rewrites: encaminhamento interno de rotas para o arquivo correto, comum em SPAs.
- Redirects: redirecionamento visível de uma URL para outra.
- Cache: armazenamento temporário de arquivos estáticos para melhorar performance.

No caso do domínio da Vercel, deve-se evitar o uso de www antes de subdomínios .vercel.app. O domínio correto deve ser o domínio gerado pela Vercel ou, em produção oficial, um domínio próprio configurado corretamente.

## 9. Plano de expansão do projeto

Para que o projeto seja sustentável, a expansão deve seguir uma lógica modular.

Diretrizes de expansão:

1. Criar novas páginas apenas quando houver objetivo claro.
2. Reutilizar estilos, componentes e padrões visuais existentes.
3. Centralizar integrações externas em arquivos JavaScript específicos.
4. Documentar alterações relevantes na pasta docs.
5. Evitar duplicação de código entre páginas.
6. Validar responsividade em desktop, Android e iPhone/Safari.
7. Testar o console do navegador após cada alteração.
8. Manter cuidado com CSP, CORS, HTTPS e Mixed Content.

Exemplos de módulos futuros:

- Página de inscrição em oficinas;
- Galeria de projetos;
- Área de notícias;
- Painel de indicadores;
- Integração com formulário ou banco de dados;
- Página de eventos;
- Área de materiais para professores;
- Página de parceiros e escolas participantes.

## 10. Processo de implementação no CIEBP

A implementação de projetos no CIEBP pode seguir o seguinte processo:

1. Levantamento da necessidade:
   Identificar qual problema pedagógico, institucional ou tecnológico o projeto resolve.

2. Planejamento da página ou módulo:
   Definir público-alvo, conteúdo, dados necessários, recursos visuais e funcionalidades.

3. Desenvolvimento:
   Criar ou atualizar arquivos HTML, CSS e JavaScript, mantendo padrão visual e organização.

4. Integração com dados:
   Quando necessário, utilizar Supabase/PostgreSQL como fonte dinâmica de dados.

5. Testes:
   Validar navegação, responsividade, acessibilidade, segurança, console do navegador e funcionamento em iPhone/Safari.

6. Deploy:
   Publicar na Vercel e verificar domínio, SSL, headers, rotas e recursos externos.

7. Documentação:
   Registrar decisões, alterações e orientações de uso na pasta docs.

8. Divulgação:
   Compartilhar o projeto com a comunidade escolar, redes institucionais e canais oficiais.

9. Manutenção:
   Atualizar conteúdo, corrigir erros, acompanhar feedbacks e evoluir a arquitetura.

## 11. Governança e boas práticas

Para manter qualidade e continuidade, recomenda-se criar uma rotina de governança técnica:

- Todo novo recurso deve ter objetivo documentado.
- Alterações importantes devem ser registradas no GitHub.
- O arquivo README deve ser atualizado sempre que o projeto mudar de propósito ou arquitetura.
- A pasta docs deve concentrar relatórios técnicos, tutoriais e decisões relevantes.
- Credenciais, chaves e tokens não devem ser salvos diretamente no repositório.
- A versão publicada deve ser testada após cada deploy.
- Problemas de segurança devem ser tratados antes de novas funcionalidades.

Essa governança transforma o protótipo em um projeto profissional e facilita sua apresentação acadêmica, institucional e técnica.

## 12. Roadmap recomendado

Roadmap sugerido:

Curto prazo:
- Revisar links internos e externos.
- Corrigir domínio canônico e evitar uso indevido de www em domínio .vercel.app.
- Validar CSP com os recursos reais utilizados.
- Conferir funcionamento em iPhone/Safari.
- Atualizar README do GitHub.

Médio prazo:
- Modularizar JavaScript.
- Organizar documentação técnica em docs.
- Padronizar componentes visuais.
- Melhorar acessibilidade.
- Integrar páginas dinâmicas ao Supabase.

Longo prazo:
- Migrar para domínio próprio.
- Criar painel administrativo mais robusto.
- Implementar fluxo de cadastro de projetos.
- Criar área pública de divulgação de resultados.
- Consolidar o site como plataforma institucional de projetos do CIEBP.

## 13. Conclusão

O CIEBP Site Protótipo deve ser compreendido como uma base de expansão institucional e tecnológica. Seu valor não está apenas na publicação de páginas web, mas na criação de um ambiente digital capaz de divulgar, organizar e apoiar projetos desenvolvidos no CIEBP.

A arquitetura atual permite evolução gradual. A presença de HTML, CSS, JavaScript, Supabase e Vercel cria um caminho prático para transformar o protótipo em uma solução mais completa. Para isso, é essencial manter documentação, segurança, responsividade, organização de arquivos e clareza de propósito.

Este documento registra o projeto como uma iniciativa de divulgação, implementação e expansão de projetos educacionais e tecnológicos, com potencial para se tornar uma referência digital do CIEBP.

## 14. Referências e links úteis

Referências consultadas e recomendadas:

- GitHub do projeto: https://github.com/David-Santos7/Ciebp-site-prototipo
- Deploy indicado no GitHub: https://ciebp-site-prototipo.vercel.app
- Documentação da Vercel: https://vercel.com/docs
- Headers na Vercel: https://vercel.com/docs/headers
- MDN Web Docs - Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- MDN Web Docs - HTTP Security: https://developer.mozilla.org/en-US/docs/Web/Security
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- Supabase Docs: https://supabase.com/docs

Observação: a estrutura do repositório foi consultada em 03/06/2026 e pode mudar conforme o projeto evoluir.
