const URL = "https://newsapi.org/v2/everything?q=";
const key = "747ded37b33c455893698bdb69eca9ff";
const cont = document.getElementById("container");

window.addEventListener("load", () => {
  // getNews("india&category=business");
  getNews("finance");
});




document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("news-search").value;
  getNews(input);
});

async function getNews(query) {
  try {
    // If query is empty, provide a default query
    if (!query) {
      query = "india"; // Default query
    }
    const request = await fetch(`${URL}${query}&apiKey=${key}`);
    const data = await request.json();
     if (data?.articles.length === 0) { // Check if data.articles is empty
       showError();
     } else {
      showOnScreen(data?.articles);
    } 
  } catch (error) {
    console.error("Error in fetching data : "+error);
     showError();
  }
    
}

function showError(){
  cont.innerHTML="";
  const errorTxt = document.createElement("h2");
  errorTxt.textContent = "Nothing found";
  errorTxt.className = "err";
  cont.appendChild(errorTxt);
}


function showOnScreen(articles) {
  cont.innerHTML = "";
  //console.log(articles);
  articles.forEach(article => {
    if(article?.urlToImage==null) return;
    createCard(article); // Call createCard function for each article
  });
}

function createCard(el) {
  const card = document.createElement("div");
  card.className = "news-card";

  card.addEventListener("click",()=>{
    window.open(el?.url , "_blank");
  })

  if (el.urlToImage) {
    const image = document.createElement("img");
    image.src = el?.urlToImage;
    image.className = "news-image";
    card.appendChild(image);
  }

  const content = document.createElement("div");
  content.className = "news-content";

  const title = document.createElement("h3");
  title.innerText = el?.title || "No Title Available"; // Handle missing title
  title.className = "news-title";
  content.appendChild(title);

  const date = document.createElement("p");
  date.innerText = el?.publishedAt ? new Date(el.publishedAt).toLocaleString() : "No Date Available"; // Handle missing date
  date.className = "news-date";
  content.appendChild(date);

  const author = document.createElement("p");
  author.textContent = el?.author || "No Author Available"; // Handle missing author
  author.className = "news-author";
  content.appendChild(author);

  const description = document.createElement("p");
  description.innerText = el?.description || "No Description Available"; // Handle missing description
  description.className = "news-desc";
  content.appendChild(description);

  card.appendChild(content);
  cont.appendChild(card);
}

const nav1= document.getElementById("nav1");
nav1.addEventListener("click" , ()=>{
  getNews(nav1.innerText);
})

const nav2= document.getElementById("nav2");
nav2.addEventListener("click" , ()=>{
  getNews(nav2.innerText);
})

const nav3= document.getElementById("nav3");
nav3.addEventListener("click" , ()=>{
  getNews(nav3.innerText);
})

const logo= document.getElementById("logo");
logo.addEventListener("click" , ()=>{
  getNews("india");
})