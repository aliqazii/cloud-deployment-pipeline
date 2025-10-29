# Docker Instructions

This guide will help you build Docker images and run containers for the frontend and backend services.

## Prerequisites

- Docker Desktop installed and running on your Windows machine
- Open PowerShell or Command Prompt

## Quick Start (Using Docker Compose)

### Option 1: Run All Services Together

```powershell
# Navigate to the project directory
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend"

# Build and start all containers
docker-compose up --build
```

This will start:
- Frontend on http://localhost:1234
- Backend-JS on http://localhost:3000
- Backend-PY on http://localhost:3001

### Option 2: Run Specific Services

**Frontend + Backend-JS:**
```powershell
docker-compose up frontend backend-js
```

**Frontend + Backend-PY:**
```powershell
docker-compose up frontend backend-py
```

### Stop All Services
```powershell
docker-compose down
```

---

## Manual Docker Commands (Alternative)

### Build Individual Images

**Frontend:**
```powershell
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend\frontend"
docker build -t frontend-image .
```

**Backend JavaScript:**
```powershell
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend\backend-js"
docker build -t backend-js-image .
```

**Backend Python:**
```powershell
cd "c:\Users\aliqa\OneDrive\Desktop\frontend-backend\backend-py"
docker build -t backend-py-image .
```

### Run Individual Containers

**Frontend:**
```powershell
docker run -d -p 1234:1234 --name frontend-container frontend-image
```

**Backend JavaScript:**
```powershell
docker run -d -p 3000:3000 --name backend-js-container backend-js-image
```

**Backend Python:**
```powershell
docker run -d -p 3000:3000 --name backend-py-container backend-py-image
```

### Manage Containers

**View running containers:**
```powershell
docker ps
```

**View all containers (including stopped):**
```powershell
docker ps -a
```

**Stop a container:**
```powershell
docker stop <container-name>
```

**Remove a container:**
```powershell
docker rm <container-name>
```

**View container logs:**
```powershell
docker logs <container-name>
```

---

## Important Notes

1. **CORS Configuration**: The backend services are configured to accept requests from `http://localhost:1234`. When running in Docker, you might need to update the CORS settings if you encounter issues.

2. **Backend Ports**: 
   - Backend-JS uses port 3000
   - Backend-PY is mapped to port 3001 (to avoid conflict with backend-js)
   - Only run ONE backend at a time if using the same port

3. **Network**: All services are connected via a Docker network called `app-network` which allows them to communicate.

4. **Rebuilding**: If you make changes to the code, rebuild with:
   ```powershell
   docker-compose up --build
   ```

5. **Cleaning Up**: To remove all images and containers:
   ```powershell
   docker-compose down --rmi all --volumes
   ```

---

## Troubleshooting

**Problem**: Cannot connect to backend from frontend

**Solution**: Make sure both frontend and backend containers are running. Check with `docker ps`.

**Problem**: Port already in use

**Solution**: Stop the conflicting service or change the port mapping in docker-compose.yml:
```yaml
ports:
  - "1235:1234"  # Use a different host port
```

**Problem**: Changes not reflecting

**Solution**: Rebuild the images with `docker-compose up --build`

---

## Accessing in Docker Desktop

Once containers are running, you can:
1. Open Docker Desktop
2. Go to "Containers" tab
3. See all running containers
4. Click on a container to view logs, inspect, or open in browser
