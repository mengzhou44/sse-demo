#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting backend..."
cd "$ROOT/backend"
mvn spring-boot:run > "$ROOT/backend.log" 2>&1 &
echo $! > "$ROOT/backend.pid"
echo "  Backend PID $(cat "$ROOT/backend.pid") — logs: backend.log"

echo "Starting frontend..."
cd "$ROOT/frontend"
npm install --silent
npm run dev > "$ROOT/frontend.log" 2>&1 &
echo $! > "$ROOT/frontend.pid"
echo "  Frontend PID $(cat "$ROOT/frontend.pid") — logs: frontend.log"

echo ""
echo "Both services started."
echo "  Backend:  http://localhost:8090"
echo "  Frontend: http://localhost:3000"
echo ""
echo "Run ./stop.sh to stop them."
