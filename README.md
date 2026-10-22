# Databases showcase

SvelteKit demo of MySQL and MongoDB. Docker Compose starts the application and
both databases. Only the web port is published; database data lives in Docker
volumes.

## Run on a server

Install Docker Engine and the Docker Compose plugin. In this directory:

```sh
cp .env.example .env
```

Edit `.env` and replace all three example passwords with strong, distinct
values. Then start the stack:

```sh
sudo docker compose up -d --build
sudo docker compose ps
```

Open `http://SERVER_IP:4173` (or the port set by `APP_PORT`). For a public site,
put an HTTPS reverse proxy in front of the application. MySQL and MongoDB have
no published ports.

To see logs or stop the stack:

```sh
sudo docker compose logs -f app
sudo docker compose down
```

`down` preserves the database volumes. Do not use `down -v` unless you intend
to delete all saved records. MySQL creates its table from
`docker/mysql/init.sql` when its volume is first created. MongoDB creates its
collection on the first API request. If you reuse an existing MySQL volume,
create the `showcase` table manually because initialization scripts do not run
again for an existing volume.

The application retains at most 50 records per database. On each API request
it removes older records above that limit. The Docker setup runs one application
process so concurrent requests to each database are serialized. This limit
controls stored records, not the number of HTTP requests; add rate limiting at
the reverse proxy if the site is exposed publicly.
