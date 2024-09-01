# Rpg-manager


### Introdução


**Tecnologias utilizadas**:

- [React](https://react.dev/)
- [MUI](https://mui.com/)
- [Node.js](https://nodejs.org/pt)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Next.js](https://nextjs.org/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)
- [PhpMyAdmin](https://www.phpmyadmin.net/)
- [Prisma ORM](https://www.docker.com/)
- [Swagger](https://swagger.io/)

### Modelo ER/EER

![alt text]()

### Engenharia Reversa do Banco de Dados

![alt text]()

### Configurações de Ambiente

**Requisitos mínimos**:

- Ter o Docker_V2 instalado na máquina.

**Colonando o repositório**:

```env
# HTTPS
$ git clone https://github.com/webacademyufam/hands-on-t3-02-optihire.git

# SSH
$ git clone git@github.com:webacademyufam/hands-on-t3-02-optihire.git
```

**Instalando o Docker_V2, caso não possua localmente**:

```env
# Apenas para ambientes Linux que utilizam o "sudo apt"
$ ./install_docker_v2.sh
```

**Instalação das dependências**:

- Toda a instalação é feita dentro dos containeres Docker, não havendo a necessidade de realizar instalações em sua máquina.

**Configuração das variáveis de ambiente**:

```env
# Considere que começamos na raiz do repositório
$ cp .env.example .env
$ cd backend
$ cp .env.example .env
```

**Inicializando o ambiente de desenvolvimento**:

```env
# A partir da raiz do repositório
$ ./start.sh
```

### Estrutura do Projeto

**Explicação sobre os principais arquivos e pastas, incluindo**:

- `src/`: Contém todo o código fonte.
- `controllers/`: Responsável pelo gerenciamento das requisições e respostas.
- `services/`: Contém a lógica de negócio.
- `routes/`: Define as rotas da aplicação.
- `prisma/`: Contém os esquemas e migrações do Prisma.

### Configurações do Prisma ORM

**Como executar um Migrate Deploy**

```env
# Ao inicializar o projeto com o "./start.sh" já é executado um deploy dos migrates
# Mesmo assim, caso queira executá-lo isoladamente, o comando está abaixo

# Execute na raiz do repositório
$ ./migrate_deploy.sh
```

**Como executar um Migrate Dev**

```env
# Executar na raiz do repositório
$ ./migrate_dev.sh

# O terminal irá perguntar o nome do novo migrate,
# o padrão utilizado no projeto é este:

# altera_tabela
# cria_tabela
# exclui_tabela
```

### Scripts Disponíveis

1. `start.sh`: Fetch com o projeto, verifica se tem algo aberto e fecha nas portas que irão ser utilizadas, inicializa as imagens (caso não existam) e o containeres, por ultimo executa o `./migrate_deploy.sh` para implementar os migrates feitos até então no projeto

2. `down.sh`: Para os containeres do projeto.

3. `migrate_deploy.sh`: Implementar os migrates feitos até então.

4. `migrate_dev.sh`: Cria um novo migrate.

5. `delete_dev.sh`: Apaga todos os containeres, imagens, volumes e network do projeto utilizando comandos do docker compose.

6. `install_docker_v2.sh`: Instala a segunda versão do Docker.

### [Prefixos dos Commits](https://github.com/JuniorLima22/padroes-e-nomenclaturas-no-git#prefixos-dos-commits)

Observe que os prefixos abaixo foram personalizados com base no artigo do link acima.

- :books: [DOCS]: apenas mudanças de documentação.
- :sparkles: [FEAT]: Adição de uma nova feature ao projeto, componente, etc.
- :lady_beetle: [FIX]: Correção de um bug.
- :zap: [PERF]: Melhoria de performance.
- :recycle: [REFACTOR]: Refatoração do código que não adiciona uma funcionalidade nem corrige um bug.
- :art: [STYLE]: Mudanças no código que não afetam seu significado (espaço em branco, formatação, ponto e vírgula, etc).
- :test_tube: [TEST]: Adição ou correção de testes.
- :rocket: [IMPROVEMENT]: Melhoria em algo já existente, seja de performance, escrita, layout, etc.
- :floppy_disk: [PRISMA]: Alterações relacionadas ao Prisma, como mudanças no esquema ou nas migrações.
- :hammer_and_wrench: [DEVOPS]: Configuração ou mudanças relacionadas ao DevOps, como CI/CD, dockerização, scripts de deploy, etc.

## Desenvolvedores e Contato

- `Vinícius Fonseca`: viniciusluiz067@gmail.com
