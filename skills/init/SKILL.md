---
name: init
description: Prepara um repositorio para o fluxo SDD do Caramelo — cria a estrutura docs/specs e docs/adr e escreve ou completa o CLAUDE.md com as convencoes reais detectadas no projeto. Use uma vez por projeto, ao instalar o plugin.
argument-hint: "[nada]"
disable-model-invocation: true
---

# Preparar o projeto para SDD

Objetivo: deixar o repositorio pronto para `/caramelo:spec` sem inventar convencao nenhuma. Tudo que voce escrever tem de ser verdade sobre este projeto.

## 1. Detecte o terreno

Nao pergunte o que o repositorio responde. Descubra:

- **Stack e versao**: manifestos de dependencia (`pom.xml`, `build.gradle`, `package.json`, `go.mod`, `pyproject.toml`, `*.csproj`, `Gemfile`).
- **Comandos reais** de build, teste e execucao local — leia scripts, `Makefile`, wrapper do build, workflows de CI. Nao escreva um comando que voce nao viu em algum arquivo.
- **Arquitetura de pastas**: como as camadas estao nomeadas hoje e qual a direcao das dependencias.
- **Convencoes**: idioma de codigo e de commit, formato das mensagens de commit (leia `git log --oneline -20`), estilo de teste, tratamento de erro padrao, linter/formatter configurado.
- **O que ja existe**: `CLAUDE.md`, `.claude/`, `docs/`, `README`. Leia antes de escrever.

## 2. Crie a estrutura, sem sobrescrever nada

```
docs/
├── specs/            # uma pasta por feature: spec.md, plan.md, tasks.md
│   └── README.md     # indice das specs e o que cada estado significa
└── adr/              # registros de decisao arquitetural
    └── README.md
```

Se uma pasta ou arquivo ja existir com conteudo, **mantenha** e apenas complemente. Nunca apague trabalho existente.

## 3. CLAUDE.md

Se nao existir, crie. Se existir, acrescente apenas o que falta, preservando o que esta escrito. Conteudo, curto e verificado:

- O que o projeto e, em duas linhas.
- Stack e versoes.
- Comandos de build, teste e execucao — exatamente como funcionam aqui.
- Mapa de pastas e a regra de dependencia entre camadas.
- Convencoes que um agente precisa respeitar: idioma, nomenclatura, formato de erro, estilo de teste, padrao de commit.
- O fluxo SDD: specs vivem em `docs/specs/<slug>/`, decisoes em `docs/adr/`, e os comandos `/caramelo:spec`, `/caramelo:plan`, `/caramelo:tasks`, `/caramelo:implement`, `/caramelo:review`, `/caramelo:verify`.

Regra de ouro do CLAUDE.md: curto e verdadeiro vale mais que completo e aspiracional. Nao escreva regra que o codigo nao segue — se o projeto nao tem teste, escreva que nao tem, nao escreva a politica de testes que voce gostaria.

## 4. Feche

Relate em uma lista curta: o que foi criado, o que foi preservado, a stack detectada e os comandos que voce confirmou. Depois mostre o proximo passo: `/caramelo:spec <nome da feature>`.
