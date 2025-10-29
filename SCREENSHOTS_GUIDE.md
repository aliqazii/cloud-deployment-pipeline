# 📸 SCREENSHOTS CHECKLIST - COMPLETE GUIDE

## Total Screenshots Required: 22

This document tells you EXACTLY what to capture in each screenshot and when to take it.

---

## 🐳 TASK 1: DOCKER DEPLOYMENT SCREENSHOTS (6 Total)

### Screenshot #1: Local Application Running
**When:** After running `docker-compose up -d` and opening browser
**What to show:**
- Open browser to http://localhost:1234
- Enter your name in the text field
- Click "Send to the server!" button
- Show the greeting message response
- **Make sure the URL is visible in the address bar**

**File name:** `01-local-app-running.png`

---

### Screenshot #2: Docker Images List
**When:** After building images
**Command:** `docker images`
**What to show:**
- Terminal showing output of `docker images` command
- Should show:
  - `frontend-backend-frontend`
  - `frontend-backend-backend-js`
  - `aliqazi0061/frontend-app`
  - `aliqazi0061/backend-nodejs`
- Show Repository, Tag, Image ID, Created, and Size columns

**File name:** `02-docker-images-list.png`

**✅ YOU CAN TAKE THIS NOW:**
```powershell
docker images
```
Take screenshot of the output!

---

### Screenshot #3: Docker Containers Running
**When:** While containers are running
**Command:** `docker ps`
**What to show:**
- Terminal showing output of `docker ps` command
- Should show all containers with STATUS "Up"
- Include: Container ID, Image, Command, Created, Status, Ports, Names

**File name:** `03-docker-containers-running.png`

**✅ YOU CAN TAKE THIS NOW:**
```powershell
docker ps
```
Take screenshot of the output!

---

### Screenshot #4: Docker Compose Up
**When:** When starting docker-compose
**Command:** `docker-compose up -d` or `docker-compose up --build`
**What to show:**
- Terminal showing the build/start process
- Show "Creating" or "Created" messages
- Show all services starting successfully

**File name:** `04-docker-compose-up.png`

**Note:** You already did this earlier, if you didn't capture it, you can run:
```powershell
docker-compose down
docker-compose up --build
```
And capture the output.

---

### Screenshot #5: Docker Hub - Frontend Image
**When:** After pushing to Docker Hub
**What to show:**
- Go to: https://hub.docker.com/r/aliqazi0061/frontend-app
- Show the repository page with:
  - Repository name visible
  - Tags section showing "latest"
  - Pull command visible
  - Last pushed timestamp

**File name:** `05-dockerhub-frontend.png`

**✅ YOU CAN TAKE THIS NOW:**
Open browser and go to https://hub.docker.com/r/aliqazi0061/frontend-app

---

### Screenshot #6: Docker Hub - Backend Image
**When:** After pushing to Docker Hub
**What to show:**
- Go to: https://hub.docker.com/r/aliqazi0061/backend-nodejs
- Show the repository page with:
  - Repository name visible
  - Tags section showing "latest"
  - Pull command visible
  - Last pushed timestamp

**File name:** `06-dockerhub-backend.png`

**✅ YOU CAN TAKE THIS NOW:**
Open browser and go to https://hub.docker.com/r/aliqazi0061/backend-nodejs

---

## ☁️ TASK 2: AZURE KUBERNETES (AKS) SCREENSHOTS (10 Total)

### Screenshot #7: Azure Resource Group
**When:** After creating resource group in Azure Portal
**What to show:**
- Azure Portal - Resource groups overview page
- Show `rg-cloudproject` resource group
- Display resources inside (should show AKS cluster)
- Show region and subscription

**File name:** `07-azure-resource-group.png`

**How to get there:**
1. Login to https://portal.azure.com
2. Search "Resource groups" in top search bar
3. Click on `rg-cloudproject`
4. Take screenshot of overview page

---

