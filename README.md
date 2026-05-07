# SSE Demo

A minimal Server-Sent Events (SSE) demo with a Spring Boot backend and a React/Vite frontend.

The backend streams 50 "Hello World" messages over HTTP to the browser in real time, with 100 ms between each event.

## Stack

| Layer    | Technology              |
|----------|-------------------------|
| Backend  | Spring Boot 3.2, Java 17, Maven |
| Frontend | React 18, Vite 5        |

## Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+ and npm

## Project structure

```
sse-demo/
├── backend/          # Spring Boot app (port 8090)
│   └── src/main/java/com/example/ssedemo/
│       ├── SseDemoApplication.java
│       └── SseController.java   # GET /stream → text/event-stream
└── frontend/         # React + Vite app (port 3000)
    └── src/
        ├── main.jsx
        └── App.jsx
```

## Getting started

### Start both services

```bash
./start.sh
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Stop both services

```bash
./stop.sh
```

## API

| Method | Path      | Description                              |
|--------|-----------|------------------------------------------|
| GET    | `/stream` | SSE endpoint — streams 50 events, ~5 s total |

CORS is configured to allow `http://localhost:3000`.
