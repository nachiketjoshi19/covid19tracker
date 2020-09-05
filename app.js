window.onload = function () {
  getStats();
};

const darkMode= document.getElementById("customSwitches")
let dark = 0
darkMode.addEventListener('change',()=>{
if (dark==0){
  document.getElementById('body').classList.add('dark')
  dark=1;
  country.classList.add('text-white')
  countryName.classList.add('text-white')
  totalCases.classList.add('text-white')
  document.getElementById('Tcases').classList.add('text-white')
}
else{
  dark=0;
  document.getElementById('body').classList.remove('dark')
  country.classList.remove('text-white')
  countryName.classList.remove('text-white')
  totalCases.classList.remove('text-white')
  document.getElementById('Tcases').classList.remove('text-white')

}
})


const totalCases = document.getElementById("totalCases");
const lastUpdated = document.getElementById("lastUpdated");
const activeCases = document.getElementById("activeCases");
const activeNew = document.getElementById("activeNew");
const deaths = document.getElementById("deaths");
const deathsNew = document.getElementById("deathsNew");
const percent = document.getElementById("percent");
const recovered = document.getElementById("recovered");
const recoveredNew = document.getElementById("recoveredNew");
const dropMenu = document.getElementById("dropMenu");
const country = document.getElementById("country");
const countryName = document.getElementById("countryName");
const dropdownName = document.getElementById("dropdownName");
const india = document.getElementById("india");
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
        ((Number(deathsData) / Number(totalCasesData)) * 100).toLocaleString(
          "en",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        ) + "%";
      dropdownName.innerText = "india";
      country.innerHTML = "Country:";
      countryName.innerHTML = "INDIA";
      return data.regionData;
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        var newDropdown = document.createElement("a");
        newDropdown.setAttribute("id", data[i].region);
        newDropdown.innerText = data[i].region;
        newDropdown.classList.add("dropdown-item");
        dropMenu.appendChild(newDropdown);
        console.log(data[i].region);
        newDropdown.addEventListener("click", function () {
          dropdownName.innerText = data[i].region;
          activeCases.innerText = data[i].newInfected;
          country.innerText = "Region";
          countryName.innerText = data[i].region;

          totalCases.innerText = "-";
          activeCases.innerText = data[i].totalInfected.toLocaleString("en");
          activeNew.innerText = data[i].newInfected.toLocaleString("en");
          recovered.innerText = data[i].recovered.toLocaleString("en");
          recoveredNew.innerText = data[i].newRecovered.toLocaleString("en");
          deaths.innerText = data[i].deceased.toLocaleString("en");
          deathsNew.innerText = data[i].newDeceased.toLocaleString("en");
          percent.innerText =
            (
              (Number(data[i].deceased) / Number(data[i].totalInfected)) *
              100
            ).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + "%";
          function scrollToTop() {
            $(window).scrollTop(0);
          }
          scrollToTop();
        });
      }
    });

  setTimeout(getStats, 3600000);
}

india.addEventListener("click", getStats);