### Screenshot #8: AKS Cluster Created
**When:** After AKS cluster deployment completes
**What to show:**
- Azure Portal - Kubernetes services page
- Show cluster name: `aks-cloudproject`
- Status should be "Running" (green)
- Show Kubernetes version
- Show location/region
- Show node count

**File name:** `08-aks-cluster-created.png`

**How to get there:**
1. Azure Portal
2. Search "Kubernetes services"
3. Click on `aks-cloudproject`
4. Take screenshot of Overview page

---

### Screenshot #9: AKS Node Pools
**When:** After cluster is running
**What to show:**
- Azure Portal - AKS cluster page
- Click "Node pools" in left menu
- Show node pool details:
  - Node pool name
  - Node count: 2
  - Node size: Standard_B2s
  - Status: Succeeded

**File name:** `09-aks-nodes.png`

**How to get there:**
1. Azure Portal → Kubernetes services → aks-cloudproject
2. Click "Node pools" in left navigation
3. Take screenshot

---

### Screenshot #10: kubectl get nodes
**When:** After connecting to AKS cluster
**Command:** `kubectl get nodes`
**What to show:**
- Azure Cloud Shell or local terminal
- Output showing 2 nodes
- Both nodes STATUS: Ready
- Show NAME, STATUS, ROLES, AGE, VERSION columns

**File name:** `10-kubectl-get-nodes.png`

**Commands to run:**
```bash
# In Azure Cloud Shell
az aks get-credentials --resource-group rg-cloudproject --name aks-cloudproject
kubectl get nodes
```
Take screenshot of the output!

---

### Screenshot #11: kubectl get deployments
**When:** After deploying all applications
**Command:** `kubectl get deployments`
**What to show:**
- Terminal output showing all deployments:
  - `mongodb-deployment` - READY 1/1
  - `backend-deployment` - READY 2/2
  - `frontend-deployment` - READY 2/2
- Show NAME, READY, UP-TO-DATE, AVAILABLE, AGE columns

**File name:** `11-kubectl-deployments.png`

**Command:**
```bash
kubectl get deployments
```

---

### Screenshot #12: kubectl get pods
**When:** After pods are running
**Command:** `kubectl get pods`
**What to show:**
- Terminal output showing all pods
- All pods STATUS: Running
- Show:
  - mongodb-deployment-xxx
  - backend-deployment-xxx (2 pods)
  - frontend-deployment-xxx (2 pods)
- Show NAME, READY, STATUS, RESTARTS, AGE columns

**File name:** `12-kubectl-pods.png`

**Command:**
```bash
kubectl get pods
```

---

### Screenshot #13: kubectl get services
**When:** After services are created and External-IP is assigned
**Command:** `kubectl get services`
**What to show:**
- Terminal output showing all services:
  - `kubernetes` (default)
  - `mongodb-service` - ClusterIP
  - `backend-service` - ClusterIP
  - `frontend-service` - LoadBalancer with EXTERNAL-IP
- Show NAME, TYPE, CLUSTER-IP, EXTERNAL-IP, PORT(S), AGE columns
- **MOST IMPORTANT: frontend-service must show EXTERNAL-IP (not <pending>)**

**File name:** `13-kubectl-services.png`

**Command:**
```bash
kubectl get services
```

---

### Screenshot #14: AKS Services in Azure Portal
**When:** After deploying services
**What to show:**
- Azure Portal - AKS cluster page
- Click "Services and ingresses" in left menu
- Show `frontend-service` with:
  - Type: LoadBalancer
  - External IP address visible
  - Port: 80

**File name:** `14-aks-services-portal.png`

**How to get there:**
1. Azure Portal → Kubernetes services → aks-cloudproject
2. Click "Services and ingresses"
3. Take screenshot showing frontend-service

---

### Screenshot #15: Application Running on Public IP
**When:** After getting External-IP and application is accessible
**What to show:**
- Browser showing your application via public IP
- **Address bar must show: http://[YOUR-EXTERNAL-IP]**
- Show the application interface (form with name input)
- Application should be fully loaded

**File name:** `15-app-public-ip.png`

