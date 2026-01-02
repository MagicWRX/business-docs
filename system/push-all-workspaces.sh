#!/bin/bash

# BUSINESS SSOT (business-docs) - Multi-Project Git Push Script
# Canonical location: Business/DOCs/system/push-all-workspaces.sh
# Pushes all workspaces to their respective GitHub repositories with SSOT preflight for DOCs.

set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "❌ git is required but was not found in PATH"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUSINESS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Format: "name|path"
WORKSPACES=(
  "docs|$BUSINESS_ROOT/DOCs"
  "admin|$BUSINESS_ROOT/ADMIN"
  "shared-hub|$BUSINESS_ROOT/SHARED/hub"
  "mxn-chat|$BUSINESS_ROOT/Websites/mxn-chat"
  "amazingly-strange-website|$BUSINESS_ROOT/Websites/amazingly-strange-website"
)

SKIPPED_WORKSPACES=()

get_workspace_info() {
  local search_name=$1
  local field=$2
  for ws in "${WORKSPACES[@]}"; do
    local name
    name=$(echo "$ws" | cut -d'|' -f1)
    if [ "$name" == "$search_name" ]; then
      echo "$ws" | cut -d'|' -f"$field"
      return 0
    fi
  done
  return 1
}

is_git_repo() {
  local path=$1
  git -C "$path" rev-parse --is-inside-work-tree >/dev/null 2>&1
}

ssot_preflight_docs() {
  local docs_path=$1
  echo -e "${YELLOW}🧭 SSOT preflight (DOCs): generating map + lint...${NC}"
  (
    cd "$docs_path"
    if [ -f "scripts/gen_doc_script_map.js" ]; then
      node scripts/gen_doc_script_map.js >/dev/null 2>&1 || true
    fi
    if [ -f "scripts/doc_lint.js" ]; then
      node scripts/doc_lint.js >/dev/null 2>&1 || true
    fi
  )
}

push_workspace() {
  local name=$1
  local path=$2

  echo -e "${BLUE}🚀 Pushing $name...${NC}"

  if [ ! -d "$path" ]; then
    echo -e "${YELLOW}⚠️  Skipping $name: directory does not exist (${path})${NC}"
    SKIPPED_WORKSPACES+=("${name} (missing directory)")
    return 0
  fi

  if ! is_git_repo "$path"; then
    echo -e "${YELLOW}⚠️  Skipping $name: no git repository found in ${path}${NC}"
    SKIPPED_WORKSPACES+=("${name} (not a git repo)")
    return 0
  fi

  if ! git -C "$path" remote get-url origin >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Skipping $name: no 'origin' remote configured (${path})${NC}"
    SKIPPED_WORKSPACES+=("${name} (no origin remote)")
    return 0
  fi

  if git -C "$path" diff --quiet && git -C "$path" diff --staged --quiet; then
    echo -e "${GREEN}✅ No changes to push for $name${NC}"
    return 0
  fi

  if [ "$name" == "docs" ]; then
    ssot_preflight_docs "$path"
  fi

  echo -e "${YELLOW}📝 Adding changes for $name...${NC}"
  git -C "$path" add .

  if [ "$name" == "docs" ] && [ -f "$path/scripts/check_no_bak.js" ]; then
    (cd "$path" && node scripts/check_no_bak.js)
  fi

  if git -C "$path" diff --staged --quiet; then
    echo -e "${GREEN}✅ No staged changes for $name${NC}"
    return 0
  fi

  local commit_msg="Automated push from DOCs/system/push-all-workspaces.sh - $(date '+%Y-%m-%d %H:%M:%S')"
  echo -e "${YELLOW}💾 Committing changes for $name...${NC}"
  git -C "$path" commit -m "$commit_msg"

  echo -e "${YELLOW}⬆️  Pushing $name to remote...${NC}"
  if git -C "$path" push; then
    echo -e "${GREEN}✅ Successfully pushed $name${NC}"
  else
    echo -e "${RED}❌ Failed to push $name${NC}"
    return 1
  fi
}

