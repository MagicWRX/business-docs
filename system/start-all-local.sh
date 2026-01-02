#!/bin/bash

# BUSINESS SSOT (business-docs) - Multi-Project Development Launcher
# Canonical location: Business/DOCs/system/start-all-local.sh
# Starts all projects on designated ports and refreshes DOCs SSOT artifacts for local review.

set -e

# Resolve BUSINESS_ROOT relative to this file (portable; no hardcoded /Users paths)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUSINESS_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DOCS_ROOT_DEFAULT="$BUSINESS_ROOT/DOCs"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Project configurations (Bash 3.2 compatible array)
# Format: "name|path|port"
PROJECTS=(
  "hub|$BUSINESS_ROOT/SHARED/hub|3000"
  "mxn-chat|$BUSINESS_ROOT/Websites/mxn-chat|3001"
  "magicwrx|$BUSINESS_ROOT/Websites/MagicWRX|3002"
  "amazingly-strange|$BUSINESS_ROOT/Websites/amazingly-strange-website/amazingly-strange-website|3003"
  "base-template|$BUSINESS_ROOT/Websites/base-template|3004"
  "admin|$BUSINESS_ROOT/ADMIN|3005"
  "template-wrx|$BUSINESS_ROOT/Websites/Template-WRX|3006"
  "auth-tool|$BUSINESS_ROOT/Websites/auth-tool|3007"
  "auth-tool-pkg|$BUSINESS_ROOT/Websites/auth-tool-package|3008"
)

# Helper to get project details
get_project_info() {
  local search_name=$1
  local field=$2
  for proj in "${PROJECTS[@]}"; do
    local name
    name=$(echo "$proj" | cut -d'|' -f1)
    if [ "$name" == "$search_name" ]; then
      echo "$proj" | cut -d'|' -f"$field"
      return 0
    fi
  done
  return 1
}

refresh_docs_ssot_status() {
  local docs_root="${DOCS_ROOT:-$DOCS_ROOT_DEFAULT}"
  if [ ! -d "$docs_root" ]; then
    echo -e "${YELLOW}⚠️  DOCs repo not found at $docs_root; skipping SSOT refresh${NC}"
    return 0
  fi

  if [ ! -f "$docs_root/scripts/doc_lint.js" ]; then
    echo -e "${YELLOW}⚠️  DOCs lint script not found; skipping SSOT refresh${NC}"
    return 0
  fi

  echo -e "${BLUE}📚 Refreshing DOCs SSOT status (map + lint)...${NC}"
  (
    cd "$docs_root"
    node scripts/gen_doc_script_map.js >/dev/null 2>&1 || true
    node scripts/doc_lint.js >/dev/null 2>&1 || true
  )
}

check_port() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    return 1
  fi
  return 0
}

