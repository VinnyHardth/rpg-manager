#!/bin/sh

docker exec -it backend_rpg-manager npx prisma migrate deploy
docker exec -it backend_rpg-manager npm run seed