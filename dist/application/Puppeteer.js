"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Youtube = void 0;
const chromium_1 = __importDefault(require("@sparticuz/chromium"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
class Youtube {
    async search(req, res) {
        const query = req.query.search_query;
        const youtube = `https://www.youtube.com/results?search_query=${query}`;
        let browser;
        try {
            browser = await puppeteer_core_1.default.launch({
                args: chromium_1.default.args,
                defaultViewport: chromium_1.default.defaultViewport,
                executablePath: await chromium_1.default.executablePath(),
                headless: true,
            });
            const page = await browser.newPage();
            await page.goto(youtube);
            await page.evaluate(() => {
                return new Promise((resolve) => {
                    const distance = 200;
                    let scrolledAmount = 0;
                    const timer = setInterval(() => {
                        window.scrollBy(0, distance);
                        scrolledAmount += distance;
                        if (scrolledAmount >= document.body.scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
            const data = await page.evaluate(() => {
                const elements = document.querySelectorAll('.style-scope.ytd-item-section-renderer.style-scope.ytd-item-section-renderer a');
                const posts = Array.from(elements);
                return posts.map(item => {
                    return {
                        title: item.innerText || "Novo",
                        watch: "https://www.youtube.com" + item.getAttribute('href') || 'NULL',
                        tumbnail: item.querySelector('.shortsLockupViewModelHostThumbnailContainer.shortsLockupViewModelHostThumbnailContainerAspectRatioTwoByThree.shortsLockupViewModelHostThumbnailContainerRounded img')?.getAttribute("src") || 'null',
                    };
                });
            });
            const response = data.filter((item, index) => item.watch && item.watch.indexOf('https://www.youtube.com/shorts/') > -1);
            return res.json(response);
        }
        catch (error) {
            console.error('Error fetching YouTube data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        finally {
            if (browser) {
                await browser.close();
            }
        }
    }
}
exports.Youtube = Youtube;
