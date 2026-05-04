# CSC581 - Project 1 

## Overview

This repository contains the implementation and documentation for a multi-component system designed for deployment on CloudLab. The project demonstrates containerization, service isolation, and communication between components using a Static Site + API architecture.

The system consists of a frontend service that interacts with a backend API through HTTP requests. Each component is containerized using Docker and deployed on a CloudLab node.

---

## Vision

The proposed system consists of two containerized components that communicate over a network:

- A frontend service that serves a static resume-style website
- A backend API that provides structured data to the frontend

The frontend dynamically retrieves and displays data from the backend using JavaScript.

### Architecture Diagram
```
+---------------------+        HTTP (/api)        +----------------------+
|   Frontend (Nginx)  |  ---------------------->  |   Backend API        |
|   Static Website    |                          |   (Flask - Python)   |
+---------------------+                          +----------------------+
```
---

## Proposal

This project implements a simple full-stack application using Docker containers to demonstrate modern web architecture principles.

The system follows a client-server model, where a static frontend served by Nginx interacts with a Python-based backend API built using Flask. The frontend uses JavaScript to fetch data from the API and dynamically render content on the page.

Each component runs in its own container, allowing for separation of concerns and independent scaling.

## Build Process

This project uses two Dockerfiles, one for each containerized component.

### Component 1 (Backend API - Python Flask)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY app.py .
RUN pip install flask
EXPOSE 8000
CMD ["python", "app.py"]
```

### Component 2 (Frontend - Nginx Static Site)

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
```

## Base Image Justification
The selected base images were chosen for efficiency and compatibility
-python:3.11-slim
 - Lightweight and optimized for running Python applications
 - Reduces container size and startup time
 - Provides a clean environment for Flask API development
- nginx:alpine
 - Minimal and fast web server image
 - Ideal for serving static files
 - Commonly used in production environments for reverse proxy configurations

These images ensure fast builds, low resource usage, and compatibility with CloudLab environments.

---

## Networking

Docker Compose creates a default bridge network that allows the containers to communicate internally.

### Communication

- component1 (backend api) runs on port 8000
- component2 (frontend: Nginx) runs on port 3000
- The frontend communicates with the backend via
```bash
/api
```

### DNS Resolution

Docker automatically provides DNS resolution between services using their service names.

This means:
- `component1` can be accessed using hostname `component1`
- `component2` can be accessed using hostname `component2`

This removes the need for hardcoded IP addresses.

### Port Mapping

Ports are exposed to the CloudLab host:

- `8000:8000` -> backend API
- `3000:3000` -> frontend
---

## Reverse Proxy Configuration
Nginx is configured as a reverse proxy to forward API requests:
```Nginx
location /api {
 proxy_pass http://conponent1:8000;
}
```
This allows the frontend to communicate with the backend without directyly exposing backend ports in the browser.

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
|  |-- nginx.conf
|  |-- index.html
|  |-- script.js
|  |-- styles.css
|  |__ README.md
|
|-- docs/
|  |__diagrams/       # Architecture and system diagrams
|
|-- resume/            # Professional resume
|
|-- scripts/           # Setup and automation scripts
|  |__ setup-cloudlab.sh
|
|-- docker-compose.yml
|
|__ README.md         # Project Documentation
```

---

## CloudLab Readiness

This repository includes a two-container setup that can be launched on a CloudLab Ubuntu node.

### Files added for CloudLab readiness
- `component1/Dockerfile`     # Builds the Flask backend container
- `component1/app.py`         # Backend API implementation
- `component2/Dockerfile`     # Builds the Nginx frontend container
- `component2/nginx.conf`     # Reverse proxy configuration
- `component2/index.html`     # Static frontend (resume UI)
- `component2/script.js`      # Fetches data from backend API
- `component2/styles.css`     # Styling for frontend UI
- `docker-compose.yml`        # Defines multi-container setup and networking
- `scripts/setup-cloudlab.sh` # Automates environment setup on CloudLab

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

6. Verify the services in a new CloudLab terminal:

```bash
curl localhost:8000/api
curl localhost:3000
```

Expected responses:

```bash
{"bio":"Master\u2019s student in Computer Science at West Chester University.","experience":["Lead Bartender - La Scala\u2019s Fire","Web Specialist - Unifeyed LLC","Irish Dance Performer & Instructor"],"name":"Maiti Clark"}
```

```bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Maiti Clark</title>
</head>
<body>
  <h1 id="name">Loading...</h1>
  <p id="bio"></p>

  <h2>Experience</h2>
  <ul id="experience"></ul>

  <script src="script.js"></script>

</body>
</html>
```

7. Find Cloudlab Hostname
 
```bash
hostname -f
```

Expected response (example):
```bash
pcvm604-2.emulab.net
```

8. Run in a new terminal (locally, not on CloudLab)

```bash
ssh -L 3000:localhost:3000 <your-username>@<your-cloudlab-hostname>
```

Example input:

```bash
ssh -L 3000:localhost:3000 clark_99@pcvm604-2.emulab.net
```

This uses SSH port forwarding to expose the CloudLab service running on port 3000 to the local machine.

9. Open Browser locally

```bash
http://localhost:3000
```
---

Note: Docker container must be running ```bash sudo docker compose up --build``` before running locally

## Design Decisions and Justifications
 ### Docker and Containerization
 Docker was used to ensure consistency across environments and to isolate services. This allows each component to run independently while maintaining a reproducible deployment on CloudLab.

 ### Flask (Backend API)
 Flask was chosen due to its lightweight nature and simplicity for building REST APIs. It allows quick development of endpoints that reutnr JSON data, making it ideal for demonstrating backend functionality.

 ### Nginx (Frontend + Reverse Proxy)
 Nginx was selected to serve the static frontend and act as a reverse proxy. This approach mirrors real-world deployment patterns and cleanly separates fronend and backend responsibilities.

 ### Static Site + API Architecture
 This architecture separates presentation from data processing. The frontend handles UI rendering, while the backend manages data, imporving scalability and maintainability.

 ### SSH Port Forwarding
 SSH tunneling was used to securely access the CludLab deployment from a local browser without exposing ports publicly.


[![Watch Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtu.be/RwlQMWQInWk)


## Author

Mait Clark
Master's Student - Computer Science
West Chester University
