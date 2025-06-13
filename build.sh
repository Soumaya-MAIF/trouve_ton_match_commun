#!/bin/bash

set -e  # Arrête le script en cas d'erreur

# === Backend Java ===
echo "Construction du backend Java..."
docker build -f src/main/java/Dockerfile -t registry.nocturlab.fr/dreamteam/trouve-ton-match-backend .

# === Frontend JS ===
echo "Construction du frontend JS..."
docker build -f src/main/js/Dockerfile -t registry.nocturlab.fr/dreamteam/trouve-ton-match-frontend .

echo "Les deux images ont été construites avec succès !"
