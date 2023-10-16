# Para instalar as dependências necessárias
npm install \
npm run build

# Para executar o projeto via Docker:

docker build -t integracao-paypal-nginx .\
docker run -d -p 8280:80 integracao-paypal-nginx

# Para testar os pagamentos via Paypal
É preciso criar uma conta no Paypal aqui: https://www.paypal.com/br/home \
Depois acessar o módulo desenvolvedor para testar a API: https://developer.paypal.com/dashboard/accounts \
Por fim, criar ou utilizar as contas default que o Paypal fornece através de sandbox: https://www.sandbox.paypal.com/signin

## Equipe Desenvolvedora
José Marcus: https://github.com/joseMarcus \
Renan Thierry: https://github.com/Renan-Thierry \
Wanderson César: https://github.com/WandersonCesar14

