<h1 align="center"> Create your container </h1>

docker run -d \
  --name NGAPP \
  -e POSTGRES_USER=devUser \
  -e POSTGRES_PASSWORD=admin### \
  -e POSTGRES_DB=NGDB \
  -p 6666:5432 \
  postgres:latest