import Express from 'express';
import Multer from 'multer';
import { Converter } from './Converter.js';
import { config } from 'dotenv';
config();

class API {
    constructor() {
        this.app = Express();
        this.PORT = process.env.PORT;
        this.converter = new Converter();
    }

    start() {
        this.setupMiddlewares();
        this.setupRoutes();
        this.startServer();
    }

    setupMiddlewares() {
        const memoryStorage = Multer.memoryStorage();
        this.upload = Multer({ storage: memoryStorage });
    }

    setupRoutes() {
        this.app.post('/pdf', this.upload.single('file'), async (req, res) => {
            try {
                const pdf = await this.converter.convertHtmlToPdf(req.file.buffer);

                // Converte o PDF para base64
                const pdfBase64 = Buffer.from(pdf).toString('base64');

                // Define o tipo de conteúdo e envia a resposta
                res.contentType('application/pdf');
                res.send(pdfBase64);
            } catch (error) {
                console.error(error);
                res.status(500).send('Erro ao converter o arquivo HTML para PDF');
            }
        });
    }

    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Listening on port ${this.PORT}`);
        });
    }
}

const api = new API();

api.start();
