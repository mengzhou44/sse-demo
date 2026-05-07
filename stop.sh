#!/usr/bin/env bash

ROOT="$(cd "$(dirname "$0")" && pwd)"

stop_pid() {
  local name="$1"
  local pidfile="$ROOT/$2"

  if [ -f "$pidfile" ]; then
    local pid
    pid=$(cat "$pidfile")
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid"
      echo "Stopped $name (PID $pid)"
    else
      echo "$name was not running"
    fi
    rm -f "$pidfile"
  else
    echo "No PID file for $name — skipping"
  fi
}

stop_pid "backend"  "backend.pid"
stop_pid "frontend" "frontend.pid"

echo "Done."
