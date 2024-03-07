
const accessKey = "f0BhJx4sZsa_VyXHcFUdpAKoJx3Hg0g17Q4yVx6dVXU";

const formEl = document.querySelector("form");

const inputEl = document.querySelector("#search-input");

const containerEl = document.querySelector(".search-results");

const showBtnEl = document.querySelector("#show-more-button");

 
let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if(page === 1){
        containerEl.innerHTML = "";
    }
  
    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("card");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        containerEl.appendChild(imageWrapper);  
        page++;
    });
    
    if(page > 1){
        showBtnEl.style.display = "block";
    }
}

formEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1 ;
    searchImages();
   });

showBtnEl.addEventListener("click",()=>{
    searchImages();
})   