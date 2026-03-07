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

async function loadMatches() {

const url = "https://site.api.espn.com/apis/v2/sports/soccer/eng.1/scoreboard";

const res = await fetch(url);
const data = await res.json();

const matches = data.events;

let grouped = {};

// จัดกลุ่ม matchday
matches.forEach(match => {

const week = match.week.number;

if(!grouped[week]) grouped[week] = [];

grouped[week].push(match);

});

const matchdays = Object.keys(grouped).map(Number);

const latest = Math.max(...matchdays);
const previous = latest - 1;

const show = [latest, previous];

const container = document.getElementById("matchesContainer");

container.innerHTML = "";

show.forEach(day => {

if(!grouped[day]) return;

let html = `<h3>Matchday ${day} of 38</h3>`;

grouped[day].forEach(match => {

const home = match.competitions[0].competitors[0];
const away = match.competitions[0].competitors[1];

html += `
<div class="match">

<div class="team">
<img src="${home.team.logo}" width="24">
${home.team.displayName}
</div>

<div class="score">
${home.score} - ${away.score}
</div>

<div class="team">
<img src="${away.team.logo}" width="24">
${away.team.displayName}
</div>

</div>
`;

});

container.innerHTML += html;

});

}

loadMatches();

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