**How to access:**
1. Get IP from: `kubectl get service frontend-service`
2. Open browser
3. Go to: http://[YOUR-EXTERNAL-IP]
4. Take screenshot with URL visible

---

### Screenshot #16: Application Working (Functional Test)
**When:** Testing the application functionality
**What to show:**
- Same browser window
- Enter a name in the text field
- Click "Send to the server!" button
- Show the greeting message response
- Proves the application works end-to-end (frontend → backend → database)

**File name:** `16-app-working.png`

**How to test:**
1. In browser at http://[YOUR-EXTERNAL-IP]
2. Type your name
3. Click button
4. Wait for response
5. Take screenshot showing the greeting message

---

## 📚 TASK 3: GITHUB REPOSITORY SCREENSHOTS (6 Total)

### Screenshot #17: GitHub Repository Overview
**When:** After pushing code to GitHub
**What to show:**
- GitHub repository main page
- URL visible: https://github.com/aliqazii/cloud-deployment-pipeline
- Show:
  - Repository name and description
  - List of files and folders
  - README (if visible)
  - Commit count
  - Last commit message

**File name:** `17-github-repo-overview.png`

**✅ YOU CAN TAKE THIS NOW:**
Open browser and go to: https://github.com/aliqazii/cloud-deployment-pipeline

---

### Screenshot #18: GitHub Files Structure
**When:** Viewing repository files
**What to show:**
- Click into the repository file view
- Show folder structure with:
  - `frontend/` folder
  - `backend-js/` folder
  - `k8s/` folder
  - `docker-compose.yml`
  - `EXAM_CHECKLIST.md`
  - `SUBMISSION_GUIDE.md`
  - All other documentation files
- Show Dockerfiles are present

**File name:** `18-github-files.png`

**✅ YOU CAN TAKE THIS NOW:**
From your GitHub repo page, take screenshot showing all files/folders

---

### Screenshot #19: Git Add and Commit
**When:** When you ran git add and git commit
**What to show:**
- Terminal showing:
  - `git add .` command
  - `git commit -m "..."` command
  - Commit success message with file count
- Show what files were added

**File name:** `19-git-add-commit.png`

**If you didn't capture it earlier, you can show:**
```powershell
git log --oneline -1
git show --stat
```
This shows your last commit details.

---

### Screenshot #20: Git Push
**When:** When you pushed to GitHub
**What to show:**
- Terminal showing:
  - `git push` command
  - Upload progress (Enumerating objects, Compressing, Writing)
  - Success message
  - Branch tracking info

**File name:** `20-git-push.png`

**You already did this! The output was:**
```
Enumerating objects: 93, done.
Counting objects: 100% (93/93), done.
...
Total 93 (delta 33), reused 67 (delta 29)
To https://github.com/aliqazii/cloud-deployment-pipeline.git
 * [new branch]      master -> master
```

**If you need to show it again:**
```powershell
git log --oneline -5
```

---

### Screenshot #21: GitHub Commits History
**When:** Viewing commits on GitHub
**What to show:**
- GitHub repository page
- Click on "X commits" link (near top of page)
- Show commit history with:
  - Commit messages
  - Author (your name)
  - Commit hash
  - Timestamp

**File name:** `21-github-commits.png`

**✅ YOU CAN TAKE THIS NOW:**
1. Go to: https://github.com/aliqazii/cloud-deployment-pipeline
2. Click "commits" link (shows number of commits)
3. Take screenshot of commits page

---

### Screenshot #22: Git Commands Terminal History
**When:** Showing all git commands used
**What to show:**
- Terminal showing your git command history:
  - `git init` (if used)
  - `git add .`
  - `git commit -m "..."`
  - `git remote add origin ...`
  - `git push`
  - `git status`
  - `git log`

**File name:** `22-git-commands-history.png`

**✅ YOU CAN TAKE THIS NOW:**
```powershell
# Show git command history
git log --oneline
git remote -v
history | Select-String "git"
```
Or just show terminal scrollback with git commands visible.

---

## 📋 QUICK CHECKLIST

