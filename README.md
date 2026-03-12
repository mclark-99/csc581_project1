# CSC581 - Project 1 

## Overview

This repository contains the initial structure and documentation for the project in CSC 581.
The goal of this project is to design and deploy a multi-component system using containerized services that can be executed in a CloudLab environment.

The repository is organized to support reproducible experiments, clear documentation, and future automation for CloudLab deployments.

---

## Vision

The proposed system consists of two containerized components that communicate over a network:

### Component 1 - Client Service
A lightweight client application responsible for sending requests and displaying responses.

### Component 2 - Backend API Service
A backend service responsible for processing requests and returning data through a RESTful interface.

The two components will communicate using HTTP REST APIs.

### Architecture Diagram

+-------------------+ HTTP REST +-------------------+
| Client Service | --------------> | Backend API Service |
| (Container 1) || (Container 2) |
+-------------------+ +-------------------+

---

## Proposal

The system will be implementing using Docker containers to ensure portability and compatibility with CloudLab nodes.

## Planned Base Images

- CLient Service: Node.js
- Backend API Service: Python

These base images were selected for their lightweight footprint, fast startup time, and strong community support.

Containerization will allow each component to run independently while maintaining consistent runtime enironments across CloudLab experiments.

---

## Repository Structure

```
csc581_project1/
|
|-- component1/ # Client service container
|-- docs/diagrams/ # Architecture and system diagrams
|-- resume/ # Professional resume
|-- scripts/ # Setup and automation scripts (future)
|__ README.md # Project Documentation
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
3. Run the setup script:

```bash
bash scripts/setup-cloudlab.sh
```
4. Build and start the containers:
```bash
docker compose up --build
```
---

## Author

Mait Clark
Master's Student - Computer Science
West Chester University
