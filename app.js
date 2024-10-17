
const blogContainer = document.getElementById("blogContainer");
const apiKey = '7e6add09d1fa415088ac94d6924e3f1b';
 // Replace with your actual API key

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching random news:', error);
        return [];
    }
}

function displayBlogs(articles) {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) {
        console.error('blog-container not found');
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
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs", error);
    }
})();
