#!/bin/sh

echo "Fazendo fetch do repositório remoto..."
git fetch origin

check_and_kill_processes() {
    for PORTA in 3306 8080 3000 4000; do
        if sudo lsof -t -i:$PORTA > /dev/null; then
            echo "Encerrando processo rodando na porta $PORTA..."
            sudo kill $(sudo lsof -t -i:$PORTA)
        fi
    done
}

check_and_kill_processes

docker compose up -d

echo "Aguardando banco de dados estar pronto para receber conexões..."
DB_CONTAINER_NAME="dbrpg-manager"
until docker exec $DB_CONTAINER_NAME mysqladmin ping --silent; do
    echo "Verificando conectividade com o banco de dados... 🔍"
    sleep 10
done
echo "Conectividade com o banco de dados estabelecida. ✅"

sleep 10

echo "Executando script da implementação da migração... 🔄"
sh migrate_deploy.sh

echo "Script de inicialização concluído. 🎉"
