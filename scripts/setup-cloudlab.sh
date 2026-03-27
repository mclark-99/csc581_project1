#!/bin/bash

set -e

sudo apt update
sudo apt install -y docker.io docker-compose git

sudo systemctl enable docker
sudo systemctl start docker

sudo usermod -aG docker $USER

echo "Setup complete."
echo "If dicker permission is denied, log out and back in, then run:"
echo "docker compose up --build"
