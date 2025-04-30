# Amazon Product Scraper

**Objective:** Simple aplication to scrape Amazon product listings from the first page of search results for a given keyword.

## Task Requirements:

### Backend/API (Bun):

```bash
cd backend
```

The backend is a Node.js server using Express, Axios, and jsdom. It exposes a `/api/scrape` endpoint that receives a search keyword, fetches the corresponding Amazon search results page, and parses the HTML using JSDOM to extract basic product data (title, image URL, product link, rating, and number of reviews). To minimize detection, the request includes custom headers and a randomized delay (`sleep`). The server is CORS-enabled to support frontend development in a separate environment.

### Frontend (HTML, CSS, Vanilla JavaScript with Vite):

```bash
cd frontend
```

The frontend is a lightweight single-page application built with vanilla HTML, CSS, and JavaScript. It provides a simple user interface to search for Amazon products by keyword and displays the scraped results in a structured card format.

### Considerations:

This project is educational in nature and was developed for study purposes only.
No affiliation with Amazon or any other company is claimed.
All displayed data is publicly available and not stored.

---

### To run the project:

Clone the repository at: https://github.com/blguimaraes/amazon-product-scraper

#### To install dependencies:

```bash
bun install:all
```

#### To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
