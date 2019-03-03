const fs = require('fs');
const puppeteer = require('puppeteer');
const topics = ['cricket', 'football', 'bollywood', 'hollywood', 'life', 'sex', 'india', 'science', 'existence', 'reality', 'geography', 'history', 'javascript'];

async function scrap() {
    await (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let text = [],
            wordArr = [],
            pureWordArr = [],
            paragraph;

        for (let topic of topics) {
            await page.goto(`https://en.wikipedia.org/wiki/${topic}`);
            paragraph = await page.evaluate(() => {
                let result = Array.from(document.querySelectorAll('p')).map((element) => {
                    return element.childNodes[0].data
                })
                return result;
            });
            text = [...text, ...paragraph];
        }

        text.forEach((sentence) => {
            (sentence !== null) && (wordArr = [...wordArr, ...sentence.split(' ')]);
        })

        wordArr.forEach(word => {
            (word.replace(/[^A-Za-z]+/g, '')) && (pureWordArr = [...pureWordArr, word.replace(/[^A-Za-z]+/g, '').toLowerCase()]);
        })

        fs.writeFileSync('words.json', JSON.stringify(pureWordArr, null, 4));
        await browser.close();
    })();
}
scrap();