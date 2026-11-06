---
name: diagram
description: Gera diagramas do sistema real lido do codigo — C4 (contexto, container, componente), sequencia, entidade-relacionamento, estado ou fluxo, em Mermaid por padrao. Use quando o usuario pedir diagrama, quiser documentar arquitetura ou explicar um fluxo complexo.
argument-hint: "[o que diagramar]"
---

# Diagrama

Pedido: **$ARGUMENTS**

Subagentes deste fluxo: use `caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor.

## 1. Traduza o pedido em pergunta

Um diagrama responde uma pergunta. "Diagrama do sistema" nao e pergunta. Antes de delegar, decida qual destas e a pergunta real — e se o pedido for ambiguo e importar, pergunte ao usuario em uma linha:

- quem usa e com que sistemas externos falamos -> C4 contexto
- que processos sobem e como se ligam -> C4 container
- que partes existem dentro de um servico -> C4 componente
- em que ordem as chamadas acontecem e o que acontece no erro -> sequencia
- como os dados se relacionam -> entidade-relacionamento
- que estados um registro percorre -> maquina de estados

Se o pedido abrange mais de uma pergunta, produza mais de um diagrama simples em vez de um sobrecarregado.

## 2. Delegue

Chame o **diagrammer** com: a pergunta, os arquivos ou a area do codigo onde ele deve ler o mecanismo, o tipo de diagrama escolhido, o formato (Mermaid por padrao; HTML ou SVG so se o usuario pediu) e o destino (por padrao `docs/diagrams/<slug>.md`; `docs/specs/<slug>/` quando o diagrama pertence a uma feature).

Instrua: rotular todas as arestas com protocolo e dado, nao desenhar componente que nao foi localizado no repositorio, e marcar o que for inferencia.

## 3. Confira e entregue

Confira que cada caixa corresponde a algo que existe no codigo e que as arestas estao rotuladas — diagrama bonito e errado e pior que nenhum. Depois mostre o diagrama no chat, diga onde foi salvo e liste as premissas que o agente marcou como inferencia.
