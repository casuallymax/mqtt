# MQTT-Wetter

## Setup Backend

### Poetry

In diesem Projekt wird Poetry für das Dependeny Management der Python-Umgebung verwendet.
Es wird mindestens Python Version 3.9 benötigt.

Für die Installation siehe Poetry Docu: https://python-poetry.org/docs/

Installieren der Dependencies:
```bash
cd mqtt_backend
poetry install
```

Starten des Servers:
```bash
poetry run quart run
```

## Setup Frontend
### Angular

- Angular CLI 18.2.17
- Node 22.15.0
- NPM 10.9.2

Installation der Anwendung:
```bash
cd mqtt_frontend
npm install
```

Starten des Frontends:
```bash
ng serve
```