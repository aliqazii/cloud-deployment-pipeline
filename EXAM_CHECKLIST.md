# 🎓 EXAM SUBMISSION - STEP BY STEP GUIDE
## Complete Checklist for Mid-Term Exam

**Student:** [Your Name Here]
**Date:** October 30, 2025

---

## ✅ PRE-SUBMISSION CHECKLIST

Before starting, ensure you have:
- [ ] Docker Desktop installed and running
- [ ] Docker Hub account created (https://hub.docker.com)
- [ ] GitHub account created (https://github.com)
- [ ] Azure account with active subscription (https://portal.azure.com)
- [ ] Git configured on your system

---

## 📋 TASK 1: DOCKERIZATION & LOCAL DEPLOYMENT (10 Marks)

### STEP 1: Verify Local Application (2 Marks)

**1.1 Navigate to project**
```powershell
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"
```

**1.2 Start all services**
```powershell
docker-compose up --build
```

**1.3 Verify in browser**
- Open: http://localhost:1234
- Enter your name and click "Send to server!"
- Verify greeting message appears

**📸 Screenshot Required:**
- `01-local-app-running.png` - Browser showing working application

**1.4 Stop services (for now)**
```powershell
# Press Ctrl+C in terminal or:
docker-compose down
```

---

### STEP 2: Build Docker Images (3 Marks)

**2.1 Build Frontend Image**
```powershell
cd frontend
docker build -t frontend-app:latest .
cd ..
```

**2.2 Build Backend Image**
```powershell
cd backend-js
docker build -t backend-nodejs:latest .
cd ..
```

**2.3 Verify images built**
```powershell
docker images
```

**📸 Screenshots Required:**
- `02-docker-images-list.png` - Output of `docker images` showing both images

---

### STEP 3: Run Docker Containers (3 Marks)

**3.1 Start all services**
```powershell
docker-compose up -d
```

**3.2 Check running containers**
```powershell
docker ps
```

**3.3 Test application**
- Open: http://localhost:1234
- Test functionality

**📸 Screenshots Required:**
- `03-docker-containers-running.png` - Output of `docker ps`
- `04-docker-compose-up.png` - Terminal showing successful startup

---

### STEP 4: Push to Docker Hub (2 Marks)

**4.1 Login to Docker Hub**
```powershell
docker login
# Enter your Docker Hub username
# Enter your Docker Hub password
```

**4.2 Tag images with YOUR username**
```powershell
# REPLACE 'yourusername' with your actual Docker Hub username
docker tag frontend-app:latest yourusername/frontend-app:latest
docker tag backend-nodejs:latest yourusername/backend-nodejs:latest
```

**4.3 Push to Docker Hub**
```powershell
# REPLACE 'yourusername' with your actual Docker Hub username
docker push yourusername/frontend-app:latest
docker push yourusername/backend-nodejs:latest
```

**4.4 Verify on Docker Hub**
- Go to: https://hub.docker.com/repositories
- Check both images are visible

**📸 Screenshots Required:**
- `05-dockerhub-frontend.png` - Docker Hub page showing frontend image
- `06-dockerhub-backend.png` - Docker Hub page showing backend image

**🔗 Links to Record:**
```
Frontend Image: https://hub.docker.com/r/yourusername/frontend-app
Backend Image: https://hub.docker.com/r/yourusername/backend-nodejs
```

---

## ☁️ TASK 2: AZURE KUBERNETES DEPLOYMENT (10 Marks)

### STEP 5: Create Azure Resources (3 Marks)

**5.1 Login to Azure**
- Go to: https://portal.azure.com
- Sign in with your account

**5.2 Create Resource Group**
1. Search "Resource groups" in top search bar
2. Click "+ Create"
3. Fill in:
   - Subscription: [Your subscription]
   - Resource group name: `rg-cloudproject`
   - Region: `East US` (or nearest)
4. Click "Review + Create" → "Create"

**📸 Screenshot Required:**
- `07-azure-resource-group.png` - Resource group overview page

**5.3 Create AKS Cluster**
1. Search "Kubernetes services"
2. Click "+ Create" → "Create a Kubernetes cluster"
3. **Basics tab:**
   - Resource group: `rg-cloudproject`
   - Cluster name: `aks-cloudproject`
   - Region: `East US`
   - Kubernetes version: Default
   - Node size: `Standard_B2s` (click "Change size")
   - Node count: `2`
4. Click "Review + Create"
5. Click "Create"
6. **Wait 5-10 minutes** for deployment

**📸 Screenshots Required:**
- `08-aks-cluster-created.png` - AKS cluster overview showing "Running"
- `09-aks-nodes.png` - Node pools showing 2 nodes

---

### STEP 6: Deploy Application to AKS (4 Marks)

**6.1 Open Azure Cloud Shell**
- Click Cloud Shell icon (>_) in top menu of Azure Portal
- Select "Bash"

**6.2 Connect to AKS**
```bash
az aks get-credentials --resource-group rg-cloudproject --name aks-cloudproject
kubectl get nodes
```

**📸 Screenshot Required:**
- `10-kubectl-get-nodes.png` - Output showing 2 nodes in Ready status

**6.3 Update Kubernetes manifests**
Before deploying, you need to update the image names in the manifest files with YOUR Docker Hub username.

In Cloud Shell, create the deployments with your username:

**6.4 Deploy MongoDB**
```bash
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
```

**6.5 Deploy Backend**
```bash
# REPLACE 'yourusername' with your Docker Hub username before running!
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
```

**6.6 Deploy Frontend**
```bash
# REPLACE 'yourusername' with your Docker Hub username before running!
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
```

**6.7 Verify deployments**
```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

**📸 Screenshots Required:**
- `11-kubectl-deployments.png` - Output of `kubectl get deployments`
- `12-kubectl-pods.png` - Output of `kubectl get pods` (all Running)
- `13-kubectl-services.png` - Output of `kubectl get services`

---

### STEP 7: Expose Application with Public IP (3 Marks)

**7.1 Get External IP**
```bash
kubectl get service frontend-service --watch
# Wait until EXTERNAL-IP shows an IP address (not <pending>)
# This may take 2-3 minutes
# Press Ctrl+C when IP appears
```

**7.2 Record the IP address**
```bash
kubectl get service frontend-service
```
Copy the EXTERNAL-IP (e.g., 20.123.45.67)

**📸 Screenshot Required:**
- `14-aks-services-portal.png` - Services page in Azure Portal showing external IP

**7.3 Test the application**
- Open browser
- Navigate to: `http://[YOUR-EXTERNAL-IP]`
- Enter name and test functionality

**📸 Screenshots Required:**
- `15-app-public-ip.png` - Browser showing app via public IP with URL visible
- `16-app-working.png` - Application form working with greeting response

**🔗 Link to Record:**
```
Azure App URL: http://[YOUR-EXTERNAL-IP]
Example: http://20.123.45.67
```

---

## 🔧 TASK 3: GITHUB REPOSITORY & COMMANDS (5 Marks)

### STEP 8: Create GitHub Repository (1 Mark)

**8.1 Create repository on GitHub**
1. Go to: https://github.com
2. Click "+ New repository" or "+ → New repository"
3. Fill in:
   - Repository name: `cloud-deployment-pipeline`
   - Description: `Cloud Computing Mid-Term: Docker and AKS Deployment`
   - Visibility: `Public`
   - ✅ Add a README file: **Uncheck this** (we'll add our own)
4. Click "Create repository"

**8.2 Copy repository URL**
- Copy the HTTPS URL shown
- Format: `https://github.com/yourusername/cloud-deployment-pipeline.git`

**📸 Screenshot Required:**
- `17-github-repo-overview.png` - Empty repository page with URL visible

**🔗 Link to Record:**
```
GitHub Repository: https://github.com/yourusername/cloud-deployment-pipeline
```

---

### STEP 9: Initialize Git and Add Files (2 Marks)

**9.1 Navigate to project**
```powershell
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"
```

**9.2 Initialize Git (if not already done)**
```powershell
git init
```

**9.3 Configure Git (first time only)**
```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

**9.4 Check current status**
```powershell
git status
```

**9.5 Add all files**
```powershell
git add .
```

**9.6 Verify files added**
```powershell
git status
```

**📸 Screenshot Required:**
- `18-github-files.png` - Output of `git status` showing files to be committed

**9.7 Commit files**
```powershell
git commit -m "Initial commit: Complete cloud deployment pipeline

- Frontend: HTML/JS with Nginx
- Backend: Node.js with Express and MongoDB
- Docker: Dockerfiles and docker-compose
- Kubernetes: AKS deployment manifests
- Documentation: Complete submission guides"
```

**📸 Screenshot Required:**
- `19-git-add-commit.png` - Terminal showing git add and commit commands

---

### STEP 10: Push to GitHub and Use Git Commands (2 Marks)

**10.1 Add remote origin**
```powershell
# REPLACE with your actual repository URL
git remote add origin https://github.com/yourusername/cloud-deployment-pipeline.git
```

**10.2 Verify remote**
```powershell
git remote -v
```

**10.3 Rename branch to main**
```powershell
git branch -M main
```

**10.4 Push to GitHub**
```powershell
git push -u origin main
```

**📸 Screenshot Required:**
- `20-git-push.png` - Terminal showing successful push

**10.5 Verify on GitHub**
- Refresh your GitHub repository page
- All files should be visible

**📸 Screenshots Required:**
- `21-github-commits.png` - Commits page showing your commit
- `22-git-commands-history.png` - Terminal showing all git commands used

**10.6 Demonstrate additional Git commands**
```powershell
# View commit log
git log --oneline

# Check status
git status

# View remote info
git remote -v

# Create a tag
git tag -a v1.0.0 -m "Release 1.0.0 - Mid-term submission"
git push origin v1.0.0

# Pull (demonstrate the command)
git pull origin main
```

---

## 📝 FINAL SUBMISSION DOCUMENT

### Create Your Submission File

Create a Word or PDF document with the following information:

**Title:** Cloud Computing Deployment Pipeline - Mid-Term Exam Submission

**Student Information:**
- Name: [Your Name]
- Roll Number: [Your Roll]
- Date: October 30, 2025

**Section 1: GitHub Repository Link**
```
https://github.com/yourusername/cloud-deployment-pipeline
```

**Section 2: Docker Hub Image Links**
```
Frontend Image: https://hub.docker.com/r/yourusername/frontend-app
Backend Image: https://hub.docker.com/r/yourusername/backend-nodejs
```

**Section 3: Azure App Public URL**
```
http://[YOUR-EXTERNAL-IP]
Example: http://20.123.45.67
```

**Section 4: Screenshots**

Insert all 22 screenshots in order:

**Task 1 - Dockerization (6 screenshots):**
1. Local application running
2. Docker images list
3. Docker containers running
4. Docker compose up
5. Docker Hub frontend image
6. Docker Hub backend image

**Task 2 - Azure Kubernetes (10 screenshots):**
7. Azure resource group
8. AKS cluster created
9. AKS nodes
10. kubectl get nodes
11. kubectl get deployments
12. kubectl get pods
13. kubectl get services
14. AKS services in portal
15. App via public IP
16. App working/functional

**Task 3 - GitHub (6 screenshots):**
17. GitHub repo overview
18. Git status with files
19. Git add and commit
20. Git push
21. GitHub commits history
22. Git commands terminal history

**Section 5: Project Description**

Write 2-3 paragraphs describing:
- What your application does
- Technologies used
- Deployment process
- Challenges faced and solutions

---

## ✅ FINAL CHECKLIST BEFORE SUBMISSION

- [ ] All 3 tasks completed
- [ ] All 22 screenshots taken and properly labeled
- [ ] GitHub repository is PUBLIC or instructor has access
- [ ] Docker Hub images are PUBLIC
- [ ] Azure application is accessible via public IP
- [ ] All URLs tested and working
- [ ] Submission document created (Word/PDF)
- [ ] All placeholders replaced with actual information
- [ ] Student name and roll number included
- [ ] Document properly formatted
- [ ] File saved with proper name: `YourName_CloudProject_Submission.pdf`

---

## 🎯 MARKS DISTRIBUTION

**Task 1: Dockerization & Local Deployment - 10 Marks**
- Local setup: 2 marks ✅
- Dockerfile creation: 3 marks ✅
- Build and run: 3 marks ✅
- Push to Docker Hub: 2 marks ✅

**Task 2: Azure Kubernetes Deployment - 10 Marks**
- Create AKS cluster: 3 marks ✅
- Deploy application: 4 marks ✅
- Expose public IP: 3 marks ✅

**Task 3: GitHub & Commands - 5 Marks**
- Create repository: 1 mark ✅
- Add files: 2 marks ✅
- Git commands: 2 marks ✅

**TOTAL: 25 Marks** ✅

---

## 🚨 IMPORTANT REMINDERS

1. **Replace ALL placeholders** with your actual information
2. **Keep Azure resources running** until after grading
3. **Make repositories PUBLIC** or share access
4. **Test all links** before submitting
5. **Take high-quality screenshots** showing all required information
6. **Submit before deadline**
7. **Keep backup of all files**

---

## 💰 COST MANAGEMENT

**Azure Free Tier:**
- First month free with $200 credit
- After grading, DELETE all resources to avoid charges

**To delete after grading:**
```bash
az group delete --name rg-cloudproject --yes --no-wait
```

Or via Portal:
1. Go to Resource Groups
2. Select `rg-cloudproject`
3. Click "Delete resource group"
4. Confirm deletion

---

## 📞 HELP & SUPPORT

If you encounter issues:

1. **Docker Issues:** Check Docker Desktop is running
2. **Azure Issues:** Verify subscription is active
3. **Git Issues:** Check remote URL with `git remote -v`
4. **Kubernetes Issues:** Check pod logs with `kubectl logs <pod-name>`

**Common Commands for Troubleshooting:**
```bash
# Docker
docker ps -a
docker logs <container-name>
docker system prune -a

# Kubernetes
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events

# Git
git status
git log
git remote -v
```

---

## 🎓 GOOD LUCK WITH YOUR EXAM!

Follow this guide step-by-step and you'll complete all requirements successfully!

**Remember:**
- Take your time
- Follow each step carefully
- Take screenshots as you go
- Test everything before submitting
- Keep all resources running until graded

---

**Document Version:** 1.0
**Last Updated:** October 30, 2025
**Course:** Cloud Computing Mid-Term Exam
