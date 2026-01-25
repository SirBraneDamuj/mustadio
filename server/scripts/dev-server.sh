#!/bin/bash

# Dev service management script for mustadio-server
# Usage: ./scripts/dev-server.sh [server|loader] [start|stop|restart|status|logs]
#        ./scripts/dev-server.sh [start|stop|restart|status|logs]  (defaults to server)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PORT="${PORT:-3000}"

# Determine service type and action
if [[ "$1" == "server" || "$1" == "loader" ]]; then
    SERVICE="$1"
    ACTION="${2:-start}"
else
    SERVICE="server"
    ACTION="${1:-start}"
fi

# Set paths based on service
PID_FILE="$PROJECT_DIR/.$SERVICE.pid"
LOG_FILE="$PROJECT_DIR/.$SERVICE.log"

if [ "$SERVICE" == "server" ]; then
    ENTRY_POINT="src/index.ts"
    SERVICE_NAME="Server"
else
    ENTRY_POINT="src/loader.ts"
    SERVICE_NAME="Loader"
fi

start_service() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "$SERVICE_NAME already running (PID: $PID)"
            exit 1
        else
            rm -f "$PID_FILE"
        fi
    fi

    if [ "$SERVICE" == "server" ]; then
        echo "Starting $SERVICE_NAME on port $PORT..."
    else
        echo "Starting $SERVICE_NAME..."
    fi

    cd "$PROJECT_DIR"
    npx tsx "$ENTRY_POINT" > "$LOG_FILE" 2>&1 &
    PID=$!
    echo $PID > "$PID_FILE"

    sleep 2

    if kill -0 "$PID" 2>/dev/null; then
        echo "$SERVICE_NAME started (PID: $PID)"
        echo "Log file: $LOG_FILE"
        if [ "$SERVICE" == "server" ]; then
            echo "http://localhost:$PORT"
        fi
    else
        echo "$SERVICE_NAME failed to start. Check $LOG_FILE for errors."
        cat "$LOG_FILE"
        rm -f "$PID_FILE"
        exit 1
    fi
}

stop_service() {
    if [ ! -f "$PID_FILE" ]; then
        echo "No PID file found. $SERVICE_NAME may not be running."
        exit 0
    fi

    PID=$(cat "$PID_FILE")

    if kill -0 "$PID" 2>/dev/null; then
        echo "Stopping $SERVICE_NAME (PID: $PID)..."
        kill "$PID"

        for i in {1..10}; do
            if ! kill -0 "$PID" 2>/dev/null; then
                echo "$SERVICE_NAME stopped."
                rm -f "$PID_FILE"
                exit 0
            fi
            sleep 0.5
        done

        echo "Force killing $SERVICE_NAME..."
        kill -9 "$PID" 2>/dev/null
        rm -f "$PID_FILE"
        echo "$SERVICE_NAME stopped."
    else
        echo "$SERVICE_NAME not running (stale PID file)."
        rm -f "$PID_FILE"
    fi
}

status_service() {
    if [ ! -f "$PID_FILE" ]; then
        echo "$SERVICE_NAME is not running (no PID file)."
        exit 0
    fi

    PID=$(cat "$PID_FILE")

    if kill -0 "$PID" 2>/dev/null; then
        echo "$SERVICE_NAME is running (PID: $PID)"
        if [ "$SERVICE" == "server" ]; then
            echo "http://localhost:$PORT"
        fi
    else
        echo "$SERVICE_NAME is not running (stale PID file)."
        rm -f "$PID_FILE"
    fi
}

show_logs() {
    if [ -f "$LOG_FILE" ]; then
        tail -f "$LOG_FILE"
    else
        echo "No log file found for $SERVICE_NAME."
    fi
}

status_all() {
    echo "=== Server ==="
    if [ -f "$PROJECT_DIR/.server.pid" ]; then
        PID=$(cat "$PROJECT_DIR/.server.pid")
        if kill -0 "$PID" 2>/dev/null; then
            echo "Running (PID: $PID) - http://localhost:$PORT"
        else
            echo "Not running (stale PID file)"
        fi
    else
        echo "Not running"
    fi

    echo ""
    echo "=== Loader ==="
    if [ -f "$PROJECT_DIR/.loader.pid" ]; then
        PID=$(cat "$PROJECT_DIR/.loader.pid")
        if kill -0 "$PID" 2>/dev/null; then
            echo "Running (PID: $PID)"
        else
            echo "Not running (stale PID file)"
        fi
    else
        echo "Not running"
    fi
}

case "$ACTION" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        stop_service
        sleep 1
        start_service
        ;;
    status)
        if [[ "$1" != "server" && "$1" != "loader" ]]; then
            status_all
        else
            status_service
        fi
        ;;
    logs)
        show_logs
        ;;
    *)
        echo "Usage: $0 [server|loader] {start|stop|restart|status|logs}"
        echo "       $0 {start|stop|restart|status|logs}  (defaults to server)"
        echo ""
        echo "Examples:"
        echo "  $0 start           # Start the server"
        echo "  $0 loader start    # Start the loader"
        echo "  $0 status          # Show status of both services"
        echo "  $0 loader logs     # Tail loader logs"
        exit 1
        ;;
esac
