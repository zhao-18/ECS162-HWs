if [ "$1" == "dev" ]; then
    docker compose -f docker-compose.dev.yml up --build
    echo "http://localhost:5173/"
elif [ "$1" == "prod" ]; then
    docker compose -f docker-compose.prod.yml up --build
    echo "http://localhost:8000/"
else
    echo "missing required arguments: ./run.sh [prod|dev]"
fi
