# Fullstack Microservices Architecture 🚀

Este projeto é uma aplicação Fullstack composta por um **Frontend React**, um **Backend Spring Boot** e um banco de dados **MySQL**, todos orquestrados via **Docker** e protegidos por um **API Gateway (Nginx)**.

## 🏗️ Arquitetura do Sistema
O projeto utiliza o conceito de isolamento de serviços:
- **Gateway (Nginx):** Único ponto de entrada (Porta 80). Faz o roteamento entre Front e Back.
- **Frontend (React):** Interface do usuário rodando em ambiente de desenvolvimento.
- **Backend (Spring Boot):** API REST que gerencia a lógica de negócio.
- **Database (MySQL):** Persistência de dados em rede isolada.

## 🛠️ Tecnologias Utilizadas
- Java 17 / Spring Boot
- React (Vite)
- MySQL 8.0
- Nginx (Reverse Proxy)
- Docker & Docker Compose

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Passo a Passo

#### **Opção A: Rodar via Docker Hub (Rápido)**
1. Baixe os arquivos `docker-compose.yml`, `env.example` e `nginx.conf`.
2. Renomeie o arquivo `env.example` para `.env` e ajuste as variáveis.
3. No terminal, execute:
   ```bash
   docker-compose up -d

#### **Opção B: Montar arquivos do GitHub**

1. **Clone o repositório:**
   
   No terminal, use:
   ```bash
   git clone https://github.com/EdiellyF/NTDWM-Api-Rest.git
   cd NTDWM-Api-Rest
   ```

2. **Faça a build dos containers:**

   - Altere as variáveis no arquivo `env.example` e renomeie-o para `.env`
   - Certifique-se de que o arquivo `nginx.conf` esteja na mesma pasta
   - Execute o comando:
   
   ```bash
   docker-compose up --build -d
   ```

   Esse comando irá buildar os arquivos do repositório e criar as imagens a partir deles.

3. **Acesse a aplicação:**

   ```
   http://localhost
   ```
