const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");
const cors = require("cors");
const { sleep } = require("bun");
const test = require("./test.json");

const { JSDOM } = jsdom;

// Setup express and enable CORS for frontend comunication
const app = express();
app.use(cors());

const port = 3000; // API Server port

// Scraping endpoint
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword;
  const amazonSearchUrl = `https://www.amazon.com/s?k=${keyword}`;

  try {
    // Wait 1 to 2 seconds to simulate natural user behavior and avoid bot detection
    await sleep(1000 + Math.random() * 1000);

    // Fetch the Amazon search page with headers to avoid bot detection
    const response = await axios.get(amazonSearchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        Referer: "https://www.amazon.com/",
      },
      maxRedirects: 0,
    });

    // Parse HTML using JSDOM
    const dom = new JSDOM(response.data);

    // Select product list items
    const items = dom.window.document.querySelectorAll('[role="listitem"]');

    // Extract data from the DOM nodes and return a products object list
    const scrapedProducts = Array.from(items)
      .slice(0, 15)
      .map((item) => {
        const title =
          item
            .querySelector("h2[aria-label]")
            ?.getAttribute("aria-label")
            ?.trim() || "No title";
        const url =
          item.querySelector("a[href]")?.getAttribute("href") || "No title";
        const rating =
          item
            .querySelector('[aria-label*="stars"]')
            ?.getAttribute("aria-label") || "No rating";
        const reviews =
          item
            .querySelector('[aria-label$="ratings"], [aria-label$="reviews"]')
            ?.textContent?.trim() || "No reviews";
        const imgUrl = item.querySelector("img")?.src || "No image";

        return {
          title,
          productUrl: `https://www.amazon.com${url}`,
          rating,
          reviews,
          imgUrl,
        };
      });

    console.log(scrapedProducts);
    res.json(scrapedProducts);
  } catch (error) {
    console.log("Scraping failed!", error.message);
    res.status(500).json({ error: "Falha no scraping" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
