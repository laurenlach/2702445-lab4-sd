const fetchCapitalBtn = document.getElementById('fetch-capital-btn');
const fetchRegionBtn = document.getElementById('fetch-region-btn');

const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');

async function fetchCountryByCapital(capital) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
        if (!res.ok) throw new Error('Country not found');
        const data = await res.json();
        displayCountryInfo(data[0]);
    } catch (error) {
        countryInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function fetchCountriesByRegion(region) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        if (!res.ok) throw new Error('Region not found');
        const data = await res.json();
        countryInfo.innerHTML = `<h2>Countries in ${region}</h2>`;
        data.forEach(country => {
            countryInfo.innerHTML += `
                <section>
                    <h3>${country.name.common}</h3>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <img src="${country.flags.png}" alt="${country.name.common} flag">
                </section>
            `;
        });
    } catch (error) {
        countryInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayCountryInfo(country) {
    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.png}" alt="${country.name.common} flag">
    `;

    if (country.borders) {
        borderingCountries.innerHTML = '<h3>Bordering Countries:</h3>';
        country.borders.forEach(async (border) => {
            const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const borderData = await borderRes.json();
            const neighbor = borderData[0];
            borderingCountries.innerHTML += `
                <section>
                    <p>${neighbor.name.common}:</p>
                    <img src="${neighbor.flags.png}" alt="${neighbor.name.common} flag">
                </section>
            `;
        });
    } else {
        borderingCountries.innerHTML = '<p>No bordering countries found.</p>';
    }
}

fetchCapitalBtn.addEventListener('click', () => {
    const capitalInput = document.getElementById('capital-input').value;
    countryInfo.innerHTML = '';
    borderingCountries.innerHTML = '';
    fetchCountryByCapital(capitalInput);
});

fetchRegionBtn.addEventListener('click', () => {
    const regionInput = document.getElementById('region-input').value;
    countryInfo.innerHTML = '';
    borderingCountries.innerHTML = '';
    fetchCountriesByRegion(regionInput);
});
