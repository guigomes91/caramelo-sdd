---
name: verify
description: Passo 5 do SDD — audita se a implementacao cumpre a spec, criterio por criterio, com evidencia em codigo e teste, e emite veredito de pronto. Use ao fechar uma feature especificada, antes de abrir PR.
argument-hint: "[slug da spec]"
---

# Passo 5 — Verificar contra a spec

Spec: **$ARGUMENTS**

Subagentes deste fluxo: use `caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor.

## 1. Carregue

Leia `docs/specs/$ARGUMENTS/spec.md` e `tasks.md`. Sem spec, nao ha o que verificar: diga isso e sugira `/caramelo:review`, que nao depende de especificacao.

## 2. Dispare em paralelo

- **spec-auditor** — veredito por criterio de aceite, com evidencia no codigo e no teste.
- **test-strategist** — rastreabilidade de teste e lacunas que importam.

Passe a ambos: o caminho da spec, o diff da feature e a forma de rodar os testes neste projeto.

## 3. Confira antes de acreditar

Para cada criterio marcado como ATENDIDO nos pontos mais sensiveis (dinheiro, identidade, autorizacao, perda de dado), abra o arquivo citado e confirme. Para cada AUSENTE ou DIVERGENTE, confirme que realmente nao existe — `Grep` com outro termo antes de afirmar.

Rode os testes relevantes e relate o resultado real.

## 4. Veredito

1. **Placar**: criterios por veredito (atendido, atendido sem teste, parcial, ausente, divergente).
2. **Tabela** por `AC-*` com evidencia.
3. **Bloqueadores** em ordem — o que impede considerar pronto.
4. **Divergencias**: cada uma como pergunta fechada para o usuario decidir se o codigo esta certo e a spec envelheceu, ou o contrario. Nao decida sozinho.
5. **Fora de escopo**: implementado sem estar na spec.
6. **Veredito final**: PRONTO / PRONTO COM RESSALVAS / NAO PRONTO, com uma frase de justificativa.

Se a spec tiver envelhecido em relacao a decisoes corretas tomadas no codigo, ofereca atualiza-la com `/caramelo:spec $ARGUMENTS` — mas somente depois da confirmacao do usuario. Nao edite a spec por conta propria neste passo.
