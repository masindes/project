const apiKey = "7e6add09d1fa415088ac94d6924e3f1b"

const blogContainer = document.getElementById("blog-Container");

async function fechRandomNews(){
    try{
      const apiUrl = `https://newsapi.org/v2/everything?q=apple&pageSize=10$apiKey=${apiKey}`
      const response = await fetch(apiUrl)
      const data = await response.json();
      console.log(data);
    } catch(e){
        console.error("Error fetching news", e);
        return[]
    }
}

function displayBlog(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
       const blogCard  = document.createElement("div");
       blogCard.classList.add("blog-card");
       const img = document.createElement("img")
       img.src = article.urlToImage;
       img.alt = article.tittle;
       const card = document.createElement("h2");
       title.textcontent = article.title
       const description = document.createElement("p")
       description.textContent = article.description;

       blogCard.appendChild(img);
       blogCard.appendChild(title);
       blogCard.appendChild(description);
       blogContainer.appendChild(blogCard);
    })
}

(async ()=>{
   try{
    const articles = await fechRandomNews()
    displayBlog(articles)
   }catch(e){

   }
})