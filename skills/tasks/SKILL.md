---
name: tasks
description: Passo 3 do SDD — quebra o plano em tarefas pequenas e verificaveis, cada uma rastreada a um requisito, em docs/specs/<slug>/tasks.md. Use depois do plano e antes de implementar.
argument-hint: "[slug da spec]"
disable-model-invocation: true
---

# Passo 3 — Quebrar em tarefas

Spec: **$ARGUMENTS**

## 1. Carregue

Leia `docs/specs/$ARGUMENTS/spec.md` e `plan.md`. Se o plano nao existir, diga para rodar `/caramelo:plan $ARGUMENTS` primeiro e pare.

## 2. Quebre

Este passo e seu: nao delegue. Voce tem a spec e o plano em maos, e a tarefa e mecanica e precisa.

Cada tarefa precisa de:

- **ID** `T-01`, `T-02`, na ordem de execucao.
- **Titulo** em uma linha, no imperativo.
- **Requisitos cobertos**: `REQ-xx`, `AC-xx.y`. Tarefa que nao cobre nenhum criterio e suspeita — ou e infraestrutura necessaria (diga isso) ou e escopo inventado (remova).
- **Arquivos previstos**: criar / alterar.
- **Criterio de pronto**: comportamento observavel, nao "codigo escrito".
- **Teste que prova**: qual teste, em que nivel. Se a tarefa nao e testavel, explique por que.
- **Depende de**: IDs anteriores.

Regras de corte:

- Uma tarefa deve caber em uma sessao de trabalho e deixar o repositorio **funcionando** no fim. Nada de "parte 1 que nao compila".
- Fatie por fatia vertical de comportamento (do endpoint ao banco, em um caso de uso), nao por camada horizontal ("criar todos os DTOs").
- Migracao de banco e tarefa propria, antes de quem a consome.
- Tarefa de teste nao existe separada: o teste faz parte da tarefa que implementa o comportamento. Excecao: cobrir divida de teste pre-existente.
- Se uma tarefa tem mais de ~5 arquivos previstos ou cobre mais de 3 criterios, quebre em duas.
- Ao final, **todo** `AC-*` da spec aparece em pelo menos uma tarefa. Faca essa conferencia e mostre o resultado.

## 3. Escreva

Em `docs/specs/$ARGUMENTS/tasks.md`, usando `${CLAUDE_PLUGIN_ROOT}/templates/tasks.md`. Use caixas `- [ ]` para que o progresso seja marcavel, e inclua ao fim a tabela de rastreabilidade `AC-*` -> `T-*`.

## 4. Feche

No chat: quantidade de tarefas, qual e a primeira, criterios nao cobertos (se houver algum, isso e um defeito do plano — aponte). Ofereca `/caramelo:implement $ARGUMENTS`.
