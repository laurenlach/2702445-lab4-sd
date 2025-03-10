const fetchCountryBtn = document.getElementById('fetch-country-btn');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');

async function fetchCountryByName(country) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!res.ok) throw new Error('Country not found');
        const data = await res.json();
        displayCountryInfo(data[0]); // Display the first matching country
    } catch (error) {
        countryInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        borderingCountries.innerHTML = '';
    }
}

function displayCountryInfo(country) {
    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.png}" alt="${country.name.common} flag">
    `;

    // Display bordering countries
    if (country.borders) {
        borderingCountries.innerHTML = '<h3>Bordering Countries:</h3>';
        country.borders.forEach(async (border) => {
            const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const borderData = await borderRes.json();
            const neighbor = borderData[0];
            borderingCountries.innerHTML += `
                <section>
                    <p>${neighbor.name.common}</p>
                    <img src="${neighbor.flags.png}" alt="${neighbor.name.common} flag">
                </section>
            `;
        });
    } else {
        borderingCountries.innerHTML = '<p>No bordering countries found.</p>';
    }
}

fetchCountryBtn.addEventListener('click', () => {
    const countryInput = document.getElementById('country-input').value.trim();
    countryInfo.innerHTML = '';
    borderingCountries.innerHTML = '';
    if (countryInput) {
        fetchCountryByName(countryInput);
    }
});



