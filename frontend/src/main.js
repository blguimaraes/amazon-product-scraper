// API endpoint for the backend scraper
const API_URL = "http://localhost:3000/api/scrape";

// Add a click event listener to the scrape button
document.getElementById("scrape-button").addEventListener("click", async () => {
  // Get the keyword from the input field and trim whitespace
  const keyword = document.getElementById("keyword").value.trim();

  // Get the div where results will be displayed
  const resultsDiv = document.getElementById("results");

  try {
    // Fetch results from the backend API using the keyword
    const res = await fetch(`${API_URL}?keyword=${keyword}`);
    const results = await res.json(); // Parse JSON response

    // Handle case when there are no results
    if (!results || results.length === 0) {
      resultsDiv.textContent = "No results found.";
      return;
    }

    // Render each product to the page if results exist
    if (results.length > 0) {
      resultsDiv.innerHTML = results
        .map(
          (product) => `
          <a class="product-link" href="${
            product.productUrl
          }" target="_blank" rel="noopener">
          <div class="product">
          <img src="${product.imgUrl || ""}" alt="Product image"/>
          <div class="product-details">
            <h3>${product.title || "—"}</h3>
            <p>⭐ ${product.rating || "N/A"}</p> 
            <p>📘 ${product.reviews || "0"} reviews</p>
          </div>
          </div>
        </a>
    `
        )
        .join("");
    }
  } catch (error) {
    // Handle any errors during fetch or rendering
    resultsDiv.textContent = "Error fetching results. Try again later.";
    console.error(error);
  }
});
