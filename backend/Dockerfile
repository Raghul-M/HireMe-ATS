# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app


# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . .
# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt



# Create directory for uploaded files
RUN mkdir -p uploaded_files

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"] 

