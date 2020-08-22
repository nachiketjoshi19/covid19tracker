window.onload = function () {
  getStats();
};

const totalCases = document.getElementById("totalCases");
const lastUpdated = document.getElementById("lastUpdated");
const activeCases = document.getElementById("activeCases");
const activeNew = document.getElementById("activeNew");
const deaths = document.getElementById("deaths");
const deathsNew = document.getElementById("deathsNew");
const percent = document.getElementById("percent");
const recovered = document.getElementById("recovered");
const recoveredNew = document.getElementById("recoveredNew");

function getStats() {
  // fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/143')
  fetch(
    "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      let totalCasesData = data.totalCases;
      let activeCasesData = data.activeCases;
      let activeNewData = data.activeCasesNew;
      let recoveredData = data.recovered;
      let recoveredNewData = data.recoveredNew;
      let lastUpdatedData = data.lastUpdatedAtApify.substr(0, 10);
      let deathsData = data.deaths;
      let deathsNewData = data.deathsNew;

      // population.innerText=populationData;
      lastUpdated.innerText = lastUpdatedData;
      totalCases.innerText = totalCasesData.toLocaleString("en");
      activeCases.innerText = activeCasesData.toLocaleString("en");
      activeNew.innerText = activeNewData.toLocaleString("en");
      recovered.innerText = recoveredData.toLocaleString("en");
      recoveredNew.innerText = recoveredNewData.toLocaleString("en");
      deaths.innerText = deathsData.toLocaleString("en");
      deathsNew.innerText = deathsNewData.toLocaleString("en");
      percent.innerText =
        (
          (Number(deathsData) / Number(totalCasesData)) *
          100
        ).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%";
    });

  setTimeout(getStats, 3600000);
}
