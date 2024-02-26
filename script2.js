document.getElementById("countrySearchForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    await searchCountry();
});

async function searchCountry() {
    const countryName = document.getElementById("countryName").value;
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)

    if (response.ok) {
        const data = await response.json();
        statistics(data);
        countryPopulation(data);
        continentCountries(data);
    } else {
        alert('Enter a valid name');
    }
};


function statistics(data) {
    let statisticsHtml = "<h2>Statistics</h2>" +
        "<p>Number of countries: " + data.length + "</p>" +
        "<p>Total population: " + calculatePopulation(data) + "</p>" +
        "<p>Average population: " + averagePopulation(data) + "</p>";

    document.getElementById("statistics").innerHTML = statisticsHtml;
}


function calculatePopulation(data) {
    let totalPopulation = 0;
    data.forEach(country => {
        totalPopulation += country.population;
    });
    return totalPopulation;
}

function averagePopulation(data) {
    let totalPopulation = calculatePopulation(data);
    let averagePopulation = totalPopulation / data.length;
    return averagePopulation;
}

function countryPopulation(data) {
    let countryPopulationHtml = `
    <h2>Country Population</h2>
    <table>
    <thead>
    <tr>
    <th>Country</th>
    <th>Population</th>
    </tr>
    </thead>
    <tbody>`;

    for (let i = 0; i < data.length; i++) {
        const country = data[i];
        countryPopulationHtml += "<tr>";
        countryPopulationHtml += `<td>${country.name.common}</td>`;
        countryPopulationHtml += `<td>${country.population.toLocaleString()}</td>`;
        countryPopulationHtml += "</tr>";
    }

    countryPopulationHtml += "</tbody></table>";

    document.getElementById("countryPopulation").innerHTML = countryPopulationHtml;
}


function continentCountries(data) {
    let continentCounts = {};
    data.forEach(country => {
        const region = country.region;
        if (region in continentCounts) {
            continentCounts[region]++;
        } else {
            continentCounts[region] = 1;
        }
    });

    let continentCountriesHtml = `<h2>Continent Countries</h2>
    <table>
    <thead>
    <tr>
    <th>Continent</th>
    <th>Number of Countries</th>
    </tr>
    </thead>
    <tbody>`

    const continents = Object.keys(continentCounts);
    for (let i = 0; i < continents.length; i++) {
        const continent = continents[i];
        const count = continentCounts[continent];
        let rowHtml = "<tr>";
        rowHtml += "<td>";
        rowHtml += continent || 'Unknown';
        rowHtml += "</td>";
        rowHtml += "<td>";
        rowHtml += count;
        rowHtml += "</td>";
        rowHtml += "</tr>";
        continentCountriesHtml += rowHtml;

    }

    continentCountriesHtml += `
                </tbody>
            </table>
        `;

    document.getElementById("continentCountries").innerHTML = continentCountriesHtml;
}