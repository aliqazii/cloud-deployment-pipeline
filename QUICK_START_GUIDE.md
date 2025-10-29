# Quick Start Scripts for Cloud Deployment Pipeline

## Prerequisites
- Docker Desktop installed and running
- Docker Hub account created
- Git installed
- Azure account with active subscription

---

## Part 1: Docker Commands (Copy-Paste Ready)

### Step 1: Build Docker Images
```powershell
# Navigate to project root
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"

# Build Frontend
cd frontend
docker build -t frontend-app:latest .
cd ..

# Build Backend
cd backend-js
docker build -t backend-nodejs:latest .
cd ..
```

### Step 2: Test Locally with Docker Compose
```powershell
# Start all services
docker-compose up -d

# Check if containers are running
docker ps

# View logs
docker-compose logs -f

# Test the application
# Open browser: http://localhost:1234

# Stop services
docker-compose down
```

### Step 3: Push to Docker Hub
```powershell
# Login to Docker Hub
docker login
# Enter your username and password

# Tag images (REPLACE 'yourusername' with your Docker Hub username)
docker tag frontend-app:latest yourusername/frontend-app:latest
docker tag backend-nodejs:latest yourusername/backend-nodejs:latest

# Push to Docker Hub
docker push yourusername/frontend-app:latest
docker push yourusername/backend-nodejs:latest

# Verify on Docker Hub
# Visit: https://hub.docker.com/repositories
```

---

## Part 2: GitHub Commands (Copy-Paste Ready)

### Step 1: Initialize Git Repository
```powershell
# Navigate to project directory
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"

# Initialize git
git init

# Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check status
git status
```

### Step 2: Add and Commit Files
```powershell
# Add all files
git add .

# Commit with message
git commit -m "Initial commit: Cloud deployment pipeline with Docker and Kubernetes"

# View commit history
git log --oneline
```

### Step 3: Push to GitHub
```powershell
# Add remote (REPLACE 'yourusername' and 'your-repo-name')
git remote add origin https://github.com/yourusername/your-repo-name.git

# Verify remote
git remote -v

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Additional Useful Git Commands
```powershell
# Check status
git status

# Pull latest changes
git pull origin main

# View differences
git diff

# Create new branch
git checkout -b feature-branch

# Switch back to main
git checkout main

# Tag a version
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## Part 3: Azure Kubernetes (AKS) Deployment

### Step 1: Create AKS via Azure Portal

1. **Login to Azure Portal:** https://portal.azure.com

2. **Create Resource Group:**
   - Search: "Resource groups"
   - Click: "+ Create"
   - Name: `rg-cloudproject`
   - Region: `East US`
   - Click: "Review + Create" → "Create"

3. **Create AKS Cluster:**
   - Search: "Kubernetes services"
   - Click: "+ Create"
   - Resource group: `rg-cloudproject`
   - Cluster name: `aks-cloudproject`
   - Region: `East US`
   - Kubernetes version: Default
   - Node size: `Standard_B2s`
   - Node count: `2`
   - Click through tabs and "Create"
   - Wait 5-10 minutes

### Step 2: Deploy to AKS via Cloud Shell

```bash
# Open Azure Cloud Shell (click >_ icon in Azure Portal)

# Connect to AKS
az aks get-credentials --resource-group rg-cloudproject --name aks-cloudproject

# Verify connection
kubectl get nodes

# Deploy MongoDB
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
  type: ClusterIP
EOF

# Deploy Backend (REPLACE 'yourusername' with your Docker Hub username)
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
        image: yourusername/backend-nodejs:latest
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
  type: ClusterIP
EOF

# Deploy Frontend (REPLACE 'yourusername' with your Docker Hub username)
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
        image: yourusername/frontend-app:latest
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
  type: LoadBalancer
EOF

# Check deployments
kubectl get deployments

# Check pods
kubectl get pods

# Get public IP (wait until EXTERNAL-IP appears)
kubectl get service frontend-service --watch
# Press Ctrl+C when IP appears

# Get the IP address
kubectl get service frontend-service
```

### Step 3: Access Application
```
Open browser and navigate to: http://[EXTERNAL-IP]
Example: http://20.123.45.67
```

### Step 4: Verify Everything Works
```bash
# Check all resources
kubectl get all

# View pod logs
kubectl logs -l app=backend

# Describe service
kubectl describe service frontend-service
```

---

## Part 4: Verification Checklist

### Local Docker Testing
- [ ] `docker images` shows frontend-app and backend-nodejs
- [ ] `docker ps` shows all containers running
- [ ] http://localhost:1234 shows the application
- [ ] Application form works and saves data

### Docker Hub
- [ ] Images visible at https://hub.docker.com/repositories
- [ ] Frontend image: yourusername/frontend-app
- [ ] Backend image: yourusername/backend-nodejs
- [ ] Images can be pulled: `docker pull yourusername/frontend-app`

### GitHub
- [ ] Repository created and accessible
- [ ] All files pushed and visible
- [ ] Commit history shows your commits
- [ ] README and documentation included

### Azure AKS
- [ ] AKS cluster shows "Running" status in portal
- [ ] `kubectl get nodes` shows 2 nodes ready
- [ ] `kubectl get pods` shows all pods running
- [ ] `kubectl get service frontend-service` shows EXTERNAL-IP
- [ ] Application accessible via public IP in browser
- [ ] Application functionality works end-to-end

---

## Part 5: Troubleshooting

### Docker Issues
```powershell
# If port already in use
docker ps -a
docker stop <container-id>
docker rm <container-id>

# If image build fails
docker system prune -a
# Then rebuild

# View container logs
docker logs <container-name>
```

### Kubernetes Issues
```bash
# If pods not starting
kubectl describe pod <pod-name>
kubectl logs <pod-name>

# If external IP stuck on pending
kubectl get events --sort-by=.metadata.creationTimestamp

# Delete and recreate deployment
kubectl delete deployment frontend-deployment
# Then reapply the YAML

# Force pod restart
kubectl rollout restart deployment frontend-deployment
```

### Git Issues
```powershell
# If push fails
git pull origin main --rebase
git push origin main

# If wrong remote URL
git remote remove origin
git remote add origin <correct-url>

# View remote URL
git remote -v
```

---

## Part 6: Clean Up (After Grading)

### Stop Local Docker
```powershell
docker-compose down
docker system prune -a
```

### Delete Azure Resources
```bash
# Delete AKS cluster
az aks delete --resource-group rg-cloudproject --name aks-cloudproject --yes --no-wait

# Delete resource group (deletes everything)
az group delete --name rg-cloudproject --yes --no-wait
```

Or via Azure Portal:
1. Go to Resource Groups
2. Select `rg-cloudproject`
3. Click "Delete resource group"
4. Type the name to confirm
5. Click "Delete"

---

## Quick Reference URLs

- **Docker Hub:** https://hub.docker.com
- **GitHub:** https://github.com
- **Azure Portal:** https://portal.azure.com
- **Docker Documentation:** https://docs.docker.com
- **Kubernetes Documentation:** https://kubernetes.io/docs
- **Azure AKS Documentation:** https://docs.microsoft.com/azure/aks

---

## Important Reminders

1. ⚠️ **Replace placeholders** with your actual usernames
2. 📸 **Take screenshots** at each major step
3. 🔗 **Test all links** before submitting
4. 💰 **Delete Azure resources** after grading to avoid charges
5. 📝 **Document everything** as you go

---

**Good Luck with Your Exam! 🎓**
