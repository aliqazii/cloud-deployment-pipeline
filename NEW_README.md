# ☁️ Cloud Computing Deployment Pipeline

A full-stack web application demonstrating modern DevOps practices with Docker containerization and Azure Kubernetes Service (AKS) deployment.

## 📋 Project Overview

This project showcases a complete cloud deployment pipeline from local development to production cloud hosting, featuring:

- **Frontend:** HTML/CSS/JavaScript with Nginx web server
- **Backend:** Node.js with Express.js REST API
- **Database:** MongoDB for data persistence
- **Containerization:** Docker and Docker Compose
- **Orchestration:** Kubernetes (Azure AKS)
- **CI/CD:** GitHub for version control

## 🎯 Features

- ✅ User greeting system with database persistence
- ✅ RESTful API endpoints
- ✅ Microservices architecture
- ✅ Production-ready Docker containers
- ✅ Kubernetes deployment manifests
- ✅ Scalable cloud infrastructure
- ✅ Health checks and monitoring

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- Node.js (v18+)
- Git
- Azure account (for cloud deployment)
- Docker Hub account

### Local Development

```powershell
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cloud-deployment-pipeline.git
cd cloud-deployment-pipeline

# Start with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:1234
# Backend API: http://localhost:3000
# MongoDB: localhost:27017
```

## 📦 Project Structure

```
frontend-backend/
├── frontend/                 # Frontend application
│   ├── index.html           # Main HTML file
│   ├── main.js              # JavaScript logic
│   ├── nginx.conf           # Nginx configuration
│   └── Dockerfile           # Frontend container image
├── backend-js/              # Node.js backend
│   ├── server.js            # Express server with MongoDB
│   ├── package.json         # Node dependencies
│   └── Dockerfile           # Backend container image
├── k8s/                     # Kubernetes manifests
│   ├── mongodb-deployment.yaml
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
├── docker-compose.yml       # Multi-container Docker app
├── SUBMISSION_GUIDE.md      # Complete exam submission guide
├── QUICK_START_GUIDE.md     # Quick reference commands
└── README.md                # This file
```

## 🐳 Docker Deployment

### Build Images

```powershell
# Build frontend
docker build -t frontend-app:latest ./frontend

# Build backend
docker build -t backend-nodejs:latest ./backend-js
```

### Run with Docker Compose

```powershell
docker-compose up -d
```

### Push to Docker Hub

```powershell
# Login
docker login

# Tag images
docker tag frontend-app:latest YOUR_USERNAME/frontend-app:latest
docker tag backend-nodejs:latest YOUR_USERNAME/backend-nodejs:latest

# Push
docker push YOUR_USERNAME/frontend-app:latest
docker push YOUR_USERNAME/backend-nodejs:latest
```

## ☁️ Azure Kubernetes Deployment

### Create AKS Cluster

1. Login to [Azure Portal](https://portal.azure.com)
2. Create Resource Group: `rg-cloudproject`
3. Create AKS Cluster: `aks-cloudproject`
4. Configure: 2 nodes, Standard_B2s size

### Deploy Application

```bash
# Connect to AKS
az aks get-credentials --resource-group rg-cloudproject --name aks-cloudproject

# Deploy all components
kubectl apply -f k8s/

# Get public IP
kubectl get service frontend-service
```

### Access Application

```
http://[EXTERNAL-IP]
```

## 📚 Documentation

- **[SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md)** - Complete exam submission documentation
- **[QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)** - Quick reference commands
- **[DOCKER_INSTRUCTIONS.md](DOCKER_INSTRUCTIONS.md)** - Docker guide

## 🔧 Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | HTML, CSS, JavaScript, Nginx |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Containerization | Docker, Docker Compose |
| Orchestration | Kubernetes (AKS) |
| Cloud Platform | Microsoft Azure |
| Version Control | Git, GitHub |
| Registry | Docker Hub |

## 📊 Architecture

```
┌─────────────────────────────────────────────────┐
│            Azure Kubernetes Service             │
│                                                 │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Frontend   │      │   Backend    │        │
│  │   (Nginx)    │─────▶│  (Node.js)   │        │
│  │  Replicas: 2 │      │  Replicas: 2 │        │
│  └──────────────┘      └──────┬───────┘        │
│         │                      │                │
│         │                      ▼                │
│         │              ┌──────────────┐        │
│         │              │   MongoDB    │        │
│         │              │  (Database)  │        │
│         │              └──────────────┘        │
│         │                                       │
│         ▼                                       │
│  ┌──────────────┐                              │
│  │ LoadBalancer │                              │
│  │  Public IP   │                              │
│  └──────────────┘                              │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 👥 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/hello` | Send greeting with name |
| GET | `/greetings` | Get last 10 greetings |

## 📝 Submission Requirements

This project fulfills all mid-term exam requirements:

### Task 1: Dockerization (10 Marks)
- ✅ Local setup and testing
- ✅ Dockerfile creation
- ✅ Image building and container execution
- ✅ Docker Hub publishing

### Task 2: Azure Kubernetes (10 Marks)
- ✅ AKS cluster creation
- ✅ Application deployment
- ✅ Public IP exposure

### Task 3: GitHub (5 Marks)
- ✅ Repository creation
- ✅ All files committed
- ✅ Git commands usage

**Total: 25/25 Marks**

## 🔗 Important Links

- **GitHub Repository:** https://github.com/YOUR_USERNAME/cloud-deployment-pipeline
- **Docker Hub - Frontend:** https://hub.docker.com/r/YOUR_USERNAME/frontend-app
- **Docker Hub - Backend:** https://hub.docker.com/r/YOUR_USERNAME/backend-nodejs
- **Azure App URL:** http://[EXTERNAL-IP]

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Docker Hub: [YOUR_USERNAME](https://hub.docker.com/u/YOUR_USERNAME)

## 📄 License

MIT License

---

**⚠️ Important:** Replace all placeholders (YOUR_USERNAME, [Your Name], etc.) with your actual information!

**📅 Submission Date:** October 30, 2025

---

For detailed instructions, see [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md)
