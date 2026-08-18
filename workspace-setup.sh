#!/usr/bin/env bash

set -euo pipefail

usage() {
  echo "Usage: ./workspace-setup.sh init"
}

resolve_script_directory() {
  local source_path="${BASH_SOURCE[0]}"
  local source_directory

  while [[ -L "${source_path}" ]]; do
    source_directory="$(cd -P "$(dirname "${source_path}")" >/dev/null 2>&1 && pwd)"
    source_path="$(readlink "${source_path}")"
    [[ "${source_path}" != /* ]] && source_path="${source_directory}/${source_path}"
  done

  cd -P "$(dirname "${source_path}")" >/dev/null 2>&1 && pwd
}

resolve_target_root() {
  local git_root

  if [[ -n "${WORKSPACE_TARGET_PATH:-}" ]]; then
    printf '%s\n' "${WORKSPACE_TARGET_PATH}"
  elif [[ -n "${CODEX_WORKTREE_PATH:-}" ]]; then
    printf '%s\n' "${CODEX_WORKTREE_PATH}"
  elif git_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
    printf '%s\n' "${git_root}"
  else
    resolve_script_directory
  fi
}

if [[ "$#" -ne 1 || "${1}" != "init" ]]; then
  usage >&2
  exit 64
fi

target_root="$(resolve_target_root)"
if [[ ! -d "${target_root}" ]]; then
  echo "Workspace target does not exist: ${target_root}" >&2
  exit 1
fi

target_root="$(cd -P "${target_root}" >/dev/null 2>&1 && pwd)"
if [[ ! -f "${target_root}/package.json" || ! -f "${target_root}/pnpm-lock.yaml" ]]; then
  echo "Workspace target is not a minimal-twitter checkout: ${target_root}" >&2
  exit 1
fi

cd "${target_root}"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20 or newer is required." >&2
  exit 1
fi

node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
if [[ "${node_major}" -lt 20 ]]; then
  echo "Node.js 20 or newer is required; found $(node --version)." >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required; install the version declared in package.json." >&2
  exit 1
fi

pnpm install --frozen-lockfile
