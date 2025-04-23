# Criar rede Docker
docker network create ecommerce-network

# Build da API de E-commerce
docker build -t ecommerce-api .

# Build da API de Pagamentos
docker build -t payment-api .

# Rodar a API de Pagamento (payment-api)
docker run -p 4000:4000 --network ecommerce-network --name payment-api payment-api

# Rodar a API de E-commerce (ecommerce-api)
docker run -p 3000:3000 --network ecommerce-network --name ecommerce-api ecommerce-api

# Verificar containers em execução
docker ps


