## 🌺 Dev DB

`pcc-dev-env` spins up a `postgres` service with a pre-created DB for the `recipes` service. Go to `pcc-dev-env` directory and run the command below to connect to dev DB

```
docker-compose exec postgres psql -U penguin -d recipes
```