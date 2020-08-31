const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(response => response.json())
    // needs to have a spread operator so it will not be nested
    // another solution is changing const to let for cities = []
    .then(data => cities.push(...data))
    console.log(cities)
    ;


function findMatches(wordsToMatch, cities) {
        // filter the cities accdg to user's input
        return cities.filter(place => {
        // g - global, i - insensitive (lowercase && uppercase)
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}

// regex for putting commas in numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// display the result
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        // will highlight words matching the input
        const regex = new RegExp(this.value, 'gi');
        
        const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
  
        return `
            <li>
                <span class='name'>${cityName}, ${stateName}</span>
                <span class='population'>${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)