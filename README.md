<<<<<<< HEAD
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
=======
<h1 align="center"> Create your container or use the docker-compose up option</h1>

docker run -d \
 --name NGAPP \
 -e POSTGRES_USER=devUser \
 -e POSTGRES_PASSWORD=admin### \
 -e POSTGRES_DB=NGDB \
 -p 6666:5432 \
 postgres:latest

 <h1 align='center'>If you want to use sequelize-cli, you will need to compile your configurations and migrations<h1>
>>>>>>> 01fb9ec (feat: hashPassword; database: .sequelizerc)
