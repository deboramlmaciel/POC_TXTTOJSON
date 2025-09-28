# API TxtToJson
API REST feita com Node.js e Express 
Objetivo: Receber um arquivo de extensão ".txt", processar seus dados e retornar os dados na estrutura JSON

## Tecnologias utilizadas / Pacotes
- [VSCode] IDE Desenvolvimento - (https://code.visualstudio.com/) - Leve, gratuito, uso de extensões necessárias, IntelliSense etc
- [Node.js] Programação - (https://nodejs.org/) - Escolha pela simplicidade de entregar o que foi solicitado e para desafio próprio
- [Express] Servidor Web - (https://expressjs.com/) - Popular, compatibilidade, performance etc
- [Multer] Upload de arquivos - (https://github.com/expressjs/multer) - Compatível com o Express, facilidade de uso
- [Supertest] Testar o endpoint - (https://www.npmjs.com/package/supertest) - Facilidade de testes com endpoint HTTP

### Estrutura do projeto
POC_TXTTOJSON/
- index.js # Código principal da API
- server.js # Requisição de execução do servidor da API
- package.json # Gerenciador de dependências
- api_request_examples/ # Pasta com export do Postman com requisições na API
- files/ # Pasta de uso temporário para os uploads dos arquivos .txt
- files_example # Pasta com arquivos .txt de exemplo de importação na API
- functions/ # Pasta com funções utilizadas na codificação da API
- README.md # Este arquivo, com orientações gerais do projeto

#### Como rodar o projeto
- Clone o repositório
- Execute os comandos abaixo no terminal para instalar as dependências: 
  npm init -y
  npm install express multer
  npm install --save-dev jest@29
- Crie a pasta "files" na raiz do projeto se não existir
- Execute o comando para iniciar o servidor: node server.js

##### Endpoint disponível
- http://localhost:3000/processFile
  POST /processfile
    - parâmetros opcionais:
        - dataInicio e dataFinal (filtrar pelo campo dataCompra)
        - idPedido (filtrar pelo campo idPedido)

###### Executar testes
- executar no terminal o comando:
  - npm test