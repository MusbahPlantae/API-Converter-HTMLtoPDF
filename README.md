# API de Conversão de HTML para PDF

Esta é uma API desenvolvida em JavaScript com Node.js usando Express, Multer e Puppeteer, que converte um arquivo HTML enviado pelo usuário em um arquivo PDF e retorna o resultado em formato base64.

## Configuração

Antes de iniciar a API, é necessário configurar as variáveis de ambiente. Para isso, você deve criar um arquivo .env na raiz do projeto com as seguintes informações:

``` 
PORT=3000

MARGIN_TOP=5mm
MARGIN_BOTTOM=5mm
MARGIN_LEFT=5mm
MARGIN_RIGHT=5mm

PDF_FORMAT=A4
PDF_SCALE=0.7
PDF_BACKGROUND=true
```

O número da porta pode ser alterado de acordo com a preferência do usuário.

## Instalação

Para instalar as dependências, execute o comando:

``` npm install ```

Para instalar o Chromium

```
sudo apt-get update && \
sudo apt-get install -y chromium-browser libnss3-dev libfreetype6-dev libharfbuzz-dev libfontconfig1-dev fonts-freefont-ttf
```

## Execução

Para iniciar a API, execute o comando:

``` npm run start ```

A API estará disponível em `http://localhost:<PORT>/pdf`, onde `<PORT>` é o número da porta configurado nas variáveis de ambiente.

## Uso

Para enviar um arquivo HTML para conversão, faça uma requisição POST para a URL `http://localhost:<PORT>/pdf`, passando o arquivo no corpo da requisição com a chave file. O servidor irá retornar um arquivo PDF em formato base64.

Header

``` Content-Type: multipart/form-data```