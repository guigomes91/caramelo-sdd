---
name: plan
description: Passo 2 do SDD — transforma a spec em plano tecnico com desenho de dominio, diagramas, riscos e ADRs, em docs/specs/<slug>/plan.md. Use depois que a spec estiver aprovada e antes de quebrar em tarefas.
argument-hint: "[slug da spec]"
disable-model-invocation: true
---

# Passo 2 — Planejar

Spec: **$ARGUMENTS**

Subagentes deste fluxo: use `caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor.

## 1. Carregue a spec

Leia `docs/specs/$ARGUMENTS/spec.md`. Se nao existir, liste as specs disponiveis em `docs/specs/` e pare. Se houver `[DECISAO PENDENTE]` sem resposta, liste as pendencias e pergunte se e para planejar assumindo premissas — e, se for, registre cada premissa no plano.

## 2. Desenho de dominio

Delegue ao subagente **ddd-architect**: a spec, os arquivos da area afetada e a pergunta concreta — onde cada regra mora, quais agregados e invariantes existem, que camadas sao tocadas, o que reaproveitar do que ja existe. Peca tambem o veredito de altitude (nucleo / suporte / CRUD): se o caso for CRUD, o plano deve ficar simples e dizer isso.

Espere o resultado antes de seguir — os passos abaixo dependem do desenho.

## 3. Riscos especializados, em paralelo

Dispare de uma vez (uma unica mensagem, varias chamadas) apenas os que o caso justifica:

- **api-reviewer** — se a feature cria ou altera endpoint: contrato proposto, status codes, formato de erro, quebras de compatibilidade.
- **persistence-reviewer** — se toca modelo, consulta ou schema: estrategia de consulta, indices, transacoes, plano de migracao.
- **security-owasp** — se toca autenticacao, autorizacao, dado sensivel, upload ou integracao externa: riscos do desenho (A04 design insegura em primeiro lugar) e controles que o plano precisa prever.
- **test-strategist** — a estrategia de teste por criterio de aceite e em que nivel cada um deve viver.

Cada um recebe a spec e o desenho do passo 2, e responde em modo consultivo: riscos e recomendacoes para o plano, nao revisao de codigo existente.

## 4. Diagramas

Delegue ao **diagrammer** os diagramas que respondem perguntas reais desta feature — tipicamente um de sequencia do fluxo principal com o caminho de erro, e um de componente ou ER quando a estrutura muda. Salve em `docs/specs/$ARGUMENTS/` ou embuta no plano como blocos Mermaid.

## 5. Escreva o plano

Em `docs/specs/$ARGUMENTS/plan.md`, usando `${CLAUDE_PLUGIN_ROOT}/templates/plan.md` como base:

- Abordagem escolhida, em um paragrafo.
- **Alternativas descartadas** e por que — isso e o que evita refazer a discussao em tres meses.
- Desenho de dominio: agregados, invariantes, onde cada regra mora, camadas tocadas.
- Mudancas por camada, com os arquivos previstos (criar / alterar).
- Contrato de API, se houver.
- Modelo de dados e migracoes, com o veredito de seguranca para aplicar com a aplicacao no ar.
- Estrategia de teste por criterio de aceite.
- Riscos, com mitigacao, e premissas assumidas.
- Observabilidade: o que logar e o que medir.
- Ordem de execucao sugerida, em fatias entregaveis.

Decisao estrutural que vale alem desta feature virou **ADR** em `docs/adr/NNNN-<slug>.md`.

## 6. Feche

Resuma no chat: abordagem em tres linhas, arquivos que serao tocados, riscos principais, ADRs criados. Aponte conflitos entre o plano e a spec, se existirem — a spec e a fonte de verdade, o plano se ajusta a ela ou a spec precisa mudar com decisao explicita do usuario.

Nao implemente nada aqui. Ofereca `/caramelo:tasks $ARGUMENTS`.
