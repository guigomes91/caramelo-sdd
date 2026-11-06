# 🍬 Caramelo SDD

Plugin de **Spec-Driven Development** para [Claude Code](https://claude.com/claude-code): um fluxo de seis passos que vai da descrição de uma feature até a verificação do que foi implementado, apoiado por dez subagentes especialistas em DDD, OWASP Top 10, SOLID/DRY/KISS, revisão de código, estratégia de testes, contrato de API, persistência e diagramas.

A ideia é simples: **a especificação é o artefato que o código tem de cumprir**, e cada passo do fluxo produz um arquivo versionado em `docs/specs/` que o passo seguinte consome. Nada de "o Claude decidiu a regra de negócio no meio da implementação".

---

## Instalação

### 1. Plugin (recomendado)

Recebe atualizações com `claude plugin update`.

```bash
claude plugin install caramelo --marketplace guigomes91/caramelo-sdd --scope project
```

Ou pelo instalador, que valida o ambiente e explica o próximo passo:

```bash
npx caramelo-sdd install --scope project
```

Escopos: `user` (todos os seus projetos), `project` (o repositório, para o time inteiro, via `.claude/settings.json` versionado) ou `local` (só você, só neste repositório).

### 2. Via npm, direto do pacote

Como o pacote npm **é** o plugin, o Claude Code instala dele sem marketplace:

```bash
claude plugin install caramelo-sdd@npm
```

### 3. Modo vendor, sem plugin

Copia agentes e skills para dentro do repositório, para quem prefere versionar os arquivos junto com o código:

```bash
npx caramelo-sdd vendor
```

Isso escreve `.claude/agents/*.md`, `.claude/skills/caramelo-*/SKILL.md` e `.claude/caramelo/templates/`. Neste modo os comandos ficam com hífen (`/caramelo-spec`), não há atualização automática, e `--force` sobrescreve para atualizar.

Em qualquer modo, `npx caramelo-sdd doctor` mostra o que está instalado.

---

## O fluxo

```
/caramelo:init        uma vez por projeto — estrutura docs/ + CLAUDE.md com as convenções reais
      ↓
/caramelo:spec        requisitos REQ-xx + critérios de aceite AC-xx.y verificáveis  → spec.md
      ↓
/caramelo:plan        domínio, contrato, migrações, riscos, diagramas, ADRs          → plan.md
      ↓
/caramelo:tasks       tarefas pequenas, cada uma rastreada a um critério             → tasks.md
      ↓
/caramelo:implement   executa uma tarefa, com teste e revisão rápida no fim
      ↓
/caramelo:review      revisão multiagente do diff, consolidada e priorizada
      ↓
/caramelo:verify      veredito por critério, com evidência em código e teste
```

Fora do fluxo: `/caramelo:diagram <pergunta>` gera C4, sequência, ER ou máquina de estados a partir do código.

Cada feature vive em uma pasta:

```
docs/
├── specs/
│   └── verificacao-email/
│       ├── spec.md      # o que precisa ser verdade
│       ├── plan.md      # como vamos fazer, e o que descartamos
│       └── tasks.md     # T-01..T-nn com rastreabilidade AC → T
└── adr/
    └── 0001-argon2id-para-senha.md
```

---

## Os subagentes

Invocáveis direto (`@agent-caramelo:security-owasp`) ou acionados pelas skills do fluxo.

| Agente | Função | Modelo |
| --- | --- | --- |
| `spec-writer` | Requisitos atômicos e critérios de aceite no formato EARS, com não-escopo e decisões pendentes explícitas | opus |
| `ddd-architect` | Contextos delimitados, agregados e invariantes, direção das dependências — e o veredito de **quanto** DDD o caso merece | opus |
| `security-owasp` | OWASP Top 10 2021, categoria por categoria, com cenário de exploração e correção mínima | opus |
| `spec-auditor` | Confronta implementação × spec, critério por critério, com evidência | opus |
| `code-reviewer` | Correção: borda, erro engolido, transação, concorrência, fuso, regressão de contrato | sonnet |
| `clean-code` | SOLID, DRY, KISS, YAGNI e padrões **só quando o problema pede** — com freio contra over-engineering | sonnet |
| `test-strategist` | Rastreabilidade critério → teste, lacunas que importam, test smells | sonnet |
| `api-reviewer` | Verbos, status codes, `problem+json`, paginação, idempotência, quebras de compatibilidade | sonnet |
| `persistence-reviewer` | N+1, índices, transações, locks, migrações seguras com a aplicação no ar | sonnet |
| `diagrammer` | Diagramas do mecanismo real lido do código, em Mermaid, legíveis em tema claro e escuro | sonnet |

Para trocar o modelo de um agente, edite o campo `model` no arquivo correspondente em `agents/` (`opus`, `sonnet`, `haiku` ou `inherit`, que herda o modelo da sessão).

---

## Princípios embutidos nos prompts

Os agentes foram escritos para evitar os três fracassos típicos de revisão automatizada:

1. **Achado sem consequência.** Todo achado precisa de um cenário concreto de falha — entrada, estado, resultado errado. Sem isso, não é reportado.
2. **Altitude errada.** CRUD não recebe proposta de agregado com evento de domínio; núcleo de negócio não recebe `if` empilhado. O `ddd-architect` começa justamente classificando o caso.
3. **Confiança cega no subagente.** A skill `/caramelo:review` deduplica, resolve contradições entre especialistas, descarta ruído e **confere por amostragem** os achados graves antes de relatar.

---

## Personalizar

- **Convenções do projeto**: o `CLAUDE.md` que `/caramelo:init` escreve é lido por todos os agentes. É ali que entram idioma, comandos de teste e regras de camada.
- **Templates**: `templates/spec.md`, `plan.md`, `tasks.md` e `adr.md` — edite à vontade, as skills usam o que estiver lá.
- **Fluxo**: cada passo é um `skills/<nome>/SKILL.md` em Markdown. Não há código escondido.

---

## Desenvolvimento

```bash
claude plugin validate .                      # valida manifesto, marketplace e componentes
npx caramelo-sdd install --from local         # instala a partir desta pasta
/reload-plugins                               # recarrega em uma sessão aberta
```

Este repositório já aponta para `guigomes91/caramelo-sdd`, então `npx caramelo-sdd install` funciona sem `--from`. Para habilitar o caminho `@npm`, falta apenas `npm publish`. Em um fork, ajuste `repository` no `package.json` e em `.claude-plugin/plugin.json`.

## Licença

MIT
