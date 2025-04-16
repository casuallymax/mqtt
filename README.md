# MQTT-Example
#### Aufgabe 1c)


## Setup Backend

----
### Poetry

In diesem Projekt wird Poetry für das Dependeny Management der Python-Umgebung verwendet.
Es wird mindestens Python Version 3.9 benötigt.

Für die Installation siehe Poetry Docu: https://python-poetry.org/docs/

Installieren der Dependencies:
```bash
poetry install
```

Aktivieren der virtuellen Umgebung:
```bash
poetry env activate
```

Starten des Servers:
```bash
poetry run quart run
```

## Setup Frontend

---
### Angular

- Angular CLI 18.2.10
- NPM 10.2.4

Installation der Anwendung:
```bash
cd mqtt_frontend
npm install
```

Starten des Frontends:
```bash
ng serve
```