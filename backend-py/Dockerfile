# Backend Python (Flask) Dockerfile
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies (filter out pkg-resources which causes issues)
RUN grep -v "pkg-resources" requirements.txt > temp-requirements.txt && \
    pip install --no-cache-dir -r temp-requirements.txt && \
    rm temp-requirements.txt

# Copy server file
COPY server.py .

# Expose port 3000
EXPOSE 3000

# Set environment variables for Flask
ENV FLASK_APP=server.py
ENV FLASK_RUN_PORT=3000
ENV FLASK_RUN_HOST=0.0.0.0

# Start the server
CMD ["flask", "run"]
