const blogContainer = document.getElementById("blogContainer");
const apiKey = '7e6add09d1fa415088ac94d6924e3f1b'; // Replace with your actual API key
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('Search-button');

// Function to fetch random news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data); // log data here
        return data.articles;
    } catch (error) {
        console.error('Error fetching random news:', error);
        return [];
    }
}

// Search functionality
const searchNews = async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
};

searchButton.addEventListener('click', searchNews);

// Add event listener for Enter key press
searchField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
        searchNews(); // Call the search function
    }
});

// Function to fetch news based on query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news by query:', error);
        return [];
    }
}

// Function to display blogs
function displayBlogs(articles) {
    if (!blogContainer) {
        console.error('blogContainer not found');
        return;
    }

    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || ''; // Placeholder image
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescription = typeof article.description === 'string' && article.description.length > 200
            ? article.description.slice(0, 200) + "..."
            : article.description || 'No description available.'; // Fallback to a default message if not available
        
        description.textContent = truncatedDescription; // Truncate the description

        // Create a Read More button
        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read More";
        readMoreButton.classList.add("read-more"); // Add a class for styling if needed
        
        const fullDescription = document.createElement("p");
        fullDescription.textContent = article.description || 'No description available.';
        fullDescription.style.display = 'none'; // Hide full description by default

        // Event listener for Read More button
        readMoreButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent triggering the card click event
            fullDescription.style.display = fullDescription.style.display === 'none' ? 'block' : 'none';
        });

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.appendChild(readMoreButton);
        blogCard.appendChild(fullDescription);

        // Add event listener for click on each blog card to toggle the description display
        blogCard.addEventListener("click", () => {
            description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });

        blogContainer.appendChild(blogCard);
    });
}

// Immediately Invoked Function Expression to fetch random news
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs", error);
    }
})();
