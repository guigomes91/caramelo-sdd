---
name: spec
description: Passo 1 do SDD — transforma a descricao de uma feature em especificacao com requisitos numerados e criterios de aceite verificaveis, em docs/specs/<slug>/spec.md. Use antes de planejar ou escrever qualquer codigo de uma feature nova.
argument-hint: "[descricao da feature]"
disable-model-invocation: true
---

# Passo 1 — Especificar

Feature: **$ARGUMENTS**

Se o argumento estiver vazio, pergunte o que sera especificado e pare.

Subagentes deste fluxo: use `caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor (`.claude/agents/`).

## Antes de delegar

1. Defina o **slug**: curto, kebab-case, sem acento (ex.: `verificacao-email`, `busca-por-raio`).
2. Verifique se `docs/specs/<slug>/spec.md` ja existe. Se existir, isto e **refinamento**: diga ao usuario que vai evoluir a spec atual, nao recriar.
3. Reuna o contexto que o agente nao descobriria sozinho: o que o usuario disse nesta conversa, decisoes tomadas antes, restricoes conhecidas.

## Delegue

Chame o subagente **spec-writer** com: a descricao da feature, o slug, o caminho de saida e o contexto reunido. Instrua explicitamente que ele leia o codigo da area afetada antes de escrever, para usar o vocabulario que o projeto ja usa.

Um agente, nao varios — especificacao e um texto coerente, nao uma colagem.

## Depois

1. Leia a spec gerada e confira, voce mesmo, tres coisas: todo requisito tem ao menos um criterio de aceite; todo criterio cita valor concreto (status, mensagem, limite, prazo); existe secao de nao-escopo preenchida. Se faltar, peca a correcao ao mesmo agente antes de mostrar ao usuario.
2. Apresente no chat: caminho do arquivo, contagem de requisitos e criterios, e a lista de **decisoes pendentes** como perguntas numeradas.
3. Se houver decisao pendente que bloqueia o desenho, diga que o proximo passo depende da resposta. Caso contrario, ofereca `/caramelo:plan <slug>`.

Nao escreva codigo neste passo. Nao escolha biblioteca, nome de classe nem desenho de camada — isso e do passo 2.
