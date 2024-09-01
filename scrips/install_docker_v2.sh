#!/bin/bash

# Desinstalando pacotes conflitantes
echo -e "\033[33m🔧 Instalando Docker Engine v2 🔧\033[0m"
echo -e "\033[33mDesinstalando pacotes conflitantes...\033[0m"
for pkg in docker.io docker-doc podman-docker containerd runc; do
    sudo apt-get remove --purge $pkg || true
done

# Atualizando o repositório apt
echo -e "\033[32mAtualizando repositório apt...\033[0m"
sudo apt-get update

# Instalando certificados necessários
echo -e "\033[32mInstalando certificados necessários...\033[0m"
sudo apt-get install -y ca-certificates curl

# Criando diretório para chaves apt
echo -e "\033[32mCriando diretório para chaves apt...\033[0m"
sudo install -m 0755 -d /etc/apt/keyrings

# Adicionando a chave GPG do Docker
echo -e "\033[32mAdicionando a chave GPG do Docker...\033[0m"
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# Alterando permissões da chave GPG
echo -e "\033[32mAlterando permissões da chave GPG...\033[0m"
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adicionando o repositório do Docker ao apt
echo -e "\033[32mAdicionando o repositório do Docker ao apt...\033[0m"
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizando o repositório apt novamente
echo -e "\033[32mAtualizando repositório apt novamente...\033[0m"
sudo apt-get update

# Instalando o Docker Engine e seus componentes relacionados
echo -e "\033[36mInstalando o Docker Engine e seus componentes relacionados... 📦 \033[0m"
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Remove pacotes desnecessários
sudo apt-get autoremove

# Adiciona seu usuário ao grupo Docker
sudo usermod -aG docker $USER

# Exibe a versão do Docker instalado
echo -e "\033[34mDocker version:\033[0m"
sudo docker -v
sudo docker-compose -v

echo -e "\033[32m🎉 Instalação do Docker concluída com sucesso 🎉\033[0m"
echo -e "\033[33m💻 Por favor, reinicie a sua máquina 💻\033[0m"
