const API_KEY="c081128d6f814d9191cfdab82482f7be"

const tableBody=document.getElementById("tableBody")
const matchesContainer=document.getElementById("matchesContainer")
const newsContainer=document.getElementById("newsContainer")

const API_BASE="https://corsproxy.io/?https://api.football-data.org/v4"

async function loadTable(){

const res=await fetch(`${API_BASE}/competitions/PL/standings`,{

headers:{
"X-Auth-Token":API_KEY
}

})

const data=await res.json()

tableBody.innerHTML=""

data.standings[0].table.forEach(team=>{

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

}

async function loadMatches(){

const res=await fetch(`${API_BASE}/competitions/PL/matches`,{

headers:{
"X-Auth-Token":API_KEY
}

})

const data=await res.json()

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

}

function loadNews(){

const news=[

{
title:"Arsenal extend lead at the top",
desc:"Arsenal continue strong form in the Premier League."
},

{
title:"Manchester City chase title",
desc:"City keep pressure on top teams."
},

{
title:"Liverpool secure big win",
desc:"Liverpool dominate match with strong performance."
}

]

newsContainer.innerHTML=""

news.forEach(n=>{

newsContainer.innerHTML+=`

<div class="news-card">

<h3>${n.title}</h3>
<p>${n.desc}</p>

</div>

`

})

}

loadTable()
loadMatches()
loadNews()