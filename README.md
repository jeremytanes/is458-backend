# is458-backend

## Running with Docker

Build the Docker image and run the container:

```
docker build . -t <your username>/is458-backend
docker run -p 8080:8080 -d <your username>/is458-backend
```

To print logs from container to check that it is running:

```
# Get container ID
docker ps

# Print app output
docker logs <container id>

# Example
App listening on port 8080
```

## Running without Docker

```
npm install
npm start
```
