<h1 align="center"> Create your container </h1>
<code> docker run -d \
  --name NGAPP \
  -e POSTGRES_USER=devUser \
  -e POSTGRES_PASSWORD=admin### \
  -e POSTGRES_DB=NGDB \
  -p 6666:5432 \
  postgres:latest</code>
<p>
  If you're a linux user (Debian 12), Docker latest/stable 20.10.24 version that comes from Snapcraft may cause some troubles with the Docker(Microsoft) vscode extension. Considerer to install following the <a href="https://docs.docker.com/engine/install/debian/" target="_blank">apt repository steps</a>

</p>
