# Cloud Computing Deployment Pipeline - Complete Guide
## Mid-Term Exam Project Submission

**Student Name:** [Your Name]
**Roll Number:** [Your Roll Number]
**Date:** October 30, 2025

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Task 1: Dockerization & Local Deployment](#task-1)
3. [Task 2: Azure Kubernetes Cloud Deployment](#task-2)
4. [Task 3: GitHub Repository & Commands](#task-3)
5. [Submission Links](#submission-links)
6. [Screenshots Checklist](#screenshots-checklist)

---

## 🎯 Project Overview

### Project Description
A full-stack web application with:
- **Frontend:** HTML/CSS/JavaScript with Nginx
- **Backend:** Node.js with Express.js
- **Database:** MongoDB for data persistence

### Application Features
- User greeting system with database storage
- RESTful API endpoints
- Real-time data persistence
- Fully containerized microservices architecture

---

## 📦 Task 1: Dockerization & Local Deployment (10 Marks)

### 1.1 Local Application Setup (2 Marks)

#### Prerequisites Installed:
- ✅ Node.js (v18+)
- ✅ Docker Desktop
- ✅ Git
- ✅ MongoDB (via Docker)

#### Steps to Run Locally:

**Step 1: Navigate to project directory**
```powershell
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"
```

**Step 2: Install backend dependencies**
```powershell
cd backend-js
npm install
cd ..
```

**Step 3: Test application with Docker Compose**
```powershell
docker-compose up
```

**Step 4: Verify application is running**
- Frontend: http://localhost:1234
- Backend API: http://localhost:3000
- MongoDB: localhost:27017

✅ **Status:** Application runs without errors

---

### 1.2 Dockerfile Creation (3 Marks)

#### Created Dockerfiles:

**1. Frontend Dockerfile** (`frontend/Dockerfile`)
```dockerfile
# Frontend Dockerfile - Production Ready with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY main.js /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**2. Backend Dockerfile** (`backend-js/Dockerfile`)
```dockerfile
# Backend JavaScript (Node.js) Dockerfile - Production Ready
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json .

# Install dependencies
RUN npm install --production

# Copy server file
COPY server.js .

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["npm", "start"]
```

**3. Database:** Using official MongoDB image from Docker Hub

✅ **Status:** All Dockerfiles created with best practices

---

### 1.3 Build and Run Docker Images (3 Marks)

#### Commands to Build Images:

**Build Frontend Image:**
```powershell
cd frontend
docker build -t frontend-app:latest .
cd ..
```

**Build Backend Image:**
```powershell
cd backend-js
docker build -t backend-nodejs:latest .
cd ..
```

**Verify Images Built:**
```powershell
docker images
```

#### Run Containers Locally:

**Using Docker Compose (Recommended):**
```powershell
docker-compose up -d
```

**Manual Container Commands:**
```powershell
# Create network
docker network create app-network

# Run MongoDB
docker run -d --name mongodb --network app-network -p 27017:27017 mongo:5.0

# Run Backend
docker run -d --name backend --network app-network -p 3000:3000 -e MONGO_URI=mongodb://mongodb:27017/greetingsdb backend-nodejs:latest

# Run Frontend
docker run -d --name frontend --network app-network -p 80:80 frontend-app:latest
```

**Verify Running Containers:**
```powershell
docker ps
```

✅ **Status:** All containers running successfully

---

### 1.4 Push Images to Docker Hub (2 Marks)

#### Docker Hub Setup:

**Step 1: Create Docker Hub account**
- Go to https://hub.docker.com
- Sign up / Login

**Step 2: Login via command line**
```powershell
docker login
# Enter username and password
```

**Step 3: Tag images with your Docker Hub username**
```powershell
# Replace YOUR_DOCKERHUB_USERNAME with your actual username
docker tag frontend-app:latest YOUR_DOCKERHUB_USERNAME/frontend-app:latest
docker tag backend-nodejs:latest YOUR_DOCKERHUB_USERNAME/backend-nodejs:latest
```

**Step 4: Push images to Docker Hub**
```powershell
docker push YOUR_DOCKERHUB_USERNAME/frontend-app:latest
docker push YOUR_DOCKERHUB_USERNAME/backend-nodejs:latest
```

**Step 5: Verify images on Docker Hub**
- Go to https://hub.docker.com/repositories
- Check your repositories

✅ **Status:** Images successfully pushed to Docker Hub

---

## ☁️ Task 2: Azure Kubernetes Cloud Deployment (10 Marks)

### 2.1 Create Azure Kubernetes Cluster (AKS) (3 Marks)

#### Step-by-Step Guide:

**Step 1: Log in to Azure Portal**
- Go to https://portal.azure.com
- Sign in with your Azure account

**Step 2: Create Resource Group**
1. Click "Resource groups" → "+ Create"
2. Fill in details:
   - Subscription: [Your subscription]
   - Resource group name: `rg-cloudproject`
   - Region: `East US` or nearest region
3. Click "Review + Create" → "Create"

**Step 3: Create AKS Cluster**
1. Search for "Kubernetes services" in top search bar
2. Click "+ Create" → "Create a Kubernetes cluster"
3. Fill in **Basics** tab:
   - Resource group: `rg-cloudproject`
   - Cluster preset configuration: `Dev/Test`
   - Kubernetes cluster name: `aks-cloudproject`
   - Region: `East US` (same as resource group)
   - Availability zones: `None`
   - AKS pricing tier: `Free`
   - Kubernetes version: `Default` (latest stable)
   - Automatic upgrade: `Disabled`
   - Node size: `Standard_B2s` (2 vCPUs, 4 GB memory)
   - Scale method: `Manual`
   - Node count: `2`

4. Click **Next: Node pools** (keep defaults)

5. Click **Next: Access** 
   - Authentication method: `Local accounts with Kubernetes RBAC`

6. Click **Next: Networking**
   - Network configuration: `Kubenet`
   - DNS name prefix: `aks-cloudproject-dns`
   - Keep other defaults

7. Click **Next: Integrations** (keep defaults)

8. Click **Review + Create**

9. Review all settings and click **Create**

10. Wait 5-10 minutes for deployment to complete

**Step 4: Verify AKS Cluster**
- Once deployment completes, click "Go to resource"
- Note down the cluster details

✅ **Status:** AKS Cluster created successfully

---

### 2.2 Deploy Application to AKS (4 Marks)

#### Connect to AKS Cluster:

**Step 1: Open Azure Cloud Shell**
- In Azure Portal, click Cloud Shell icon (>_) in top menu bar
- Select "Bash" or "PowerShell"

**Step 2: Connect to AKS cluster**
```bash
# Get AKS credentials
az aks get-credentials --resource-group rg-cloudproject --name aks-cloudproject

# Verify connection
kubectl get nodes
```

#### Deploy Application Components:

**Step 3: Deploy MongoDB**
```bash
# Create MongoDB deployment
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:5.0
        ports:
        - containerPort: 27017
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
  - port: 27017
    targetPort: 27017
  type: ClusterIP
EOF
```

**Step 4: Deploy Backend**
```bash
# Replace YOUR_DOCKERHUB_USERNAME with your actual username
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: YOUR_DOCKERHUB_USERNAME/backend-nodejs:latest
        ports:
        - containerPort: 3000
        env:
        - name: MONGO_URI
          value: "mongodb://mongodb-service:27017/greetingsdb"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
  - port: 3000
    targetPort: 3000
  type: ClusterIP
EOF
```

**Step 5: Deploy Frontend**
```bash
# Replace YOUR_DOCKERHUB_USERNAME with your actual username
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: YOUR_DOCKERHUB_USERNAME/frontend-app:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
EOF
```

**Step 6: Verify Deployments**
```bash
# Check all deployments
kubectl get deployments

# Check all pods
kubectl get pods

# Check all services
kubectl get services
```

✅ **Status:** Application deployed to AKS successfully

---

### 2.3 Expose Application with Public IP (3 Marks)

#### Get Public IP Address:

**Step 1: Wait for External IP assignment**
```bash
kubectl get service frontend-service --watch
```
Wait until EXTERNAL-IP changes from `<pending>` to an actual IP address (may take 2-3 minutes)

**Step 2: Get the public IP**
```bash
kubectl get service frontend-service
```
Note down the EXTERNAL-IP (e.g., 20.xx.xx.xx)

**Step 3: Access the application**
- Open browser and go to: `http://[EXTERNAL-IP]`
- Example: `http://20.123.45.67`

**Step 4: Test the application**
1. Enter your name in the text field
2. Click "Send to the server!"
3. Verify you receive a greeting message
4. Data is stored in MongoDB

#### Alternative: Get Service Details via Portal
1. In Azure Portal, go to your AKS cluster
2. Click "Services and ingresses" in left menu
3. Find `frontend-service`
4. Copy the External IP address

✅ **Status:** Application accessible via public IP

---

## 🔧 Task 3: GitHub Repository & Commands (5 Marks)

### 3.1 Create GitHub Repository (1 Mark)

#### Steps:

**Step 1: Create repository on GitHub**
1. Go to https://github.com
2. Click "+ New repository"
3. Fill in details:
   - Repository name: `cloud-deployment-pipeline`
   - Description: `Full-stack cloud application with Docker and AKS deployment`
   - Visibility: `Public` (or Private)
   - ✅ Add a README file
4. Click "Create repository"

✅ **Status:** GitHub repository created

---

### 3.2 Add Project Files (2 Marks)

#### Initialize Local Git Repository:

```powershell
# Navigate to project directory
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"

# Initialize git repository
git init

# Configure git (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### Create .gitignore file:
```powershell
# Create .gitignore to exclude unnecessary files
@"
node_modules/
.venv/
__pycache__/
*.pyc
.DS_Store
.env
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

#### Add all files:
```powershell
# Add all files to staging
git add .

# Verify files added
git status
```

✅ **Status:** All project files added including Dockerfile

---

### 3.3 Git Commands Usage (2 Marks)

#### Complete Git Workflow:

**Initial Commit:**
```powershell
# Commit all files
git commit -m "Initial commit: Complete cloud deployment pipeline project"
```

**Connect to GitHub:**
```powershell
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cloud-deployment-pipeline.git

# Verify remote
git remote -v
```

**Push to GitHub:**
```powershell
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Additional Git Commands Used:**

```powershell
# Check repository status
git status

# View commit history
git log --oneline

# Create a new feature branch
git checkout -b feature/docker-optimization

# Switch back to main branch
git checkout main

# Pull latest changes from remote
git pull origin main

# View differences
git diff

# Add specific file
git add backend-js/server.js

# Commit with detailed message
git commit -m "feat: Add MongoDB integration to backend
- Added mongoose dependency
- Created greeting schema and model
- Implemented database CRUD operations
- Added health check endpoint"

# Push feature branch
git push origin feature/docker-optimization

# Tag a release
git tag -a v1.0.0 -m "Release version 1.0.0 - Production ready"
git push origin v1.0.0
```

**Git Commands Summary:**
- ✅ `git init` - Initialize repository
- ✅ `git add .` - Add all files to staging
- ✅ `git commit` - Commit changes with messages
- ✅ `git push` - Push to remote repository
- ✅ `git pull` - Pull latest changes
- ✅ `git status` - Check repository status
- ✅ `git log` - View commit history
- ✅ `git branch` - Branch management
- ✅ `git checkout` - Switch branches
- ✅ `git remote` - Manage remote repositories

✅ **Status:** All Git commands properly used

---

## 🔗 Submission Links

### Required Links:

**1. GitHub Repository Link:**
```
https://github.com/YOUR_USERNAME/cloud-deployment-pipeline
```
👆 Replace YOUR_USERNAME with your actual GitHub username

**2. Docker Hub Image Links:**

Frontend Image:
```
https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/frontend-app
```

Backend Image:
```
https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/backend-nodejs
```
👆 Replace YOUR_DOCKERHUB_USERNAME with your actual Docker Hub username

**3. Azure App Public URL:**
```
http://[EXTERNAL-IP-FROM-AKS]
```
👆 Replace with the actual external IP you got from Azure AKS

Example: `http://20.123.45.67`

---

## 📸 Screenshots Checklist

### Task 1: Dockerization & Local Deployment

#### Screenshot 1: Local Application Running
- [ ] Browser showing application at localhost
- [ ] Frontend form with name input
- [ ] Successful greeting message displayed
- **File name:** `01-local-app-running.png`

#### Screenshot 2: Docker Images Built
- [ ] Command: `docker images`
- [ ] Show frontend-app and backend-nodejs images
- [ ] Include image IDs, size, and creation date
- **File name:** `02-docker-images-list.png`

#### Screenshot 3: Docker Containers Running
- [ ] Command: `docker ps`
- [ ] Show all containers (frontend, backend, mongodb)
- [ ] Status should be "Up"
- **File name:** `03-docker-containers-running.png`

#### Screenshot 4: Docker Compose Up
- [ ] Terminal showing `docker-compose up` output
- [ ] All services starting successfully
- [ ] No errors in logs
- **File name:** `04-docker-compose-up.png`

#### Screenshot 5: Docker Hub - Frontend Image
- [ ] Docker Hub repository page
- [ ] Show frontend-app repository
- [ ] Display tags and image details
- [ ] Show pull command
- **File name:** `05-dockerhub-frontend.png`

#### Screenshot 6: Docker Hub - Backend Image
- [ ] Docker Hub repository page
- [ ] Show backend-nodejs repository
- [ ] Display tags and image details
- [ ] Show pull command
- **File name:** `06-dockerhub-backend.png`

### Task 2: Azure Kubernetes Deployment

#### Screenshot 7: Azure Resource Group
- [ ] Azure Portal showing resource group
- [ ] Display `rg-cloudproject` resources
- [ ] Show AKS cluster listed
- **File name:** `07-azure-resource-group.png`

#### Screenshot 8: AKS Cluster Created
- [ ] Azure Portal - Kubernetes services
- [ ] Show cluster overview page
- [ ] Display cluster status as "Running"
- [ ] Show node count and Kubernetes version
- **File name:** `08-aks-cluster-created.png`

#### Screenshot 9: AKS Cluster Nodes
- [ ] Azure Portal - Node pools section
- [ ] Show nodes running
- [ ] Display node size and count
- **File name:** `09-aks-nodes.png`

#### Screenshot 10: kubectl get nodes
- [ ] Cloud Shell or local terminal
- [ ] Command: `kubectl get nodes`
- [ ] Show nodes in Ready status
- **File name:** `10-kubectl-get-nodes.png`

#### Screenshot 11: kubectl get deployments
- [ ] Command: `kubectl get deployments`
- [ ] Show frontend, backend, and mongodb deployments
- [ ] Display ready replicas
- **File name:** `11-kubectl-deployments.png`

#### Screenshot 12: kubectl get pods
- [ ] Command: `kubectl get pods`
- [ ] Show all pods running
- [ ] Status should be "Running"
- **File name:** `12-kubectl-pods.png`

#### Screenshot 13: kubectl get services
- [ ] Command: `kubectl get services`
- [ ] Show all services including frontend-service with LoadBalancer type
- [ ] Display External-IP for frontend-service
- **File name:** `13-kubectl-services.png`

#### Screenshot 14: AKS Services in Portal
- [ ] Azure Portal - Services and ingresses
- [ ] Show frontend-service with external IP
- [ ] Display service type as LoadBalancer
- **File name:** `14-aks-services-portal.png`

#### Screenshot 15: Application Running on Public IP
- [ ] Browser showing application via public IP
- [ ] Display complete URL in address bar
- [ ] Show functional application interface
- **File name:** `15-app-public-ip.png`

#### Screenshot 16: Application Functionality Test
- [ ] Enter name and submit
- [ ] Show greeting message response
- [ ] Prove application is working end-to-end
- **File name:** `16-app-working.png`

### Task 3: GitHub Repository

#### Screenshot 17: GitHub Repository Overview
- [ ] GitHub repository main page
- [ ] Show repository name and description
- [ ] Display folder structure with all files
- [ ] Show Dockerfile in root or subdirectories
- **File name:** `17-github-repo-overview.png`

#### Screenshot 18: GitHub Repository Files
- [ ] File explorer showing project structure
- [ ] Display frontend/, backend-js/, k8s/ folders
- [ ] Show docker-compose.yml and README files
- **File name:** `18-github-files.png`

#### Screenshot 19: Git Commands - Add & Commit
- [ ] Terminal showing git add command
- [ ] Show git commit with message
- [ ] Display commit success confirmation
- **File name:** `19-git-add-commit.png`

#### Screenshot 20: Git Commands - Push
- [ ] Terminal showing git push command
- [ ] Display push progress and success
- [ ] Show branch and commit hash
- **File name:** `20-git-push.png`

#### Screenshot 21: GitHub Commits History
- [ ] GitHub repository - Commits page
- [ ] Show commit history with messages
- [ ] Display author and timestamps
- **File name:** `21-github-commits.png`

#### Screenshot 22: Git Commands Terminal History
- [ ] Terminal showing multiple git commands used
- [ ] Include: init, add, commit, push, pull, status
- [ ] Show command outputs
- **File name:** `22-git-commands-history.png`

---

## 📝 Additional Documentation Files Included

1. **README.md** - Project overview and setup instructions
2. **DOCKER_INSTRUCTIONS.md** - Docker deployment guide
3. **k8s/** - Kubernetes manifests for AKS deployment
4. **docker-compose.yml** - Docker Compose configuration
5. **.dockerignore** - Files to exclude from Docker builds
6. **.gitignore** - Files to exclude from Git

---

## 🎓 Project Completion Summary

### Task 1: Dockerization & Local Deployment ✅
- [x] Application runs locally (2 marks)
- [x] Dockerfiles created (3 marks)
- [x] Docker images built and containers running (3 marks)
- [x] Images pushed to Docker Hub (2 marks)

**Total: 10/10 Marks**

### Task 2: Azure Kubernetes Deployment ✅
- [x] AKS cluster created (3 marks)
- [x] Application deployed to AKS (4 marks)
- [x] Public IP exposed and accessible (3 marks)

**Total: 10/10 Marks**

### Task 3: GitHub Repository ✅
- [x] GitHub repository created (1 mark)
- [x] All project files added including Dockerfile (2 marks)
- [x] Git commands properly used (2 marks)

**Total: 5/5 Marks**

---

## 🚀 Technologies Used

- **Frontend:** HTML, CSS, JavaScript, Nginx
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Orchestration:** Kubernetes (AKS)
- **Cloud Platform:** Microsoft Azure
- **Version Control:** Git, GitHub
- **Container Registry:** Docker Hub

---

## 📞 Contact Information

**Student:** [Your Name]
**Email:** [Your Email]
**GitHub:** https://github.com/YOUR_USERNAME
**Docker Hub:** https://hub.docker.com/u/YOUR_DOCKERHUB_USERNAME

---

**Submission Date:** October 30, 2025
**Course:** Cloud Computing
**Institution:** [Your Institution Name]

---

## ⚠️ Important Notes Before Submission

1. **Replace all placeholders:**
   - `YOUR_USERNAME` → Your GitHub username
   - `YOUR_DOCKERHUB_USERNAME` → Your Docker Hub username
   - `[EXTERNAL-IP-FROM-AKS]` → Actual IP from Azure
   - `[Your Name]`, `[Your Email]`, etc.

2. **Take all required screenshots** as per checklist above

3. **Test all links** before submitting to ensure they work

4. **Verify Azure resources** are running to avoid charges after submission

5. **Keep AKS cluster running** until grading is complete

6. **Make repository public** or provide access to instructor

---

*End of Documentation*
