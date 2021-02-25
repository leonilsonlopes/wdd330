const peopleList = document.getElementById('people');
const pageButtonsDiv = document.getElementById('page-buttons');
const detailsBox = document.getElementById('details');
var currentPage = 1;
var maxCount;
var maxPages;

function updateList(data) {
  console.log(data);
  if (!maxCount) {
    maxCount = data.count;
    maxPages = Math.ceil(maxCount / data.results.length);
  }
  peopleList.innerHTML = '';
  for (let person of data.results) {
    const listItem = document.createElement('li');
    listItem.innerHTML = person.name;
    listItem.details = person;
    peopleList.appendChild(listItem);
  }
  pageButtonsDiv.innerHTML = '';
  for (let page = 1; page <= maxPages; page++) {
    const button = document.createElement('button');
    button.innerHTML = page;
    button.addEventListener('click', (e) => getPeople(page))
    peopleList.appendChild(button);
  }
}

function getPeople(page=1) {
  fetch(`https://swapi.dev/api/people/?page=${page}`)
    .then(response => response.json())
    .then(data => updateList(data));
}
getPeople(1);

function getNext() {
  currentPage++;
  if (currentPage > maxPages) currentPage = maxPages;
  getPeople(currentPage);
}
function getPrevious() {
  currentPage--;
  if (currentPage < 1) currentPage = 1;
  getPeople(currentPage);
}

function displayDetails(e) {
  let details = e.target.details;
  detailsBox.innerHTML = `
    <b>Name:</b> ${details.name}<br>
    <b>Height:</b> ${details.height}<br>
    <b>Mass:</b> ${details.mass}<br>
    <b>Hair color:</b> ${details.hair_color}<br>
    <b>Skin color:</b> ${details.skin_color}<br>
  `;
}

peopleList.addEventListener('click', displayDetails);
