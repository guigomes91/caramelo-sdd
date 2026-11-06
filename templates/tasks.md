# Tarefas — <NOME DA FEATURE>

Spec: [`spec.md`](./spec.md) · Plano: [`plan.md`](./plan.md)

Regra: cada tarefa deixa o repositório funcionando no fim. Nada de "parte 1 que não compila".

---

- [ ] ## T-01 — <título no imperativo>

  **Cobre**: REQ-01 · AC-01.1, AC-01.2
  **Depende de**: —
  **Arquivos previstos**:
  - criar `<caminho>`
  - alterar `<caminho>`

  **Critério de pronto**: <comportamento observável — não "código escrito">
  **Teste que prova**: <nome do teste, nível>

---

- [ ] ## T-02 — <título>

  **Cobre**: AC-02.1
  **Depende de**: T-01
  **Arquivos previstos**:
  - alterar `<caminho>`

  **Critério de pronto**:
  **Teste que prova**:

---

## Rastreabilidade

Todo critério da spec precisa aparecer em ao menos uma tarefa.

| Critério | Tarefa | Estado |
| --- | --- | --- |
| AC-01.1 | T-01 | pendente |
| AC-01.2 | T-01 | pendente |
| AC-02.1 | T-02 | pendente |

## Fora de escopo encontrado durante a execução

Problemas vistos no caminho e **não** corrigidos, para decidir depois.

- <arquivo:linha — o que é>
