---
name: implement
description: Passo 4 do SDD — implementa a proxima tarefa (ou a tarefa indicada) respeitando spec, plano e convencoes do projeto, com teste e revisao rapida antes de concluir. Use para executar o tasks.md de uma feature.
argument-hint: "[slug] [T-id opcional]"
disable-model-invocation: true
---

# Passo 4 — Implementar

Alvo: **$ARGUMENTS**

Subagentes deste fluxo: use `caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor.

## 1. Situe-se

1. Leia `docs/specs/$0/tasks.md`, `spec.md` e `plan.md`.
2. Escolha a tarefa: a indicada em `$1`, ou a primeira nao marcada.
3. Releia os criterios de aceite que a tarefa cobre. Eles sao o contrato — nao o seu julgamento de "o que ficaria melhor".
4. Leia os arquivos que vai alterar **inteiros**, e um vizinho parecido, para seguir o padrao local: nomenclatura, idioma, tratamento de erro, estilo de teste.

## 2. Implemente

- Escreva codigo que se parece com o codigo em volta. Convencao do repositorio ganha de preferencia pessoal.
- Fique **dentro da tarefa**. Problema encontrado fora dela: anote para reportar no fim, nao conserte de passagem.
- Escreva o teste da tarefa, no nivel que o `tasks.md` definiu. O teste tem de falhar se a regra for quebrada — teste que passa com a implementacao vazia nao serve.
- Trate os casos de erro que os criterios citam. Caminho de erro ausente e a divida mais comum deste passo.
- Nao invente regra de negocio. Se a spec nao decidiu, **pare e pergunte** em vez de escolher silenciosamente.

## 3. Verifique de verdade

Rode o que o projeto oferece: compilacao, linter, testes da area. Relate a saida real. Se nao conseguir rodar, diga explicitamente que nao rodou e por que — nunca afirme que passa sem ter visto passar.

## 4. Revisao rapida antes de fechar

Dispare em paralelo, com o diff da tarefa como alvo:

- **code-reviewer** — defeito de comportamento no que foi escrito.
- **clean-code** — qualidade, no limite de poucos achados.
- **security-owasp** — somente se a tarefa tocou autenticacao, autorizacao, entrada do usuario, consulta dinamica, dado sensivel ou integracao externa.

Corrija o que for CONFIRMADO e barato. O que for grande ou discutivel vai para o relatorio como pendencia, nao vira refatoracao surpresa.

## 5. Feche

1. Marque a tarefa em `tasks.md` (`- [x]`), com uma linha do que mudou.
2. Relate: arquivos alterados, teste criado, resultado real da suite, criterios de aceite agora atendidos.
3. Liste os problemas que encontrou **fora** do escopo, sem ter tocado neles.
4. Ofereca o proximo: a tarefa seguinte, ou `/caramelo:review` se a fatia terminou.

Nao faca commit nem push por iniciativa propria.
