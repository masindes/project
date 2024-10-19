const blogContainer = document.getElementById("blogContainer");
const apiKey = '7e6add09d1fa415088ac94d6924e3f1b'; // Replace with your actual API key
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('Search-button');

// Function to fetch random news
async function fetchRandomNews() {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`;
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
            return response.json();
        })
        .then(data => data.articles)
        .catch(error => {
            console.error('Error fetching random news:', error);
            return [];
        });
}

// Search functionality with debounce
let debounceTimeout;
const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const searchNews = async () => {
    const query = searchField.value.trim();
    if (query) {
        const articles = await fetchNewsQuery(query);
        displayBlogs(articles);
    }
};

const debouncedSearchNews = debounce(searchNews, 300);

searchButton.addEventListener('click', debouncedSearchNews);
searchField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') debouncedSearchNews();
});

// Function to fetch news based on query
async function fetchNewsQuery(query) {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=${apiKey}`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.articles)
        .catch(error => {
            console.error('Error fetching news by query:', error);
            return [];
        });
}

// Function to display blogs
function displayBlogs(articles) {
    if (!blogContainer) {
        console.error('blogContainer not found');
        return;
    }

    blogContainer.innerHTML = ""; // Clear existing blogs

    const fragment = document.createDocumentFragment(); // Use a document fragment for performance
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || ''; // Placeholder image
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;

        const description = document.createElement("p");
        description.textContent = (typeof article.description === 'string' && article.description.length > 200)
            ? article.description.slice(0, 200) + "..."
            : article.description || 'No description available.';

        // Create a Read More button
        const readMoreButton = document.createElement("button");
        readMoreButton.textContent = "Read More";
        readMoreButton.classList.add("read-more");

        const fullDescription = document.createElement("p");
        fullDescription.textContent = article.description || 'No description available.';
        fullDescription.style.display = 'none'; // Hide full description by default

        readMoreButton.addEventListener("click", (event) => {
            event.stopPropagation();
            fullDescription.style.display = fullDescription.style.display === 'none' ? 'block' : 'none';
        });

        // Append elements to the blog card
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.appendChild(readMoreButton);
        blogCard.appendChild(fullDescription);

        // Add event listener for click on each blog card to toggle the description display
        blogCard.addEventListener("click", () => {
            description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });

        fragment.appendChild(blogCard); // Append the blog card to the document fragment
    });

    blogContainer.appendChild(fragment); // Append the fragment to the DOM in one go
}

// Immediately Invoked Function Expression to fetch random news
(async () => {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
})();
