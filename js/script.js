const newsContainer = document.getElementById("newsContainer")
const matchesContainer = document.getElementById("matchesContainer")

// NEWS API
fetch("https://newsapi.org/v2/everything?q=football&apiKey=demo")
.then(res => res.json())
.then(data => {

newsContainer.innerHTML=""

data.articles.slice(0,6).forEach(article=>{

newsContainer.innerHTML+=`

<div class="card">

<h3>${article.title}</h3>

<p>${article.description || ""}</p>

<a href="${article.url}" target="_blank">Read more</a>

</div>

`

})

})


// MATCH DATA (example)

const matches=[

{
home:"Arsenal",
away:"Chelsea",
logo1:"https://crests.football-data.org/57.png",
logo2:"https://crests.football-data.org/61.png"
},

{
home:"Liverpool",
away:"Manchester City",
logo1:"https://crests.football-data.org/64.png",
logo2:"https://crests.football-data.org/65.png"
}

]

matches.forEach(match=>{

matchesContainer.innerHTML+=`

<div class="card">

<div class="team">

<img src="${match.logo1}">
${match.home}

</div>

<p>vs</p>

<div class="team">

<img src="${match.logo2}">
${match.away}

</div>

</div>

`

})


// DARK MODE

const btn=document.getElementById("themeBtn")

btn.onclick=()=>{

document.body.classList.toggle("dark")

}
const tableBody = document.getElementById("tableBody")

fetch("https://api.football-data.org/v4/competitions/PL/standings",{

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

<td style="display:flex;align-items:center;gap:10px;">

<img src="${team.team.crest}" width="25">

${team.team.name}

</td>

<td>${team.points}</td>

</tr>

`

})

})