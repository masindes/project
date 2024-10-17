
const blogContainer = document.getElementById("blogContainer");
const apiKey = '7e6add09d1fa415088ac94d6924e3f1b';
 // Replace with your actual API key
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('Search-button');
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const data = await response.json();
        console.log(data);   // log data here
        return data.articles;
    } catch (error) {
        console.error('Error fetching random news:', error);
        return [];
    }
}
searchButton.addEventListener('click', async ()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query", error);
        }
    }
})
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
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
        // the bellow code makes the tittle character to be less than 30 in the tittle section.
        const truncatedTittle = article.title.length > 30? article.title.slice(0,30)
          + "..." : article.title;
        title.textContent = truncatedTittle;

        const description = document.createElement("p");
        description.textContent = description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        // Add event listener for click on each blog card to open the full article in a new tab
        blogCard.addEventListener("click", () => {
            if (description.style.display === 'none') {
                description.style.display = 'block';
            } else {
                description.style.display = 'none';
            }
        });
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
