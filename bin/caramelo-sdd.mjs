#!/usr/bin/env node
/**
 * Instalador do Caramelo SDD.
 *
 *   npx github:guigomes91/caramelo-sdd install          plugin do Claude Code (recebe atualizacoes)
 *   npx github:guigomes91/caramelo-sdd vendor           copia os arquivos para ./.claude (versionado no repo)
 *   npx github:guigomes91/caramelo-sdd doctor           mostra o que esta instalado
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'));
const PLUGIN = 'caramelo';
const PLACEHOLDER = 'SEU-USUARIO';

const C = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m',
};
const say = (s = '') => process.stdout.write(s + '\n');
const ok = (s) => say(`${C.green}✔${C.reset} ${s}`);
const warn = (s) => say(`${C.yellow}!${C.reset} ${s}`);
const fail = (s) => { say(`${C.red}✘${C.reset} ${s}`); process.exit(1); };

// ── argumentos ───────────────────────────────────────────────
const argv = process.argv.slice(2);
const cmd = argv.find((a) => !a.startsWith('-')) ?? 'help';
const flag = (name, fallback = undefined) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = argv[i + 1];
  return next && !next.startsWith('-') ? next : true;
};
const has = (name) => argv.includes(`--${name}`);

// ── origem do marketplace ────────────────────────────────────
function repoSource() {
  const url = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url ?? '';
  const m = url.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  return m ? `${m[1]}/${m[2]}` : null;
}

function resolveSource() {
  const from = flag('from');
  if (from === true) fail('--from precisa de um valor: owner/repo, uma URL, um caminho, ou "local".');
  if (from === 'local' || from === '.') return PKG_ROOT;
  if (from) return from;

  const repo = repoSource();
  if (!repo || repo.includes(PLACEHOLDER)) {
    fail(
      `A origem do plugin nao esta definida.\n` +
      `  Publique este repositorio e ajuste "repository" no package.json,\n` +
      `  ou passe a origem na mao:\n\n` +
      `    npx github:guigomes91/caramelo-sdd install --from seu-usuario/caramelo-sdd\n` +
      `    npx github:guigomes91/caramelo-sdd install --from local    ${C.dim}# usa os arquivos deste pacote${C.reset}`
    );
  }
  return repo;
}

// ── claude cli ───────────────────────────────────────────────
const quote = (a) => (/[\s"']/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a);

// comando montado como string unica: no Windows "claude" e um shim .cmd, que exige
// shell, e passar um array de args junto com shell dispara DEP0190 no Node.
function claude(args, { capture = false } = {}) {
  return spawnSync(['claude', ...args].map(quote).join(' '), {
    stdio: capture ? 'pipe' : 'inherit',
    shell: true,
    encoding: 'utf8',
  });
}

function requireClaude() {
  const r = claude(['--version'], { capture: true });
  if (r.status !== 0) {
    fail(
      'O comando "claude" nao foi encontrado no PATH.\n' +
      '  Instale o Claude Code (https://claude.com/claude-code) ou use:\n' +
      '    npx github:guigomes91/caramelo-sdd vendor    # copia os arquivos para ./.claude, sem plugin'
    );
  }
  return (r.stdout || '').trim();
}

// ── install ──────────────────────────────────────────────────
function install() {
  const version = requireClaude();
  const source = resolveSource();
  const scope = flag('scope', 'user');
  if (!['user', 'project', 'local'].includes(scope)) {
    fail(`--scope aceita user, project ou local (recebido: ${scope}).`);
  }

  say(`${C.bold}Caramelo SDD${C.reset} ${C.dim}v${pkg.version}${C.reset}`);
  say(`${C.dim}claude ${version} · origem: ${source} · escopo: ${scope}${C.reset}\n`);

  const r = claude(['plugin', 'install', PLUGIN, '--marketplace', source, '--scope', scope]);
  if (r.status !== 0) fail('A instalacao falhou. A saida do Claude Code esta acima.');

  say('');
  ok(`Plugin "${PLUGIN}" instalado no escopo ${scope}.`);
  say('');
  say(`Em uma sessao do Claude Code, rode ${C.cyan}/caramelo:init${C.reset} uma vez no projeto e depois:`);
  say(`  ${C.cyan}/caramelo:spec${C.reset} <feature>  →  ${C.cyan}/caramelo:plan${C.reset}  →  ${C.cyan}/caramelo:tasks${C.reset}`);
  say(`  ${C.cyan}/caramelo:implement${C.reset}  →  ${C.cyan}/caramelo:review${C.reset}  →  ${C.cyan}/caramelo:verify${C.reset}`);
  say('');
  say(`${C.dim}Atualizar depois: claude plugin update ${PLUGIN}${C.reset}`);
}

// ── vendor ───────────────────────────────────────────────────
function vendor() {
  const target = resolve(String(flag('dir', process.cwd())));
  const force = has('force');
  const claudeDir = join(target, '.claude');
  const written = [];
  const skipped = [];

  const put = (path, content) => {
    if (existsSync(path) && !force) { skipped.push(path); return; }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, 'utf8');
    written.push(path);
  };

  say(`${C.bold}Caramelo SDD${C.reset} ${C.dim}v${pkg.version} · modo vendor${C.reset}`);
  say(`${C.dim}destino: ${target}${C.reset}\n`);

  // fora do plugin nao existe ${CLAUDE_PLUGIN_ROOT} nem namespace automatico
  const devendorize = (text) => text
    .replaceAll('${CLAUDE_PLUGIN_ROOT}/templates/', `.claude/${PLUGIN}/templates/`)
    .replaceAll(
      '`caramelo:<nome>` quando o plugin estiver instalado, ou `<nome>` em instalacao vendor',
      '`<nome>` (instalacao vendor: os agentes estao em `.claude/agents/`)',
    );

  // agentes: nome preservado, para as skills encontrarem os mesmos nomes
  for (const file of readdirSync(join(PKG_ROOT, 'agents')).filter((f) => f.endsWith('.md'))) {
    put(join(claudeDir, 'agents', file), devendorize(readFileSync(join(PKG_ROOT, 'agents', file), 'utf8')));
  }

  // skills: prefixadas, porque o namespace do plugin nao existe aqui
  for (const dir of readdirSync(join(PKG_ROOT, 'skills'))) {
    const src = join(PKG_ROOT, 'skills', dir, 'SKILL.md');
    if (!existsSync(src)) continue;
    const body = devendorize(readFileSync(src, 'utf8'))
      .replace(/^name:\s*(.+)$/m, (_, n) => `name: ${PLUGIN}-${n.trim()}`);
    put(join(claudeDir, 'skills', `${PLUGIN}-${dir}`, 'SKILL.md'), body);
  }

  // templates
  for (const file of readdirSync(join(PKG_ROOT, 'templates')).filter((f) => f.endsWith('.md'))) {
    put(join(claudeDir, PLUGIN, 'templates', file), readFileSync(join(PKG_ROOT, 'templates', file), 'utf8'));
  }

  const rel = (p) => p.replace(target + (process.platform === 'win32' ? '\\' : '/'), '');
  written.forEach((p) => ok(rel(p)));
  if (skipped.length) {
    say('');
    warn(`${skipped.length} arquivo(s) preservado(s) por já existirem. Use --force para sobrescrever:`);
    skipped.forEach((p) => say(`  ${C.dim}${rel(p)}${C.reset}`));
  }

  say('');
  ok(`${written.length} arquivo(s) escrito(s).`);
  say('');
  say(`Comandos disponiveis na proxima sessao: ${C.cyan}/caramelo-spec${C.reset}, ${C.cyan}/caramelo-plan${C.reset}, ${C.cyan}/caramelo-tasks${C.reset},`);
  say(`${C.cyan}/caramelo-implement${C.reset}, ${C.cyan}/caramelo-review${C.reset}, ${C.cyan}/caramelo-verify${C.reset}, ${C.cyan}/caramelo-diagram${C.reset}, ${C.cyan}/caramelo-init${C.reset}`);
  say('');
  warn('Modo vendor nao recebe atualizacao automatica: rode de novo com --force para atualizar.');
}

// ── doctor ───────────────────────────────────────────────────
function doctor() {
  say(`${C.bold}Caramelo SDD${C.reset} ${C.dim}v${pkg.version}${C.reset}\n`);

  const v = claude(['--version'], { capture: true });
  if (v.status === 0) ok(`claude ${String(v.stdout).trim()}`);
  else warn('claude nao encontrado no PATH');

  if (v.status === 0) {
    const list = claude(['plugin', 'list'], { capture: true });
    const lines = String(list.stdout || '').split('\n').filter((l) => l.toLowerCase().includes(PLUGIN));
    if (lines.length) { ok('plugin instalado:'); lines.forEach((l) => say(`  ${C.dim}${l.trim()}${C.reset}`)); }
    else warn('plugin nao instalado (rode: npx github:guigomes91/caramelo-sdd install)');
  }

  const cwd = process.cwd();
  for (const [label, path] of [
    ['agentes vendor', join(cwd, '.claude', 'agents')],
    ['skills vendor', join(cwd, '.claude', 'skills')],
    ['specs do projeto', join(cwd, 'docs', 'specs')],
  ]) {
    if (existsSync(path)) ok(`${label}: ${readdirSync(path).length} item(ns) em ${path.replace(cwd, '.')}`);
    else say(`${C.dim}· ${label}: ausente${C.reset}`);
  }
}

// ── help ─────────────────────────────────────────────────────
function help() {
  say(`
${C.bold}caramelo-sdd${C.reset} ${C.dim}v${pkg.version}${C.reset} — Spec-Driven Development para Claude Code

${C.bold}USO${C.reset}
  npx github:guigomes91/caramelo-sdd <comando> [opcoes]

${C.bold}COMANDOS${C.reset}
  install        Instala como plugin do Claude Code ${C.dim}(recomendado: recebe atualizacoes)${C.reset}
  vendor         Copia agentes e skills para ./.claude ${C.dim}(arquivos versionados no repo)${C.reset}
  doctor         Mostra o que esta instalado neste ambiente
  help           Esta ajuda

${C.bold}OPCOES${C.reset}
  --scope <s>    install: user ${C.dim}(padrao)${C.reset}, project ou local
  --from <src>   install: owner/repo, URL, caminho, ou "local" para usar este pacote
  --dir <path>   vendor: destino ${C.dim}(padrao: diretorio atual)${C.reset}
  --force        vendor: sobrescreve arquivos existentes

${C.bold}EXEMPLOS${C.reset}
  npx github:guigomes91/caramelo-sdd install --scope project
  npx github:guigomes91/caramelo-sdd install --from local
  npx github:guigomes91/caramelo-sdd vendor --force
`);
}

// ── dispatch ─────────────────────────────────────────────────
const commands = { install, vendor, doctor, help };
if (has('version') || has('v')) { say(pkg.version); process.exit(0); }
const run = commands[cmd];
if (!run) { say(`${C.red}Comando desconhecido: ${cmd}${C.reset}`); help(); process.exit(1); }
run();
