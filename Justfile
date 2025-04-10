run: run_backend run_frontend

run_backend:
    cd ./mqtt_backend && poetry run quart run

run_frontend:
    cd ./mqtt_frontend && ng serve