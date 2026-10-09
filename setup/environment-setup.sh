#!/bin/bash
# Setup do ambiente de nuvem do Claude Code para o Salute 2.0.
# Instala e liga o rtk e o OmniRoute em toda sessão nova.
# Uso: colar no claude.ai → ambiente → Edit → Setup script
# (ou registrar como hook SessionStart em .claude/settings.json).
set -euo pipefail

BIN="$HOME/.local/bin"
mkdir -p "$BIN"

# rtk: comprime a saída dos comandos de terminal antes de chegar ao agente
if [ ! -x "$BIN/rtk" ]; then
  curl -fsSL https://github.com/rtk-ai/rtk/releases/latest/download/rtk-x86_64-unknown-linux-musl.tar.gz \
    | tar xz -C "$BIN" rtk
  chmod +x "$BIN/rtk"
fi
"$BIN/rtk" init -g --auto-patch >/dev/null

# OmniRoute: roteador de modelos de IA, servidor local em http://localhost:20128
if ! command -v omniroute >/dev/null 2>&1; then
  npm install -g omniroute --no-fund --no-audit --loglevel=error
fi
if ! curl -fsS -o /dev/null -m 2 http://localhost:20128/v1/models; then
  mkdir -p "$HOME/.omniroute"
  (cd "$HOME" && nohup omniroute --no-color >"$HOME/.omniroute/server.log" 2>&1 &)
fi
