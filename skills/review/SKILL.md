---
name: review
description: Revisao multiagente do codigo alterado — seguranca OWASP, correcao, SOLID/DRY/KISS, dominio, API, persistencia e testes, consolidados em um relatorio priorizado. Use antes de abrir PR, ao terminar uma fatia de trabalho, ou quando o usuario pedir revisao de codigo.
argument-hint: "[alvo opcional: branch, arquivo ou --fix]"
---

# Revisao multiagente

Alvo: **$ARGUMENTS**

Subagentes deste fluxo: use `caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor.

## 1. Determine o alvo e leia o diff voce mesmo

- Sem argumento: `git status --short` e `git diff HEAD`. Se o trabalho ja esta commitado no branch, use `git diff $(git merge-base HEAD <branch-principal>)...HEAD`.
- Com branch, caminho ou arquivo em `$ARGUMENTS`: use o que foi pedido.
- `--fix` presente: faca a revisao normalmente e aplique as correcoes no fim (etapa 5).

Se o diff estiver vazio, diga isso e pare. Se for enorme (centenas de arquivos), proponha recortar por area antes de gastar agentes.

**Liste os arquivos tocados e classifique-os** — isso decide quais especialistas valem. Mandar sete agentes num diff de duas linhas e desperdicio.

## 2. Dispare os agentes em paralelo

Em **uma unica mensagem**, varias chamadas. Sempre:

- **code-reviewer** — defeito de comportamento.
- **clean-code** — qualidade e complexidade desnecessaria.

Condicionais, pelo que o diff toca:

- **security-owasp** — autenticacao, autorizacao, entrada do usuario, consulta dinamica, criptografia, upload, integracao externa, configuracao, dependencia nova.
- **api-reviewer** — endpoint, rota, DTO de entrada/saida, codigo de status, documentacao de API.
- **persistence-reviewer** — entidade, repositorio, consulta, migracao, schema.
- **ddd-architect** — regra de negocio nova, modulo novo, mudanca de camada, ou quando o diff espalha logica por lugares estranhos.
- **test-strategist** — sempre que ha comportamento novo; obrigatorio se a feature tem spec.

A cada agente passe: o alvo exato (comando de diff ou lista de arquivos), e o caminho da spec quando houver.

## 3. Consolide — este passo e o que da valor ao relatorio

Nao cole as saidas em sequencia. Trabalhe o conjunto:

1. **Deduplique**: o mesmo defeito chega por tres angulos. Mantenha a formulacao mais precisa e cite os angulos.
2. **Resolva conflito**: quando dois agentes se contradizem (um pede abstracao, outro pede simplicidade), decida e **justifique** com a altitude do projeto. Nao repasse a contradicao ao usuario.
3. **Filtre**: descarte achado teorico sem caminho de falha, sugestao de gosto pessoal e proposta que briga com a convencao do repositorio. Diga quantos achados voce descartou e por que.
4. **Verifique por amostragem**: pegue os achados mais graves e confira voce mesmo no arquivo. Subagente erra; relatar erro de subagente como fato e pior que nao revisar.
5. **Priorize** por impacto real: perda ou corrupcao de dado e falha de autorizacao primeiro; depois defeito de comportamento; depois contrato e desempenho; qualidade no fim.

## 4. Relate

Cabecalho com: alvo revisado, arquivos, agentes acionados.

Depois a lista unica e ordenada. Cada achado: severidade, veredito (CONFIRMADO / PLAUSIVEL), `arquivo:linha`, o defeito em uma frase, o cenario de falha, a correcao minima, e de qual especialista veio.

Feche com: o que esta bom e deve ser preservado; o que nao foi avaliado; e, se houver spec, se algum achado indica desvio dela (ai o passo certo e `/caramelo:verify`).

## 5. Se `--fix`

Aplique somente o que e CONFIRMADO, de correcao pequena e inequivoca. Para cada correcao, uma linha do que mudou. Depois rode os testes e relate o resultado real. O que nao foi aplicado fica listado como pendencia — com o motivo.

Sem `--fix`, nao edite nada.