Use this to track your progress:

### Docker Screenshots (6):
- [ ] #1 - Local app running in browser
- [ ] #2 - docker images output ✅ (Can do now)
- [ ] #3 - docker ps output ✅ (Can do now)
- [ ] #4 - docker-compose up output
- [ ] #5 - Docker Hub frontend page ✅ (Can do now)
- [ ] #6 - Docker Hub backend page ✅ (Can do now)

### Azure AKS Screenshots (10):
- [ ] #7 - Azure resource group
- [ ] #8 - AKS cluster overview
- [ ] #9 - AKS node pools
- [ ] #10 - kubectl get nodes
- [ ] #11 - kubectl get deployments
- [ ] #12 - kubectl get pods
- [ ] #13 - kubectl get services (with External-IP)
- [ ] #14 - Services in Azure Portal
- [ ] #15 - App via public IP in browser
- [ ] #16 - App working with response

### GitHub Screenshots (6):
- [ ] #17 - GitHub repo overview ✅ (Can do now)
- [ ] #18 - GitHub files structure ✅ (Can do now)
- [ ] #19 - Git add/commit in terminal
- [ ] #20 - Git push output
- [ ] #21 - GitHub commits page ✅ (Can do now)
- [ ] #22 - Git commands history ✅ (Can do now)

---

## 🎯 SCREENSHOTS YOU CAN TAKE RIGHT NOW:

You can immediately take these **8 screenshots**:

```powershell
# Docker Screenshots
docker images          # Screenshot #2
docker ps             # Screenshot #3
```

Then open browser:
- https://hub.docker.com/r/aliqazi0061/frontend-app  # Screenshot #5
- https://hub.docker.com/r/aliqazi0061/backend-nodejs  # Screenshot #6
- https://github.com/aliqazii/cloud-deployment-pipeline  # Screenshot #17
- (Same page) Show files  # Screenshot #18
- Click "commits"  # Screenshot #21

Terminal:
```powershell
git log --oneline -5  # Screenshot #22 (or part of it)
```

---

## 💡 TIPS FOR GOOD SCREENSHOTS:

1. **Use Windows Snipping Tool** (Win + Shift + S)
2. **Show full context** - don't crop too much
3. **Make text readable** - don't scale down too small
4. **Include timestamps** when visible
5. **Name files correctly** - use the exact names provided
6. **Keep originals** - don't compress/edit
7. **Organize in a folder** - create "Screenshots" folder

---

## 📁 ORGANIZE YOUR SCREENSHOTS:

Create this folder structure:
```
Screenshots/
├── Docker/
│   ├── 01-local-app-running.png
│   ├── 02-docker-images-list.png
│   ├── 03-docker-containers-running.png
│   ├── 04-docker-compose-up.png
│   ├── 05-dockerhub-frontend.png
│   └── 06-dockerhub-backend.png
├── AKS/
│   ├── 07-azure-resource-group.png
│   ├── 08-aks-cluster-created.png
│   ├── 09-aks-nodes.png
│   ├── 10-kubectl-get-nodes.png
│   ├── 11-kubectl-deployments.png
│   ├── 12-kubectl-pods.png
│   ├── 13-kubectl-services.png
│   ├── 14-aks-services-portal.png
│   ├── 15-app-public-ip.png
│   └── 16-app-working.png
└── GitHub/
    ├── 17-github-repo-overview.png
    ├── 18-github-files.png
    ├── 19-git-add-commit.png
    ├── 20-git-push.png
    ├── 21-github-commits.png
    └── 22-git-commands-history.png
```

---

## ⚡ NEXT STEPS:

1. **Take the 8 screenshots you can do now** (marked with ✅ above)
2. **Create Azure AKS cluster** (follow EXAM_CHECKLIST.md Step 5)
3. **Take Azure screenshots** as you progress
4. **Deploy to AKS** and take remaining screenshots
5. **Organize all screenshots** in folders
6. **Create submission document** with all screenshots inserted

---

**You're doing great! Keep going! 🚀**
