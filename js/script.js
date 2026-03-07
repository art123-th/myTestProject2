const tableBody = document.getElementById("tableBody")

fetch("https://corsproxy.io/?https://api.football-data.org/v4/competitions/PL/standings",{

headers:{
"X-Auth-Token":"c081128d6f814d9191cfdab82482f7be"
}

})

.then(res=>res.json())

.then(data=>{

const standings=data.standings[0].table

tableBody.innerHTML=""

standings.forEach(team=>{

tableBody.innerHTML+=`

<tr>

<td>${team.position}</td>

<td class="team">

<img src="${team.team.crest}">
${team.team.name}

</td>

<td>${team.playedGames}</td>
<td>${team.won}</td>
<td>${team.draw}</td>
<td>${team.lost}</td>
<td>${team.goalDifference}</td>
<td><b>${team.points}</b></td>

</tr>

`

})

})



const matchesContainer=document.getElementById("matchesContainer")

fetch("https://corsproxy.io/?https://api.football-data.org/v4/competitions/PL/matches",{

headers:{
"X-Auth-Token":"c081128d6f814d9191cfdab82482f7be"
}

})

.then(res=>res.json())

.then(data=>{

matchesContainer.innerHTML=""

data.matches.slice(0,8).forEach(match=>{

matchesContainer.innerHTML+=`

<div class="match">

<div class="team">

<img src="${match.homeTeam.crest}">
${match.homeTeam.name}

</div>

<div>

${match.score.fullTime.home ?? "-"} : ${match.score.fullTime.away ?? "-"}

</div>

<div class="team">

<img src="${match.awayTeam.crest}">
${match.awayTeam.name}

</div>

</div>

`

})

})



const newsContainer=document.getElementById("newsContainer")

fetch("https://newsapi.org/v2/everything?q=premier%20league&apiKey=demo")

.then(res=>res.json())

.then(data=>{

data.articles.slice(0,4).forEach(article=>{

newsContainer.innerHTML+=`

<div class="news-card">

<h3>${article.title}</h3>

<p>${article.description ?? ""}</p>

</div>

`

})

})