const puppeteer = require('puppeteer');
const topics = ['cricket', 'football', 'bollywood', 'hollywood', 'life'];

function scrap() {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let text = [],
            wordArr = [],
            pureWordArr = [],
            frequency = [],
            sortedFreaquency = [],
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

        pureWordArr.forEach(word => {
            frequency[word] = frequency[word] ? frequency[word] + 1 : 1;
        })

        console.log(frequency);

        for (var key in frequency) {
            sortedFreaquency.push([key, frequency[key]]);
        }

        sortedFreaquency.sort(function(a, b) {
            return b[1] - a[1];
        });

        await browser.close();

        return sortedFreaquency;
    })();
}
scrap();

module.exports = scrap;