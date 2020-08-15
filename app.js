






window.onload=function(){
    getStats();
}





const population=document.getElementById('population');
const lastUpdated=document.getElementById('lastUpdated');
const confirmed=document.getElementById('confirmed');
const deaths=document.getElementById('deaths');
const percent=document.getElementById('percent');

function getStats(){
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/143')
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        

        let populationData = data.location.country_population.toLocaleString('en');
        let lastUpdatedData = data.location.last_updated.substr(0, 10);
        let confirmedData = data.location.latest.confirmed;
        let deathsData = data.location.latest.deaths;
     
        

        population.innerText=populationData;
        lastUpdated.innerText=lastUpdatedData;
        confirmed.innerText=confirmedData.toLocaleString('en');
        deaths.innerText=deathsData.toLocaleString('en');
        percent.innerText= ((Number(deathsData)/Number(confirmedData))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";




    })
    .catch(function(){
        console.log("error");
    })
    setTimeout(getStats,3600000)
}