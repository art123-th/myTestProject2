const API_KEY="c081128d6f814d9191cfdab82482f7be"

const API_BASE="https://corsproxy.io/?https://api.football-data.org/v4"

const tableBody=document.getElementById("tableBody")
const matchesContainer=document.getElementById("matchesContainer")
const newsContainer=document.getElementById("newsContainer")

async function loadTable(){

const res=await fetch(`${API_BASE}/competitions/PL/standings`,{

headers:{
"X-Auth-Token":API_KEY
}

})

const data=await res.json()

tableBody.innerHTML=""

data.standings[0].table.forEach(team=>{

let rowClass=""

if(team.position<=4){
rowClass="top4"
}

if(team.position>=18){
rowClass="relegation"
}

tableBody.innerHTML+=`

<tr class="${rowClass}">

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

const res = await fetch(`${API_BASE}/competitions/PL/matches`,{
headers:{
"X-Auth-Token":API_KEY
}
})

const data = await res.json()

matchesContainer.innerHTML=""

const matches=data.matches

// หา matchday ล่าสุดที่มี FINISHED
let finishedMatches=matches.filter(m=>m.status==="FINISHED")

let latestMatchday=Math.max(...finishedMatches.map(m=>m.matchday))

// เอา matchday นั้น
let latestMatches=finishedMatches.filter(m=>m.matchday===latestMatchday)

// เรียงตามเวลา
latestMatches.sort((a,b)=> new Date(b.utcDate)-new Date(a.utcDate))

// เอาแค่ 2 นัดล่าสุด
let twoMatches=latestMatches.slice(0,2)

matchesContainer.innerHTML+=`

<div class="matchday">
Matchday ${latestMatchday} of 38
</div>

`

twoMatches.forEach(match=>{

let homeScore=match.score.fullTime.home
let awayScore=match.score.fullTime.away

let homeClass=""
let awayClass=""

if(homeScore>awayScore){
homeClass="winner"
awayClass="loser"
}

if(awayScore>homeScore){
awayClass="winner"
homeClass="loser"
}

let date=new Date(match.utcDate)

let dateText=date.toLocaleDateString("en-US",{
weekday:"short",
month:"short",
day:"numeric"
})

matchesContainer.innerHTML+=`

<div class="match-card">

<div class="match-teams">

<div class="team-row ${homeClass}">
<img src="${match.homeTeam.crest}">
${match.homeTeam.name}
<span class="match-score">${homeScore}</span>
</div>

<div class="team-row ${awayClass}">
<img src="${match.awayTeam.crest}">
${match.awayTeam.name}
<span class="match-score">${awayScore}</span>
</div>

</div>

<div class="match-info">
<div>FT</div>
<div>${dateText}</div>
</div>

</div>

`

})

}

function loadNews(){

const news=[

{
title:"Arsenal continue strong title race",
desc:"Arsenal maintain top position in the league."
},

{
title:"Manchester City push for comeback",
desc:"City keep chasing the league leaders."
},

{
title:"Liverpool dominate latest match",
desc:"Liverpool win with impressive performance."
},

{
title:"Tottenham battle for top four",
desc:"Spurs keep pressure on Champions League spots."
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