show_help() {
  echo "BUSINESS SSOT - Multi-Project Git Push Script"
  echo ""
  echo "Usage: $0 [command] [workspace]"
  echo ""
  echo "Commands:"
  echo "  push          Push all workspaces (default)"
  echo "  push <name>   Push specific workspace"
  echo "  status        Show git status for all workspaces"
  echo "  status <name> Show git status for specific workspace"
  echo "  list          List all workspaces"
  echo "  help          Show this help"
  echo ""
  echo "Workspaces:"
  for ws in "${WORKSPACES[@]}"; do
    local name
    local path
    name=$(echo "$ws" | cut -d'|' -f1)
    path=$(echo "$ws" | cut -d'|' -f2)
    echo "  $name - $path"
  done
}

show_status() {
  local name=$1
  local path=$2

  echo -e "${BLUE}📊 Status for $name:${NC}"
  if [ ! -d "$path" ]; then
    echo -e "${RED}❌ Directory $path does not exist${NC}"
    return 0
  fi

  if ! is_git_repo "$path"; then
    echo -e "${YELLOW}⚠️  No git repository found${NC}"
    return 0
  fi

  git -C "$path" status -sb
  git -C "$path" status --short
  echo ""
}

list_workspaces() {
  echo "Available workspaces:"
  for ws in "${WORKSPACES[@]}"; do
    local name
    local path
    name=$(echo "$ws" | cut -d'|' -f1)
    path=$(echo "$ws" | cut -d'|' -f2)
    echo "  $name: $path"
  done
}

COMMAND=${1:-push}
WORKSPACE_NAME=${2:-}

case $COMMAND in
  push)
    if [ -n "$WORKSPACE_NAME" ]; then
      workspace_path=$(get_workspace_info "$WORKSPACE_NAME" 2 || true)
      if [ -z "$workspace_path" ]; then
        echo -e "${RED}❌ Workspace '$WORKSPACE_NAME' not found${NC}"
        echo ""
        list_workspaces
        exit 1
      fi
      push_workspace "$WORKSPACE_NAME" "$workspace_path"
    else
      echo -e "${BLUE}🚀 Starting push for all workspaces...${NC}"
      echo ""
      FAILED_WORKSPACES=()
      for ws in "${WORKSPACES[@]}"; do
        name=$(echo "$ws" | cut -d'|' -f1)
        path=$(echo "$ws" | cut -d'|' -f2)
        if ! push_workspace "$name" "$path"; then
          FAILED_WORKSPACES+=("$name")
        fi
        echo ""
      done

      if [ ${#FAILED_WORKSPACES[@]} -eq 0 ]; then
        echo -e "${GREEN}🎉 All workspaces pushed successfully!${NC}"
      else
        echo -e "${RED}❌ Failed to push workspaces: ${FAILED_WORKSPACES[*]}${NC}"
        exit 1
      fi
    fi
    ;;
  status)
    if [ -n "$WORKSPACE_NAME" ]; then
      workspace_path=$(get_workspace_info "$WORKSPACE_NAME" 2 || true)
      if [ -z "$workspace_path" ]; then
        echo -e "${RED}❌ Workspace '$WORKSPACE_NAME' not found${NC}"
        echo ""
        list_workspaces
        exit 1
      fi
      show_status "$WORKSPACE_NAME" "$workspace_path"
    else
      echo -e "${BLUE}📊 Git status for all workspaces:${NC}"
      echo ""
      for ws in "${WORKSPACES[@]}"; do
        name=$(echo "$ws" | cut -d'|' -f1)
        path=$(echo "$ws" | cut -d'|' -f2)
        show_status "$name" "$path"
      done
    fi
    ;;
  list)
    list_workspaces
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo -e "${RED}❌ Unknown command: $COMMAND${NC}"
    echo ""
    show_help
    exit 1
    ;;
esac
