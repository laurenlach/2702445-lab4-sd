const fetchCapitalBtn = document.getElementById('fetch-capital-btn');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');

async function fetchCountryByName(countryName) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await res.json();
        displayCountryInfo(data[0]);
    } catch (error) {
        countryInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        borderingCountries.innerHTML = '';
    }
}

function displayCountryInfo(country) {
    const capital = country.capital ? country.capital[0] : 'N/A';

    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><img src="${country.flags.png}" alt="${country.name.common} flag"></p>
    `;

    if (country.borders) {
        borderingCountries.innerHTML = '<h3>Bordering Countries:</h3>';
        country.borders.forEach(async (border) => {
            const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const borderData = await borderRes.json();
            borderingCountries.innerHTML += `<p>${borderData[0].name.common}</p>`;
        });
    } else {
        borderingCountries.innerHTML = '<p>No bordering countries found.</p>';
    }
}

fetchCapitalBtn.addEventListener('click', () => {
    const countryName = document.getElementById('capital-input').value.trim();
    countryInfo.innerHTML = '';
    borderingCountries.innerHTML = '';
    if(countryName) fetchCountryByName(countryName);
});


