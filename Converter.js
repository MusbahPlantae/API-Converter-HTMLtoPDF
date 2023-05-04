import Puppeteer from 'puppeteer';

export class Converter {
    async convertHtmlToPdf(htmlBuffer) {
        
        process.env['PUPPETEER_EXECUTABLE_PATH'] = '/usr/bin/chromium-browser';

        const browser = await Puppeteer.launch({
            args: [
              '--single-process', 
              '--no-zygote', 
              '--no-sandbox',
              '--disable-setuid-sandbox'
            ],
        });

        const page = await browser.newPage();

        // Configura a página para ignorar recursos desnecessários
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.setContent(htmlBuffer.toString(), { waitUntil: 'networkidle2' });

        const pdf = await page.pdf({
            format: process.env.PDF_FORMAT,
            scale: +process.env.PDF_SCALE,
            margin: this.getMarginProperties(),
            printBackground: JSON.parse(process.env.PDF_BACKGROUND)
        });

        await browser.close();
        return pdf;
    }

    getMarginProperties() {
        return {
            top: process.env.MARGIN_TOP,
            bottom: process.env.MARGIN_BOTTOM,
            left: process.env.MARGIN_LEFT,
            right: process.env.MARGIN_RIGHT
        };
    }
}
