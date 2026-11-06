# Plano técnico — <NOME DA FEATURE>

Spec: [`spec.md`](./spec.md) · Data: <AAAA-MM-DD>

## 1. Abordagem

Um parágrafo: o caminho escolhido e por quê.

**Altitude do caso**: núcleo de negócio \| suporte \| CRUD genérico — e o quanto de modelagem isso justifica.

## 2. Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| | |

## 3. Desenho de domínio

**Contexto delimitado**: <nome>

| Agregado | Raiz | Invariantes que protege | Repositório |
| --- | --- | --- | --- |
| | | | |

Objetos de valor: <lista>
Eventos de domínio: <nome no passado — quem publica, quem consome>

Onde cada regra mora:

| Regra (RN / REQ) | Onde | Por que ali |
| --- | --- | --- |
| | | |

## 4. Mudanças por camada

| Camada | Arquivo | Ação | O que faz |
| --- | --- | --- | --- |
| api | | criar/alterar | |
| aplicação | | | |
| domínio | | | |
| infraestrutura | | | |

## 5. Contrato de API

| Método | Caminho | Entrada | Saída | Status | Autorização |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

Compatibilidade: <nenhuma quebra \| quebra X, plano de convivência Y>

## 6. Modelo de dados e migrações

Mudanças de schema, índices necessários (com a consulta que os justifica) e o veredito: **seguro aplicar com a aplicação no ar?**

## 7. Estratégia de teste

| Critério | Nível | Onde | Observação |
| --- | --- | --- | --- |
| AC-01.1 | unitário/integração/e2e | | |

## 8. Riscos e premissas

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| | | |

Premissas assumidas (por decisão pendente na spec): <lista>

## 9. Observabilidade

O que logar (e o que **não** logar), o que medir, qual erro precisa alerta.

## 10. Ordem de execução

Fatias entregáveis, cada uma deixando o repositório funcionando.

1.
2.

## 11. Diagramas

```mermaid
%% fluxo principal, com caminho de erro
```

## 12. ADRs gerados

- `docs/adr/NNNN-<slug>.md` — <decisão>
