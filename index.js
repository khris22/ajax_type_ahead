const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

fetch(endpoint)
    .then(response => response.json())
    // needs to have a spread operator so it will not be nested
    // another solution is changing const to let for cities = []
    .then(data => cities.push(...data))