kill_port() {
  local port=$1
  local pids
  pids=$(lsof -ti :$port 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo -e "${YELLOW}⚠️  Port $port is in use. Cleaning up...${NC}"
    for pid in $pids; do
      kill -9 "$pid" 2>/dev/null || true
    done
    sleep 1
  fi
}

stop_project() {
  local name=$1
  if [ -f "/tmp/$name-dev.pid" ]; then
    local pid
    pid=$(cat "/tmp/$name-dev.pid")
    if ps -p "$pid" > /dev/null; then
      kill "$pid" 2>/dev/null || true
      echo -e "${GREEN}✅ Stopped $name (PID: $pid)${NC}"
    else
      echo -e "${YELLOW}⚠️  Process $pid not found, cleaning up pid file${NC}"
    fi
    rm "/tmp/$name-dev.pid"
  fi

  local port
  port=$(get_project_info "$name" 3 2>/dev/null || true)
  if [ -n "$port" ]; then
    kill_port "$port"
  fi
}

start_project() {
  local name=$1
  local path
  local port
  path=$(get_project_info "$name" 2 || true)
  port=$(get_project_info "$name" 3 || true)

  if [ -z "$path" ] || [ -z "$port" ]; then
    echo -e "${RED}❌ Unknown project: $name${NC}"
    return 1
  fi

  stop_project "$name"
  kill_port "$port"

  echo -e "${BLUE}🚀 Starting $name on port $port...${NC}"

  if [ ! -d "$path" ]; then
    echo -e "${RED}❌ Directory not found: $path${NC}"
    return 1
  fi

  if [ ! -d "$path/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Warning: $path/node_modules not found. Running npm install...${NC}"
    (cd "$path" && npm install)
  fi

  if [ ! -f "$path/.env.local" ]; then
    echo -e "${YELLOW}⚠️  Warning: $path/.env.local not found${NC}"
    if [ -f "$path/.env.local.example" ]; then
      echo -e "${YELLOW}   Found .env.local.example - copy and configure it${NC}"
    fi
  fi

  (
    cd "$path"
    DOCS_ROOT="${DOCS_ROOT:-$DOCS_ROOT_DEFAULT}" PORT=$port npm run dev > "/tmp/$name-dev.log" 2>&1 &
    echo $! > "/tmp/$name-dev.pid"
    echo -e "${GREEN}✅ $name started on http://localhost:$port${NC}"
    echo -e "   Logs: /tmp/$name-dev.log"
    echo -e "   PID: $(cat /tmp/$name-dev.pid)"
  )
}

stop_all() {
  echo -e "${BLUE}🛑 Stopping all projects...${NC}"
  for proj in "${PROJECTS[@]}"; do
    local name
    name=$(echo "$proj" | cut -d'|' -f1)
    stop_project "$name"
  done
}

status_all() {
  echo -e "${BLUE}📊 Project Status:${NC}"
  for proj in "${PROJECTS[@]}"; do
    local name
    local port
    name=$(echo "$proj" | cut -d'|' -f1)
    port=$(echo "$proj" | cut -d'|' -f3)

    if [ -f "/tmp/$name-dev.pid" ]; then
      local pid
      pid=$(cat "/tmp/$name-dev.pid")
      if ps -p "$pid" > /dev/null; then
        echo -e "${GREEN}✅ $name - Running on :$port (PID: $pid)${NC}"
      else
        echo -e "${RED}❌ $name - Dead process${NC}"
        rm "/tmp/$name-dev.pid"
      fi
    else
      if ! check_port "$port"; then
        echo -e "${YELLOW}⚠️  $name - Port $port is active but no PID file found${NC}"
      else
        echo -e "${YELLOW}⏸️  $name - Not running${NC}"
      fi
    fi
  done
}

trap stop_all INT TERM

case "${1:-start}" in
  start)
    if [ -z "${2:-}" ]; then
      if [ -x "$BUSINESS_ROOT/SHARED/build-shared.sh" ]; then
        if [ ! -d "$BUSINESS_ROOT/SHARED/location-filter/dist" ] || [ ! -d "$BUSINESS_ROOT/SHARED/layout-manager/dist" ]; then
          echo -e "${YELLOW}⚠️  Shared packages not built. Building now...${NC}"
          "$BUSINESS_ROOT/SHARED/build-shared.sh"
        fi
      fi

      refresh_docs_ssot_status

      echo -e "${BLUE}🚀 Starting all projects...${NC}"
      for proj in "${PROJECTS[@]}"; do
        local name
        name=$(echo "$proj" | cut -d'|' -f1)
        start_project "$name"
      done

      echo -e "${BLUE}📡 All projects started. Press Ctrl+C to stop all.${NC}"
      while true; do sleep 1; done
    else
      start_project "$2"
    fi
    ;;
  fresh)
    echo -e "${BLUE}🔄 Performing a fresh start...${NC}"
    stop_all
    sleep 2

    if [ -x "$BUSINESS_ROOT/SHARED/build-shared.sh" ]; then
      echo -e "${BLUE}📦 Rebuilding shared packages...${NC}"
      "$BUSINESS_ROOT/SHARED/build-shared.sh"
    fi

    refresh_docs_ssot_status

    for proj in "${PROJECTS[@]}"; do
      local name
      name=$(echo "$proj" | cut -d'|' -f1)
      start_project "$name"
    done

    echo -e "${BLUE}📡 All projects restarted fresh. Press Ctrl+C to stop all.${NC}"
    while true; do sleep 1; done
    ;;
  stop)
    if [ -z "${2:-}" ]; then
      stop_all
    else
      stop_project "$2"
    fi
    ;;
  restart)
    if [ -z "${2:-}" ]; then
      stop_all
      sleep 2
      for proj in "${PROJECTS[@]}"; do
        local name
        name=$(echo "$proj" | cut -d'|' -f1)
        start_project "$name"
      done
    else
      stop_project "$2"
      sleep 1
      start_project "$2"
    fi
    ;;
  status)
    status_all
    ;;
  *)
    echo "Usage: $0 {start|fresh|stop|restart|status} [project-name]"
    echo ""
    echo "Projects:"
    for proj in "${PROJECTS[@]}"; do
      local name
      local port
      name=$(echo "$proj" | cut -d'|' -f1)
      port=$(echo "$proj" | cut -d'|' -f3)
      echo "  - $name (port $port)"
    done
    exit 1
    ;;
esac
