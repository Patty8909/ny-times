const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit',function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET',`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e6b34e070bfe47d493dda1b0af6dee85`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError(){
  console.log('Se ha presentado un error');
}

function addNews(){
  const data = JSON.parse(this.responseText);
  const article = data.response.docs;

  for (const doc of article) {
    console.log(doc);
  
 const title = doc.headline.main;
  const snippet = doc.snippet;
  
  let cont = document.createElement('div');
  let h4 = document.createElement('h4');
  let main = document.createElement('p');

  cont.classList.add('style-box')
  h4.classList.add('style-title')
  main.classList.add('style-main')
  cont.appendChild(h4)
  cont.appendChild(main)

  h4.innerText = title;
  main.innerText = snippet;

  // let li = document.createElement('li');
  // li.innerText = title;

  responseContainer.appendChild(cont);
}
}
