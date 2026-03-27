# CSC581 - Project 1 

## Overview

This repository contains the initial structure and documentation for the project in CSC 581.
The goal of this project is to design and deploy a multi-component system using containerized services that can be executed in a CloudLab environment.

The repository is organized to support reproducible experiments, clear documentation, and future automation for CloudLab deployments. This project follows a “Static Site + API” style architecture, where a client-facing service interacts with a backend API.

---

## Vision

The proposed system consists of two containerized components that communicate over a network:

### Component 1 - Client Service
A lightweight client application responsible for sending requests and displaying responses.

### Component 2 - Backend API Service
A backend service responsible for processing requests and returning data through a RESTful interface.

The two components will communicate using HTTP REST APIs.

### Architecture Diagram
```
+---------------------+        HTTP REST        +----------------------+
|   Client Service    |  -------------------->  |   Backend API        |
|   (component2)      |                         |   (component1)       |
+---------------------+                         +----------------------+
```
---

## Proposal

This project implements a simple multi-component application using Docker containers to demonstrate containerization, service isolation, and inter-service communication.

The system follows a client-server architecture, where a lightweight Node.js client (component2) interacts with a Python-based backend API (component1) over HTTP. Each component is containerized independently, allowing them to run in isolated environments while still communicating through a shared Docker network.

## Build Process

This project uses two Dockerfiles, one for each containerized component.

### Component 1 (Backend API - Python)

```dockerfile
FROM python:3.11-slim        # uses a lightweight Python image to reduce size and improve startup time.
WORKDIR /app                 # sets the working directory inside the container.
COPY app.py .                # copies the backend application into the container.
EXPOSE 8000                  # documents that the container listens on port 8000.
CMD ["python", "app.py"]     # starts the backend server when the container runs.
```

### Component 2 (Clientt Service - Node.js)

```dockerfile
FROM node:20-alpine        # uses a minimal Node.js image for efficiency.
WORKDIR /app               # sets the working directory inside the container.
COPY app.js .              # copies the client service code into the contaniner.
EXPOSE 3000                # documents that the service runs on port 3000.
CMD ["node", "app.js"]     # starts the Node.js service when the container runs.
```

## Base Image Justification
The selected images (python:3.11-slim and node:20-alpine) were chose for:
- small size (faster builds and deployment)
- compatibility woth CoudLab
- reduced resource usage
- strong community support

---

## Networking

Docker Compose creates a defaut bridge network that allows the containers to communicate with each other.

### Communication

- component1 (backend) runs on port 8000
- component2 (client) runs on port 3000

Both containers are connected to the same internal Docker network.

### DNS Resolution

Docker automatically provides DNS resolution using service names.

This means:
- `component1` can be accessed using hostname `component1`
- `component2` can be accessed using hostname `component2`

This removes the need for hardcoded IP addresses/

### Port Mapping

Ports are exposed to the CloudLab host:

- `8000:8000` -> backend API
- `3000:3000` -> client service

This allows testing using:

```bash
curl localhost:8000
curl localhost:3000
```
---

## Repository Structure

```
csc581_project1/
|
|-- component1/         # Backend API
|  |-- Dockerfile
|  |-- README.md
|  |__ app.py
|
|-- component2/         # Client Service
|  |-- Dockerfile
|  |-- README.md
|  |__ app.js
|
|-- docs/
|  |__diagramls/       # Architecture and system diagrams
|
|-- resume/            # Professional resume
|
|-- scripts/           # Setup and automation scripts
|  |__ setup-cloudlab.sh
|
|__ README.md         # Project Documentation
```

---

## CloudLab Readiness

This repository includes a minimal two-container setup that can be launched on a CloudLab Ubuntu node.

### Files added for CloudLab readiness
- `component1/Dockerfile`
- `component1/app.py`
- `component2/Dockerfile`
- `component2/app.js`
- `docker-compose.yml`
- `scripts/setup-cloudlab.sh`

### How to run
1. Launch an Ubuntu-based CloudLab node.
2. Clone this repository.
```bash
git clone https://github.com/mclark-99/csc581_project1.git
```
3. cd into project folder
```bash
cd csc581_project1
ls
```

4.  Run the setup script:

```bash
bash scripts/setup-cloudlab.sh
```
5. Build and start the containers:
```bash
sudo docker-compose up --build
```

6. Verify the services:

```bash
curl localhost:8000
curl localhost:3000
```

Expected responses:

```bash
Hello from component1 (Python backend)!
Hello from component2 (Node client/service)!
```

---


## Author

Mait Clark
Master's Student - Computer Science
West Chester University
