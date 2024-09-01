#!/bin/sh

docker exec -it backend_optihire npx prisma migrate deploy
docker exec -it backend_optihire npm run seed