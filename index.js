require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(stealthPlugin());

const randomUseragent = require('random-useragent');

//set random user agent
const USER_AGENT = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) 
AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 73.0.3683.75 Safari / 537.36`;
const userAgent = randomUseragent.getRandom();
const UA = userAgent || USER_AGENT;

module.exports = {

    async doesExist(word) {

        const browser = await puppeteer.launch(
            {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
                ignoreHTTPSErrors: true,
                dumpio: false,
            }
        );

        const page = await browser.newPage();
        const url = `https://dle.rae.es/srv/search?w=${word}`;

        //Set random view port
        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.setUserAgent(UA);
        await page.setJavaScriptEnabled(true);
        await page.goto(url, { waitUntil: 'networkidle0' });

        try {
            await page.$eval('.f', elem => elem.innerText);
            await browser.close();
            return true;
        } catch (e) {
            await browser.close();
            if (e.toString().includes('.f')) return false;
        }
    },

    async getMeaning(word) {
        const browser = await puppeteer.launch(
            {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
                ignoreHTTPSErrors: true,
                dumpio: false,
            }
        );

        const page = await browser.newPage();
        const url = `https://dle.rae.es/srv/search?w=${word}`;

        //Randomize viewport size
        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.setUserAgent(UA);
        await page.setJavaScriptEnabled(true);
        await page.goto(url, { waitUntil: 'networkidle0' });

        try {
            const results = await page.$$eval('.j', significados => {
                return significados.map(significado => significado.textContent);
            });
            await browser.close();
            return results;
        } catch (e) {
            await browser.close();
            if (e.toString().includes('.f')) return false;
        }
    }
};