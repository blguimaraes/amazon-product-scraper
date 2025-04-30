# Amazon Product Scraper: Backend

**Objective:** API for a simple script to scrape Amazon product listings from the first page of search results for a given keyword.

---

## Documentation:

- Uses: express, axios and JSDOM.
- Endpoint for scraping:

> /api/scrape

- Data structure of the `GET` response contains:
  - Product Title
  - Product URL
  - Rating (stars out of five)
  - Number of reviews
  - Product image URL

```
scrapedProducts: {
    title: string;
    productUrl: string;
    rating: string;
    reviews: string;
    imgUrl: string;
}
```

---

### Run in the project main folder:

```bash
bun install:all
```

```bash
bun run dev
```

### Or for running individualy:

#### To install dependencies:

```bash
bun install
```

#### To run:

```bash
bun run dev
```

And make sure to run the frontend aplication.

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
